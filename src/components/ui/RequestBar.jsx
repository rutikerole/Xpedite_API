import { SendHorizonalIcon } from "lucide-react";

const methods = ["GET", "POST", "PUT", "DELETE"];

const methodColors = {
  GET: "text-green-400",
  POST: "text-blue-400",
  PUT: "text-yellow-400",
  DELETE: "text-red-400",
};

function RequestBar({ selected, setSelected, reqURL, setReqURL, onSend }) {
  return (
    <div className="flex items-center gap-3 bg-gray-900/70 border border-gray-800 rounded-xl px-3 py-2 shadow-sm backdrop-blur-md">
      {/* Method Dropdown */}
      <div className="relative">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className={`appearance-none pl-3 pr-8 py-2 rounded-lg font-semibold bg-gray-800 border border-gray-700 text-sm cursor-pointer focus:outline-none  ${methodColors[selected]}`}
        >
          {methods.map((m) => (
            <option
              key={m}
              value={m}
              className={`bg-gray-900 ${methodColors[m]} font-semibold`}
            >
              {m}
            </option>
          ))}
        </select>
        {/* ▼ little dropdown icon */}
        <svg
          className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* URL Input */}
      <input
        type="text"
        placeholder="Enter request URL..."
        value={reqURL}
        onChange={(e) => setReqURL(e.target.value)}
        className="flex-1 bg-gray-950/80 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 shadow-inner"
      />

      {/* Send Button */}
      <button
        onClick={onSend}
        className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-emerald-600 to-green-500 text-white font-semibold rounded-lg shadow-md hover:from-emerald-700 hover:to-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 active:scale-95 transition-all duration-200"
      >
        <SendHorizonalIcon size={18} strokeWidth={2} />
        <span>Send</span>
      </button>
    </div>
  );
}

export default RequestBar;
