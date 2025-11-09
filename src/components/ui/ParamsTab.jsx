function ParamsTab({ params, setParams }) {
  const handleChange = (index, field, value) => {
    const newParams = [...params];
    newParams[index][field] = value;
    setParams(newParams);
  };

  const addRow = () => setParams([...params, { key: "", value: "" }]);
  const removeRow = (index) =>
    setParams(params.filter((_, i) => i !== index));

  return (
    <div className="space-y-1">
      {params.map((p, i) => (
        <div key={i} className="flex space-x-1">
          <input
            value={p.key}
            onChange={(e) => handleChange(i, "key", e.target.value)}
            placeholder="Key"
            className="flex-1 bg-gray-900 border border-gray-700 px-2 py-1 rounded-md text-base"
          />
          <input
            value={p.value}
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
        + Add Param
      </button>
    </div>
  );
}

export default ParamsTab;
