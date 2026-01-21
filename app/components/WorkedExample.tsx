import MathRenderer from "@/app/utils/katex-renderer";

interface WorkedExample {
  problem: string;
  solution: {
    given: string[];
    toFind: string;
    steps: string[];
    answer: string;
  };
}

interface WorkedExampleProps {
  example: WorkedExample;
  subject: "Physics" | "Chemistry" | "Biology";
}

export default function WorkedExample({
  example,
  subject,
}: WorkedExampleProps) {
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
        🧮 Worked Example
      </h2>

      {/* Problem statement */}
      <div className="text-gray-800 dark:text-gray-200 leading-relaxed">
        <MathRenderer content={example.problem} />
      </div>

      {/* Given */}
      <div className="mt-4">
        <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Given
        </p>
        <ul className="list-disc ml-6 space-y-1 text-gray-800 dark:text-gray-200">
          {example.solution.given.map((item, index) => (
            <li key={index}>
              <MathRenderer content={item} />
            </li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div className="mt-4">
        <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Solution Steps
        </p>
        <ol className="list-decimal ml-6 space-y-2 text-gray-800 dark:text-gray-200">
          {example.solution.steps.map((step, index) => (
            <li key={index}>
              <MathRenderer content={step} />
            </li>
          ))}
        </ol>
      </div>

      {/* Final Answer */}
      <div
        className="
          mt-4 p-4 rounded-lg
          bg-green-50 dark:bg-green-900/30
          text-green-900 dark:text-green-200
          font-semibold
        "
      >
        <MathRenderer content={example.solution.answer} />
      </div>
    </section>
  );
}
