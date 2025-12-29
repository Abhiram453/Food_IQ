import { NextResponse } from "next/server";

// OpenRouter API configuration
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

// Demo mode responses - realistic AI-like responses for showcasing
const demoResponses = {
  proteinBar: {
    verdict: "caution",
    intent: "You're likely checking if this protein bar is a healthy choice for regular consumption",
    whatMatters: [
      "Sucralose (artificial sweetener) - commonly debated ingredient in fitness products",
      "Glucose syrup - adds quick sugar despite being a 'protein' product",
      "Soy lecithin - generally safe emulsifier, but relevant if you have soy sensitivity",
      "Artificial flavor - vague term that masks what's actually added"
    ],
    whyItMatters: [
      "For occasional post-workout use, this is fine for most people",
      "Daily consumption of artificial sweeteners like sucralose is where research gets murky",
      "The glucose syrup means this isn't as 'clean' as marketing might suggest",
      "If you're eating these daily, the artificial ingredients add up"
    ],
    uncertainty: [
      "Long-term effects of sucralose are still debated in research",
      "Individual responses to artificial sweeteners vary significantly"
    ],
    bottomLine: "Fine as an occasional convenience, but probably not ideal as a daily staple. If you're eating these regularly, consider cleaner alternatives with fewer artificial ingredients."
  },
  dietCola: {
    verdict: "caution",
    intent: "You want to know if diet soda is actually a healthier choice than regular soda",
    whatMatters: [
      "Aspartame & Acesulfame K - two artificial sweeteners working together",
      "Phosphoric acid - can affect calcium absorption over time",
      "Caramel color (E150d) - has been questioned in some studies",
      "Caffeine - stimulant that can affect sleep and anxiety"
    ],
    whyItMatters: [
      "Zero calories sounds great, but artificial sweeteners may still trigger insulin response in some people",
      "Regular consumption of phosphoric acid has been linked to lower bone density",
      "The caffeine content can contribute to dependency and sleep issues",
      "Some research suggests diet sodas may paradoxically increase sweet cravings"
    ],
    uncertainty: [
      "Aspartame safety is heavily debated - FDA says safe, some researchers disagree",
      "Individual metabolic responses to artificial sweeteners vary widely"
    ],
    bottomLine: "Better than regular soda for blood sugar, but 'less bad' isn't the same as 'good.' Water or sparkling water would be the actually healthy choice. Occasional consumption is fine for most people."
  },
  instantNoodles: {
    verdict: "caution",
    intent: "You're wondering if instant noodles are okay as a quick meal option",
    whatMatters: [
      "MSG (Monosodium glutamate) - flavor enhancer that's controversial despite being common",
      "TBHQ (preservative) - synthetic antioxidant with intake limits",
      "Palm oil - high in saturated fat, also has environmental concerns",
      "Very high sodium content from salt and flavor enhancers combined"
    ],
    whyItMatters: [
      "One serving can contain 50-80% of your daily recommended sodium",
      "TBHQ is considered safe in small amounts, but instant noodles often push limits",
      "Palm oil makes the noodles shelf-stable but adds saturated fat",
      "MSG is generally safe but can cause reactions in sensitive individuals"
    ],
    uncertainty: [
      "MSG sensitivity is real for some people but overstated as a general concern",
      "Occasional consumption vs regular meals have very different health implications"
    ],
    bottomLine: "As an occasional convenience food, it's fine. As a regular meal, the sodium and processed ingredients become concerning. Adding vegetables and protein can make it more balanced."
  },
  kidsCereal: {
    verdict: "caution",
    intent: "You're checking if this cereal is actually healthy for your kids despite the marketing",
    whatMatters: [
      "Red 40, Yellow 5, Blue 1 - artificial colors linked to hyperactivity in some children",
      "Sugar + brown sugar syrup + honey - three forms of added sugar",
      "BHT (preservative) - synthetic antioxidant that some parents avoid",
      "Whole grain oats - the one genuinely nutritious ingredient"
    ],
    whyItMatters: [
      "Multiple artificial colors are concerning - some countries have banned or require warnings for these",
      "The sugar content is likely 30-40% of the product despite 'whole grain' marketing",
      "BHT is FDA-approved but banned in some countries as a precaution",
      "Kids consuming artificial colors regularly may show behavioral changes"
    ],
    uncertainty: [
      "Artificial color and behavior link is observed but mechanism isn't fully understood",
      "Sugar sensitivity varies significantly between children"
    ],
    bottomLine: "The 'whole grain' marketing hides a lot of sugar and artificial colors. For daily breakfast, there are much better options. This is more of a treat than a healthy breakfast choice."
  },
  default: {
    verdict: "mixed",
    intent: "You want to understand what's actually in this product and whether it's a good choice",
    whatMatters: [
      "Scanning for common additives and preservatives in your ingredient list",
      "Looking for artificial colors, flavors, or sweeteners",
      "Checking for highly processed ingredients vs whole foods",
      "Identifying potential allergens or sensitivities"
    ],
    whyItMatters: [
      "Processed ingredients aren't always bad, but quantity and frequency matter",
      "Some additives are well-studied and safe, others have mixed research",
      "Context matters - occasional treats vs daily staples have different standards",
      "Individual sensitivities can make 'safe' ingredients problematic for some"
    ],
    uncertainty: [
      "Without more specific ingredients, I'm providing general guidance",
      "Individual health conditions and goals affect what's 'right' for you"
    ],
    bottomLine: "Most packaged foods have some processed ingredients. The key questions are: how often will you eat this, and are there cleaner alternatives that fit your lifestyle? Occasional consumption of most things is fine for healthy adults."
  }
};

