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
