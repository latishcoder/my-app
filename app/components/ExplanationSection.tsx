import MathRenderer from "@/app/utils/katex-renderer";

interface Explanation {
  introduction: string;
  keyPoints: string[];
  summary: string;
}

interface ExplanationSectionProps {
  explanation: Explanation;
  subject: 'Physics' | 'Chemistry' | 'Biology';
}

export default function ExplanationSection({
  explanation,
  subject,
}: ExplanationSectionProps) {
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
      {/* Title */}
      <h2 className="text-xl font-semibold mb-4">
        📘 Concept Explanation
      </h2>

      {/* Introduction */}
      <div className="text-gray-800 dark:text-gray-200 leading-relaxed">
        <MathRenderer content={explanation.introduction} />
      </div>

      {/* Key Points */}
      <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-800 dark:text-gray-200">
        {explanation.keyPoints.map((point, index) => (
          <li key={index}>
            <MathRenderer content={point} />
          </li>
        ))}
      </ul>

      {/* Summary (highlighted for students) */}
      <div
        className="
          mt-4 p-4 rounded-lg
          bg-blue-50 dark:bg-blue-900/30
          text-blue-900 dark:text-blue-200
        "
      >
        <MathRenderer content={explanation.summary} />
      </div>
    </section>
  );
}
