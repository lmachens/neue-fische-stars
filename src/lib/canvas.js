export function createCanvas() {
  const canvas = document.createElement("canvas");
  canvas.style.backgroundColor = "#050505";
  return canvas;
}

export function resize({ app, canvas }) {
  canvas.width = app.offsetWidth;
  canvas.height = app.offsetHeight;
}

export function clear({ canvas }) {
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
}
