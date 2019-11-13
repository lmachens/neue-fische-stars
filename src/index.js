import {
  createStars,
  draw,
  calculateNumberOfStars,
  move
} from "./lib/stars.js";
import { resize, createCanvas, clear } from "./lib/canvas.js";
import { drawFish } from "./lib/fish.js";
import {
  students,
  drawStudents,
  hightlightRandomStudent
} from "./lib/students.js";

const canvas = createCanvas();
const app = document.querySelector(".app");

resize({ app, canvas });
app.appendChild(canvas);

const numberOfStars = calculateNumberOfStars({
  canvas
});

const stars = createStars({
  canvas,
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
  resize({ app, canvas });
});

setInterval(() => {
  clear({ canvas });
  stars.forEach(star => {
    move({ canvas, star });
    draw({ canvas, star });
  });
  const { zoom } = drawFish({ canvas });
  drawStudents({ students, canvas, zoom, mouseX, mouseY });
}, 15);

hightlightRandomStudent(students);
