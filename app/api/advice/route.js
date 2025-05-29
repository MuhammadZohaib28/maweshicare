import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

export async function POST(request) {
  const { animalType, age, weight, healthIssues, feedingHabits, language } =
    await request.json();

  // Connect to MongoDB
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db("qurbani-care");
    const collection = db.collection("advice-requests");

    // Generate AI advice (using free Hugging Face inference API)
    const aiResponse = await generateAIAdvice({
      animalType,
      age,
      weight,
      healthIssues,
      feedingHabits,
      language,
    });

    // Store in database
    const document = {
      animalType,
      age,
      weight,
      healthIssues,
      feedingHabits,
      language,
      advice: aiResponse,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(document);

    return Response.json({
      success: true,
      id: result.insertedId,
      ...aiResponse,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  } finally {
    await client.close();
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const language = searchParams.get("language") || "en";

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db("qurbani-care");
    const collection = db.collection("advice-requests");

    const advice = await collection.findOne({
      _id: new ObjectId(id),
    });

    if (!advice) {
      return Response.json({ success: false, error: "Advice not found" });
    }

    // Return advice in requested language
    const response = {
      animalType: advice.animalType,
      age: advice.age,
      weight: advice.weight,
      generalTips:
        language === "ur"
          ? advice.advice.ur.generalTips
          : advice.advice.en.generalTips,
      feedingRecommendation:
        language === "ur"
          ? advice.advice.ur.feedingRecommendation
          : advice.advice.en.feedingRecommendation,
      healthCheck:
        language === "ur"
          ? advice.advice.ur.healthCheck
          : advice.advice.en.healthCheck,
      islamicGuidance:
        language === "ur"
          ? advice.advice.ur.islamicGuidance
          : advice.advice.en.islamicGuidance,
      healthIssuesAdvice: advice.healthIssues
        ? language === "ur"
          ? advice.advice.ur.healthIssuesAdvice
          : advice.advice.en.healthIssuesAdvice
        : null,
    };

    return Response.json({
      success: true,
      ...response,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  } finally {
    await client.close();
  }
}

async function generateAIAdvice({
  animalType,
  age,
  weight,
  healthIssues,
  feedingHabits,
  language,
}) {
  // Use Hugging Face Inference API (free tier)
  const MODEL_ENDPOINT =
    "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";

  try {
    // Generate English advice
    const promptEn = `
      As a veterinary and Islamic guidance assistant, provide advice for a ${age}-month-old ${animalType} 
      weighing ${weight}kg with ${feedingHabits} feeding habits${
      healthIssues ? " and these health issues: " + healthIssues : ""
    }.
      
      Provide:
      1. 4 general care tips
      2. Feeding recommendation
      3. Health check advice
      4. Islamic Qurbani guidelines
      ${
        healthIssues ? "5. Specific advice for the mentioned health issues" : ""
      }
      
      Use simple language and bullet points.
    `;

    const responseEn = await fetch(MODEL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: promptEn }),
    });

    // Check for errors before parsing
    if (!responseEn.ok) {
      throw new Error(
        `English AI request failed: ${
          responseEn.status
        } ${await responseEn.text()}`
      );
    }

    const resultEn = await responseEn.json();

    const englishAdvice = parseAIResponse(resultEn.generated_text);

    // Generate Urdu advice (Roman)
    const promptUr = `
      As a veterinary and Islamic guidance assistant, provide advice in Roman Urdu for a ${age}-month-old ${animalType} 
      weighing ${weight}kg with ${feedingHabits} feeding habits${
      healthIssues ? " and these health issues: " + healthIssues : ""
    }.
      
      Provide in Roman Urdu:
      1. 4 general care tips
      2. Feeding recommendation
      3. Health check advice
      4. Islamic Qurbani guidelines
      ${
        healthIssues ? "5. Specific advice for the mentioned health issues" : ""
      }
      
      Use simple language and bullet points.
    `;

    const responseUr = await fetch(MODEL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: promptUr }),
    });

    if (!responseUr.ok) {
      throw new Error(
        `Urdu AI request failed: ${
          responseUr.status
        } ${await responseUr.text()}`
      );
    }

    const resultUr = await responseUr.json();

    const urduAdvice = parseAIResponse(resultUr.generated_text);

    return {
      en: englishAdvice,
      ur: urduAdvice,
    };
  } catch (error) {
    console.error("AI generation error:", error);
    return getFallbackAdvice(
      animalType,
      age,
      weight,
      healthIssues,
      feedingHabits,
      language
    );
  }
}

function parseAIResponse(text) {
  // Simple parsing logic - in a real app you'd want more robust parsing
  const sections = text.split("\n").filter((line) => line.trim());

  return {
    generalTips: sections.slice(0, 4),
    feedingRecommendation: sections[4] || "",
    healthCheck: sections[5] || "",
    islamicGuidance: sections[6] || "",
    healthIssuesAdvice: sections[7] || "",
  };
}

function getFallbackAdvice(
  animalType,
  age,
  weight,
  healthIssues,
  feedingHabits,
  language
) {
  // Fallback advice if AI fails
  const en = {
    generalTips: [
      "Ensure clean drinking water is always available",
      "Provide shaded resting area",
      "Avoid stressful situations before Qurbani",
      "Monitor for any signs of illness daily",
    ],
    feedingRecommendation:
      weight > 50
        ? "Increase green fodder to 5kg per day"
        : "Maintain 3kg of green fodder daily",
    healthCheck:
      age < 12
        ? "Ensure all vaccinations are up to date"
        : "Check teeth and hoof condition regularly",
    islamicGuidance:
      "The animal should be healthy, free from defects, and meet the age requirements for Qurbani.",
    healthIssuesAdvice: healthIssues
      ? "Consult a veterinarian about these issues before Qurbani"
      : "",
  };

  const ur = {
    generalTips: [
      "Saaf pani hamesha mojud rakhen",
      "Chhany ka intezam karen",
      "Qurbani se pehle tanao se bachen",
      "Rozana sehat ki alamat check karen",
    ],
    feedingRecommendation:
      weight > 50 ? "Hari charah 5kg rozana den" : "Hari charah 3kg rozana den",
    healthCheck:
      age < 12
        ? "Tamam vaccinations mukammal karen"
        : "Danton aur khuuron ka rozana inspection karen",
    islamicGuidance:
      "Janwar sehatmand hon, kisi kami ke baghair ho, aur Qurbani ke liye umar ka sharra puri karta ho",
    healthIssuesAdvice: healthIssues
      ? "In masail ke bare mein vet se mashwara karen"
      : "",
  };

  return language === "ur" ? { en, ur } : { en, ur };
}
