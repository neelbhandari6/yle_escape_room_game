


const pointerLockEvents = (() => {
  let pointerLockedToCanvas = false;
  let canvas = null;
  const changeLockState = (bool) => (pointerLockedToCanvas = bool);
  const storeCanvasElement = (el) => (canvas = el);

  

  var pointerLockChangedOnDocument = function () {
    var controlEnabled =
      document.pointerLockElement ||
      document.mozPointerLockElement ||
      document.webkitPointerLockElement ||
      document.msPointerLockElement ||
      false;
    if (!controlEnabled) {
      pointerLockedToCanvas = false;
    } else {
      pointerLockedToCanvas = true;
    }
  };

  return {
    init: (canvas) => {
      if (!canvas) return new Error("no canvas");
      storeCanvasElement(canvas);
      canvas.requestPointerLock =
        canvas.requestPointerLock ||
        canvas.msRequestPointerLock ||
        canvas.mozRequestPointerLock ||
        canvas.webkitRequestPointerLock ||
        false;

      document.exitPointerLock =
        document.exitPointerLock ||
        document.mozExitPointerLock ||
        document.webkitExitPointerLock;

      document.addEventListener(
        "pointerlockchange",
        pointerLockChangedOnDocument,
        false
      );
      document.addEventListener(
        "mspointerlockchange",
        pointerLockChangedOnDocument,
        false
      );
      document.addEventListener(
        "mozpointerlockchange",
        pointerLockChangedOnDocument,
        false
      );
      document.addEventListener(
        "webkitpointerlockchange",
        pointerLockChangedOnDocument,
        false
      );
    },
    lockPointerToCanvas: () => {
      if (canvas && !pointerLockedToCanvas && canvas.requestPointerLock) {
          canvas.requestPointerLock();
          canvas.focus();
          
      }
    },
    unlockPointerFromCanvas: () => {
      if (canvas && pointerLockedToCanvas && document.exitPointerLock) {
        document.exitPointerLock();
        }
    },
  };
})();

export default pointerLockEvents;
