/**
 * Sample products for demonstrating Food IQ analysis
 * 
 * These represent common product categories with varying
 * levels of complexity for the AI to reason about.
 */

export const sampleProducts = [
  {
    id: "protein-bar",
    name: "🍫 Chocolate Protein Bar",
    category: "Fitness",
    ingredients: "Milk protein isolate, cocoa mass, glucose syrup, emulsifier (soy lecithin), artificial flavor, sucralose, maltitol, palm kernel oil, natural flavors, soy protein isolate",
    description: "Popular fitness snack"
  },
  {
    id: "diet-soda",
    name: "🥤 Diet Cola",
    category: "Beverage",
    ingredients: "Carbonated water, caramel color (E150d), phosphoric acid, aspartame, potassium benzoate (preservative), caffeine, acesulfame potassium, natural flavors, citric acid",
    description: "Zero-calorie soft drink"
  },
  {
    id: "instant-noodles",
    name: "🍜 Instant Ramen",
    category: "Quick Meal",
    ingredients: "Enriched wheat flour (wheat flour, niacin, iron, thiamine, riboflavin, folic acid), palm oil, salt, monosodium glutamate, dehydrated vegetables (onion, garlic, chives), sugar, soy sauce powder, TBHQ (preservative), disodium inosinate, disodium guanylate, caramel color",
    description: "Convenient noodle soup"
  },
  {
    id: "kids-cereal",
    name: "🥣 Kids Breakfast Cereal",
    category: "Breakfast",
    ingredients: "Whole grain oats, sugar, corn starch, honey, brown sugar syrup, salt, tripotassium phosphate, vitamin E (mixed tocopherols) for freshness, niacinamide, zinc oxide, BHT for freshness, Red 40, Yellow 5, Blue 1, natural and artificial flavor",
    description: "Colorful morning cereal"
  },
  {
    id: "yogurt",
    name: "🍦 Flavored Greek Yogurt",
    category: "Dairy",
    ingredients: "Cultured pasteurized grade A nonfat milk, water, strawberries, cane sugar, modified corn starch, natural flavor, fruit and vegetable juice (for color), citric acid, potassium sorbate, locust bean gum, live active cultures (S. thermophilus, L. bulgaricus, L. acidophilus, Bifidus, L. casei)",
    description: "Protein-rich snack"
  },
  {
    id: "energy-drink",
    name: "⚡ Energy Drink",
    category: "Beverage",
    ingredients: "Carbonated water, sucrose, glucose, citric acid, taurine, sodium bicarbonate, magnesium carbonate, caffeine, niacinamide, calcium pantothenate, pyridoxine HCl, vitamin B12, natural and artificial flavors, colors",
    description: "Performance beverage"
  },
  {
    id: "plant-milk",
    name: "🌱 Oat Milk",
    category: "Alternative Dairy",
    ingredients: "Oat base (water, oats), rapeseed oil, calcium carbonate, calcium phosphate, iodised salt, vitamins (D2, riboflavin, B12), gellan gum",
    description: "Dairy-free milk alternative"
  },
  {
    id: "frozen-pizza",
    name: "🍕 Frozen Pizza",
    category: "Frozen Food",
    ingredients: "Enriched flour (wheat flour, malted barley flour, niacin, iron, thiamine, riboflavin, folic acid), water, low-moisture part-skim mozzarella cheese (pasteurized milk, cheese cultures, salt, enzymes), tomato paste, pepperoni (pork, beef, salt, spices, dextrose, lactic acid starter culture, oleoresin of paprika, sodium nitrite), soybean oil, sugar, salt, yeast, spices, garlic powder",
    description: "Classic frozen meal"
  }
];

// Quick access by category
export const productsByCategory = {
  fitness: sampleProducts.filter(p => p.category === "Fitness"),
  beverages: sampleProducts.filter(p => p.category === "Beverage"),
  meals: sampleProducts.filter(p => ["Quick Meal", "Frozen Food"].includes(p.category)),
  breakfast: sampleProducts.filter(p => p.category === "Breakfast"),
  dairy: sampleProducts.filter(p => ["Dairy", "Alternative Dairy"].includes(p.category)),
};

// Random sample getter
export const getRandomSample = () => {
  return sampleProducts[Math.floor(Math.random() * sampleProducts.length)];
};

export default sampleProducts;
