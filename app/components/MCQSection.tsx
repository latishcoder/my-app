'use client';

import { useState } from 'react';
import MathRenderer from '@/app/utils/katex-renderer';
import { MCQ } from '@/app/lib/types';

interface MCQSectionProps {
  mcqs: MCQ[];
  subject: 'Physics' | 'Chemistry' | 'Biology';
}

export default function MCQSection({ mcqs, subject }: MCQSectionProps) {
  // Store selected option per question
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [questionIndex: number]: string;
  }>({});

  const handleSelect = (questionIndex: number, option: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  return (
    <section
      className="
        bg-white dark:bg-gray-800
        p-6 rounded-xl
        shadow-sm
        border border-gray-200 dark:border-gray-700
        text-gray-900 dark:text-gray-100
      "
    >
      {/* Section title */}
      <h2 className="text-xl font-semibold mb-4">
        ✍️ Practice MCQs
      </h2>

      {mcqs.map((mcq, index) => {
        const selectedOption = selectedAnswers[index];
        const showExplanation = selectedOption !== undefined;

        return (
          <div key={index} className="mb-8">
            {/* Question */}
            <div className="text-gray-800 dark:text-gray-200 mb-3">
              <MathRenderer content={mcq.question} />
            </div>

            {/* Options */}
            <div className="space-y-2">
              {Object.entries(mcq.options).map(([key, value]) => {
                const isSelected = selectedOption === key;
                const isCorrect = mcq.correctAnswer === key;

                let buttonClass =
                  'block w-full text-left p-3 rounded-lg border transition-colors ';

                if (showExplanation) {
                  if (isCorrect) {
                    buttonClass +=
                      'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-900 dark:text-green-200 ';
                  } else if (isSelected) {
                    buttonClass +=
                      'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-900 dark:text-red-200 ';
                  } else {
                    buttonClass +=
                      'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 ';
                  }
                } else {
                  buttonClass +=
                    'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 ';
                }

                return (
                  <button
                    key={key}
                    onClick={() => handleSelect(index, key)}
                    disabled={showExplanation}
                    className={buttonClass}
                  >
                    <span className="font-semibold mr-1">{key}.</span>
                    <MathRenderer content={value} />

                    {showExplanation && isCorrect && (
                      <span className="ml-2 font-semibold text-green-700 dark:text-green-300">
                        ✓
                      </span>
                    )}

                    {showExplanation && isSelected && !isCorrect && (
                      <span className="ml-2 font-semibold text-red-700 dark:text-red-300">
                        ✗
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div
                className="
                  mt-4 p-4 rounded-lg
                  bg-blue-50 dark:bg-blue-900/30
                  text-blue-900 dark:text-blue-200
                "
              >
                <MathRenderer content={mcq.explanation} />
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
