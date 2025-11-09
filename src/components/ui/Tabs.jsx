const tabNames = ["Params", "Headers", "Body", "Auth"];

function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex space-x-2 border-b border-gray-700">
      {tabNames.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
            activeTab === tab
              ? "bg-gray-800 text-white border border-gray-700 border-b-0"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
