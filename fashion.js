function runEngine() {

  const input = {
    height: get("height"),
    bodyShape: get("bodyShape"),
    goal: get("goal"),
    vibe: get("vibe"),
    footwear: get("footwear")
  };

  let explanation = [];

  let top = null;
  let bottom = null;

  // =========================
  // 🔥 SMART PARTIAL LOGIC
  // =========================

  // Case 1: Only footwear selected
  if (!input.height && !input.bodyShape && !input.goal && !input.vibe && input.footwear) {
    document.getElementById("result").innerHTML = `
      <h3>Footwear Suggestion</h3>
      <p>You prefer <b>${input.footwear}</b>.</p>
      <p>Pair it with clean, well-fitted outfits for best look.</p>
    `;
    return;
  }

  // Case 2: Style only
  if (input.vibe && !input.height && !input.bodyShape && !input.goal) {
    document.getElementById("result").innerHTML = `
      <h3>Style Suggestion</h3>
      <p>You prefer <b>${input.vibe}</b> style.</p>
      <p>Focus on outfits that match this vibe consistently.</p>
    `;
    return;
  }

  // =========================
  // FULL LOGIC (WHEN ENOUGH DATA)
  // =========================

  if (!input.height || !input.bodyShape || !input.goal || !input.vibe) {
    document.getElementById("result").innerHTML = `
      <p style="color:red;">Select more details for full outfit recommendation</p>
    `;
    return;
  }

  // Base outfit
  top = "clean shirt";
  bottom = "dark trousers";

  if (input.goal === "taller") {
    explanation.push("Vertical styling makes you look taller");
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

  // =========================
  // OUTPUT
  // =========================

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
