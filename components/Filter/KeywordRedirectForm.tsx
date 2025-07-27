import React, { useState } from "react";

const KeywordRedirectForm: React.FC = () => {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    const baseUrl = "https://projects.arosarealestate.com/";
    const url = new URL(baseUrl);
    url.searchParams.set("k", keyword.trim());

    // Redirect in a new tab
    window.open(url.toString(), "_blank");
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-6 relative my-10">
      <form onSubmit={handleSubmit} className="flex items-center gap-5">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search.. "
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded  transition"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default KeywordRedirectForm;
