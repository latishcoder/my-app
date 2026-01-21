import MathRenderer from "@/app/utils/katex-renderer";

interface Misconception {
  misconception: string;
  whyStudentsThinkThis: string;
  whyItIsWrong: string;
  correctUnderstanding: string;
}

interface MisconceptionSectionProps {
  misconceptions: Misconception[];
  subject: "Physics" | "Chemistry" | "Biology";
}

export default function MisconceptionSection({
  misconceptions,
  subject
}: MisconceptionSectionProps) {
  if (!misconceptions || misconceptions.length === 0) return null;

  return (
    <section
      className="
        bg-red-50 dark:bg-red-900/20
        border border-red-200 dark:border-red-700
        rounded-xl
        shadow-sm
        p-6
      "
    >
      {/* Section title */}
      <h2
        className="
          text-2xl font-semibold
          text-red-700 dark:text-red-300
          mb-4
        "
      >
        ⚠️ Common Misconceptions
      </h2>

      <div className="space-y-6">
        {misconceptions.map((item, index) => (
          <div
            key={index}
            className="
              bg-white dark:bg-gray-800
              border-l-4 border-red-500
              rounded-lg
              p-5
            "
          >
            {/* Misconception */}
            <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              ❌ Misconception
            </p>
            <div className="text-gray-800 dark:text-gray-200">
              <MathRenderer content={item.misconception} />
            </div>

            {/* Why students think this */}
            <p className="font-semibold text-gray-900 dark:text-gray-100 mt-4 mb-1">
              🤔 Why students think this
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {item.whyStudentsThinkThis}
            </p>

            {/* Why it is wrong */}
            <p className="font-semibold text-gray-900 dark:text-gray-100 mt-4 mb-1">
              🚫 Why it is wrong
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {item.whyItIsWrong}
            </p>

            {/* Correct understanding */}
            <p className="font-semibold text-green-700 dark:text-green-300 mt-4 mb-1">
              ✅ Correct understanding
            </p>
            <p className="text-green-700 dark:text-green-300">
              {item.correctUnderstanding}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
