import { customCameraHelpers } from "../babylonScene";
import pointerLockEvents from "../helpers/pointerLockEvents";
import {data } from "./data";
import consoleLockPuzzle from "../puzzles/lockconsole";
import {updateGUI} from "./GUI.js"
let meshmodel;
let isLoading = true;
const State = ((bool) => {
  // This closure holds information on box visibility and its content
  let addControlToButton;
  let objectBoxVisible = false;
  let currentMesh = "";
  let meshVisible = "";
  let camera;
  let file = "level_v1.1a_flat.glb"

  const storeCallback = (callback) => {
    addControlToButton = callback;
  };
  const changeMesh = (name, stage) => {
    currentMesh = name;
    if (stage  === "flat") file = "level_v1.1a_flat.glb" 
    if (stage  === "warehouse") file = "level_v1.1_warehouse.glb" 
    if (stage  === "bunker") file = "level_v1.1_bunker.glb" 
  };
  const checkIfMeshLoadNeeded = (scene, gameScene) => {
    if (meshVisible === currentMesh) return false;
    if (meshmodel) meshmodel.dispose();
    meshVisible = currentMesh;
    importMesh(scene, meshVisible, file, gameScene);
    updateCamera();
  };

  const updateCamera = (scene) => {
    if(!data[meshVisible]) return false;
    if (!camera) {
      camera = new BABYLON.UniversalCamera(
        "UniversalCamera",
        new BABYLON.Vector3(0, 2, -10),
        scene
      );
    } else if (camera.position.z !== data[meshVisible].cameraPosition.z) {
      console.log("cam pos change");
      const newPosition = data[meshVisible].cameraPosition;
      camera.position.x = newPosition.x;
      camera.position.y = newPosition.y;
      camera.position.z = newPosition.z;
    }
  };

  const changeVisibility = (bool) => {
    // setTimeout is needed to prevent some mysterious event bubbling

    setTimeout(() => {
      if (bool && addControlToButton) addControlToButton();
    }, 50);

    objectBoxVisible = bool;
  };

  return {
    changeVisibility: (bool) => {if(data[currentMesh]) changeVisibility(bool)},
    storeCallback: (callback) => storeCallback(callback),
    visible: () => objectBoxVisible,
    checkIfMeshLoadNeeded: (scene, gameScene) => checkIfMeshLoadNeeded(scene, gameScene),
    changeMesh: (name, stage) => {

      pointerLockEvents.unlockPointerFromCanvas();
      document.body.style.cursor = "grab";
      changeMesh(name, stage)},
    currentMeshData: () => data[meshVisible],
    updateCamera: (scene) => {
      updateCamera(scene);
    },
    getCameraPosition: () => {if(camera) camera.position},
    getCurrentMeshname: () => meshVisible,
  };
})();




const importMesh = (scene, name, file, gameScene) => {
  isLoading = true;
  updateGUI(scene, true);
  if(!data[name]) return false
  const { position, rotation, scaling } = data[name];
    BABYLON.SceneLoader.ImportMesh([name], "assets/", file, scene, function (
      newMeshes
    ) {
      meshmodel = scene.getMeshByName(name)
      if (
        !meshmodel &&
        newMeshes[1] &&
        newMeshes[1].parent &&
        newMeshes[1].parent.getClassName() === "TransformNode"
      ) {
        meshmodel = newMeshes[1].parent;
      }
      setup();
    });

  function setup () {
    meshmodel.parent = null;
    meshmodel.position = new BABYLON.Vector3(
      position.x,
      position.y,
      position.z
    );
    meshmodel.rotationQuaternion.x = rotation.x;
    meshmodel.rotationQuaternion.y = rotation.y;
    meshmodel.rotationQuaternion.z = rotation.z;
    meshmodel.rotationQuaternion.w = rotation.w;
    meshmodel.rotationOld = meshmodel.rotationQuaternion

    console.log(meshmodel.rotationQuaternion)
    meshmodel.scaling = new BABYLON.Vector3(scaling.x, scaling.y, scaling.z);

    const euler = meshmodel.rotationQuaternion.toEulerAngles();
    meshmodel.rotation = new BABYLON.Vector3(euler.x, euler.y, euler.z);
   isLoading = false;
   updateGUI(scene, false);
  };
};





