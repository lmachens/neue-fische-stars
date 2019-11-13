import { random, plusOrMinus } from "./utils.js";

const starDensity = 3;
const starRadius = 1;
const starRadiusJitter = 0.5;
const starVelocity = 0.03;
const starVelocityJitter = 0.1;
const foregroundHue = 0;
const foregroundSaturation = 0;
const foregroundLightness = 30;
const foregroundHueJitter = 0;
const foregroundSaturationJitter = 0;
const foregroundLightnessJitter = 0.2;

export function calculateNumberOfStars({ width, height }) {
  return parseInt((starDensity * (width * height)) / 5000);
}

export function createStars({ width, height, numberOfStars }) {
  return new Array(numberOfStars).fill().map((_, index) => ({
    id: index,
    x: random(0 + starRadius, width - starRadius),
    y: random(0 + starRadius, height - starRadius),
    r: starRadius * random(1 - starRadiusJitter, 1 + starRadiusJitter),
    hue: foregroundHue + random(1, 360) * foregroundHueJitter * plusOrMinus(),
    saturation:
      foregroundSaturation *
      random(1 - foregroundSaturationJitter, 1 + foregroundSaturationJitter),
    lightness:
      foregroundLightness *
      random(1 - foregroundLightnessJitter, 1 + foregroundLightnessJitter),
    opacity: 100,
    vx:
      starVelocity *
      random(1 - starVelocityJitter, 1 + starVelocityJitter) *
      plusOrMinus(),
    vy:
      starVelocity *
      random(1 - starVelocityJitter, 1 + starVelocityJitter) *
      plusOrMinus()
  }));
}

export function move({ width, height, star }) {
  if (star.x <= 0 + star.r || star.x >= width) {
    star.vx = -star.vx;
  }
  if (star.y <= 0 + star.r || star.y >= height) {
    star.vy = -star.vy;
  }
  star.x += star.vx;
  star.y += star.vy;
}

export function draw({ context, star }) {
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
