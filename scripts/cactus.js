import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

const SPEED = 0.05;
const CACTUS_INTERVAL_MIN = 500;
const CACTUS_INTERVAL_MAX = 2000;

let nextCactusTime;

const worldElement = document.querySelector("[data-world");

export function setUpCactus() {
  nextCactusTime = CACTUS_INTERVAL_MIN;
  document
    .querySelectorAll("[data-cactus]")
    .forEach((cactus) => cactus.remove());
}
export function updateCactus(delta, speedScale) {
  document.querySelectorAll("[data-cactus]").forEach((cactus) => {
    incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1);
    if (getCustomProperty(cactus, "--left") <= -100) {
      cactus.remove();
    }
  });
  if (nextCactusTime <= 0) {
    createCactus();
    nextCactusTime =
      randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) /
      speedScale;
  }
  nextCactusTime -= delta;
}
function createCactus() {
  const cactus = document.createElement("img");
  cactus.src = "imgs/cactus.png";
  cactus.dataset.cactus = true;
  cactus.classList.add("cactus");
  setCustomProperty(cactus, "--left", 100);
  worldElement.appendChild(cactus);
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export function getCactusRects() {
  return [...document.querySelectorAll("[data-cactus]")].map((cactus) => {
    return cactus.getBoundingClientRect();
  });
}
