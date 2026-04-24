function runEngine() {

  const input = {
    height: get("height"),
    bodyShape: get("bodyShape"),
    goal: get("goal"),
    vibe: get("vibe"),
    footwear: get("footwear")
  };

  // 🔥 FIX: REQUIRED INPUT CHECK
  if (!input.height || !input.bodyShape || !input.goal || !input.vibe) {
    document.getElementById("result").innerHTML = `
      <p style="color:red;">
        Please select at least:
        Height, Body, Goal, and Style
      </p>
    `;
    return;
  }

  let explanation = [];

  let top = "clean shirt";
  let bottom = "dark trousers";

  if (input.goal === "taller") {
    explanation.push("Vertical styling helps you look taller");
  }

  if (input.goal === "slimmer") {
    explanation.push("Slim fit reduces bulk");
  }

  if (input.bodyShape === "triangle") {
    explanation.push("Lighter top balances lower body");
  }

  if (input.vibe === "street") {
    top = "oversized t-shirt";
    bottom = "cargo pants";
  }

  if (input.vibe === "traditional") {
    top = "kurta";
    bottom = "churidar";
  }

  document.getElementById("result").innerHTML = `
    <h3>Best Outfit</h3>

    <p><b>Top:</b> ${top}</p>
    <p><b>Bottom:</b> ${bottom}</p>
    <p><b>Shoes:</b> ${input.footwear || "your choice"}</p>

    <p><b>Why:</b></p>
    <ul>${explanation.map(e => `<li>${e}</li>`).join("")}</ul>
  `;
}

function get(id) {
  return document.getElementById(id).value;
}
