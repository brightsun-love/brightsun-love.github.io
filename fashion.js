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
    style: get("style"),
    styleType: get("styleType"),
    footwear: get("footwear")
  };

  let explanation = [];
  let avoid = [];

  let palette = input.undertone === "warm"
    ? ["beige", "olive", "brown"]
    : ["white", "grey", "black"];

  let top = palette[0] + " shirt";
  let bottom = "dark trousers";

  // PROPORTION
  if (input.height === "short" || input.goal === "taller") {
    explanation.push("Vertical styling makes you look taller");
    avoid.push("Avoid strong color breaks");
  }

  if (input.goal === "slimmer") {
    explanation.push("Slim fit reduces bulk");
    avoid.push("Avoid oversized clothes");
  }

  // BODY
  if (input.bodyShape === "triangle") {
    explanation.push("Lighter top balances lower body");
  }

  if (input.bodyShape === "inverted") {
    explanation.push("Darker top balances upper body");
  }

  if (input.bodyShape === "oval") {
    explanation.push("Vertical lines reduce stomach focus");
  }

  // CLIMATE
  let fabric = input.climate === "hot"
    ? "cotton / linen"
    : "layered fabrics";

  // STYLE TYPE (NEW)
  if (input.styleType === "traditional") {
    top = "traditional kurta";
    explanation.push("Traditional style suits cultural settings");
  }

  if (input.styleType === "modern") {
    explanation.push("Modern style gives a clean Western look");
  }

  if (input.styleType === "mix") {
    explanation.push("Mixing styles gives versatile appearance");
  }

  // RESULT
  document.getElementById("result").innerHTML = `
    <h3>Best Outfit</h3>
    <p><b>Top:</b> ${top}</p>
    <p><b>Bottom:</b> ${bottom}</p>
    <p><b>Shoes:</b> ${input.footwear}</p>
    <p><b>Fabric:</b> ${fabric}</p>

    <p><b>Why it works:</b></p>
    <ul>${explanation.map(e => `<li>${e}</li>`).join("")}</ul>

    <p><b>Avoid:</b></p>
    <ul>${avoid.map(a => `<li>${a}</li>`).join("")}</ul>
  `;
}

function get(id) {
  return document.getElementById(id).value;
}
