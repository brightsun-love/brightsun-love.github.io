function runEngine() {

  const input = {
    height: get("height"),
    bodyShape: get("bodyShape"),
    goal: get("goal"),
    legRatio: get("legRatio"),
    undertone: get("undertone"),
    contrast: get("contrast"),
    fit: get("fit"),
    occasion: get("occasion"),
    climate: get("climate"),
    vibe: get("vibe"),
    footwear: get("footwear")
  };

  // =========================
  // 🔹 LAYER 1: ATTRIBUTE ENGINE
  // =========================

  let attr = {
    silhouette: "balanced",
    palette: [],
    formality: "casual",
    structure: "normal"
  };

  let explanation = [];
  let avoid = [];

  // Proportion
  if (input.height === "short" || input.goal === "taller") {
    attr.silhouette = "vertical";
    explanation.push("Vertical styling improves height perception");
    avoid.push("Avoid strong color breaks");
  }

  if (input.goal === "slimmer") {
    attr.structure = "slim";
    explanation.push("Slim structure reduces visual bulk");
  }

  // Body shape
  if (input.bodyShape === "triangle") {
    explanation.push("Balance lower body with lighter upper area");
  }

  if (input.bodyShape === "inverted") {
    explanation.push("Reduce upper dominance with darker top");
  }

  if (input.bodyShape === "oval") {
    attr.silhouette = "vertical";
    explanation.push("Vertical lines reduce focus on midsection");
  }

  // Color
  if (input.undertone === "warm") {
    attr.palette = ["beige", "olive", "brown"];
  } else {
    attr.palette = ["white", "grey", "black"];
  }

  // Occasion
  if (input.occasion === "formal") attr.formality = "formal";
  if (input.occasion === "party") attr.formality = "party";

  // =========================
  // 🔹 LAYER 2: OUTFIT GENERATION
  // =========================

  function generateOutfit(type) {

    let outfit = {
      name: type,
      top: "",
      bottom: "",
      shoes: input.footwear,
      score: 0,
      explanation: [],
      avoid: []
    };

    // Base logic
    if (attr.formality === "formal") {
      outfit.top = attr.palette[0] + " formal shirt";
      outfit.bottom = "tailored trousers";
    } else {
      outfit.top = attr.palette[0] + " shirt";
      outfit.bottom = "dark trousers";
    }

    // Variation by type
    if (type === "Safe") {
      outfit.top = attr.palette[0] + " shirt";
      outfit.bottom = "dark trousers";
    }

    if (type === "Balanced") {
      outfit.top = attr.palette[1] + " shirt";
      outfit.bottom = "neutral chinos";
    }

    if (type === "Bold") {
      outfit.top = attr.palette[2] + " statement shirt";
      outfit.bottom = "contrast pants";
    }

    // Vibe influence
    if (input.vibe === "street" && type === "Bold") {
      outfit.bottom = "cargo pants";
    }

    if (input.vibe === "traditional" && type === "Safe") {
      outfit.top = "traditional kurta";
    }

    // Climate
    outfit.fabric = input.climate === "hot"
      ? "cotton / linen"
      : "layered fabrics";

    outfit.explanation = explanation;
    outfit.avoid = avoid;

    return outfit;
  }

  let outfits = [
    generateOutfit("Safe"),
    generateOutfit("Balanced"),
    generateOutfit("Bold")
  ];

  // =========================
  // 🔹 LAYER 3: SCORING ENGINE
  // =========================

  function score(outfit) {

    let score = 0;

    // Proportion (30)
    if (attr.silhouette === "vertical") score += 30;

    // Context (25)
    if (input.occasion) score += 15;
    if (input.climate) score += 10;

    // Fit (20)
    if (input.fit === "slim") score += 20;

    // Color (15)
    if (attr.palette.length) score += 15;

    // Style (10)
    if (input.vibe === "minimal" && outfit.name === "Safe") score += 10;
    if (input.vibe === "street" && outfit.name === "Bold") score += 10;

    return score;
  }

  outfits.forEach(o => o.score = score(o));
  outfits.sort((a, b) => b.score - a.score);

  display(outfits);
}

// =========================
// 🔹 DISPLAY
// =========================

function display(outfits) {

  let html = "<h3>Top Outfit Recommendations</h3>";

  outfits.forEach(o => {
    html += `
      <div style="margin-bottom:20px; padding:15px; border:1px solid #ccc; border-radius:10px;">
        <h4>${o.name} Option (Score: ${o.score})</h4>
        <p><b>Top:</b> ${o.top}</p>
        <p><b>Bottom:</b> ${o.bottom}</p>
        <p><b>Shoes:</b> ${o.shoes}</p>
        <p><b>Fabric:</b> ${o.fabric}</p>

        <p><b>Why it works:</b></p>
        <ul>${o.explanation.map(e => `<li>${e}</li>`).join("")}</ul>

        <p><b>Avoid:</b></p>
        <ul>${o.avoid.map(a => `<li>${a}</li>`).join("")}</ul>
      </div>
    `;
  });

  document.getElementById("result").innerHTML = html;
}

// =========================
// 🔹 HELPER
// =========================

function get(id) {
  return document.getElementById(id).value;
}
