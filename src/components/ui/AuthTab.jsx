function AuthTab({ authType, setAuthType, authValue, setAuthValue }) {
  return (
    <div className="space-y-1">
      <select
        value={authType}
        onChange={(e) => setAuthType(e.target.value)}
        className="bg-gray-800 border border-gray-700 px-2 py-1 mb-2 rounded-md"
      >
        <option value="Bearer">Bearer Token</option>
        <option value="Basic">Basic Auth</option>
      </select>
      <input
        type="text"
        placeholder="Enter token or credentials"
        value={authValue}
        onChange={(e) => setAuthValue(e.target.value)}
        className="w-full bg-gray-900 border border-gray-700 px-2 py-1 rounded-md"
      />
    </div>
  );
}

export default AuthTab;
