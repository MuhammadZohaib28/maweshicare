"use client";

export default function LanguageToggle({ language, setLanguage }) {
  return (
    <div className="flex items-center justify-end mb-4">
      <div className="bg-gray-100 rounded-full p-1 flex">
        <button
          onClick={() => setLanguage("en")}
          className={`px-3 py-1 rounded-full text-sm ${
            language === "en" ? "bg-green-600 text-white" : "text-gray-600"
          }`}
        >
          English
        </button>
        <button
          onClick={() => setLanguage("ur")}
          className={`px-3 py-1 rounded-full text-sm ${
            language === "ur" ? "bg-green-600 text-white" : "text-gray-600"
          }`}
        >
          Roman Urdu
        </button>
      </div>
    </div>
  );
}
