export function createCanvas() {
  const canvas = document.createElement("canvas");
  return canvas;
}

export function resize({ parent, canvas }) {
  canvas.width = parent.offsetWidth;
  canvas.height = parent.offsetHeight;
}

export function appendCanvas({ parent, canvas }) {
  parent.appendChild(canvas);
}

export function setStyles({
  canvas,
  backgroundHue,
  backgroundSaturation,
  backgroundLightness
}) {
  canvas.style.backgroundColor =
    "hsl(" +
    backgroundHue +
    "," +
    backgroundSaturation +
    "%," +
    backgroundLightness +
    "%)";
}
