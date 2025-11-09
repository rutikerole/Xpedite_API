function HeadersTab({ headers, setHeaders }) {
  const handleChange = (index, field, value) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const addRow = () => setHeaders([...headers, { key: "", value: "" }]);
  const removeRow = (index) =>
    setHeaders(headers.filter((_, i) => i !== index));

  return (
    <div className="space-y-1">
      {headers.map((h, i) => (
        <div key={i} className="flex space-x-1">
          <input
            value={h.key}
            onChange={(e) => handleChange(i, "key", e.target.value)}
            placeholder="Header"
            className="flex-1 bg-gray-900 border border-gray-700 px-2 py-1 rounded-md text-base"
          />
          <input
            value={h.value}
            onChange={(e) => handleChange(i, "value", e.target.value)}
            placeholder="Value"
            className="flex-1 bg-gray-900 border border-gray-700 px-2 py-1 rounded-md text-base"
          />
          <button
            onClick={() => removeRow(i)}
            className="text-red-400 hover:text-red-600"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={addRow}
        className="text-green-400 py-1 hover:text-green-600 text-sm"
      >
        + Add Header
      </button>
    </div>
  );
}

export default HeadersTab;
