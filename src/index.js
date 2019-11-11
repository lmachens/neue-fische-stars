import { createStars } from "./lib/stars.js";
import { resize, createCanvas, appendCanvas } from "./lib/canvas.js";

// stars
const starDensity = 2;
const starRadius = 1;
const starRadiusJitter = 0.5;
const starVelocity = 0.03;
const starVelocityJitter = 0.1;
const connectionRadius = 70;
const connectionWidth = 0.5;
const connectionOpacity = 0.1;
const revealRadius = 100;
const backgroundHue = 0;
const backgroundSaturation = 0;
const backgroundLightness = 2;
const foregroundHue = 0;
const foregroundSaturation = 0;
const foregroundLightness = 30;
const foregroundHueJitter = 0;
const foregroundSaturationJitter = 0;
const foregroundLightnessJitter = 0.2;

const canvas = createCanvas();
const context = canvas.getContext("2d");

const demo = document.querySelector("#demo");
let stars;

resize({ parent: demo, canvas });

const numberOfStars = parseInt(
  (starDensity * (canvas.width * canvas.height)) / 5000
);
stars = createStars({
  canvas,
  numberOfStars,
  starRadius,
  starRadiusJitter,
  foregroundHue,
  foregroundHueJitter,
  foregroundSaturation,
  foregroundSaturationJitter,
  foregroundLightness,
  foregroundLightnessJitter,
  starVelocity,
  starVelocityJitter
});

appendCanvas({ parent: demo, canvas });
setStyles();

let mx = 0;
let my = 0;

setInterval(drawAll, 15);

window.addEventListener("resize", resize, false);
window.addEventListener("mousemove", mouse, false);

const fishes = createFish();

function createFish() {
  return [
    [-50, 0],
    [-60, 10],
    [-60, -10],
    [-30, 0],
    [-35, 10],
    [-35, -10],
    [-40, 15],
    [-40, -15]
  ].map(([x, y], index) => ({
    id: index,
    r: 1,
    saturation: 100,
    hue: 11,
    lightness: 61,
    opacity: 100,
    vx: 0,
    vy: 0,
    x: canvas.width / 2 - 100 + x,
    y: canvas.height / 2 - 100 + y
  }));
}

function drawAll() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  fishes.forEach(draw);
  // fishes.forEach(fish => connections(fish, fishes));
  // stars.forEach(star => connections(star, stars));
  stars.forEach(draw);
}

function mouse(event) {
  const rect = canvas.getBoundingClientRect();
  (mx = event.clientX - rect.left), (my = event.clientY - rect.top);
}

function connections(sourceStar, list) {
  const neighbors = list.filter(star => {
    return (
      star.id != sourceStar.id &&
      Math.abs(sourceStar.x - star.x) < connectionRadius &&
      Math.abs(sourceStar.y - star.y) < connectionRadius
    );
  });
  let t;
  sourceStar.opacity = neighbors.length / 10;
  neighbors.forEach(neighbor => {
    t = connectionOpacity;
    if (
      Math.abs(sourceStar.x - mx) < revealRadius &&
      Math.abs(sourceStar.y - my) < revealRadius
    ) {
      t +=
        1 -
        (Math.abs(sourceStar.x - mx) + Math.abs(sourceStar.y - my)) /
          2 /
          revealRadius;
    }
    context.beginPath();
    context.moveTo(sourceStar.x, sourceStar.y);
    context.lineTo(neighbor.x, neighbor.y);
    context.strokeStyle =
      "hsla(" +
      sourceStar.hue +
      "," +
      sourceStar.saturation +
      "%," +
      sourceStar.lightness +
      "%," +
      t +
      ")";
    context.lineWidth = connectionWidth;
    context.stroke();
    context.closePath();
  });
}

function setStyles() {
  // styles
  canvas.style.backgroundColor =
    "hsl(" +
    backgroundHue +
    "," +
    backgroundSaturation +
    "%," +
    backgroundLightness +
    "%)";
}

function move(star) {
  if (star.x <= 0 + star.r || star.x >= canvas.width) star.vx = -star.vx;
  if (star.y <= 0 + star.r || star.y >= canvas.height) star.vy = -star.vy;
  star.x += star.vx;
  star.y += star.vy;
}

function draw(star) {
  move(star);
  context.beginPath();
  context.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
  context.fillStyle =
    "hsla(" +
    star.hue +
    "," +
    star.saturation +
    "%," +
    star.lightness +
    "%," +
    (0.1 + star.opacity) +
    ")";
  context.fill();
  context.closePath();
}
