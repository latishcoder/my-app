'use client';

import katex from 'katex';
import 'katex/dist/katex.min.css';

export default function MathRenderer({ content }: { content: string }) {
  if (!content) return null;

  const html = content.replace(/\$\$(.*?)\$\$/gs, (_, math) =>
    katex.renderToString(math, {
      throwOnError: false,
      displayMode: true,
    })
  );

  return (
    <span
      className="text-gray-900 leading-relaxed"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
