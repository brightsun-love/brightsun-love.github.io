function runEngine() {

  const input = {
    height: get("height"),
    bodyShape: get("bodyShape"),
    goal: get("goal"),
    vibe: get("vibe")
  };

  let explanation = [];
  let avoid = [];

  // Height
  if (input.height === "short" || input.goal === "taller") {
    explanation.push("Vertical styling makes you look taller");
    avoid.push("Avoid strong contrast");
  }

  // Body
  if (input.bodyShape === "triangle") {
    explanation.push("Lighter top balances lower body");
  }

  if (input.bodyShape === "inverted") {
    explanation.push("Darker top balances upper body");
  }

  if (input.bodyShape === "oval") {
    explanation.push("Avoid tight clothing around stomach");
  }

  // DATA
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

  function pick(arr, seed) {
    return arr[seed % arr.length];
  }

  function generate(type, seed) {

    let style = input.vibe || "minimal";

    let o = {
      name: type,
      top: pick(tops[style], seed),
      bottom: pick(bottoms[style], seed + 1),
      shoes: "clean sneakers",
      explanation: [...explanation],
      avoid: [...avoid],
      score: 0
    };

    return o;
  }

  let outfits = [
    generate("Safe", 1),
    generate("Balanced", 2),
    generate("Bold", 3)
  ];

  // Simple scoring
  function score(o) {
    let s = 60;

    if (input.goal === "slimmer") {
      if (o.bottom.includes("slim")) s += 10;
    }

    if (input.vibe === "street" && o.name === "Bold") s += 10;

    return s;
  }

  outfits.forEach(o => o.score = score(o));
  outfits.sort((a, b) => b.score - a.score);

  display(outfits);
}

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
      </div>
    `;
  });

  document.getElementById("result").innerHTML = html;
}

function get(id) {
  return document.getElementById(id).value;
}
