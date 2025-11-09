import { useState, useEffect, useContext } from "react";
import {
  ChevronDown,
  ChevronRight,
  Clock,
  Folder,
  MoonIcon,
  Plus,
  Trash,
} from "lucide-react";
import { Dialog } from "@headlessui/react";
import {
  addCollection,
  getCollections,
  getRecentRequests,
  deleteCollectionById,
  deleteRecentRequestById,
} from "../firebase/firestore.js";
import { CollectionContext } from "../collectionContext.js";

function SideBar() {
  const [collections, setCollections] = useState([]);
  const [recentRequests, setRecentRequests] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [isOpen, setIsOpen] = useState({ collections: true, recent: true });

  const { addCollectionTab } = useContext(CollectionContext);

  function toggleSection(section) {
    setIsOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  }

  async function handleAdd() {
    const name = newCollectionName.trim();
    if (!name) return;
    try {
      await addCollection(name);
      setNewCollectionName("");
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Error adding collection:", err);
    }
  }

  useEffect(() => {
    const unsubCollections = getCollections(setCollections);
    const unsubRecent = getRecentRequests(setRecentRequests);
    return () => {
      unsubCollections();
      unsubRecent();
    };
  }, []);

  return (
    <aside className="w-72 h-screen bg-slate-900 text-gray-100 flex flex-col border-r border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800 flex-shrink-0">
        <h2 className="text-lg font-bold text-gray-200">My Collections</h2>
        <MoonIcon className="w-5 h-5 cursor-pointer hover:text-yellow-400 transition" />
      </div>

      {/* New Collection Button */}
      <div className="p-5 flex-shrink-0 border-b border-gray-800">
        <button
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center gap-2 w-full font-medium bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg transition"
        >
          <Plus className="w-4 h-4" /> New Collection
        </button>
      </div>

      {/* Scrollable section */}
      <div className="flex-1 min-h-0 overflow-y-auto px-3 py-3 space-y-4 custom-scrollbar">
        {/* Collections */}
        <Section
          title="Collections"
          icon={<Folder className="w-4 h-4" />}
          isOpen={isOpen.collections}
          toggle={() => toggleSection("collections")}
        >
          {collections.length === 0 ? (
            <EmptyState text="No collections yet" />
          ) : (
            collections.map((col) => (
              <Item
                key={col.id}
                name={col.name}
                onClick={() => addCollectionTab(col)}
                onDelete={() => deleteCollectionById(col.id)}
              />
            ))
          )}
        </Section>

        {/* Recent */}
        <Section
          title="Recent"
          icon={<Clock className="w-4 h-4" />}
          isOpen={isOpen.recent}
          toggle={() => toggleSection("recent")}
        >
          {recentRequests.length === 0 ? (
            <EmptyState text="No recent requests" />
          ) : (
            recentRequests.map((req) => (
              <RequestItem
                key={req.id}
                req={req}
                onDelete={() => deleteRecentRequestById(req.id)}
              />
            ))
          )}
        </Section>
      </div>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-slate-800 rounded-lg p-6 w-full max-w-sm border border-gray-700">
            <Dialog.Title className="text-lg font-semibold mb-4 text-gray-200">
              Add New Collection
            </Dialog.Title>
            <input
              type="text"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder="Collection name"
              className="w-full bg-slate-900 border border-gray-700 px-3 py-2 rounded-md text-gray-100 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-3 py-2 text-gray-300 hover:bg-slate-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={!newCollectionName.trim()}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50"
              >
                Add
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </aside>
  );
}

/* ====== Sub Components ====== */

function Section({ title, icon, isOpen, toggle, children }) {
  return (
    <div>
      <div
        onClick={toggle}
        className="flex justify-between items-center cursor-pointer py-2 text-sm font-semibold text-gray-400 uppercase tracking-wide"
      >
        <div className="flex items-center gap-2">
          {icon} {title}
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </div>
      <div
        className={`transition-all overflow-hidden ${
          isOpen ? "max-h-[400px]" : "max-h-0"
        }`}
      >
        <ul className="space-y-2 py-2">{children}</ul>
      </div>
    </div>
  );
}

function Item({ name, onClick, onDelete }) {
  return (
    <li className="flex items-center justify-between px-3 py-2 rounded-md bg-slate-800/60 hover:bg-slate-700/60 transition">
      <span onClick={onClick} className="cursor-pointer truncate">
        {name}
      </span>
      <Trash
        onClick={onDelete}
        className="w-4 h-4 text-gray-500 hover:text-red-500 cursor-pointer"
      />
    </li>
  );
}

function RequestItem({ req, onDelete }) {
  const { openRecentRequest } = useContext(CollectionContext);

  const methodColors = {
    GET: "text-green-400 border-green-400/50",
    POST: "text-blue-400 border-blue-400/50",
    PUT: "text-yellow-400 border-yellow-400/50",
    DELETE: "text-red-400 border-red-400/50",
  };

  return (
    <li
      className="flex items-center justify-between px-3 py-2 rounded-md bg-slate-800/60 hover:bg-slate-700/60 transition cursor-pointer"
      onClick={() => openRecentRequest(req)}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span
          className={`px-2 py-0.5 text-xs font-bold rounded border ${
            methodColors[req.method] || "text-gray-400 border-gray-600"
          }`}
        >
          {req.method}
        </span>
        <span className="truncate">{req.url}</span>
      </div>
      <Trash
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="w-4 h-4 text-gray-500 hover:text-red-500 cursor-pointer flex-shrink-0"
      />
    </li>
  );
}

function EmptyState({ text }) {
  return <li className="text-sm text-gray-500 italic px-3 py-2">{text}</li>;
}

export default SideBar;
