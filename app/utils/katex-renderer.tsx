'use client';

import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
  content: string;
}

export default function MathRenderer({ content }: MathRendererProps) {
  if (!content) return null;

  // Split text by LaTeX blocks ($$ ... $$) without using the `s` flag
  const parts = content.split(/\$\$([\s\S]+?)\$\$/g);

  return (
    <span className="text-gray-900 leading-relaxed">
      {parts.map((part, index) => {
        // Even index → normal text
        if (index % 2 === 0) {
          return <span key={index}>{part}</span>;
        }

        // Odd index → LaTeX math
        try {
          const html = katex.renderToString(part, {
            throwOnError: false,
            displayMode: true,
          });

          return (
            <span
              key={index}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch {
          // Fallback if KaTeX fails
          return (
            <span key={index} className="text-red-600">
              $$ {part} $$
            </span>
          );
        }
      })}
    </span>
  );
}
