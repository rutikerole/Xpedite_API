function BodyTab({ reqBody, setReqBody }) {
  const formatJSON = () => {
    try {
      const parsed = JSON.parse(reqBody);
      setReqBody(JSON.stringify(parsed, null, 2));
    } catch {
      alert("Invalid JSON format!");
    }
  };

  return (
    <div className="space-y-2">
      <textarea
        value={reqBody}
        onChange={(e) => setReqBody(e.target.value)}
        placeholder="Enter request body (JSON)"
        className="w-full h-28 bg-gray-900 border border-gray-700 px-2 py-1 rounded-md font-mono text-sm"
      />
      <button
        onClick={formatJSON}
        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
      >
        Format JSON
      </button>
    </div>
  );
}

export default BodyTab;
