export function createCanvas() {
  const canvas = document.createElement("canvas");
  canvas.style.backgroundColor = "#050505";
  return canvas;
}

export function resize({ width, height, canvas }) {
  canvas.width = width;
  canvas.height = height;
}
