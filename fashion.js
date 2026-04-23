function runEngine() {

  const input = {
    height: get("height"),
    bodyShape: get("bodyShape"),
    goal: get("goal"),
    undertone: get("undertone"),
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
    palette: input.undertone === "warm"
      ? ["beige", "olive", "brown"]
      : ["white", "grey", "black"]
  };

  let explanation = [];
  let avoid = [];

  if (input.height === "short" || input.goal === "taller") {
    attr.silhouette = "vertical";
    explanation.push("Vertical styling improves height perception");
  }

  if (input.goal === "slimmer") {
    explanation.push("Slim-fit reduces bulk");
  }

  // =========================
  // 🔹 CONTROLLED DATA SET
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
    sneakers: "minimal white sneakers",
    formal: "black leather formal shoes",
    boots: "brown leather boots"
  };

  // =========================
  // 🔹 CONTROLLED VARIATION FUNCTION
  // =========================

  function pickOption(list, seedOffset = 0) {
    if (!list || list.length === 0) return "";

    // Controlled variation (not pure random)
    let seed = (new Date().getMinutes() + seedOffset) % list.length;
    return list[seed];
  }

  // =========================
  // 🔹 OUTFIT GENERATOR
  // =========================

  function generate(type, offset) {

    let style = input.vibe || "minimal";

    let topOptions = tops[style];
    let bottomOptions = bottoms[style];

    let o = {
      name: type,
      top: "",
      bottom: "",
      shoes: shoesMap[input.footwear] || "clean sneakers",
      fabric: input.climate === "hot" ? "cotton / linen" : "layered fabrics",
      explanation: explanation,
      avoid: avoid,
      score: 0
    };

    // Controlled variation selection
    let topPick = pickOption(topOptions, offset);
    let bottomPick = pickOption(bottomOptions, offset + 1);

    // Apply palette
    o.top = `${attr.palette[offset % attr.palette.length]} ${topPick}`;
    o.bottom = bottomPick;

    // Special logic
    if (type === "Safe") {
      o.bottom = bottomOptions[0];
    }

    if (type === "Bold") {
      o.top = `${attr.palette[2]} ${topOptions[topOptions.length - 1]}`;
    }

    // Traditional override
    if (input.vibe === "traditional") {
      o.top = pickOption(tops.traditional, offset);
      o.bottom = pickOption(bottoms.traditional, offset);
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

    if (input.climate === "hot" && o.fabric.includes("cotton")) s += 8;

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

function get(id) {
  return document.getElementById(id).value;
}
