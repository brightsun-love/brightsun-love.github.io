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
  let explanation = [];

  // 🔹 PROPORTION
  if (input.height === "short" && input.goal === "taller") {
    attr.silhouette = "vertical";
    explanation.push("Vertical styling makes you look taller");
  }

  if (input.goal === "slimmer") {
    attr.fit = "slim";
    explanation.push("Slim fit reduces visual bulk");
  }

  // 🔹 BODY SHAPE
  if (input.bodyShape === "triangle") {
    attr.balance = "light top + dark bottom";
    explanation.push("Light top draws attention upward for balance");
  }

  if (input.bodyShape === "inverted") {
    attr.balance = "dark top + light bottom";
    explanation.push("Balancing upper-heavy body with lighter bottom");
  }

  // 🔹 COLOR
  if (input.undertone === "warm") {
    attr.palette = ["beige", "olive", "brown"];
    explanation.push("Warm tones match your skin undertone");
  } else {
    attr.palette = ["white", "grey", "black"];
    explanation.push("Neutral/cool tones suit your undertone");
  }

  if (input.contrast === "high") {
    explanation.push("High contrast outfits enhance your natural contrast");
  } else {
    explanation.push("Soft tones maintain harmony with your features");
  }

  // 🔹 CLIMATE
  if (input.climate === "hot") {
    attr.fabric = "cotton / linen";
    explanation.push("Breathable fabrics suit hot climate");
  } else {
    attr.fabric = "layered fabrics";
    explanation.push("Layering works in cooler conditions");
  }

  // 🔹 OCCASION
  if (input.occasion === "formal") {
    attr.base = "formal outfit";
    explanation.push("Formal outfit matches the occasion");
  } else if (input.occasion === "party") {
    attr.base = "statement outfit";
    explanation.push("Bold outfit suits party environment");
  } else {
    attr.base = "casual outfit";
    explanation.push("Casual outfit fits daily use");
  }

  // 🔹 STYLE
  if (input.style === "minimal") {
    explanation.push("Minimal style keeps look clean and sharp");
  }

  if (input.style === "street") {
    explanation.push("Streetwear adds bold personality");
  }

  // 🔹 GENERATE OUTFITS
  let outfits = [
    {
      name: "Safe Option",
      top: `${attr.palette[0]} shirt`,
      bottom: "dark trousers",
      shoes: input.footwear,
      score: scoreOutfit(attr, input, "safe"),
      explanation: explanation.slice(0, 3)
    },
    {
      name: "Balanced Option",
      top: `${attr.palette[1]} top`,
      bottom: "neutral chinos",
      shoes: input.footwear,
      score: scoreOutfit(attr, input, "balanced"),
      explanation: explanation.slice(0, 4)
    },
    {
      name: "Bold Option",
      top: `${attr.palette[2]} statement top`,
      bottom: "contrast pants",
      shoes: input.footwear,
      score: scoreOutfit(attr, input, "bold"),
      explanation: explanation
    }
  ];

  outfits.sort((a, b) => b.score - a.score);

  displayResult(outfits);
}

function scoreOutfit(attr, input, type) {
  let score = 0;

  if (attr.silhouette) score += 10;
  if (attr.balance) score += 10;
  if (attr.palette) score += 10;
  if (input.occasion) score += 10;
  if (input.climate) score += 10;

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
        <p><b>Why it works:</b></p>
        <ul>
          ${o.explanation.map(e => `<li>${e}</li>`).join("")}
        </ul>
      </div>
    `;
  });

  document.getElementById("result").innerHTML = html;
}
