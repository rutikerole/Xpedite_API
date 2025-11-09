import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  FileCode2,
  Inbox,
} from "lucide-react";

// Helper to colorize JSON
const syntaxHighlight = (json) => {
  if (typeof json !== "string") {
    json = JSON.stringify(json, null, 2);
  }
  // Escape HTML characters
  json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return json.replace(
    /("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|\b\d+(\.\d+)?\b)/g,
    (match) => {
      let cls = "text-white"; // default
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "text-yellow-400"; // key
        } else {
          cls = "text-green-300"; // string
        }
      } else if (/true|false/.test(match)) {
        cls = "text-purple-400"; // boolean
      } else if (/null/.test(match)) {
        cls = "text-gray-400"; // null
      } else {
        cls = "text-blue-400"; // number
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
};

function ResponseBox({ urlData, error, status, timeTaken }) {
  const [activeTab, setActiveTab] = useState("Body");

  const tabs = ["Body", "Headers", "Raw", "Pretty"];

  const statusColor =
    status >= 200 && status < 300
      ? "bg-green-600 text-green-100"
      : status
      ? "bg-red-600 text-red-100"
      : "bg-gray-700 text-gray-300";

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-lg overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-gray-800/60">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <FileCode2 size={18} />
          Response
        </h2>

        {status && (
          <div className="flex items-center gap-3 text-sm">
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor}`}
            >
              {status >= 200 && status < 300 ? (
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={14} /> {status}
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <XCircle size={14} /> {status}
                </span>
              )}
            </span>

            <span className="flex items-center gap-1 text-blue-400">
              <Clock size={14} /> {timeTaken}
            </span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700 bg-gray-800/40">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              activeTab === tab
                ? "text-emerald-400 border-b-2 border-emerald-400"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="p-4 h-64 overflow-auto font-mono text-sm bg-black/60">
        {error ? (
          <pre className="text-red-400 animate-pulse w-full text-left">
            {JSON.stringify(error, null, 2)}
          </pre>
        ) : urlData ? (
          <>
            {activeTab === "Body" && (
              <pre className="text-green-200 whitespace-pre-wrap w-full text-left">
                {JSON.stringify(urlData, null, 2)}
              </pre>
            )}
            {activeTab === "Pretty" && (
              <pre
                className="whitespace-pre-wrap w-full text-left"
                dangerouslySetInnerHTML={{ __html: syntaxHighlight(urlData) }}
              />
            )}
            {activeTab === "Raw" && (
              <pre className="text-gray-300 whitespace-pre-wrap w-full text-left">
                {typeof urlData === "string" ? urlData : JSON.stringify(urlData)}
              </pre>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-600">
            <Inbox size={48} className="mb-2 opacity-70" />
            <p className="italic">No response yet</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center px-4 py-2 border-t border-gray-700 bg-gray-800/60 text-xs text-gray-400">
        <span>
          Size: {urlData ? (new Blob([JSON.stringify(urlData)]).size / 1024).toFixed(2) : 0} KB
        </span>
        <span>{new Date().toLocaleTimeString()}</span>
        <button
          onClick={() =>
            navigator.clipboard.writeText(JSON.stringify(urlData, null, 2))
          }
          className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs"
        >
          Copy JSON
        </button>
      </div>
    </div>
  );
}

export default ResponseBox;
