export function buildExplanationPrompt(
  topic: string,
  difficulty: "basic" | "advanced",
  subject: "Physics" | "Chemistry" | "Biology"
): string {
  return `
SYSTEM ROLE:
You are an expert JEE/NEET ${subject} teacher and a strict JSON generator.

TASK:
Explain the topic "${topic}" for ${subject} students at a ${
    difficulty === "advanced"
      ? "JEE/NEET advanced exam-oriented level with deeper reasoning, formulas, and exam insights"
      : "basic intuitive level using simple language, clear intuition, and everyday analogies"
  }.

Your goal is to build strong conceptual understanding and correct common student misconceptions.

========================
ABSOLUTE OUTPUT RULES
========================
- Output MUST be valid JSON
- Output MUST start with '{' and end with '}'
- Do NOT include markdown
- Do NOT include headings, notes, or explanations outside JSON
- Do NOT wrap JSON in code fences
- If you cannot comply, return an empty JSON object: {}

Use $$ for LaTeX math expressions  
Use double backslashes in LaTeX (e.g., \\\\frac{1}{2})

========================
REQUIRED JSON SCHEMA
========================

{
  "explanation": {
    "introduction": "",
    "keyPoints": [],
    "summary": ""
  },
  "workedExample": {
    "problem": "",
    "solution": {
      "given": [],
      "toFind": "",
      "steps": [],
      "answer": ""
    }
  },
  "misconceptions": [
    {
      "misconception": "",
      "whyStudentsThinkThis": "",
      "whyItIsWrong": "",
      "correctUnderstanding": ""
    }
  ],
  "mcqs": [
    {
      "question": "",
      "options": {
        "A": "",
        "B": "",
        "C": "",
        "D": ""
      },
      "correctAnswer": "A",
      "explanation": ""
    }
  ]
}

========================
STRICT CONTENT RULES
========================
- Create EXACTLY 3 MCQs
- MCQs must test conceptual understanding (not memorization)
- Clearly explain why wrong options are incorrect
- Add 2–3 common misconceptions related to the topic
- Use ${subject}-appropriate terminology and examples
- Keep language suitable for Class 11–12 students
- If unsure about any field, leave it empty instead of breaking JSON

========================
FINAL SELF-CHECK
========================
Before responding, verify:
1. Response starts with '{'
2. Response ends with '}'
3. JSON is syntactically valid
4. No text exists outside the JSON object
`;
}
