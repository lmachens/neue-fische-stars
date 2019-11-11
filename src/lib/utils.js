export function random(min, max) {
  return min + Math.random() * (max - min);
}

export function plusOrMinus() {
  return Math.random() > 0.5 ? -1 : 1;
}
