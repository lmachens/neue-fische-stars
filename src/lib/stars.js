import { random, plusOrMinus } from "./utils.js";

export function createStars({
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
}) {
  return new Array(numberOfStars).fill().map((_, index) => ({
    id: index,
    x: random(0 + starRadius, canvas.width - starRadius),
    y: random(0 + starRadius, canvas.height - starRadius),
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

function move({ canvas, star }) {
  if (star.x <= 0 + star.r || star.x >= canvas.width) star.vx = -star.vx;
  if (star.y <= 0 + star.r || star.y >= canvas.height) star.vy = -star.vy;
  star.x += star.vx;
  star.y += star.vy;
}

export function draw({ canvas, context, star }) {
  move({ canvas, star });
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

// function connections(sourceStar, list) {
//   const neighbors = list.filter(star => {
//     return (
//       star.id != sourceStar.id &&
//       Math.abs(sourceStar.x - star.x) < connectionRadius &&
//       Math.abs(sourceStar.y - star.y) < connectionRadius
//     );
//   });
//   let t;
//   sourceStar.opacity = neighbors.length / 10;
//   neighbors.forEach(neighbor => {
//     t = connectionOpacity;
//     if (
//       Math.abs(sourceStar.x - mx) < revealRadius &&
//       Math.abs(sourceStar.y - my) < revealRadius
//     ) {
//       t +=
//         1 -
//         (Math.abs(sourceStar.x - mx) + Math.abs(sourceStar.y - my)) /
//           2 /
//           revealRadius;
//     }
//     context.beginPath();
//     context.moveTo(sourceStar.x, sourceStar.y);
//     context.lineTo(neighbor.x, neighbor.y);
//     context.strokeStyle =
//       "hsla(" +
//       sourceStar.hue +
//       "," +
//       sourceStar.saturation +
//       "%," +
//       sourceStar.lightness +
//       "%," +
//       t +
//       ")";
//     context.lineWidth = connectionWidth;
//     context.stroke();
//     context.closePath();
//   });
// }
