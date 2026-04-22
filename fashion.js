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

  // 🔹 PROPORTION (Height + Goal)
  if (input.height === "short" && input.goal === "taller") {
    attr.silhouette = "vertical";
    attr.colorFlow = "monochrome";
  }

  if (input.goal === "slimmer") {
    attr.fit = "slim";
    attr.colors = "dark tones";
  }

  if (input.goal === "broader") {
    attr.layers = "add layers";
    attr.structure = "strong shoulders";
  }

  // 🔹 BODY SHAPE
  if (input.bodyShape === "triangle") {
    attr.balance = "light top + dark bottom";
  }

  if (input.bodyShape === "inverted") {
    attr.balance = "dark top + light bottom";
  }

  if (input.bodyShape === "oval") {
    attr.fit = "regular";
    attr.silhouette = "vertical flow";
  }

  // 🔹 COLOR ENGINE
  if (input.undertone === "warm") {
    attr.palette = "earthy tones (beige, olive, brown)";
  }

  if (input.undertone === "cool") {
    attr.palette = "cool tones (blue, grey)";
  }

  if (input.contrast === "high") {
    attr.contrast = "high contrast outfits";
  } else {
    attr.contrast = "soft tonal outfits";
  }

  // 🔹 CLIMATE
  if (input.climate === "hot") {
    attr.fabric = "cotton / linen (breathable)";
    attr.layers = "avoid heavy layering";
  }

  if (input.climate === "cold") {
    attr.fabric = "layered fabrics (wool, jackets)";
  }

  // 🔹 OCCASION
  if (input.occasion === "formal") {
    attr.base = "shirt + trousers + formal shoes";
  }

  if (input.occasion === "casual") {
    attr.base = "t-shirt/shirt + jeans + sneakers";
  }

  if (input.occasion === "party") {
    attr.base = "dark outfit + statement piece";
  }

  // 🔹 STYLE
  if (input.style === "minimal") {
    attr.style = "clean neutral look";
  }

  if (input.style === "street") {
    attr.style = "bold + relaxed pieces";
  }

  if (input.style === "classic") {
    attr.style = "timeless formal elements";
  }

  // 🔹 FOOTWEAR
  if (input.footwear === "sneakers") {
    attr.vibe = "casual/smart casual";
  }

  if (input.footwear === "formal") {
    attr.vibe = "formal/clean";
  }

  displayResult(attr);
}

function get(id) {
  return document.getElementById(id).value;
}

function displayResult(attr) {
  document.getElementById("result").innerHTML = `
    <h3>Recommended Style</h3>

    <p><b>Base Outfit:</b> ${attr.base || "balanced outfit"}</p>
    <p><b>Fit:</b> ${attr.fit || "regular fit"}</p>
    <p><b>Color Palette:</b> ${attr.palette || "neutral tones"}</p>
    <p><b>Contrast:</b> ${attr.contrast}</p>
    <p><b>Fabric:</b> ${attr.fabric}</p>
    <p><b>Balance:</b> ${attr.balance || "balanced"}</p>
    <p><b>Style:</b> ${attr.style}</p>
    <p><b>Extra:</b> ${attr.layers || "no extra layering"}</p>
  `;
}
