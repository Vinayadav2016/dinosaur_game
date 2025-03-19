import { getCactusRects, setUpCactus, updateCactus } from "./cactus.js";
import { getDinoRect, setDinoLose, setUpDino, updatedDino } from "./dino.js";
import { setUpGround, updateGround } from "./ground.js";

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00001;

const worldElement = document.querySelector("[data-world]");
const scoreElement = document.querySelector("[data-score]");
const StartScreenElement = document.querySelector("[data-start-screen]");

setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);

window.addEventListener("keydown", handleStart, { once: true });

function setPixelToWorldScale() {
  let pixelToWorldScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    pixelToWorldScale = window.innerWidth / WORLD_WIDTH;
  } else {
    pixelToWorldScale = window.innerHeight / WORLD_HEIGHT;
  }
  worldElement.style.width = `${WORLD_WIDTH * pixelToWorldScale}px`;
  worldElement.style.height = `${WORLD_HEIGHT * pixelToWorldScale}px`;
}

let lastTime;
let speedScale;
let score;
function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return; // Skip the first frame to avoid any visible stuttering.This is especially important for games that rely on physics calculations.
  }
  const delta = time - lastTime;

  // Update the world state here For example, ground, dino,cactus etc.
  updateSpeedScale(delta);
  updateCactus(delta, speedScale);
  updatedDino(delta, speedScale);
  updateGround(delta, speedScale);
  updateScore(delta);
  if (checkLose()) {
    return handleLose();
  }
  lastTime = time;
  window.requestAnimationFrame(update);
}

function updateScore(delta) {
  score += delta * 0.01; // every 100ms we get 1 point in the score
  scoreElement.textContent = Math.floor(score); // updating the score on the screen
}
// Increase the speed scale over time to simulate a gradual increase in difficulty
function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE;
}

// Start the game when the user presses a key
function handleStart() {
  speedScale = 1;
  score = 0;
  lastTime = null;
  StartScreenElement.classList.add("hide");
  setUpCactus();
  setUpDino(); // Set up the dinosaur element
  setUpGround(); // setting up the ground one after the other, to increase the ground length
  window.requestAnimationFrame(update); //gets called when we change the content on our screen, it also differs as per the refresh rate of the screen since only update the screen based on refresh rate
}

function checkLose() {
  const dinoRect = getDinoRect();
  return getCactusRects().some((cactus) => isCollision(cactus, dinoRect));
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  );
}

function handleLose() {
  setDinoLose();
  setTimeout(() => {
    StartScreenElement.classList.remove("hide");
    window.addEventListener("keydown", handleStart, { once: " true" });
  }, 100);
}
