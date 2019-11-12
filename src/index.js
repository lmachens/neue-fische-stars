import { createStars, draw } from "./lib/stars.js";
import { resize, createCanvas, appendCanvas, setStyles } from "./lib/canvas.js";
import { drawFish, hightlightRandomStudent } from "./lib/fish.js";

const students = [
  {
    dx: 0,
    dy: 0,
    size: 1,
    name: "Omid Arzani"
  },
  {
    dx: -1.1,
    dy: -3.2,
    size: 1,
    name: "Cristina Merisoiu"
  },
  {
    dx: 5,
    dy: 1.5,
    size: 1,
    name: "Hanna Frauenkorn"
  },
  {
    dx: -5,
    dy: -1.3,
    size: 1,
    name: "Jonas Munsch"
  },
  {
    dx: 5.8,
    dy: -1.6,
    size: 1,
    name: "Jose Antonio Teran"
  },
  {
    dx: 3.9,
    dy: -6.0,
    size: 1,
    name: "Jürgen Baltres"
  },
  {
    dx: 4.6,
    dy: 3.5,
    size: 1,
    name: "Julian Toscani"
  },
  {
    dx: 1.9,
    dy: 5.9,
    size: 1,
    name: "Lena Kastenmeier"
  },
  {
    dx: -6.8,
    dy: -2,
    size: 1,
    name: "Lukas Kreidenweis"
  },
  {
    dx: -5.8,
    dy: 0,
    size: 1,
    name: "Philipp Mäcke"
  }
];

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
resize({ parent: demo, canvas });

const numberOfStars = parseInt(
  (starDensity * (canvas.width * canvas.height)) / 5000
);
const stars = createStars({
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
setStyles({ canvas, backgroundHue, backgroundSaturation, backgroundLightness });

let mouseX = 0;
let mouseY = 0;

setInterval(() => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  // stars.forEach(star => connections(star, stars));
  stars.forEach(star => draw({ canvas, context, star }));
  drawFish({ context, canvas, students, mouseX, mouseY });
}, 15);

window.addEventListener(
  "resize",
  () => {
    resize({ parent: demo, canvas });
  },
  false
);
window.addEventListener(
  "mousemove",
  event => {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
  },
  false
);

hightlightRandomStudent(students);
