import { NextResponse } from "next/server";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function POST(req) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json(
        { error: "No image provided" },
        { status: 400 }
      );
    }

    // Check if API key exists
    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Food IQ",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `You are an expert at reading food product labels. Extract ONLY the ingredients list from this image.

Rules:
1. Look for the "Ingredients:" section on the food label
2. Extract the complete ingredients list exactly as written
3. If you can't find ingredients, say "NO_INGREDIENTS_FOUND"
4. Return ONLY the ingredients text, nothing else
5. Do not add any explanation or commentary
6. If the image is blurry or unreadable, say "IMAGE_UNCLEAR"

Extract the ingredients now:`
              },
              {
                type: "image_url",
                image_url: {
                  url: image
                }
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter API error:", errorText);
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const extractedText = data.choices[0]?.message?.content || "";

    // Check for error cases
    if (extractedText.includes("NO_INGREDIENTS_FOUND")) {
      return NextResponse.json({
        success: false,
        error: "Could not find ingredients list in this image. Please try a clearer photo of the ingredients section."
      });
    }

    if (extractedText.includes("IMAGE_UNCLEAR")) {
      return NextResponse.json({
        success: false,
        error: "The image is too blurry or unclear. Please take a clearer photo."
      });
    }

    return NextResponse.json({
      success: true,
      ingredients: extractedText.trim()
    });

  } catch (error) {
    console.error("Extract error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process image. Please try again." },
      { status: 500 }
    );
  }
}
