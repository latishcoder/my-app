"use client";

import { useState } from "react";
import TopicInput from "@/app/components/TopicInput";
import ExplanationSection from "@/app/components/ExplanationSection";
import WorkedExample from "@/app/components/WorkedExample";
import MCQSection from "@/app/components/MCQSection";
import MisconceptionSection from "@/app/components/MisconceptionSection";
import LoadingState from "@/app/components/LoadingState";
import ErrorDisplay from "@/app/components/ErrorDisplay";
import { ExplanationResponse } from "@/app/lib/types";

export default function Home() {
  const [data, setData] = useState<ExplanationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Store last request so we can re-explain
  const [lastTopic, setLastTopic] = useState<string | null>(null);
  const [lastSubject, setLastSubject] = useState<
    "Physics" | "Chemistry" | "Biology"
  >("Physics");

  const handleSubmit = async (
    topic: string,
    difficulty: "basic" | "advanced",
    subject: "Physics" | "Chemistry" | "Biology"
  ) => {
    setLoading(true);
    setError(null);
    setData(null);

    setLastTopic(topic);
    setLastSubject(subject);

    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, difficulty, subject }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to fetch explanation");
      }

      setData(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Explain again in simpler words
  const handleExplainSimpler = () => {
    if (!lastTopic) return;
    handleSubmit(lastTopic, "basic", lastSubject);
  };

  return (
    <main
      className="
        min-h-screen
        px-4 py-6
        bg-gray-50 dark:bg-gray-900
        text-gray-900 dark:text-gray-100
      "
    >
      {/* Centered study container */}
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1
          className="
            text-3xl md:text-4xl
            font-bold text-center
            mb-8
          "
        >
          AI Concept Explainer – JEE / NEET
        </h1>

        {/* Topic Input Card */}
        <div
          className="
            bg-white dark:bg-gray-800
            p-6 rounded-xl
            border border-gray-200 dark:border-gray-700
            shadow-sm
            mb-6
          "
        >
          <TopicInput onSubmit={handleSubmit} disabled={loading} />
        </div>

        {/* Loading */}
        {loading && <LoadingState />}

        {/* Error */}
        {error && <ErrorDisplay message={error} />}

        {/* Results */}
        {data && (
          <div className="space-y-6 mt-6">
            <ExplanationSection
              explanation={data.explanation}
              subject={lastSubject}
            />

            {/* 🔁 Explain Again Button */}
            <div className="text-right">
              <button
                onClick={handleExplainSimpler}
                className="
                  text-sm font-medium
                  text-blue-600 dark:text-blue-400
                  hover:underline
                "
              >
                🔁 Explain again in simpler words
              </button>
            </div>

            <WorkedExample
              example={data.workedExample}
              subject={lastSubject}
            />

            {/* 🔥 Misconceptions */}
            <MisconceptionSection
              misconceptions={data.misconceptions}
              subject={lastSubject}
            />

            <MCQSection
              mcqs={data.mcqs}
              subject={lastSubject}
            />
          </div>
        )}
      </div>
    </main>
  );
}
