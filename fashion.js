function runEngine() {

  const input = {
    height: get("height"),
    bodyShape: get("bodyShape"),
    goal: get("goal"),
    vibe: get("vibe")
  };

  // =========================
  // ATTRIBUTES
  // =========================

  let attr = {
    silhouette: "balanced",
    palette: ["white", "grey", "black"]
  };

  let explanation = [];
  let avoid = [];

  // Height logic
  if (input.height === "short" || input.goal === "taller") {
    attr.silhouette = "vertical";
    explanation.push("Vertical styling makes you look taller");
    avoid.push("Avoid strong color breaks");
  }

  // Body logic
  if (input.bodyShape === "triangle") {
    explanation.push("Lighter top balances lower body");
  }

  if (input.bodyShape === "inverted") {
    explanation.push("Darker top balances upper body");
  }

  if (input.bodyShape === "oval") {
    explanation.push("Avoid tight clothing around stomach");
  }

  // =========================
  // DATA
  // =========================

  const tops = {
    minimal: ["plain t-shirt", "Oxford shirt"],
    classic: ["formal shirt", "linen shirt"],
    street: ["oversized t-shirt", "hoodie"],
    traditional: ["kurta"]
  };

  const bottoms = {
    minimal: ["slim-fit chinos", "dark jeans"],
    classic: ["tailored trousers"],
    street: ["cargo pants"],
    traditional: ["churidar"]
  };

  // =========================
  // GENERATOR
  // =========================

  function pick(arr, seed) {
    return arr[seed % arr.length];
  }

  function generate(type, seed) {

    let style = input.vibe || "minimal";

    let o = {
      name: type,
      top: "",
      bottom: "",
      shoes: "clean sneakers",
      explanation: explanation,
      avoid: avoid,
      score: 0
    };

    let topOptions = tops[style];
    let bottomOptions = bottoms[style];

    o.top = pick(topOptions, seed);
    o.bottom = pick(bottomOptions, seed + 1);

    if (type === "Safe") {
      o.bottom = bottomOptions[0];
    }

    if (type === "Bold") {
      o.top = topOptions[topOptions.length - 1];
    }

    return o;
  }

  let outfits = [
    generate("Safe", 1),
    generate("Balanced", 2),
    generate("Bold", 3)
  ];

  // =========================
  // SCORING
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

    return s;
  }

  outfits.forEach(o => o.score = score(o));
  outfits.sort((a, b) => b.score - a.score);

  display(outfits);
}

// =========================
// DISPLAY (WORKING)
// =========================

function display(outfits) {

  let html = "";

  outfits.forEach(o => {
    html += `
      <div class="result-card">
        <h4>${o.name} <span class="score">${o.score}</span></h4>

        <p><b>Top:</b> ${o.top}</p>
        <p><b>Bottom:</b> ${o.bottom}</p>
        <p><b>Shoes:</b> ${o.shoes}</p>

        <p><b>Why:</b></p>
        <ul>${o.explanation.map(e => `<li>${e}</li>`).join("")}</ul>

        <p><b>Avoid:</b></p>
        <ul>${o.avoid.map(a => `<li>${a}</li>`).join("")}</ul>
      </div>
    `;
  });

  document.getElementById("result").innerHTML = html;
}

// =========================
// HELPER
// =========================

function get(id) {
  return document.getElementById(id).value;
}
