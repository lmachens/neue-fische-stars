import {
  createStars,
  draw,
  calculateNumberOfStars,
  move
} from "./lib/stars.js";
import { resize, createCanvas } from "./lib/canvas.js";
import { drawFish } from "./lib/fish.js";
import {
  students,
  drawStudents,
  hightlightRandomStudent
} from "./lib/students.js";

const canvas = createCanvas();
const context = canvas.getContext("2d");
const app = document.querySelector(".app");

resize({ canvas, width: app.offsetWidth, height: app.offsetHeight });
app.appendChild(canvas);

const numberOfStars = calculateNumberOfStars({
  width: canvas.width,
  height: canvas.height
});

const stars = createStars({
  width: canvas.width,
  height: canvas.height,
  numberOfStars
});

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", event => {
  const rect = canvas.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;
});

window.addEventListener("resize", () => {
  resize({ parent: app, canvas });
});

setInterval(() => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    move({ width: canvas.width, height: canvas.height, star });
    draw({ context, star });
  });
  const { zoom } = drawFish({ context, canvas, students, mouseX, mouseY });
  drawStudents({ students, context, canvas, zoom, mouseX, mouseY });
}, 15);

hightlightRandomStudent(students);