// Function to detect which demo response to use based on ingredients
function getDemoResponse(ingredients) {
  const lower = ingredients.toLowerCase();
  
  if (lower.includes("protein") || lower.includes("sucralose") || (lower.includes("milk") && lower.includes("cocoa"))) {
    return demoResponses.proteinBar;
  }
  if (lower.includes("aspartame") || lower.includes("phosphoric acid") || lower.includes("diet") || lower.includes("cola") || lower.includes("carbonated water")) {
    return demoResponses.dietCola;
  }
  if (lower.includes("msg") || lower.includes("monosodium") || lower.includes("tbhq") || lower.includes("noodle") || lower.includes("ramen")) {
    return demoResponses.instantNoodles;
  }
  if (lower.includes("red 40") || lower.includes("yellow 5") || lower.includes("blue 1") || lower.includes("cereal") || lower.includes("bht")) {
    return demoResponses.kidsCereal;
  }
  
  return demoResponses.default;
}

// Demo follow-up responses
function getDemoFollowUp(question) {
  const lower = question.toLowerCase();
  
  if (lower.includes("daily") || lower.includes("every day") || lower.includes("regularly")) {
    return "For daily consumption, I'd be more cautious. The occasional processed ingredient is fine, but daily exposure to artificial additives, excess sodium, or sugar adds up. Consider rotating with cleaner alternatives or saving this as a sometimes-food rather than a staple.";
  }
  if (lower.includes("kids") || lower.includes("children") || lower.includes("child")) {
    return "Children are more sensitive to artificial colors and excess sugar. Their smaller bodies mean additives have proportionally larger effects. I'd look for products without artificial colors (Red 40, Yellow 5, Blue 1) and with less added sugar for regular consumption.";
  }
  if (lower.includes("alternative") || lower.includes("better") || lower.includes("instead") || lower.includes("healthier")) {
    return "Look for products with shorter ingredient lists featuring recognizable whole foods. Fewer artificial colors, flavors, and preservatives is generally better. 'Organic' doesn't automatically mean healthier, but it often correlates with simpler ingredients.";
  }
  if (lower.includes("safe") || lower.includes("dangerous") || lower.includes("harmful")) {
    return "Most ingredients in packaged foods are FDA-approved and considered safe in normal quantities. The concern is usually cumulative exposure from multiple processed foods daily, not any single product. Occasional consumption is fine for most healthy adults.";
  }
  
  return "That's a thoughtful question. The key is context - frequency of consumption, your individual health goals, and whether there are simpler alternatives that work for your lifestyle. Most things are fine in moderation for healthy adults.";
}

const systemPrompt = `You are Food IQ — an AI-native consumer health co-pilot. Your role is to help people make sense of food ingredients at the moment decisions matter.

## Your Philosophy
- You are NOT a database lookup tool
- You are NOT here to list ingredients or dump data
- You ARE a thoughtful co-pilot who does cognitive work on the user's behalf
- You INFER what the user likely cares about without asking
- You REASON about ingredients, not just identify them
- You COMMUNICATE uncertainty honestly and intuitively

## How You Think
1. First, infer the user's likely intent (health-conscious parent? fitness enthusiast? allergy concerned?)
2. Identify which 2-4 ingredients actually MATTER in this context
3. Explain WHY they matter in simple, human terms
4. Be honest about what's uncertain or context-dependent
5. Give a clear, decision-focused bottom line

## Your Tone
- Calm and reassuring, never alarmist
- Human and conversational, not clinical
- Honest about limitations
- Decisive but not preachy

## What You Avoid
- Medical claims or diagnoses
- Absolute statements about health
- Fear-mongering about ingredients
- Overwhelming the user with information
- Being preachy or judgmental about food choices`;

