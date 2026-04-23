function runEngine() {

  const input = {
    height: get("height"),
    bodyShape: get("bodyShape"),
    goal: get("goal"),
    vibe: get("vibe")
  };

  // =========================
  // 🔹 ATTRIBUTE ENGINE
  // =========================

  let attr = {
    silhouette: "balanced",
    palette: ["white", "grey", "black"]
  };

  let explanation = [];
  let avoid = [];

  if (input.height === "short" || input.goal === "taller") {
    attr.silhouette = "vertical";
    explanation.push("Vertical styling improves height perception");
    avoid.push("Avoid strong contrast between top and bottom");
  }

  if (input.goal === "slimmer") {
    explanation.push("Slim-fit clothing reduces visual bulk");
  }

  if (input.bodyShape === "triangle") {
    explanation.push("Lighter upper body balances proportions");
  }

  if (input.bodyShape === "inverted") {
    explanation.push("Darker tops reduce upper body dominance");
  }

  if (input.bodyShape === "oval") {
    explanation.push("Clean vertical lines reduce focus on midsection");
  }

  // =========================
  // 🔹 DATA SET (EXPANDED)
  // =========================

  const tops = {
    minimal: ["Oxford shirt", "plain t-shirt", "polo shirt"],
    classic: ["formal shirt", "linen shirt", "blazer with shirt"],
    street: ["oversized t-shirt", "hoodie", "graphic tee"],
    traditional: ["kurta", "embroidered kurta"]
  };

  const bottoms = {
    minimal: ["slim-fit chinos", "dark jeans"],
    classic: ["tailored trousers", "formal pants"],
    street: ["cargo pants", "relaxed jeans"],
    traditional: ["churidar", "traditional trousers"]
  };

  const shoesMap = {
    sneakers: "minimal sneakers",
    formal: "black formal shoes",
    boots: "leather boots"
  };

  // =========================
  // 🔹 CONTROLLED VARIATION
  // =========================

  function pick(arr, seed) {
    if (!arr) return "";
    return arr[seed % arr.length];
  }

  // =========================
  // 🔹 OUTFIT GENERATION
  // =========================

  function generate(type, seed) {

    let style = input.vibe || "minimal";

    let o = {
      name: type,
      top: "",
      bottom: "",
      shoes: shoesMap[input.footwear] || "clean sneakers",
      explanation: explanation,
      avoid: avoid,
      score: 0
    };

    let topOptions = tops[style];
    let bottomOptions = bottoms[style];

    // Base variation
    o.top = attr.palette[seed % attr.palette.length] + " " + pick(topOptions, seed);
    o.bottom = pick(bottomOptions, seed + 1);

    // Style adjustments
    if (type === "Safe") {
      o.bottom = bottomOptions[0];
    }

    if (type === "Bold") {
      o.top = attr.palette[2] + " " + topOptions[topOptions.length - 1];
    }

    // Traditional override
    if (style === "traditional") {
      o.top = pick(tops.traditional, seed);
      o.bottom = pick(bottoms.traditional, seed);
    }

    return o;
  }

  let outfits = [
    generate("Safe", 1),
    generate("Balanced", 2),
    generate("Bold", 3)
  ];

  // =========================
  // 🔹 FAIR SCORING
  // =========================

  function score(o) {

    let s = 60;

    if (attr.silhouette === "vertical") s += 15;

    if (input.goal === "slimmer") {
      if (o.bottom.includes("slim")) s += 10;
      else s -= 10;
    }

    if (input.vibe === "minimal" && o.name === "Safe") s += 10;
    if (input.vibe === "classic" && o.name === "Balanced") s += 10;
    if (input.vibe === "street" && o.name === "Bold") s += 10;

    if (s > 100) s = 100;
    if (s < 0) s = 0;

    return s;
  }

  outfits.forEach(o => o.score = score(o));
  outfits.sort((a, b) => b.score - a.score);

  display(outfits);
}

// =========================
// 🔹 DISPLAY (PREMIUM UI)
// =========================

function display(outfits) {

  let html = "";

  outfits.forEach(o => {
    html += `
      <div class="result-card">
        <h4>${o.name} Option <span class="score">${o.score}</span></h4>

        <p><b>Top:</b> ${o.top}</p>
        <p><b>Bottom:</b> ${o.bottom}</p>
        <p><b>Shoes:</b> ${o.shoes}</p>

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
