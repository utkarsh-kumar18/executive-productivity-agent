import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function askGemini(prompt) {
  return await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
    config: {
      maxOutputTokens: 800,
    },
  });
}

export async function POST(request) {
  try {
    const { question, actions } = await request.json();

    if (!question?.trim()) {
      return Response.json(
        { error: "Question is required." },
        { status: 400 }
      );
    }

    const prompt = `
You are an executive productivity assistant for Arjun Malhotra, VP Sales.

Answer the user's question using only the supplied action data.

Question:
${question}

Action data:
${JSON.stringify(actions)}

Give only the final answer.

For commitment questions, identify the commitment, person, deadline, and status when available.

For today's action questions, identify the actions due today that still require action.

For waiting-on-others questions, identify only items explicitly waiting on someone else.

For ownership questions, use the owner field exactly. If the owner is null, say "Ownership is unclear."

Never guess or invent information.

Give a complete answer in 2 to 4 sentences.
Do not repeat the instructions.
Do not explain your reasoning.
Do not output JSON.
`;

    let response;

    try {
      response = await askGemini(prompt);
    } catch (error) {
      const status = error?.status || error?.code;

      if (status === 503 || status === 429) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        response = await askGemini(prompt);
      } else {
        throw error;
      }
    }

    const answer = response.text?.trim();

    if (!answer) {
      return Response.json(
        { error: "Gemini returned an empty response. Please try again." },
        { status: 502 }
      );
    }

    return Response.json({ answer });
  } catch (error) {
    console.error("Gemini API error:", error);

    return Response.json(
      {
        error:
          "Gemini is temporarily busy. Please try the question again.",
      },
      { status: 503 }
    );
  }
}