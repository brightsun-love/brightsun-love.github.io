function score(o, input, attr) {

  let s = 60; // base (neutral starting point)

  // =========================
  // 🔹 1. PROPORTION (MOST IMPORTANT)
  // =========================
  if (attr.silhouette === "vertical") {
    if (input.height === "short" || input.goal === "taller") {
      s += 15;
    } else {
      s += 5;
    }
  }

  // Penalize bad proportion
  if (input.height === "short" && o.top !== o.bottom) {
    s -= 10;
  }

  // =========================
  // 🔹 2. FIT (CRITICAL)
  // =========================
  if (input.goal === "slimmer") {
    if (o.bottom.includes("slim")) s += 12;
    else s -= 12;
  }

  if (input.fit === "oversized" && input.goal === "slimmer") {
    s -= 10;
  }

  // =========================
  // 🔹 3. BODY SHAPE BALANCE
  // =========================
  if (input.bodyShape === "triangle") {
    if (o.top.includes("light") || o.top.includes("white")) s += 8;
    else s -= 5;
  }

  if (input.bodyShape === "inverted") {
    if (o.top.includes("dark") || o.top.includes("black")) s += 8;
    else s -= 5;
  }

  if (input.bodyShape === "oval") {
    if (o.top.includes("slim") || o.top.includes("vertical")) s += 8;
    else s -= 6;
  }

  // =========================
  // 🔹 4. CONTEXT (OCCASION + CLIMATE)
  // =========================
  if (input.occasion === "formal" && o.top.includes("shirt")) {
    s += 10;
  } else if (input.occasion === "formal") {
    s -= 8;
  }

  if (input.climate === "hot" && o.fabric.includes("cotton")) {
    s += 8;
  }

  if (input.climate === "hot" && o.fabric.includes("layered")) {
    s -= 8;
  }

  // =========================
  // 🔹 5. COLOR COMPATIBILITY
  // =========================
  if (attr.palette.length) s += 8;

  if (input.contrast === "high" && o.top.includes("contrast")) {
    s += 6;
  }

  // =========================
  // 🔹 6. STYLE ALIGNMENT
  // =========================
  if (input.vibe === "minimal" && o.name === "Safe") s += 10;
  if (input.vibe === "classic" && o.name === "Balanced") s += 10;
  if (input.vibe === "street" && o.name === "Bold") s += 10;

  if (input.vibe === "traditional" && o.top.includes("kurta")) {
    s += 12;
  }

  // =========================
  // 🔹 NORMALIZE (OPTIONAL)
  // =========================
  if (s > 100) s = 100;
  if (s < 0) s = 0;

  return s;
}
