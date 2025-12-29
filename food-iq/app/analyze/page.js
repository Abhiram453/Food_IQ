"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Brain,
  AlertTriangle,
  CheckCircle,
  XCircle,
  HelpCircle,
  Sparkles,
  MessageCircle,
  Send,
  Loader2,
  Lightbulb,
  Scale,
  ShieldAlert,
  Info
} from "lucide-react";

// Thinking animation component
function ThinkingAnimation() {
  const thoughts = [
    "Reading the ingredient list...",
    "Identifying key components...",
    "Checking for common concerns...",
    "Evaluating nutritional context...",
    "Considering your likely priorities...",
    "Forming a balanced perspective...",
  ];

  const [currentThought, setCurrentThought] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentThought((prev) => (prev + 1) % thoughts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="relative">
        {/* Outer glow ring */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -inset-4 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 blur-xl"
        />
        
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-xl shadow-green-500/30"
        >
          <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
        </motion.div>
        
        {/* Animated rings */}
        <motion.div 
          animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute inset-0 rounded-full border-2 border-green-400"
        />
        <motion.div 
          animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
          className="absolute inset-0 rounded-full border-2 border-green-400"
        />
      </div>

      <motion.p
        key={currentThought}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="mt-8 sm:mt-10 text-slate-300 text-base sm:text-lg text-center font-medium"
      >
        {thoughts[currentThought]}
      </motion.p>

      <div className="flex gap-2 mt-6">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-400"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}

// Verdict badge component
function VerdictBadge({ verdict }) {
  const config = {
    safe: {
      icon: CheckCircle,
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      text: "text-green-400",
      label: "Generally Fine",
    },
    caution: {
      icon: AlertTriangle,
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      text: "text-amber-400",
      label: "Some Considerations",
    },
    avoid: {
      icon: XCircle,
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      text: "text-red-400",
      label: "Worth Reconsidering",
    },
    mixed: {
      icon: Scale,
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
      text: "text-orange-400",
      label: "Mixed Picture",
    },
  };

  const c = config[verdict] || config.mixed;
  const Icon = c.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
      className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-2 rounded-full ${c.bg} ${c.border} border verdict-badge backdrop-blur-sm shadow-lg`}
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${c.text}`} />
      </motion.div>
      <span className={`font-semibold text-xs sm:text-sm ${c.text}`}>{c.label}</span>
    </motion.div>
  );
}

// Insight card component
function InsightCard({ icon: Icon, title, items, color = "purple", delay = 0 }) {
  const colors = {
    purple: "from-purple-500 to-indigo-500",
    amber: "from-amber-500 to-orange-500",
    emerald: "from-emerald-500 to-teal-500",
    blue: "from-blue-500 to-cyan-500",
  };

  if (!items || items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01, y: -2, transition: { duration: 0.1 } }}
      transition={{ delay }}
      className="premium-card rounded-xl sm:rounded-2xl p-4 sm:p-6"
    >
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <motion.div 
          whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.2 } }}
          className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-br ${colors[color]} shadow-lg`}
        >
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </motion.div>
        <h3 className="font-semibold text-slate-200 text-sm sm:text-base">{title}</h3>
      </div>

      <ul className="space-y-2 sm:space-y-3">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.1 + i * 0.1 }}
            className="flex items-start gap-3 text-slate-300"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br mt-2 flex-shrink-0" 
                  style={{ background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))` }} />
            <span className="text-sm leading-relaxed">{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

// Uncertainty indicator
function UncertaintyIndicator({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="premium-card rounded-xl sm:rounded-2xl p-4 sm:p-6"
    >
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="p-1.5 sm:p-2 rounded-lg bg-slate-700/80 shadow-inner"
        >
          <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
        </motion.div>
        <div>
          <h3 className="font-semibold text-slate-200 text-sm sm:text-base">What I'm less certain about</h3>
          <p className="text-xs text-slate-500 hidden sm:block">Transparency about limitations</p>
        </div>
      </div>

      <ul className="space-y-2">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="text-sm text-slate-300 flex items-start gap-2"
          >
            <Info className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

// Bottom line summary
function BottomLine({ text, intent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01, transition: { duration: 0.1 } }}
      transition={{ delay: 0.5 }}
      className="relative overflow-hidden bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-xl shadow-green-500/20"
    >
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative flex items-center gap-2 mb-2 sm:mb-3">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-green-200" />
        </motion.div>
        <h3 className="font-semibold text-sm sm:text-base">The bottom line</h3>
      </div>
      <p className="relative text-green-50 leading-relaxed text-sm sm:text-base">{text}</p>
      
      {intent && (
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-green-500/30">
          <p className="text-xs text-green-200">
            <span className="text-yellow-200">What I inferred you care about:</span> {intent}
          </p>
        </div>
      )}
    </motion.div>
  );
}

// Follow-up chat
function FollowUpChat({ onAsk, answer, isLoading }) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() && !isLoading) {
      onAsk(question);
      setQuestion("");
    }
  };

  const suggestions = [
    "Is this okay for daily use?",
    "What's the healthiest alternative?",
    "Are these ingredients suitable for kids?",
    "What should I watch out for?",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="premium-card rounded-xl sm:rounded-2xl p-4 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
        </motion.div>
        <h3 className="font-semibold text-slate-200 text-sm sm:text-base">Ask a follow-up</h3>
      </div>

      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
        {suggestions.map((s, i) => (
          <motion.button
            key={s}
            onClick={() => setQuestion(s)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.1, type: "tween", duration: 0.2 }}
            whileHover={{ scale: 1.05, y: -2, transition: { duration: 0.1 } }}
            whileTap={{ scale: 0.95, transition: { duration: 0.05 } }}
            className="text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-green-300 hover:border-green-500/30 hover:bg-white/10"
          >
            {s}
          </motion.button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-white/10 bg-slate-800/50 focus:border-green-500/40 transition-all text-sm sm:text-base text-slate-100 placeholder:text-slate-500 focus:outline-none glow-input"
          disabled={isLoading}
        />
        <motion.button
          type="submit"
          disabled={!question.trim() || isLoading}
          whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
          whileTap={{ scale: 0.95, transition: { duration: 0.05 } }}
          className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </motion.button>
      </form>

      <AnimatePresence>
        {answer && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: 10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 bg-green-500/10 rounded-xl border border-green-500/20 backdrop-blur-sm"
          >
            <p className="text-sm text-slate-200 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AnalyzePage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [followUpAnswer, setFollowUpAnswer] = useState("");
  const [followUpLoading, setFollowUpLoading] = useState(false);
  const [ingredients, setIngredients] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedIngredients = localStorage.getItem("ingredients");
    if (!storedIngredients) {
      router.push("/");
      return;
    }

    setIngredients(storedIngredients);

    const fetchAnalysis = async () => {
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ingredients: storedIngredients }),
        });

        if (!res.ok) throw new Error("Analysis failed");

        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Add slight delay for better UX
    setTimeout(fetchAnalysis, 1500);
  }, [router]);

  const handleFollowUp = async (question) => {
    setFollowUpLoading(true);
    setFollowUpAnswer("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients,
          followUp: question,
          context: data,
        }),
      });

      const json = await res.json();
      setFollowUpAnswer(json.followUpAnswer || json.bottomLine);
    } catch (err) {
      setFollowUpAnswer("Sorry, I couldn't process that question. Please try again.");
    } finally {
      setFollowUpLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-[#1a1f2e]/75" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <ThinkingAnimation />
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-[#1a1f2e]/75" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center p-8 relative z-10">
            <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-slate-200">Something went wrong</h2>
            <p className="text-slate-400 mb-4">{error}</p>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all"
            >
              Try again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-[#1a1f2e]/75" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-8 safe-area-top">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6 sm:mb-8 gap-2"
        >
          <motion.button
            onClick={() => router.push("/")}
            whileHover={{ x: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-1 sm:gap-2 text-slate-400 hover:text-green-400 transition-colors text-sm sm:text-base glass-btn px-3 py-2 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">New analysis</span>
            <span className="sm:hidden">Back</span>
          </motion.button>

          {data?.verdict && <VerdictBadge verdict={data.verdict} />}
        </motion.div>

        {/* Inferred Intent */}
        {data?.intent && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-8 premium-card p-4 rounded-xl"
          >
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-1 sm:mb-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
              </motion.div>
              <span>What I think you're wondering about</span>
            </div>
            <p className="text-lg sm:text-xl font-medium text-slate-200">{data.intent}</p>
          </motion.div>
        )}

        {/* Main Insights Grid */}
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          <InsightCard
            icon={Brain}
            title="What matters in this list"
            items={data?.whatMatters}
            color="purple"
            delay={0.1}
          />

          <InsightCard
            icon={ShieldAlert}
            title="Why it matters"
            items={data?.whyItMatters}
            color="amber"
            delay={0.2}
          />

          <UncertaintyIndicator items={data?.uncertainty} />

          {data?.bottomLine && (
            <BottomLine text={data.bottomLine} intent={data.intent} />
          )}
        </div>

        {/* Follow-up Chat */}
        <FollowUpChat
          onAsk={handleFollowUp}
          answer={followUpAnswer}
          isLoading={followUpLoading}
        />

        {/* Ingredients Reference */}
        <motion.details
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-4 sm:mt-6 premium-card rounded-xl p-3 sm:p-4 group"
        >
          <summary className="text-xs sm:text-sm text-slate-400 cursor-pointer hover:text-green-400 transition-colors flex items-center gap-2">
            <span className="group-open:rotate-90 transition-transform">▶</span>
            View original ingredients
          </summary>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed pl-4">{ingredients}</p>
        </motion.details>

        {/* Section divider */}
        <div className="section-divider" />

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-slate-500 mt-4 sm:mt-6 px-4 safe-area-bottom"
        >
          This is educational information, not medical advice. Consult professionals for health decisions.
        </motion.p>
      </div>
    </main>
  );
}
