export function random(min, max) {
  return min + Math.random() * (max - min);
}

export function plusOrMinus() {
  return Math.random() > 0.5 ? -1 : 1;
}

export function waitFor(miliseconds) {
  return new Promise(resolve => {
    setTimeout(resolve, miliseconds);
  });
}

export function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}
