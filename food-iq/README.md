# Food IQ — AI-Native Ingredient Co-pilot

<div align="center">
  <img src="https://img.shields.io/badge/AI-Native-purple?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge" />
  <img src="https://img.shields.io/badge/GPT--4o--mini-Powered-green?style=for-the-badge" />
</div>

<br />

<div align="center">
  <strong>What does a consumer health experience look like when AI is the interface, not a feature?</strong>
</div>

<br />

## 🎯 The Problem

Food labels are optimized for regulatory compliance, not human understanding. Consumers face:

- Long ingredient lists with unfamiliar chemical names
- Conflicting or evolving health guidance
- Existing solutions that surface raw data instead of insights
- High-friction manual input and lookup tools

**People are left uncertain at the exact moment they need to make a decision.**

## 💡 Our Solution

Food IQ is an **AI-native experience** that reimagines how consumers understand product ingredients.

Instead of building another database browser, we built an **intelligent co-pilot** that:

### ✨ Intent-First, Not Filter-First
- Users paste ingredients — no forms, no filters, no settings
- AI infers what the user likely cares about automatically
- Adapts reasoning based on inferred context

### 🧠 Reasoning, Not Listing
- Explains **why** ingredients matter, not just what they are
- Identifies 2-4 key points that actually deserve attention
- Provides decision-focused insights, not data dumps

### ⚖️ Honest About Uncertainty
- Clearly communicates what's uncertain
- Acknowledges when context matters
- Never fear-mongers or makes absolute claims

### 💬 Conversational Follow-ups
- Natural follow-up questions without re-explaining
- Continues the conversation intelligently
- Reduces cognitive load at every step

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/food-iq.git
cd food-iq

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your OpenAI API key to .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🔧 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **AI**: OpenAI GPT-4o-mini
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📁 Project Structure

```
food-iq/
├── app/
│   ├── page.js              # Landing page with input
│   ├── analyze/page.js      # AI response screen
│   ├── api/analyze/route.js # AI reasoning endpoint
│   ├── globals.css          # Styles & animations
│   └── layout.js            # App layout
├── components/              # Reusable UI components
├── data/
│   └── sampleProducts.js    # Sample ingredient lists
├── prompts/
│   └── reasoningPrompt.js   # AI prompt engineering
└── public/                  # Static assets
```

## 🎨 Design Philosophy

This project follows an **AI-native design paradigm**:

1. **User effort is minimized** — AI does the cognitive work
2. **Intent is inferred** — no explicit configuration required
3. **Output is reasoning** — not raw data or lists
4. **Uncertainty is transparent** — honest about limitations
5. **Interaction is conversational** — natural follow-ups

## 🏆 Hackathon Criteria Alignment

### AI-Native Experience (50%)
- ✅ Intelligent co-pilot that infers user intent
- ✅ No forms, filters, or explicit settings
- ✅ Reduces cognitive effort at decision time
- ✅ Smooth, animated thinking states

### Reasoning and Explainability (30%)
- ✅ Conclusions grounded in clear logic
- ✅ Uncertainty communicated honestly
- ✅ AI explains "why" not just "what"
- ✅ Context-aware responses

### Technical Execution (20%)
- ✅ Clean Next.js architecture
- ✅ Thoughtful prompt engineering
- ✅ Graceful error handling
- ✅ Responsive design

## 📝 Environment Variables

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | Your OpenAI API key |

## 🎬 Demo Flow

1. **Landing**: User sees a clean interface with clear value proposition
2. **Input**: Paste ingredients or select a sample product
3. **Thinking**: Beautiful animation while AI reasons
4. **Insight**: Structured response with intent, reasoning, and bottom line
5. **Follow-up**: Natural conversation continues

## 🙏 Acknowledgments

Built for the **Code To Innovate** hackathon — "Designing AI-Native Consumer Health Experiences"

---

<div align="center">
  <strong>Food IQ provides educational insights, not medical advice.</strong>
  <br />
  <em>Always consult professionals for health decisions.</em>
</div>
