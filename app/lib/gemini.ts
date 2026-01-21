import OpenAI from "openai";
import { buildExplanationPrompt } from "./prompts";
import { ExplanationResponse } from "./types";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000", // required by OpenRouter
    "X-Title": "AI Concept Explainer",        // app name
  },
});

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
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is missing");
  }

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

  // 🔍 TEMP DEBUG (remove later if you want)
  console.log("RAW AI RESPONSE:\n", text);

  let jsonString: string;

  try {
    jsonString = extractJSON(text);
  } catch (error) {
    console.error("JSON Extraction Failed. Full Response:\n", text);
    throw new Error("AI response did not contain valid JSON");
  }

  try {
    return JSON.parse(jsonString) as ExplanationResponse;
  } catch (error) {
    console.error("JSON Parse Error. Extracted JSON:\n", jsonString);
    throw new Error(
      "AI returned malformed JSON. Please try again."
    );
  }
}
