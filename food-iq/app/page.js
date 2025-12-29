"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ScanLine, MessageCircle, ArrowRight, Zap, Shield, Brain, Camera, Upload, X, Loader2, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/Toast";

const sampleProducts = [
  {
    name: "🍫 Chocolate Protein Bar",
    ingredients: "Milk protein isolate, cocoa mass, glucose syrup, emulsifier (soy lecithin), artificial flavor, sucralose",
    tag: "Fitness"
  },
  {
    name: "🥤 Diet Cola",
    ingredients: "Carbonated water, caramel color, phosphoric acid, aspartame, potassium benzoate, caffeine, acesulfame potassium",
    tag: "Beverage"
  },
  {
    name: "🍜 Instant Noodles",
    ingredients: "Wheat flour, palm oil, salt, monosodium glutamate (MSG), dehydrated vegetables, sugar, TBHQ (preservative), disodium inosinate",
    tag: "Quick meal"
  },
  {
    name: "🥣 Kids Cereal",
    ingredients: "Whole grain oats, sugar, corn starch, honey, salt, tripotassium phosphate, vitamin E, niacinamide, BHT for freshness, Red 40, Yellow 5",
    tag: "Breakfast"
  }
];

export default function Home() {
  const [text, setText] = useState("");
  const [isHovered, setIsHovered] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractError, setExtractError] = useState(null);
  const fileInputRef = useRef(null);
  const router = useRouter();
  const toast = useToast();

  const handleAnalyze = () => {
    if (!text.trim()) {
      toast.warning("Please enter some ingredients first");
      return;
    }
    localStorage.setItem("ingredients", text);
    toast.success("Analyzing ingredients...");
    router.push("/analyze");
  };

  const handleSampleClick = (ingredients) => {
    localStorage.setItem("ingredients", ingredients);
    toast.info("Loading sample product...");
    router.push("/analyze");
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      setExtractError("Please upload an image file");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size should be less than 10MB");
      setExtractError("Image size should be less than 10MB");
      return;
    }

    setExtractError(null);
    setIsExtracting(true);
    toast.info("Processing image...");

    // Create preview
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Image = event.target.result;
      setImagePreview(base64Image);

      try {
        const response = await fetch("/api/extract", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Image }),
        });

        const data = await response.json();

        if (data.success) {
          setText(data.ingredients);
          setInputMode("text"); // Switch to text mode to show extracted ingredients
          toast.success("Ingredients extracted successfully!");
        } else {
          setExtractError(data.error || "Failed to extract ingredients");
          toast.error(data.error || "Failed to extract ingredients");
        }
      } catch (error) {
        setExtractError("Failed to process image. Please try again.");
        toast.error("Failed to process image. Please try again.");
      } finally {
        setIsExtracting(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImagePreview(null);
    setExtractError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background with food image */}
      <div className="absolute inset-0 bg-[#1a1f2e]/75" />
      
      {/* Animated background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12 safe-area-top">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full tag-pill mb-4 sm:mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="breathe"
            >
              <Sparkles className="w-4 h-4 text-green-400" />
            </motion.div>
            <span className="text-sm font-medium text-green-300">AI-Powered Food Analysis</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 tracking-tight"
          >
            <span className="animated-gradient-text">Food IQ</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-2"
          >
            Smart insights for smarter eating
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto px-2"
          >
            Snap a photo of any ingredient label or paste the text. 
            I'll help you understand what's in it — in seconds.
          </motion.p>
        </motion.div>

        {/* Main Input Card - Simplified, Intent-First */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="premium-card rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="p-2 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex-shrink-0 icon-bounce shadow-lg shadow-green-500/20"
            >
              <ScanLine className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h2 className="font-semibold text-slate-100 text-sm sm:text-base">Just show me what's in it</h2>
              <p className="text-xs sm:text-sm text-slate-400">I'll figure out what you need to know</p>
            </div>
          </div>

          {/* Unified input - textarea with camera option */}
          <div className="relative">
            <textarea
              placeholder="Paste ingredients here, or tap the camera to snap a photo of the label..."
              className="w-full p-4 pr-14 rounded-xl border border-white/10 bg-slate-800/50 focus:bg-slate-800/70 focus:border-green-500/40 transition-all resize-none text-slate-100 placeholder:text-slate-500 focus:outline-none glow-input"
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            
            {/* Camera button - inline */}
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="hidden"
            />
            <motion.button
              onClick={() => fileInputRef.current?.click()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={isExtracting}
              className="absolute right-3 top-3 p-2.5 rounded-lg bg-slate-700/80 hover:bg-green-500/30 transition-all text-slate-400 hover:text-green-400 disabled:opacity-50"
              title="Take photo of ingredients"
            >
              {isExtracting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Camera className="w-5 h-5" />
              )}
            </motion.button>
          </div>

          {/* Image preview - shows below textarea when image is uploaded */}
          <AnimatePresence>
            {imagePreview && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3"
              >
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Uploaded ingredient label"
                    className="rounded-lg object-contain max-h-32 border border-white/10"
                  />
                  <button
                    onClick={clearImage}
                    className="absolute -top-2 -right-2 p-1.5 bg-red-500/90 rounded-full text-white hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                {text && !isExtracting && (
                  <div className="flex items-center gap-2 text-green-400 mt-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-xs">Ingredients extracted from image</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {extractError && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-sm text-red-400"
            >
              {extractError}
            </motion.p>
          )}

          <motion.button
            onClick={handleAnalyze}
            disabled={!text.trim() || isExtracting}
            whileHover={{ scale: text.trim() && !isExtracting ? 1.02 : 1 }}
            whileTap={{ scale: 0.98 }}
            className={`mt-4 w-full py-3.5 sm:py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all text-sm sm:text-base ripple ${
              text.trim() && !isExtracting
                ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-xl hover:shadow-green-500/30 cursor-pointer active:opacity-90 glow-button"
                : "bg-slate-700 cursor-not-allowed text-slate-500"
            }`}
          >
            <Brain className="w-5 h-5" />
            Tell me what I need to know
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Sample Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Zap className="w-4 h-4 text-orange-400" />
            </motion.div>
            <span className="text-xs sm:text-sm font-medium text-slate-400">Try a sample — see how it works</span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {sampleProducts.map((product, index) => (
              <motion.button
                key={product.name}
                onClick={() => handleSampleClick(product.ingredients)}
                onHoverStart={() => setIsHovered(index)}
                onHoverEnd={() => setIsHovered(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -4, transition: { duration: 0.1 } }}
                whileTap={{ scale: 0.98, transition: { duration: 0.05 } }}
                className="premium-card p-3 sm:p-4 rounded-xl text-left group cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-slate-200 group-hover:text-green-400 transition-colors text-sm sm:text-base block truncate">
                      {product.name}
                    </span>
                    <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/25">
                      {product.tag}
                    </span>
                  </div>
                  <motion.div
                    animate={isHovered === index ? { x: 4 } : { x: 0 }}
                    className="hidden sm:block"
                  >
                    <ArrowRight className={`w-4 h-4 transition-colors flex-shrink-0 ml-1 ${isHovered === index ? 'text-green-400' : 'text-slate-500'}`} />
                  </motion.div>
                </div>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2 hidden sm:block">
                  {product.ingredients.slice(0, 60)}...
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Features - AI-Native Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-6"
        >
          <motion.div 
            whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.1 } }}
            className="text-center p-3 sm:p-6 premium-card rounded-xl cursor-default group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/25 group-hover:shadow-green-500/40">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-base text-slate-200">I Infer Intent</h3>
            <p className="text-xs sm:text-sm text-slate-400 hidden sm:block">
              No forms — I figure out what you care about
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.1 } }}
            className="text-center p-3 sm:p-6 premium-card rounded-xl cursor-default group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover:shadow-orange-500/40">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-base text-slate-200">I Decide For You</h3>
            <p className="text-xs sm:text-sm text-slate-400 hidden sm:block">
              Not just info — clear recommendations
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.1 } }}
            className="text-center p-3 sm:p-6 premium-card rounded-xl cursor-default group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-500/25 group-hover:shadow-yellow-500/40">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-base text-slate-200">I'm Honest</h3>
            <p className="text-xs sm:text-sm text-slate-400 hidden sm:block">
              I tell you when I'm uncertain
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.1 } }}
            className="text-center p-3 sm:p-6 premium-card rounded-xl cursor-default group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-base text-slate-200">I'm Your Co-pilot</h3>
            <p className="text-xs sm:text-sm text-slate-400 hidden sm:block">
              Ask follow-ups, I'll guide you
            </p>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-slate-500 mt-8 sm:mt-12 px-4 safe-area-bottom"
        >
          Food IQ provides educational insights, not medical advice. Always consult professionals for health decisions.
        </motion.p>
      </div>
    </main>
  );
}
