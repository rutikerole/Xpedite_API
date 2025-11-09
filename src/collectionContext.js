import { createContext, useState } from "react";

export const CollectionContext = createContext();

export function CollectionProvider({ children }) {
  const [openCollections, setOpenCollections] = useState([]);
  const [activeCollectionId, setActiveCollectionId] = useState(null);
  const [collectionData, setCollectionData] = useState({});  // Store both request + response per collection



  const addCollectionTab = (collection) => {
    setOpenCollections((prev) => {
      const exists = prev.find((c) => c.id === collection.id);
      if (exists) return prev;
      return [...prev, collection];
    });
    setActiveCollectionId(collection.id);
  };




  const closeCollectionTab = (id) => {
    setOpenCollections((prev) => {
      const remaining = prev.filter((c) => c.id !== id);
      if (activeCollectionId === id) {
        setActiveCollectionId(remaining.length ? remaining[remaining.length - 1].id : null);
      }
      return remaining;
    });

    setCollectionData((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };



  // ✅ Update (merge) request/response data for a specific collection
  const updateCollectionData = (collectionId, data) => {
    setCollectionData((prev) => ({
      ...prev,
      [collectionId]: { ...prev[collectionId], ...data },
    }));
  };



  const getActiveCollectionData = () => {
    return collectionData[activeCollectionId] || {};
  };


 const openRecentRequest = (req) => {
  if (!req) return;

  const recentId = req.id || `recent-${Date.now()}`;

  const newTab = {
    id: recentId,
    name: req.url || "Untitled Request",
    method: req.method || "GET",
    url: req.url || "",
    fromRecent: true,
  };

  // ✅ open tab if not already open
  setOpenCollections((prev) => {
    const exists = prev.find((c) => c.id === recentId);
    if (exists) return prev;
    return [...prev, newTab];
  });

  // ✅ restore all saved data for that request
  setCollectionData((prev) => ({
    ...prev,
    [recentId]: {
      request: {
        method: req.method || "GET",
        url: req.url || "",
        headers: req.headers || {},
        body: req.body || "",
      },
      response: req.response || null,
    },
  }));

  setActiveCollectionId(recentId);
};



  return (
    <CollectionContext.Provider
      value={{
        openCollections,
        activeCollectionId,
        setActiveCollectionId,
        addCollectionTab,
        closeCollectionTab,
        collectionData,
        updateCollectionData,
        getActiveCollectionData,
        openRecentRequest,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
}
