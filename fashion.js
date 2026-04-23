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
  // 🔹 ATTRIBUTE ENGINE
  // =========================

  let attr = {
    silhouette: "balanced",
    palette: [],
    formality: "casual",
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
    explanation.push("Lighter top balances heavier lower body");
  }

  if (input.bodyShape === "inverted") {
    explanation.push("Darker top balances upper body");
  }

  if (input.bodyShape === "oval") {
    attr.silhouette = "vertical";
    explanation.push("Vertical lines reduce midsection focus");
  }

  // Palette
  if (input.undertone === "warm") {
    attr.palette = ["beige", "olive green", "warm brown"];
  } else {
    attr.palette = ["white", "charcoal grey", "black"];
  }

  // =========================
  // 🔹 OUTFIT GENERATION
  // =========================

  function generate(type) {

    let o = {
      name: type,
      top: "",
      bottom: "",
      shoes: "",
      fabric: "",
      explanation: explanation,
      avoid: avoid,
      score: 0
    };

    // Fabric
    o.fabric = input.climate === "hot"
      ? "breathable cotton or linen"
      : "layered fabrics (cotton + jacket)";

    // Shoes
    const shoesMap = {
      sneakers: "minimal white leather sneakers",
      formal: "black leather formal shoes",
      boots: "brown leather boots"
    };

    o.shoes = shoesMap[input.footwear] || "clean sneakers";

    // SAFE
    if (type === "Safe") {
      o.top = `${attr.palette[0]} slim-fit Oxford cotton shirt`;
      o.bottom = "charcoal slim-fit chinos";
    }

    // BALANCED
    if (type === "Balanced") {
      o.top = `${attr.palette[1]} linen shirt`;
      o.bottom = "beige tailored trousers";
    }

    // BOLD
    if (type === "Bold") {
      o.top = `${attr.palette[2]} textured statement shirt`;
      o.bottom = "contrast tailored pants";
    }

    // VIBE ADJUSTMENTS
    if (input.vibe === "street" && type === "Bold") {
      o.top = "oversized graphic t-shirt";
      o.bottom = "relaxed-fit cargo pants";
    }

    if (input.vibe === "traditional" && type === "Safe") {
      o.top = "cotton straight-fit kurta";
      o.bottom = "tailored churidar trousers";
    }

    return o;
  }

  let outfits = [
    generate("Safe"),
    generate("Balanced"),
    generate("Bold")
  ];

  // =========================
  // 🔹 FAIR SCORING SYSTEM
  // =========================

  function score(o) {

    let s = 60;

    // PROPORTION
    if (attr.silhouette === "vertical") {
      if (input.height === "short") s += 15;
      else s += 5;
    }

    if (input.height === "short" && o.top !== o.bottom) {
      s -= 10;
    }

    // FIT
    if (input.goal === "slimmer") {
      if (o.bottom.includes("slim")) s += 12;
      else s -= 12;
    }

    // BODY
    if (input.bodyShape === "triangle") {
      if (o.top.includes("beige") || o.top.includes("white")) s += 8;
      else s -= 5;
    }

    if (input.bodyShape === "inverted") {
      if (o.top.includes("black") || o.top.includes("charcoal")) s += 8;
      else s -= 5;
    }

    // CONTEXT
    if (input.occasion === "formal") {
      if (o.top.includes("shirt")) s += 10;
      else s -= 8;
    }

    if (input.climate === "hot") {
      if (o.fabric.includes("cotton")) s += 8;
      if (o.fabric.includes("layered")) s -= 8;
    }

    // STYLE MATCH
    if (input.vibe === "minimal" && o.name === "Safe") s += 10;
    if (input.vibe === "classic" && o.name === "Balanced") s += 10;
    if (input.vibe === "street" && o.name === "Bold") s += 10;

    if (input.vibe === "traditional" && o.top.includes("kurta")) {
      s += 12;
    }

    // LIMIT
    if (s > 100) s = 100;
    if (s < 0) s = 0;

    return s;
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
      <div style="margin-bottom:20px;padding:15px;border:1px solid #ccc;border-radius:10px;">
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
