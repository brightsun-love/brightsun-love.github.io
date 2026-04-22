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
    footwear: get("footwear")
  };

  let attr = {
    silhouette: "balanced",
    palette: [],
    fabric: "",
    fit: input.fit || "regular",
    base: "casual"
  };

  let explanation = [];
  let avoid = [];

  // PROPORTION
  if (input.height === "short" || input.goal === "taller") {
    attr.silhouette = "vertical";
    explanation.push("Vertical styling creates a taller appearance");
    avoid.push("Avoid strong color breaks");
  }

  if (input.legRatio === "short") {
    explanation.push("Higher waist pants make legs look longer");
  }

  if (input.goal === "slimmer") {
    attr.fit = "slim";
    explanation.push("Slim fit reduces bulk");
    avoid.push("Avoid baggy clothes");
  }

  // BODY
  if (input.bodyShape === "triangle") {
    explanation.push("Lighter top balances lower body");
  }

  if (input.bodyShape === "inverted") {
    explanation.push("Darker top reduces upper body dominance");
  }

  if (input.bodyShape === "oval") {
    attr.silhouette = "vertical";
    explanation.push("Vertical lines reduce stomach focus");
  }

  // COLOR
  if (input.undertone === "warm") {
    attr.palette = ["beige", "olive", "brown"];
  } else {
    attr.palette = ["white", "grey", "black"];
  }

  // CLIMATE
  if (input.climate === "hot") {
    attr.fabric = "cotton / linen";
  } else {
    attr.fabric = "layered fabrics";
  }

  // OUTFITS
  let outfits = [
    {
      name: "Best Option",
      top: attr.palette[0] + " shirt",
      bottom: "dark trousers",
      shoes: input.footwear,
      score: 50,
      explanation: explanation,
      avoid: avoid
    }
  ];

  display(outfits);
}

function get(id) {
  return document.getElementById(id).value;
}

function display(outfits) {
  let html = "<h3>Top Outfit Recommendation</h3>";

  outfits.forEach(o => {
    html += `
      <div style="padding:15px;border:1px solid #ccc;border-radius:10px;">
        <h4>${o.name}</h4>
        <p>Top: ${o.top}</p>
        <p>Bottom: ${o.bottom}</p>
        <p>Shoes: ${o.shoes}</p>

        <p><b>Why:</b></p>
        <ul>${o.explanation.map(e => `<li>${e}</li>`).join("")}</ul>

        <p><b>Avoid:</b></p>
        <ul>${o.avoid.map(a => `<li>${a}</li>`).join("")}</ul>
      </div>
    `;
  });

  document.getElementById("result").innerHTML = html;
}
