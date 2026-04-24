function runEngine() {

  const input = {
    height: get("height"),
    bodyShape: get("bodyShape"),
    goal: get("goal"),
    fit: get("fit"),
    occasion: get("occasion"),
    climate: get("climate"),
    vibe: get("vibe"),
    footwear: get("footwear")
  };

  // 🔒 Required check
  if (!input.height || !input.bodyShape || !input.goal || !input.vibe || !input.occasion) {
    document.getElementById("result").innerHTML =
      "<p style='color:red;'>Please fill main details (height, body, goal, style, occasion)</p>";
    return;
  }

  let explanation = [];

  let top = "";
  let bottom = "";
  let outer = "";

  // =========================
  // 🔥 OCCASION ENGINE (CORE)
  // =========================

  if (input.occasion === "casual") {
    top = "t-shirt";
    bottom = "jeans";
    explanation.push("Casual outfits prioritize comfort and simplicity");
  }

  if (input.occasion === "formal") {
    top = "button-down shirt";
    bottom = "tailored trousers";
    outer = "blazer";
    explanation.push("Formal outfits require structure and clean lines");
  }

  if (input.occasion === "party") {
    top = "stylish shirt";
    bottom = "fitted trousers";
    explanation.push("Party outfits allow bold and sharp styling");
  }

  // =========================
  // STYLE VIBE
  // =========================

  if (input.vibe === "minimal") {
    explanation.push("Minimal style keeps everything clean and simple");
  }

  if (input.vibe === "classic") {
    explanation.push("Classic style enhances elegance and polish");
  }

  if (input.vibe === "street") {
    top = "oversized t-shirt";
    bottom = "cargo pants";
    explanation.push("Streetwear gives a relaxed and trendy look");
  }

  if (input.vibe === "traditional") {
    top = "kurta";
    bottom = "churidar";
    explanation.push("Traditional outfits suit cultural occasions");
  }

  // =========================
  // FIT
  // =========================

  if (input.fit === "slim") {
    top = "fitted " + top;
    bottom = "slim-fit " + bottom;
  }

  if (input.fit === "oversized") {
    top = "oversized " + top;
  }

  // =========================
  // GOAL LOGIC
  // =========================

  if (input.goal === "taller") {
    explanation.push("Vertical styling helps create height illusion");
  }

  if (input.goal === "slimmer") {
    explanation.push("Slim fit reduces bulk appearance");
  }

  if (input.goal === "broader") {
    outer = outer || "structured jacket";
    explanation.push("Layering adds visual width");
  }

  // =========================
  // CLIMATE
  // =========================

  let fabric = "balanced fabric";

  if (input.climate === "hot") {
    fabric = "light cotton or linen";
  }

  if (input.climate === "cold") {
    outer = outer || "jacket";
    fabric = "layered warm fabrics";
  }

  // =========================
  // OUTPUT
  // =========================

  document.getElementById("result").innerHTML = `
    <h3>Best Outfit</h3>

    <p><b>Top:</b> ${top}</p>
    <p><b>Bottom:</b> ${bottom}</p>
    ${outer ? `<p><b>Layer:</b> ${outer}</p>` : ""}
    <p><b>Shoes:</b> ${input.footwear || "match with outfit"}</p>
    <p><b>Fabric:</b> ${fabric}</p>

    <p><b>Why it works:</b></p>
    <ul>${explanation.map(e => `<li>${e}</li>`).join("")}</ul>
  `;
}

function get(id) {
  return document.getElementById(id).value;
}
