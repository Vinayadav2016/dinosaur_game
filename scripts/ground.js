import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

const SPEED = 0.05;
const groundElements = document.querySelectorAll("[data-ground]");

export function setUpGround() {
  setCustomProperty(groundElements[0], "--left", 0);
  setCustomProperty(groundElements[1], "--left", 300);
}

// delta = frame rate time, speedScale = to increase the speed of the ground as difficulty level of game increases.
export function updateGround(delta, speedScale) {
  groundElements.forEach((element) => {
    // Move the ground element to the left by delta * speed * speedScale * -1, negative sign is to make the ground moving leftwards.
    incrementCustomProperty(element, "--left", delta * SPEED * speedScale * -1);
    // left <=-300 means the element has crossed the screen since width was 300
    if (getCustomProperty(element, "--left") <= -300) {
      incrementCustomProperty(element, "--left", 600); // Reset position to the right side of the another element i.e ground
    }
  });
}
