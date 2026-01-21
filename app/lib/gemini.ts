import OpenAI from "openai";
import { buildExplanationPrompt } from "./prompts";
import { ExplanationResponse } from "./types";

/**
 * Safely extract the first valid JSON object from LLM output
 */
function extractJSON(text: string): string {
  // Remove markdown code fences if present
  const cleaned = text.replace(/```json|```/g, "").trim();

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("No valid JSON object found in AI response");
  }

  return cleaned.slice(firstBrace, lastBrace + 1);
}

export async function generateExplanation(
  topic: string,
  difficulty: "basic" | "advanced",
  subject: "Physics" | "Chemistry" | "Biology"
): Promise<ExplanationResponse> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is missing");
  }

  // ✅ IMPORTANT: Create OpenAI client at RUNTIME (not build time)
  const client = new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": "https://your-app.pages.dev", // update after deploy
      "X-Title": "AI Concept Explainer",
    },
  });

  const prompt = buildExplanationPrompt(topic, difficulty, subject);

  const response = await client.chat.completions.create({
    model: "openai/gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.3, // lower = more JSON-stable
  });

  const text = response.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error("No response generated from OpenRouter");
  }

  // 🔍 Optional debug (remove later)
  console.log("RAW AI RESPONSE:\n", text);

  let jsonString: string;

  try {
    jsonString = extractJSON(text);
  } catch {
    console.error("JSON Extraction Failed. Full Response:\n", text);
    throw new Error("AI response did not contain valid JSON");
  }

  try {
    return JSON.parse(jsonString) as ExplanationResponse;
  } catch {
    console.error("JSON Parse Error. Extracted JSON:\n", jsonString);
    throw new Error("AI returned malformed JSON. Please try again.");
  }
}