const analysisPrompt = (ingredients) => `Analyze these ingredients and help me decide:

"${ingredients}"

Think through this step by step:
1. What kind of product is this likely to be?
2. What might someone asking about this care about?
3. Which ingredients are worth discussing and why?
4. What's uncertain or context-dependent?
5. What's the honest bottom line?

Respond with ONLY valid JSON in this exact format:
{
  "verdict": "safe" | "caution" | "mixed" | "avoid",
  "intent": "A single sentence describing what you inferred the user likely cares about",
  "whatMatters": [
    "2-4 bullet points about which specific ingredients matter and deserve attention",
    "Focus on what's actually noteworthy, not everything"
  ],
  "whyItMatters": [
    "2-4 bullet points explaining WHY these ingredients matter",
    "Use simple language, explain the tradeoffs",
    "Be specific about context (daily use vs occasional, etc.)"
  ],
  "uncertainty": [
    "1-2 honest acknowledgments of what you're less certain about",
    "Or where individual variation matters"
  ],
  "bottomLine": "A 1-2 sentence honest summary that helps them decide. Be direct but not preachy."
}`;

const followUpPrompt = (ingredients, context, question) => `The user previously asked about these ingredients:
"${ingredients}"

Your previous analysis concluded:
- Verdict: ${context?.verdict}
- Bottom line: ${context?.bottomLine}

Now they're asking a follow-up question:
"${question}"

Respond naturally and helpfully. Be concise (2-4 sentences). Don't repeat your previous analysis unless directly relevant. Focus on answering their specific question.

Respond with ONLY valid JSON:
{
  "followUpAnswer": "Your direct, helpful response to their question"
}`;

export async function POST(req) {
  // Store body data for potential fallback use
  let ingredients, followUp, context;
  
  try {
    const body = await req.json();
    ingredients = body.ingredients;
    followUp = body.followUp;
    context = body.context;

    if (!ingredients) {
      return NextResponse.json(
        { error: "No ingredients provided" },
        { status: 400 }
      );
    }

    const isFollowUp = !!followUp;
    const useDemo = !process.env.OPENROUTER_API_KEY || process.env.USE_DEMO === "true";

    // DEMO MODE - Use pre-built intelligent responses
    if (useDemo) {
      // Simulate AI thinking time for realistic UX
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
      
      if (isFollowUp) {
        return NextResponse.json({
          followUpAnswer: getDemoFollowUp(followUp)
        });
      }
      
      return NextResponse.json(getDemoResponse(ingredients));
    }

    // LIVE API MODE - Use OpenRouter
    const prompt = isFollowUp
      ? `${systemPrompt}\n\n${followUpPrompt(ingredients, context, followUp)}`
      : `${systemPrompt}\n\n${analysisPrompt(ingredients)}`;

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
          { role: "user", content: prompt }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const raw = data.choices[0]?.message?.content || "";

    // Clean the response - remove markdown code blocks if present
    let cleanedRaw = raw.trim();
    if (cleanedRaw.startsWith("```json")) {
      cleanedRaw = cleanedRaw.slice(7);
    } else if (cleanedRaw.startsWith("```")) {
      cleanedRaw = cleanedRaw.slice(3);
    }
    if (cleanedRaw.endsWith("```")) {
      cleanedRaw = cleanedRaw.slice(0, -3);
    }
    cleanedRaw = cleanedRaw.trim();

    const parsed = JSON.parse(cleanedRaw);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Analysis error:", error);
    
    // Fallback to demo mode on API error
    if (followUp) {
      return NextResponse.json({
        followUpAnswer: getDemoFollowUp(followUp)
      });
    }
    
    if (ingredients) {
      return NextResponse.json(getDemoResponse(ingredients));
    }
    
    // Final fallback
    return NextResponse.json({
      verdict: "mixed",
      intent: "Understanding what's in this product",
      whatMatters: [
        "Analyzing the ingredients you provided",
        "Looking for noteworthy additives or concerns"
      ],
      whyItMatters: [
        "Context matters - how often you consume this product",
        "Individual health goals affect what's 'right' for you"
      ],
      uncertainty: [
        "Some ingredients have mixed research findings"
      ],
      bottomLine: "Most packaged foods are fine occasionally. Consider frequency of consumption and whether cleaner alternatives fit your lifestyle."
    }, { status: 200 });
  }
}