//variable to check whether mouse is moved or not in each frame
let mousemov = false;
var clicked = false;
var currentPosition = { x: 0, y: 0 };
var currentRotation = { x: 0, y: 0 };
//variables to set last angle and curr angle in each frame
//so we can calculate angleDiff and use it for inertia
var lastAngleDiff = { x: 0, y: 0 };
var oldAngle = { x: 0, y: 0 };
var newAngle = { x: 0, y: 0 };
//framecount reset and max framecount(secs) for inertia
var framecount = 0;
var mxframecount = 120; //4 secs at 60 fps
const eventListeners = (canvas) => {
  canvas.addEventListener("pointerdown", function (evt) {
    if (!meshmodel) return;
    currentPosition.x = evt.clientX;
    currentPosition.y = evt.clientY;
    //   currentRotation.x = meshmodel.rotation.x;
    currentRotation.y = meshmodel.rotation.y;
    clicked = true;
  });

  canvas.addEventListener("pointermove", function (evt) {
    if (clicked) {
      //set mousemov as true if the pointer is still down and moved
      mousemov = true;
    }
    if (!clicked || !meshmodel) {
      return;
    }
    //set last angle before changing the rotation
    oldAngle.x = meshmodel.rotation.x;
    //    oldAngle.y = meshmodel.rotation.y;
    //rotate the mesh
    meshmodel.rotation.y -= (evt.clientX - currentPosition.x) / 200.0;
    //   meshmodel.rotation.x -= (evt.clientY - currentPosition.y) / 300.0;
    //set the current angle after the rotation
    newAngle.x = meshmodel.rotation.x;
    //    newAngle.y = meshmodel.rotation.y;
    //calculate the anglediff
    lastAngleDiff.x = newAngle.x - oldAngle.x;
    //    lastAngleDiff.y = newAngle.y - oldAngle.y;
    currentPosition.x = evt.clientX;
    //    currentPosition.y = evt.clientY;
  });

  canvas.addEventListener("pointerup", function (evt) {
    clicked = false;
  });
  // Move the light with the camerascene.registerBeforeRender(function(){
};

  let once = false


  const viewObjectBox = (engine, canvas, gameScene) => {
  const scene = new BABYLON.Scene(engine);
  scene.autoClear = true
  scene.onPointerDown = () => {
    if (State.visible()) {
      customCameraHelpers.getHelpers().detachControl();
      document.exitPointerLock();
    } else {
      return null;
    }
  };

  var timeoutID;

  //createButton(scene);
  
  eventListeners(canvas);




  scene.beforeRender = function () {
    
    //set mousemov as false everytime before the rendering a frame
    State.checkIfMeshLoadNeeded(scene, gameScene);
    mousemov = false;
  };

  scene.afterRender = function () {
    //we are checking if the mouse is moved after the rendering a frame
    //will return false if the mouse is not moved in the last frame
    //possible drop of 1 frame of animation, which will not be noticed
    //by the user most of the time
    if (!meshmodel) return;
    if (!mousemov && framecount < mxframecount) {
      //console.log(lastAngleDiff);
      //divide the lastAngleDiff to slow or ease the animation
      lastAngleDiff.x = lastAngleDiff.x / 1.1;
      lastAngleDiff.y = lastAngleDiff.y / 1.1;
      //apply the rotation
      //	meshmodel.rotation.x += lastAngleDiff.x;
      meshmodel.rotation.y += lastAngleDiff.y;
      //increase the framecount by 1
      //this doesnt make sense right now as it resets
      //after reaching max and continues in the loop
      //thinking of a way to fix it
      framecount++;
      currentRotation.x = meshmodel.rotation.x;
      currentRotation.y = meshmodel.rotation.y;
    } else if (framecount >= mxframecount) {
      framecount = 0;
    }
  };

  State.updateCamera();
  //Adding a light
  var light = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(-1, -1, 0),
    scene
  );
  light.intensity = 1;
  var light2 = new BABYLON.DirectionalLight("Light", new BABYLON.Vector3(0, 0, 1), scene);
  light2.intensity = 1;
  if (window.location.hash === "#debug2") {
    scene.debugLayer.show();
  }

  window.getMeshdata = () => {
    const data = scene.getMeshByName(State.getCurrentMeshname());
    console.log(data)
    const parsedData = {
      position: data.position,
      rotation: data.rotationQuaternion,
      scaling: data.scaling,
    };

    console.log(JSON.stringify(parsedData, null, 2));

    return parsedData;
  };

  scene.registerBeforeRender(function () {
    light.position = State.getCameraPosition();
    if (State.currentMeshData())
      if (
        meshmodel &&
        meshmodel.rotation &&
        State.currentMeshData().animatedRotate
      ) {
        meshmodel.rotation.y += 0.01;
      }
  });

  return scene;
};

export { viewObjectBox, State as objectBoxState };
