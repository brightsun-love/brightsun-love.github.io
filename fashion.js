function runEngine() {

  const input = {
    height: get("height"),
    bodyShape: get("bodyShape"),
    goal: get("goal"),
    vibe: get("vibe")
  };

  if (!input.height || !input.bodyShape || !input.goal || !input.vibe) {
    alert("Please select all options");
    return;
  }

  let explanation = [];
  let avoid = [];

  // LOGIC
  if (input.height === "short" || input.goal === "taller") {
    explanation.push("Vertical styling makes you look taller");
    avoid.push("Avoid strong contrast outfits");
  }

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
    classic: ["tailored trousers", "formal pants"],
    street: ["cargo pants", "relaxed jeans"],
    traditional: ["churidar"]
  };

  function generate(type) {

    let style = tops[input.vibe] ? input.vibe : "minimal";

    let o = {
      name: type,
      top: "",
      bottom: "",
      shoes: "clean sneakers",
      explanation: [...explanation],
      avoid: [...avoid],
      score: 0
    };

    // 🔥 DIFFERENT LOGIC PER TYPE

    if (type === "Safe") {
      o.top = tops[style][0];
      o.bottom = bottoms[style][0];
    }

    if (type === "Balanced") {
      o.top = tops[style][1] || tops[style][0];
      o.bottom = bottoms[style][0];
    }

    if (type === "Bold") {
      o.top = tops[style][1] || tops[style][0];
      o.bottom = bottoms[style][1] || bottoms[style][0];
    }

    return o;
  }

  let outfits = [
    generate("Safe"),
    generate("Balanced"),
    generate("Bold")
  ];

  // 🔥 IMPROVED SCORING
  function score(o) {

    let s = 50;

    if (input.goal === "slimmer") {
      if (o.bottom.includes("slim")) s += 15;
      else s -= 5;
    }

    if (input.vibe === "minimal" && o.name === "Safe") s += 15;
    if (input.vibe === "classic" && o.name === "Balanced") s += 15;
    if (input.vibe === "street" && o.name === "Bold") s += 15;

    if (input.goal === "taller" && o.top === o.bottom) s += 10;

    return s;
  }

  outfits.forEach(o => o.score = score(o));
  outfits.sort((a, b) => b.score - a.score);

  display(outfits);
}

// DISPLAY
function display(outfits) {

  let html = "<h2>Top Recommendations</h2>";

  outfits.forEach(o => {
    html += `
      <div class="result-card">
        <h4>${o.name} (Score: ${o.score})</h4>

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

function get(id) {
  return document.getElementById(id).value;
}
