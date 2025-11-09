import { X } from "lucide-react";

function TabsBar({ openCollections, activeCollectionId, setActiveCollectionId, closeCollectionTab }) {
  const methodColors = {
    GET: "text-green-400",
    POST: "text-yellow-400",
    PUT: "text-blue-400",
    DELETE: "text-red-400",
    PATCH: "text-purple-400",
  };

  return (
    <div className="flex items-center bg-gradient-to-r from-gray-950 via-gray-900 to-black backdrop-blur-md px-2 py-1 border-b border-gray-800 rounded-t-xl shadow-md overflow-x-auto">
      {openCollections.map((col) => {
        const isActive = col.id === activeCollectionId;

        // Handle method + URL display
        const method = col.method || "GET";
        const url = col.url || col.name || "";
        const shortUrl = url.replace(/^https?:\/\/(www\.)?/, "").split("?")[0];
        const displayUrl =
          shortUrl.length > 25 ? shortUrl.slice(0, 25) + "..." : shortUrl;

        return (
          <div
            key={col.id}
            onClick={() => setActiveCollectionId(col.id)}
            className={`flex items-center gap-1 px-3 py-1 rounded-t-md cursor-pointer group transition-all duration-300 ${
              isActive
                ? "bg-gray-900 text-blue-400 border-b-2 border-blue-500 shadow-sm"
                : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/60"
            }`}
          >
            {/* Method */}
            <span
              className={`font-semibold text-xs ${
                methodColors[method] || "text-gray-300"
              }`}
            >
              {method}
            </span>

            {/* Short URL */}
            <span className="truncate max-w-[140px] text-sm text-gray-300">
              {displayUrl}
            </span>

            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeCollectionTab(col.id);
              }}
              className="ml-1 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-red-500 transition"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default TabsBar;
