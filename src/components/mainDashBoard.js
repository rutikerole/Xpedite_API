import { useContext, useEffect, useState } from "react";
import { CollectionContext } from "../collectionContext.js";
import RequestBar from "./ui/RequestBar.jsx";
import Tabs from "./ui/Tabs.jsx";
import ParamsTab from "./ui/ParamsTab.jsx";
import HeadersTab from "./ui/HeadersTab.jsx";
import BodyTab from "./ui/BodyTab.jsx";
import AuthTab from "./ui/AuthTab.jsx";
import ResponseBox from "./ui/ResponseBox.jsx";
import { addRecentRequest } from "../firebase/firestore.js";
import TabsBar from "./ui/TabsBar.jsx";

function MainDashboard() {
  const {
    openCollections,
    activeCollectionId,
    setActiveCollectionId,
    closeCollectionTab,
    updateCollectionData,
    getActiveCollectionData,
  } = useContext(CollectionContext);

  const activeCollection = openCollections.find(
    (c) => c.id === activeCollectionId
  );

  // --- Request & Response States ---
  const [selected, setSelected] = useState("GET");
  const [reqURL, setReqURL] = useState("");
  const [params, setParams] = useState([{ key: "", value: "" }]);
  const [reqHeaders, setReqHeaders] = useState([{ key: "", value: "" }]);
  const [reqBody, setReqBody] = useState("");
  const [authType, setAuthType] = useState("Bearer");
  const [authValue, setAuthValue] = useState("");

  const [activeTab, setActiveTab] = useState("Params");

  const [urlData, setUrlData] = useState(null);
  const [responseHeaders, setResponseHeaders] = useState({});
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);

  // 🧠 Load both request + response when switching tabs
  useEffect(() => {
    if (!activeCollectionId) return;
    const data = getActiveCollectionData();

    setSelected(data.method || "GET");
    setReqURL(data.url || "");
    setParams(data.params || [{ key: "", value: "" }]);
    setReqHeaders(data.headers || [{ key: "", value: "" }]);
    setReqBody(data.body || "");
    setAuthType(data.authType || "Bearer");
    setAuthValue(data.authValue || "");

    // response
    setUrlData(data.response || null);
    setResponseHeaders(data.responseHeaders || {});
    setError(data.error || null);
    setStatus(data.status || null);
    setTimeTaken(data.timeTaken || null);
  }, [activeCollectionId]);

  // 💾 Save request+response data per collection
  useEffect(() => {
    if (!activeCollectionId) return;
    updateCollectionData(activeCollectionId, {
      method: selected,
      url: reqURL,
      params,
      headers: reqHeaders,
      body: reqBody,
      authType,
      authValue,
      response: urlData,
      responseHeaders,
      error,
      status,
      timeTaken,
    });
  }, [
    selected,
    reqURL,
    params,
    reqHeaders,
    reqBody,
    authType,
    authValue,
    urlData,
    responseHeaders,
    error,
    status,
    timeTaken,
  ]);

  // ✅ Build query string
  const buildQueryString = (params) => {
    const query = params
      .filter((p) => p.key.trim() !== "")
      .map((p) => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`)
      .join("&");
    return query ? `?${query}` : "";
  };

  // ✅ Handle Send (API call)
  const handleSend = async () => {
    if (!reqURL) {
      setError("Please enter a URL");
      return;
    }

    const queryString = buildQueryString(params);
    const finalURL = reqURL + queryString;

    let headers = {};
    reqHeaders.forEach((h) => {
      if (h.key.trim()) headers[h.key] = h.value;
    });

    if (authValue) {
      headers["Authorization"] =
        authType === "Bearer" ? `Bearer ${authValue}` : authValue;
    }

    const options = { method: selected, headers };

    if (["POST", "PUT", "PATCH"].includes(selected) && reqBody.trim()) {
      try {
        options.body = JSON.stringify(JSON.parse(reqBody));
        headers["Content-Type"] = "application/json";
      } catch (err) {
        setError("Invalid JSON in request body");
        return;
      }
    }

    setError(null);
    setStatus(null);
    setUrlData(null);
    setResponseHeaders({});

    const start = performance.now();

    try {
  const res = await fetch(finalURL, options);
  const end = performance.now();

  const headersObj = {};
  res.headers.forEach((value, key) => {
    headersObj[key] = value;
  });

  setStatus(res.status);
  setTimeTaken(`${(end - start).toFixed(2)} ms`);
  setResponseHeaders(headersObj);

  const contentType = res.headers.get("content-type");
  let data;
  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
    setUrlData(data);
  } else {
    data = await res.text();
    setUrlData(data);
  }

  // ✅ Save to Firestore (complete request + response)
  await addRecentRequest(
    selected,                 // method
    finalURL,                 // url
    headers,                  // request headers
    reqBody,                  // request body
    {
      status: res.status,
      headers: headersObj,
      body: data,
      timeTaken: `${(end - start).toFixed(2)} ms`,
    }                         // response object
  );

} catch (err) {
  setError(err.message);
}

  };

  // 🧭 UI
  return (
    <div className="flex-1 min-h-screen p-4 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-200 overflow-hidden flex flex-col">

      {/* Tabs Bar */}
      {openCollections.length > 0 && (
        <TabsBar
          openCollections={openCollections}
          activeCollectionId={activeCollectionId}
          setActiveCollectionId={setActiveCollectionId}
          closeCollectionTab={closeCollectionTab}
        />
      )}

      {/* Dashboard Content */}
      {activeCollection ? (
          <div className="space-y-4 animate-fade-in overflow-y-auto flex-1 pr-2">

          <h1 className="text-base px-2 py-1 font-semibold">
            {activeCollection.name}
          </h1>

          <RequestBar
            selected={selected}
            setSelected={setSelected}
            reqURL={reqURL}
            setReqURL={setReqURL}
            onSend={handleSend}
          />

          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
            {activeTab === "Params" && (
              <ParamsTab params={params} setParams={setParams} />
            )}
            {activeTab === "Headers" && (
              <HeadersTab headers={reqHeaders} setHeaders={setReqHeaders} />
            )}
            {activeTab === "Body" && (
              <BodyTab reqBody={reqBody} setReqBody={setReqBody} />
            )}
            {activeTab === "Auth" && (
              <AuthTab
                authType={authType}
                setAuthType={setAuthType}
                authValue={authValue}
                setAuthValue={setAuthValue}
              />
            )}
          </div>

          <ResponseBox
            urlData={urlData}
            error={error}
            status={status}
            timeTaken={timeTaken}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center p-6 animate-fade-in">
          <img
            src="/API Testing.png"
            alt="No collection selected"
            className="w-48 h-48 mb-4 animate-bounce"
          />
          <h2 className="text-lg font-semibold text-gray-400 mb-2">
            Oops! No collection selected.
          </h2>
          <p className="text-gray-500 max-w-xs">
            Looks like you’re flying solo here. Select a collection to see all
            the magic happen!
          </p>
        </div>
      )}
    </div>
  );
}

export default MainDashboard;
