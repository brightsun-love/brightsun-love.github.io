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

  let palette = input.undertone === "warm"
    ? ["beige", "olive", "brown"]
    : ["white", "grey", "black"];

  let baseBottom = "dark trousers";

  // 🔹 COMMON LOGIC
  let explanation = [];
  let avoid = [];

  if (input.height === "short" || input.goal === "taller") {
    explanation.push("Vertical styling makes you look taller");
    avoid.push("Avoid strong color breaks");
  }

  if (input.goal === "slimmer") {
    explanation.push("Slim fit reduces bulk");
    avoid.push("Avoid oversized clothes");
  }

  if (input.bodyShape === "triangle") {
    explanation.push("Lighter top balances lower body");
  }

  if (input.bodyShape === "inverted") {
    explanation.push("Darker top balances upper body");
  }

  if (input.bodyShape === "oval") {
    explanation.push("Vertical lines reduce stomach focus");
  }

  let fabric = input.climate === "hot"
    ? "cotton / linen"
    : "layered fabrics";

  // 🔹 SAFE OUTFIT
  let safe = {
    name: "Safe Option",
    top: palette[0] + " shirt",
    bottom: baseBottom,
    shoes: input.footwear,
    score: score(input, "safe"),
    explanation: explanation.slice(0, 2),
    avoid: avoid.slice(0, 2)
  };

  // 🔹 BALANCED OUTFIT
  let balanced = {
    name: "Balanced Option",
    top: palette[1] + " shirt",
    bottom: "neutral chinos",
    shoes: input.footwear,
    score: score(input, "balanced"),
    explanation: explanation.slice(0, 3),
    avoid: avoid.slice(0, 2)
  };

  // 🔹 BOLD OUTFIT
  let bold = {
    name: "Bold Option",
    top: palette[2] + " statement shirt",
    bottom: "contrast pants",
    shoes: input.footwear,
    score: score(input, "bold"),
    explanation: explanation,
    avoid: avoid
  };

  // 🔹 STYLE VIBE EFFECT
  if (input.vibe === "street") {
    bold.bottom = "relaxed fit cargo pants";
  }

  if (input.vibe === "traditional") {
    safe.top = "traditional kurta";
  }

  // 🔹 SORT BY SCORE
  let outfits = [safe, balanced, bold];
  outfits.sort((a, b) => b.score - a.score);

  display(outfits, fabric);
}

// 🔹 SCORING SYSTEM
function score(input, type) {
  let score = 0;

  if (input.height === "short") score += 10;
  if (input.goal) score += 10;
  if (input.climate) score += 10;

  if (input.vibe === "minimal" && type === "safe") score += 15;
  if (input.vibe === "classic" && type === "balanced") score += 15;
  if (input.vibe === "street" && type === "bold") score += 15;

  return score;
}

function get(id) {
  return document.getElementById(id).value;
}

// 🔹 DISPLAY
function display(outfits, fabric) {

  let html = "<h3>Top Outfit Recommendations</h3>";

  outfits.forEach(o => {
    html += `
      <div style="margin-bottom:20px; padding:15px; border:1px solid #ccc; border-radius:10px;">
        <h4>${o.name} (Score: ${o.score})</h4>
        <p><b>Top:</b> ${o.top}</p>
        <p><b>Bottom:</b> ${o.bottom}</p>
        <p><b>Shoes:</b> ${o.shoes}</p>
        <p><b>Fabric:</b> ${fabric}</p>

        <p><b>Why it works:</b></p>
        <ul>${o.explanation.map(e => `<li>${e}</li>`).join("")}</ul>

        <p><b>Avoid:</b></p>
        <ul>${o.avoid.map(a => `<li>${a}</li>`).join("")}</ul>
      </div>
    `;
  });

  document.getElementById("result").innerHTML = html;
}
