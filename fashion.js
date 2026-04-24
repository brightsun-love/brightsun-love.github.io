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

  let palette = input.undertone === "warm"
    ? ["beige", "olive", "brown"]
    : ["white", "grey", "black"];

  let top = palette[0] + " shirt";
  let bottom = "dark trousers";

  // LOGIC (same, slightly refined wording)

  if (input.height === "short" || input.goal === "taller") {
    explanation.push("Using vertical styling helps create a taller appearance");
    avoid.push("Avoid strong contrast between top and bottom");
  }

  if (input.goal === "slimmer") {
    explanation.push("A slimmer fit helps reduce visual bulk");
    avoid.push("Avoid overly loose or baggy clothing");
  }

  if (input.bodyShape === "triangle") {
    explanation.push("A lighter top helps balance your lower body");
  }

  if (input.bodyShape === "inverted") {
    explanation.push("A darker top balances broader shoulders");
  }

  if (input.bodyShape === "oval") {
    explanation.push("Clean vertical lines reduce focus on midsection");
  }

  // FIT
  if (input.fit === "slim") {
    top = "fitted " + top;
    bottom = "slim-fit trousers";
  }

  if (input.fit === "oversized") {
    top = "relaxed " + top;
    bottom = "loose fit pants";
  }

  // STYLE
  if (input.vibe === "minimal") {
    explanation.push("Minimal styling keeps your look clean and refined");
  }

  if (input.vibe === "classic") {
    explanation.push("Classic pieces create a polished, timeless look");
  }

  if (input.vibe === "street") {
    explanation.push("Streetwear adds a modern and bold character");
    bottom = "relaxed cargo pants";
  }

  if (input.vibe === "traditional") {
    explanation.push("Traditional wear aligns well with cultural settings");
    top = "kurta";
    bottom = "churidar";
  }

  let fabric = input.climate === "hot"
    ? "lightweight cotton or linen"
    : input.climate === "cold"
    ? "layered fabrics like wool or jackets"
    : "balanced fabrics for comfort";

  let score = 75;

  if (input.goal === "slimmer" && input.fit === "slim") score += 10;
  if (input.vibe === "classic") score += 5;

  if (score > 100) score = 100;

  // Alternative
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

  document.getElementById("result").innerHTML = `
    <div class="card">
      <h3>Best Outfit <span class="score">${score}/100</span></h3>

      <p><b>Top:</b> ${top}</p>
      <p><b>Bottom:</b> ${bottom}</p>
      <p><b>Shoes:</b> ${input.footwear}</p>
      <p><b>Fabric:</b> ${fabric}</p>
    </div>

    <div class="card">
      <h4>Alternative Option</h4>

      <p><b>Top:</b> ${altTop}</p>
      <p><b>Bottom:</b> ${altBottom}</p>
    </div>

    <div class="card">
      <h4>Why this works</h4>
      <ul>${explanation.map(e => `<li>${e}</li>`).join("")}</ul>

      <h4>Avoid</h4>
      <ul>${avoid.map(a => `<li>${a}</li>`).join("")}</ul>
    </div>
  `;
}

function get(id) {
  return document.getElementById(id).value;
}
