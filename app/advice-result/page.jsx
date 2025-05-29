"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LanguageToggle from "../components/LanguageToggle";

function AdviceResultContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [language, setLanguage] = useState("en");
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `/api/advice?id=${id}&language=${language}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch advice");
        }

        setAdvice(data);
      } catch (error) {
        console.error("Error fetching advice:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAdvice();
  }, [id, language]);

  const translations = {
    en: {
      title: "Your Custom Care Advice",
      summary: "Animal Summary",
      generalTips: "General Care Tips",
      feeding: "Feeding Recommendation",
      health: "Health Check",
      islamic: "Islamic Guidance",
      loading: "Generating personalized advice...",
      error: "Failed to load advice. Please try again.",
    },
    ur: {
      title: "Apka Khass Hifazati Mashwara",
      summary: "Janwar ka Khulasa",
      generalTips: "Aam Hifazati Nuskhay",
      feeding: "Khurak ka Mashwara",
      health: "Sehat ki Jaiza",
      islamic: "Islami Hidayat",
      loading: "Apke liye mashwara taiyar ho raha hai...",
      error: "Mashwara load karne mein kami. Phir koshish karein.",
    },
  };

  const getAdviceData = () => {
    if (!advice) return {};

    return {
      animalType: advice.animalType || "unknown",
      age: advice.age || "N/A",
      weight: advice.weight || "N/A",
      generalTips: Array.isArray(advice.generalTips)
        ? advice.generalTips
        : ["No general tips available", "Check back later for updates"],
      feedingRecommendation:
        advice.feedingRecommendation ||
        "No specific feeding recommendation available",
      healthCheck:
        advice.healthCheck || "No specific health check advice available",
      islamicGuidance:
        advice.islamicGuidance || "No specific Islamic guidance available",
      healthIssues: advice.healthIssues,
      healthIssuesAdvice:
        advice.healthIssuesAdvice ||
        "No specific advice available for reported issues",
    };
  };

  const adviceData = getAdviceData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-700">{translations[language].loading}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{translations[language].error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
          >
            Retry / Dobara koshish karein
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-green-700 text-white p-6">
          <h1 className="text-2xl font-bold">{translations[language].title}</h1>
        </div>

        <div className="p-6">
          <LanguageToggle language={language} setLanguage={setLanguage} />

          {advice ? (
            <div className="space-y-6">
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h2 className="text-xl font-semibold text-green-800 mb-3">
                  {translations[language].summary}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Type / Qisam</p>
                    <p className="font-medium">
                      {adviceData.animalType === "goat"
                        ? "Goat / Bakri"
                        : adviceData.animalType === "sheep"
                        ? "Sheep / Dumbi"
                        : adviceData.animalType === "cow"
                        ? "Cow / Gaay"
                        : "Camel / Oont"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Age / Umar</p>
                    <p className="font-medium">
                      {adviceData.age} months / mahine
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Weight / Wazan</p>
                    <p className="font-medium">{adviceData.weight} kg</p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h2 className="text-xl font-semibold text-blue-800 mb-3">
                  {translations[language].generalTips}
                </h2>
                <ul className="list-disc pl-5 space-y-2">
                  {adviceData.generalTips.map((tip, i) => (
                    <li key={i} className="text-gray-700">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 bg-yellow-50 rounded-lg border border-yellow-200">
                <h2 className="text-xl font-semibold text-yellow-800 mb-3">
                  {translations[language].feeding}
                </h2>
                <p className="text-gray-700">
                  {adviceData.feedingRecommendation}
                </p>
              </div>

              <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                <h2 className="text-xl font-semibold text-red-800 mb-3">
                  {translations[language].health}
                </h2>
                <p className="text-gray-700">{adviceData.healthCheck}</p>
                {adviceData.healthIssues && (
                  <div className="mt-3 p-3 bg-white rounded border">
                    <p className="font-medium">
                      About your reported issues / Aapke bataye gaye masail:
                    </p>
                    <p className="text-gray-700 mt-1">
                      {adviceData.healthIssuesAdvice}
                    </p>
                  </div>
                )}
              </div>

              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h2 className="text-xl font-semibold text-purple-800 mb-3">
                  {translations[language].islamic}
                </h2>
                <p className="text-gray-700">{adviceData.islamicGuidance}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p>No advice data found. Please check your query parameters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdviceResult() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p>Loading advice...</p>
          </div>
        </div>
      }
    >
      <AdviceResultContent />
    </Suspense>
  );
}
