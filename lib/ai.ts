import OpenAI from "openai";
import { getCachedData, cacheData } from "@/lib/redis";

// Initialize OpenAI client with latest SDK
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate an astrological response based on the module, question, and birth details
export async function generateAstrologyResponse(
  module: string,
  question: string,
  birthDetails: {
    name?: string;
    birthDate?: string;
    birthTime?: string;
    birthPlace?: string;
    gender?: string;
  }
) {
  // Create a cache key based on the input parameters
  const cacheKey = `astrology:${module}:${question}:${JSON.stringify(
    birthDetails
  )}`;

  // Check if the response is cached
  const cachedResponse = await getCachedData<string>(cacheKey);

  if (cachedResponse) {
    return cachedResponse;
  }

  // Create a system prompt based on the module
  let systemPrompt =
    "You are an expert astrologer specializing in Vedic astrology (Jyotish).";

  switch (module) {
    case "kundli":
      systemPrompt +=
        " You analyze birth charts (kundli) to provide insights about a person's life path, personality, and potential.";
      break;
    case "relationship":
      systemPrompt +=
        " You specialize in relationship astrology, providing insights about interpersonal dynamics, compatibility, and relationship patterns.";
      break;
    case "career":
      systemPrompt +=
        " You focus on career astrology, offering guidance on professional paths, timing for career moves, and vocational aptitudes.";
      break;
    case "compatibility":
      systemPrompt +=
        " You are an expert in matchmaking and compatibility analysis, assessing how two individuals' charts interact.";
      break;
    case "business":
      systemPrompt +=
        " You specialize in business astrology, providing insights on timing for business decisions, partnerships, and financial matters.";
      break;
    case "gemstone":
      systemPrompt +=
        " You are knowledgeable about astrological gemstones (ratnas) and their effects based on planetary positions in a birth chart.";
      break;
  }

  systemPrompt +=
    " Provide culturally relevant guidance based on traditional Indian astrology principles.";

  // Format birth details for the prompt
  const birthDetailsText = birthDetails
    ? `Name: ${birthDetails.name || "Not provided"}, Date of Birth: ${
        birthDetails.birthDate || "Not provided"
      }, Time of Birth: ${
        birthDetails.birthTime || "Not provided"
      }, Place of Birth: ${
        birthDetails.birthPlace || "Not provided"
      }, Gender: ${birthDetails.gender || "Not provided"}`
    : "Birth details not provided";

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Birth Details: ${birthDetailsText}\n\nQuestion: ${question}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const responseText =
      response.choices[0].message.content || "Unable to generate a response.";

    // Cache the response for 1 hour
    await cacheData(cacheKey, responseText, 60 * 60);

    return responseText;
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "I apologize, but I am unable to provide an astrological reading at this moment. Please try again later.";
  }
}
