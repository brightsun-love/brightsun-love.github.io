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

  let explanation = [];
  let avoid = [];

  // COLOR
  let palette = input.undertone === "warm"
    ? ["beige", "olive", "brown"]
    : ["white", "grey", "black"];

  // BASE OUTFIT
  let top = palette[0] + " shirt";
  let bottom = "dark trousers";

  // =========================
  // PROPORTION + BODY
  // =========================

  if (input.height === "short" || input.goal === "taller") {
    explanation.push("Vertical styling makes you look taller");
    avoid.push("Avoid strong color contrast");
  }

  if (input.legRatio === "short") {
    explanation.push("High-waist pants improve leg length appearance");
  }

  if (input.goal === "slimmer") {
    explanation.push("Slim fit reduces visual bulk");
    avoid.push("Avoid oversized clothes");
  }

  if (input.bodyShape === "triangle") {
    explanation.push("Lighter top balances lower body");
  }

  if (input.bodyShape === "inverted") {
    explanation.push("Darker top balances upper body");
  }

  if (input.bodyShape === "oval") {
    explanation.push("Vertical lines reduce focus on midsection");
  }

  // =========================
  // FIT (NOW PROPERLY USED)
  // =========================

  if (input.fit === "slim") {
    top = "fitted " + top;
    bottom = "slim-fit trousers";
  }

  if (input.fit === "oversized") {
    top = "oversized " + top;
    bottom = "relaxed fit pants";
  }

  // =========================
  // STYLE VIBE
  // =========================

  if (input.vibe === "minimal") {
    explanation.push("Minimal style gives a clean and sharp look");
  }

  if (input.vibe === "classic") {
    explanation.push("Classic style creates a polished appearance");
  }

  if (input.vibe === "street") {
    explanation.push("Streetwear adds a bold and trendy vibe");
    bottom = "cargo / relaxed pants";
  }

  if (input.vibe === "traditional") {
    explanation.push("Traditional style suits cultural settings");
    top = "kurta";
    bottom = "churidar";
  }

  // =========================
  // CLIMATE
  // =========================

  let fabric = input.climate === "hot"
    ? "cotton / linen"
    : input.climate === "cold"
    ? "layered fabrics (jackets)"
    : "balanced fabrics";

  // =========================
  // SCORING (MEANINGFUL)
  // =========================

  let score = 70;

  if (input.goal === "slimmer" && input.fit === "slim") score += 10;
  if (input.vibe === "classic") score += 5;
  if (input.climate === "hot") score += 5;

  if (score > 100) score = 100;

  // =========================
  // ALTERNATIVE (CONTROLLED VARIATION)
  // =========================

  let altTop = palette[1] + " shirt";
  let altBottom = "neutral chinos";

  if (input.vibe === "street") {
    altTop = "hoodie";
    altBottom = "cargo pants";
  }

  if (input.vibe === "traditional") {
    altTop = "embroidered kurta";
    altBottom = "traditional trousers";
  }

  // =========================
  // OUTPUT
  // =========================

  document.getElementById("result").innerHTML = `
    <h3>Best Outfit (Score: ${score})</h3>

    <p><b>Top:</b> ${top}</p>
    <p><b>Bottom:</b> ${bottom}</p>
    <p><b>Shoes:</b> ${input.footwear}</p>
    <p><b>Fabric:</b> ${fabric}</p>

    <h4>Alternative Option</h4>

    <p><b>Top:</b> ${altTop}</p>
    <p><b>Bottom:</b> ${altBottom}</p>

    <p><b>Why it works:</b></p>
    <ul>${explanation.map(e => `<li>${e}</li>`).join("")}</ul>

    <p><b>Avoid:</b></p>
    <ul>${avoid.map(a => `<li>${a}</li>`).join("")}</ul>
  `;
}

function get(id) {
  return document.getElementById(id).value;
}
