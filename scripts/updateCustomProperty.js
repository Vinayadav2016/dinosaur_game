export function getCustomProperty(obj, propertyName) {
  return parseFloat(getComputedStyle(obj).getPropertyValue(propertyName));
}

export function setCustomProperty(obj, propertyName, value) {
  obj.style.setProperty(propertyName, value);
}

export function incrementCustomProperty(obj, property, increment) {
  let currentValue = getCustomProperty(obj, property);
  setCustomProperty(obj, property, currentValue + increment);
}
