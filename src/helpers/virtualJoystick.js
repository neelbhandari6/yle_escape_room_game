/*let VJC;
const addJoystick = (scene, canvas) => {
  if (window.outerWidth < 800) {
    // It's mobile
    const leftJoystick = new BABYLON.VirtualJoystick(true);
    const rightJoystick = new BABYLON.VirtualJoystick(true);
    console.log("mobile – adding virtualjoystick");
    BABYLON.VirtualJoystick.Canvas.style.zIndex = "4";
    VJC = new BABYLON.VirtualJoysticksCamera(
      "VJC",
      scene.activeCamera.position,
      scene
    );
    VJC.rotation = scene.activeCamera.rotation;
    VJC.checkCollisions = scene.activeCamera.checkCollisions;
    VJC.applyGravity = scene.activeCamera.applyGravity;
    VJC.angularSensibility = scene.activeCamera.angularSensibility;
    VJC.speed = scene.activeCamera.speed;
    VJC.ellipsoid = scene.activeCamera.ellipsoid;
    // Wait for textures and shaders to be ready
    scene.activeCamera = VJC;
    // Attach camera to canvas inputs
    scene.activeCamera.attachControl(canvas);
  } else {
    console.log("not mobile");
    if (VJC) {
      VJC.dispose();
    }
    // not mobile
    return false;
  }
};
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
const resizeCallback = (scene, canvas) => {
  addJoystick(scene, canvas);
};
const addJoystickOnWindowResize = (scene, canvas) => {
  addJoystick(scene, canvas);
  window.addEventListener("resize", () => resizeCallback(scene, canvas));
};
export default addJoystickOnWindowResize;
*/