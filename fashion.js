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
  // 🔹 LAYER 1: ATTRIBUTES
  // =========================

  let attr = {
    silhouette: "balanced",
    palette: [],
    formality: "casual",
    fitType: input.fit || "regular"
  };

  let explanation = [];
  let avoid = [];

  // Proportion
  if (input.height === "short" || input.goal === "taller") {
    attr.silhouette = "vertical";
    explanation.push("Vertical styling improves height perception");
    avoid.push("Avoid strong contrast between top and bottom");
  }

  if (input.goal === "slimmer") {
    attr.fitType = "slim-fit";
    explanation.push("Slim-fit clothing reduces visual bulk");
  }

  // Body
  if (input.bodyShape === "triangle") {
    explanation.push("Lighter upper clothing balances lower body");
  }

  if (input.bodyShape === "inverted") {
    explanation.push("Darker tops reduce upper body dominance");
  }

  if (input.bodyShape === "oval") {
    attr.silhouette = "vertical";
    explanation.push("Clean vertical lines reduce midsection focus");
  }

  // Color palette
  if (input.undertone === "warm") {
    attr.palette = ["beige", "olive green", "warm brown"];
  } else {
    attr.palette = ["white", "charcoal grey", "black"];
  }

  // Formality
  if (input.occasion === "formal") attr.formality = "formal";
  if (input.occasion === "party") attr.formality = "party";

  // =========================
  // 🔹 LAYER 2: OUTFITS
  // =========================

  function outfit(type) {

    let o = {
      name: type,
      top: "",
      bottom: "",
      shoes: "",
      fabric: "",
      score: 0,
      explanation: explanation,
      avoid: avoid
    };

    // Fabric
    o.fabric = input.climate === "hot"
      ? "breathable cotton or linen"
      : "layered fabrics (cotton + outerwear)";

    // Shoes mapping
    let shoesMap = {
      sneakers: "minimal white leather sneakers",
      formal: "black leather formal shoes",
      boots: "brown leather boots"
    };
    o.shoes = shoesMap[input.footwear] || "clean sneakers";

    // SAFE
    if (type === "Safe") {
      o.top = `${attr.palette[0]} ${attr.fitType} Oxford cotton shirt`;
      o.bottom = "charcoal slim-fit chinos";
    }

    // BALANCED
    if (type === "Balanced") {
      o.top = `${attr.palette[1]} linen shirt`;
      o.bottom = "beige tailored trousers";
    }

    // BOLD
    if (type === "Bold") {
      o.top = `${attr.palette[2]} statement textured shirt`;
      o.bottom = "contrast tailored pants";
    }

    // VIBE ADJUSTMENT
    if (input.vibe === "street" && type === "Bold") {
      o.top = "oversized graphic t-shirt";
      o.bottom = "relaxed-fit cargo pants";
    }

    if (input.vibe === "traditional" && type === "Safe") {
      o.top = "cotton straight-fit kurta";
      o.bottom = "tailored trousers or churidar";
    }

    return o;
  }

  let outfits = [
    outfit("Safe"),
    outfit("Balanced"),
    outfit("Bold")
  ];

  // =========================
  // 🔹 LAYER 3: SCORING
  // =========================

  function score(o) {
    let s = 0;

    if (attr.silhouette === "vertical") s += 30;
    if (input.occasion) s += 20;
    if (input.fit === "slim") s += 15;
    if (attr.palette.length) s += 15;

    if (input.vibe === "minimal" && o.name === "Safe") s += 10;
    if (input.vibe === "classic" && o.name === "Balanced") s += 10;
    if (input.vibe === "street" && o.name === "Bold") s += 10;

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

function get(id) {
  return document.getElementById(id).value;
}
