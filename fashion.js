function runEngine() {

  const input = {
    height: get("height"),
    bodyShape: get("bodyShape"),
    goal: get("goal"),
    legRatio: get("legRatio"),
    undertone: get("undertone"),
    tone: get("tone"),
    contrast: get("contrast"),
    silhouette: get("silhouette"),
    fit: get("fit"),
    occasion: get("occasion"),
    climate: get("climate"),
    time: get("time"),
    budget: get("budget"),
    style: get("style"),
    risk: get("risk"),
    footwear: get("footwear")
  };

  let attr = {};

  // 🔹 CORE RULES
  if (input.height === "short" && input.goal === "taller") {
    attr.silhouette = "vertical";
    attr.colorFlow = "monochrome";
  }

  if (input.goal === "slimmer") {
    attr.fit = "slim";
    attr.colors = "dark";
  }

  if (input.bodyShape === "triangle") {
    attr.balance = "light top + dark bottom";
  }

  if (input.bodyShape === "inverted") {
    attr.balance = "dark top + light bottom";
  }

  if (input.undertone === "warm") {
    attr.palette = ["beige", "olive", "brown"];
  } else {
    attr.palette = ["white", "grey", "black"];
  }

  if (input.climate === "hot") {
    attr.fabric = "cotton / linen";
  } else {
    attr.fabric = "layered fabrics";
  }

  if (input.occasion === "formal") {
    attr.base = "formal";
  } else if (input.occasion === "party") {
    attr.base = "party";
  } else {
    attr.base = "casual";
  }

  // 🔹 GENERATE MULTIPLE OUTFITS

  let outfits = [];

  // OPTION 1 (SAFE)
  outfits.push({
    name: "Safe Option",
    top: `${attr.palette[0]} shirt`,
    bottom: "dark trousers",
    shoes: input.footwear,
    score: scoreOutfit(attr, input, "safe")
  });

  // OPTION 2 (BALANCED)
  outfits.push({
    name: "Balanced Option",
    top: `${attr.palette[1]} top`,
    bottom: "neutral chinos",
    shoes: input.footwear,
    score: scoreOutfit(attr, input, "balanced")
  });

  // OPTION 3 (BOLD)
  outfits.push({
    name: "Bold Option",
    top: `${attr.palette[2]} statement top`,
    bottom: "contrast pants",
    shoes: input.footwear,
    score: scoreOutfit(attr, input, "bold")
  });

  // 🔹 SORT BY SCORE
  outfits.sort((a, b) => b.score - a.score);

  displayResult(outfits);
}

function scoreOutfit(attr, input, type) {
  let score = 0;

  // Proportion (30)
  if (attr.silhouette === "vertical") score += 10;
  if (attr.balance) score += 10;
  score += 10;

  // Context (25)
  if (input.occasion) score += 10;
  if (input.climate) score += 10;
  score += 5;

  // Fit (20)
  if (input.fit === "slim") score += 10;
  score += 10;

  // Color (15)
  if (attr.palette) score += 10;
  score += 5;

  // Style (10)
  if (input.style === "minimal" && type === "safe") score += 10;
  if (input.style === "street" && type === "bold") score += 10;

  return score;
}

function get(id) {
  return document.getElementById(id).value;
}

function displayResult(outfits) {

  let html = "<h3>Top Outfit Recommendations</h3>";

  outfits.forEach(o => {
    html += `
      <div style="margin-bottom:20px; padding:10px; border:1px solid #ccc;">
        <h4>${o.name} (Score: ${o.score})</h4>
        <p><b>Top:</b> ${o.top}</p>
        <p><b>Bottom:</b> ${o.bottom}</p>
        <p><b>Shoes:</b> ${o.shoes}</p>
      </div>
    `;
  });

  document.getElementById("result").innerHTML = html;
}
