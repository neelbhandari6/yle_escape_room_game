// Näitä ei ilmeisesti enää käytetä niin kommentoitu
//import deleteObjectOnPick from "./helpers/deleteObjectOnPick.js";
//import virtualJoystick from "./helpers/virtualJoystick.js";
//import addMetadataToMesh from "./helpers/addMetadataToMesh.js";

import "pepjs";
import * as dat from "dat.gui";
import * as GLTFValidator from "gltf-validator";
import * as earcut from "earcut";
import "babylonjs";
import "babylonjs-materials";
import "babylonjs-inspector";
import "babylonjs-procedural-textures";
import "babylonjs-post-process";
import "babylonjs-loaders";
import "babylonjs-serializers";
import buildTwitter from "./puzzles/twitter/index.js";
import buildFacebookFlat from "./puzzles/facebook/flat.js";
import buildFacebookWarehouse from "./puzzles/facebook/warehouse.js";
import buildFacebookBunker from "./puzzles/facebook/bunker.js";
import magazineOnTable from "./puzzles/magazine/index.js";
import cameraPuzzle from "./puzzles/camera/index.js";
import clockPuzzle from "./puzzles/clock";
import buildControlPanel from "./puzzles/electricControlPanel";
import buildLockConsole from "./puzzles/lockconsole";
import buildWallSwitch from "./puzzles/wallSwitch";
import buildExtra from "./puzzles/extra.js";
import "./index.css";
import pointerLockEvents from "./helpers/pointerLockEvents";
import { displayLoadingUI, hideLoadingUI } from "./helpers/loadingScreen.js";
import { assetsManager } from "./helpers/assetsManager";
import { viewObjectBox, objectBoxState } from "./viewObjectIn3D";
//import * as GUI from 'babylonjs-gui';
import {checkTipGlow } from "./helpers/checkGlow";
import {
  flatDoors as loadFlatDoors,
  warehouseDoors as loadWarehouseDoors,
} from "./animatedObjects/doors.js";
import { userChoiceTracker } from "./helpers/userChoiceTracker";
import { tips, TipWindow} from "~src/tips/index.js";
import { shortcuts, shortcutDetected} from "./helpers/shortcuts";
//siirretty tähän ulkopuolelle jotta muutkin moduulit voi käyttää
export const frameRate = 30;




  export let doorTriggers = {
    //  When door meshes are loaded (either in babylonScene.js helpers/shortcuts.js), this object has following function properties which each opens one door:
    // usage: doorTriggers.openFlatCorridor();
    // openFlatCorridor,
    // openWarehouse,
    // openExit
    // openBunker
  };


  export const saveDoorTriggers = (data) => {
     doorTriggers = {...doorTriggers, ...data} 
  }
BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = displayLoadingUI;
BABYLON.DefaultLoadingScreen.prototype.hideLoadingUI = hideLoadingUI;
// Scene *********************************************************************************************************
var createScene = function (engine, canvas) {
  var scene = new BABYLON.Scene(engine);
  // deleteObjectOnPick(scene);
  engine.enableOfflineSupport = false;
  engine.doNotHandleContextLost = true;
  scene.clearCachedVertexData();
        scene.cleanCachedTextureBuffer();
     //   var hl1 = new BABYLON.HighlightLayer("hl1", scene);
     //   var hl2 = new BABYLON.HighlightLayer("hl2", scene);
        //Painovoima
  
  scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
  // Container
  var container = new BABYLON.AssetContainer(scene);
  var material = new BABYLON.StandardMaterial("kosh", scene);
  // Instrumentation
  var instrumentation = new BABYLON.EngineInstrumentation(engine);
  instrumentation.captureGPUFrameTime = true;
  instrumentation.captureShaderCompilationTime = true;

  //Collision Enabled
  scene.collisionsEnabled = true;
  //#region camera(pelaajan näkymä), ohjaus
  var camera = new BABYLON.UniversalCamera(
    "UniversalCamera",
    new BABYLON.Vector3(5, 14, -10),
    scene
  );
  //new BABYLON.Vector3(54.14, 6.5, -80.78), //warehousen ovi
  //new BABYLON.Vector3(85.54, 6.47, -199.98), // kellon edusta
  //aloitus ovi koordinaatit (5, 14, -10), varasto-koordi (54, 7, -130), bunkkeri-koordi (169, -15, -161)
/*  var parameters = {
    //edge_blur: 0.1,
    dof_aperture: 2,
    // etc.
  };
  var lensEffect = new BABYLON.LensRenderingPipeline('lensEffects', parameters, scene, 1.0, camera); */
  //pelaajan kameran (hahmon) painovoima ja collision
  // katselunopeus, liikkumisnopeus
  camera.fov = 0.9;
  camera.angularSensibility = 3500;
  camera.speed = 0.75;
  camera.checkCollisions = true;
  camera.applyGravity = true;
  camera.rotation.y = 1.6;
  camera.ellipsoid = new BABYLON.Vector3(2, 7, 2);
  camera.keysUp.push(87);
  camera.keysDown.push(83);
  camera.keysRight.push(68);
  camera.keysLeft.push(65);
  camera.attachControl(canvas, true);

  scene.onPointerDown = function (evt) {
    pointerLockEvents.lockPointerToCanvas();
    castRay();
  };

  // mobiilipuoli ei toimi kunnolla, virtualJoystick, optimointi, tehtäväikkunat pitää korjata
  // Virtual joystick --- ei toimi täydellisesti - pitää korjata
  if (window.outerWidth < 800) {
    // It's mobile
    let adt = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    let xAddPos = 0;
    let yAddPos = 0;
    let xAddRot = 0;
    let yAddRot = 0;
    let sideJoystickOffset = 40;
    let bottomJoystickOffset = -30;
    let translateTransform;

    let leftThumbContainer = makeThumbArea("leftThumb", 2, "blue", null);
    leftThumbContainer.height = "35%";
    leftThumbContainer.width = "25%";
    leftThumbContainer.isPointerBlocker = true;
    leftThumbContainer.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    leftThumbContainer.verticalAlignment =
      BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    leftThumbContainer.alpha = 0.5;
    leftThumbContainer.left = sideJoystickOffset;
    leftThumbContainer.top = bottomJoystickOffset;

    let leftInnerThumbContainer = makeThumbArea(
      "leftInnterThumb",
      4,
      "blue",
      null
    );
    leftInnerThumbContainer.height = "20%";
    leftInnerThumbContainer.width = "20%";
    leftInnerThumbContainer.isPointerBlocker = true;
    leftInnerThumbContainer.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    leftInnerThumbContainer.verticalAlignment =
      BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    let leftPuck = makeThumbArea("leftPuck", 0, "blue", "blue");
    leftPuck.height = "10%";
    leftPuck.width = "10%";
    leftPuck.isPointerBlocker = true;
    leftPuck.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    leftPuck.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    leftThumbContainer.onPointerDownObservable.add(function (coordinates) {
      leftPuck.isVisible = true;
      leftPuck.floatLeft =
        coordinates.x -
        leftThumbContainer._currentMeasure.width * 0.5 -
        sideJoystickOffset;
      leftPuck.left = leftPuck.floatLeft;
      leftPuck.floatTop =
        adt._canvas.height -
        coordinates.y -
        leftThumbContainer._currentMeasure.height * 0.5 +
        bottomJoystickOffset;
      leftPuck.top = leftPuck.floatTop * -1;
      leftPuck.isDown = true;
      leftThumbContainer.alpha = 0.3;
    });

    leftThumbContainer.onPointerUpObservable.add(function (coordinates) {
      xAddPos = 0;
      yAddPos = 0;
      leftPuck.isDown = false;
      leftPuck.isVisible = false;
      leftThumbContainer.alpha = 0.2;
    });

    leftThumbContainer.onPointerMoveObservable.add(function (coordinates) {
      if (leftPuck.isDown) {
        xAddPos =
          coordinates.x -
          leftThumbContainer._currentMeasure.width * 0.5 -
          sideJoystickOffset;
        yAddPos =
          adt._canvas.height -
          coordinates.y -
          leftThumbContainer._currentMeasure.height * 0.5 +
          bottomJoystickOffset;
        leftPuck.floatLeft = xAddPos;
        leftPuck.floatTop = yAddPos * -1;
        leftPuck.left = leftPuck.floatLeft;
        leftPuck.top = leftPuck.floatTop;
      }
    });

    adt.addControl(leftThumbContainer);
    leftThumbContainer.addControl(leftInnerThumbContainer);
    leftThumbContainer.addControl(leftPuck);
    leftPuck.isVisible = false;

    let rightThumbContainer = makeThumbArea("rightThumb", 2, "red", null);
    rightThumbContainer.height = "35%";
    rightThumbContainer.width = "25%";
    rightThumbContainer.isPointerBlocker = true;
    rightThumbContainer.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    rightThumbContainer.verticalAlignment =
      BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    rightThumbContainer.alpha = 0.5;
    rightThumbContainer.left = -sideJoystickOffset;
    rightThumbContainer.top = bottomJoystickOffset;

    let rightInnerThumbContainer = makeThumbArea(
      "rightInnterThumb",
      4,
      "red",
      null
    );
    rightInnerThumbContainer.height = "20%";
    rightInnerThumbContainer.width = "20%";
    rightInnerThumbContainer.isPointerBlocker = true;
    rightInnerThumbContainer.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    rightInnerThumbContainer.verticalAlignment =
      BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    let rightPuck = makeThumbArea("rightPuck", 0, "red", "red");
    rightPuck.height = "10%";
    rightPuck.width = "10%";
    rightPuck.isPointerBlocker = true;
    rightPuck.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    rightPuck.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    rightThumbContainer.onPointerDownObservable.add(function (coordinates) {
      rightPuck.isVisible = true;
      rightPuck.floatLeft =
        adt._canvas.width -
        coordinates.x -
        rightThumbContainer._currentMeasure.width * 0.5 -
        sideJoystickOffset;
      rightPuck.left = rightPuck.floatLeft * -1;
      rightPuck.floatTop =
        adt._canvas.height -
        coordinates.y -
        rightThumbContainer._currentMeasure.height * 0.5 +
        bottomJoystickOffset;
      rightPuck.top = rightPuck.floatTop * -1;
      rightPuck.isDown = true;
      rightThumbContainer.alpha = 0.9;
    });

    rightThumbContainer.onPointerUpObservable.add(function (coordinates) {
      xAddRot = 0;
      yAddRot = 0;
      rightPuck.isDown = false;
      rightPuck.isVisible = false;
      rightThumbContainer.alpha = 0.4;
    });

    rightThumbContainer.onPointerMoveObservable.add(function (coordinates) {
      if (rightPuck.isDown) {
        xAddRot =
          adt._canvas.width -
          coordinates.x -
          rightThumbContainer._currentMeasure.width * 0.5 -
          sideJoystickOffset;
        yAddRot =
          adt._canvas.height -
          coordinates.y -
          rightThumbContainer._currentMeasure.height * 0.5 +
          bottomJoystickOffset;
        rightPuck.floatLeft = xAddRot * -1;
        rightPuck.floatTop = yAddRot * -1;
        rightPuck.left = rightPuck.floatLeft;
        rightPuck.top = rightPuck.floatTop;
      }
    });

    adt.addControl(rightThumbContainer);
    rightThumbContainer.addControl(rightInnerThumbContainer);
    rightThumbContainer.addControl(rightPuck);
    rightPuck.isVisible = false;

    camera.attachControl(canvas, true);
    let alpha = 0;
    scene.registerBeforeRender(function () {
      translateTransform = BABYLON.Vector3.TransformCoordinates(
        new BABYLON.Vector3(xAddPos / 3000, 0, yAddPos / 3000),
        BABYLON.Matrix.RotationY(camera.rotation.y)
      );
      camera.cameraDirection.addInPlace(translateTransform);
      camera.cameraRotation.y += (xAddRot / 15000) * -1;
      camera.cameraRotation.x += (yAddRot / 15000) * -1;

    });

    function makeThumbArea(name, thickness, color, background, curves) {
      let rect = new BABYLON.GUI.Ellipse();
      rect.name = name;
      rect.thickness = thickness;
      rect.color = color;
      rect.background = background;
      rect.paddingLeft = "0px";
      rect.paddingRight = "0px";
      rect.paddingTop = "0px";
      rect.paddingBottom = "0px";
      return rect;
    }
  }
  /* const resizeCallback = (scene, canvas) => {
  addJoystick(scene, canvas);
};

const addJoystickOnWindowResize = (scene, canvas) => {
  addJoystick(scene, canvas);
  window.addEventListener("resize", () => resizeCallback(scene, canvas));
};

export default addJoystickOnWindowResize; */
  //#endregion

  //#region Valot
  var light = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(0, -1, 0),
    scene
  );
  light.diffuse = new BABYLON.Color3(0.95, 0.82, 0.73, 0.78);
  light.specular = new BABYLON.Color3(0, 0, 0);
  light.groundColor = new BABYLON.Color3(0.93, 0.8, 1, 0.57);
  light.intensity = 0.25;

  //#endregion

  //#region Optimointi
  /*
// Optimatization testing start
    engine.enableOfflineSupport = false;

    engine.setHardwareScalingLevel(1);


        // Options (target 30fps (which is not possible) with a check every 500ms)
        var options = new BABYLON.SceneOptimizerOptions(30, 500);
        options.addOptimization(new BABYLON.HardwareScalingOptimization(0, 1));

        // Optimizer
        var optimizer = new BABYLON.SceneOptimizer(scene, options);

        // UI
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        var panel = new BABYLON.GUI.StackPanel();
        panel.isVertical = false;
        panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        panel.zIndex = "5";
        advancedTexture.addControl(panel);

        var addButton = function (text, callback) {
            var button = BABYLON.GUI.Button.CreateSimpleButton("button", text);
            button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
           // button.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            button.width = "100px";
            button.height = "30px";
            button.color = "white";
            button.background = "green";
            button.paddingLeft = "10px";
            button.paddingRight = "10px";
            button.onPointerUpObservable.add(function () {
                callback();
            });
            panel.addControl(button);
        }

        // Log
        var logPanel = new BABYLON.GUI.StackPanel();
        logPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        logPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        advancedTexture.addControl(logPanel);

        var logText = new BABYLON.GUI.TextBlock();
        logText.height = "40px";
        logText.color = "white";
        logText.fontSize = 24;
        logPanel.addControl(logText);

        // Buttons
        addButton("Start", function () {
            optimizer.start();
            logText.text = "State: Running";
        });

        addButton("Reset", function () {
            optimizer.reset();
        });

        addButton("Stop", function () {
            optimizer.stop();
            logText.text = "State: Stopped";
        });

        // Wiring
        optimizer.onSuccessObservable.add(function () {
            logText.text = "State: Done";
        });
        optimizer.onNewOptimizationAppliedObservable.add(function (optim) {
            var currentPriorityText = new BABYLON.GUI.TextBlock();
            currentPriorityText.height = "30px";
            currentPriorityText.color = "white";
            currentPriorityText.fontSize = 18;
            currentPriorityText.text = optim.getDescription();
            logPanel.addControl(currentPriorityText);
        });
        optimizer.onFailureObservable.add(function () {
            logText.text = "State: Failed. Frame rate was " + optimizer.currentFrameRate;
        });

// Optimatization testing end */

  // Blocker for dirty mechanism
  scene.blockMaterialDirtyMechanism = true;
  // lisä-juttuja optimointiin
  BABYLON.OBJFileLoader.OPTIMIZE_WITH_UV = true;
  BABYLON.OBJFileLoader.MATERIAL_LOADING_FAILS_SILENTLY = false;
  //#endregion'


  const loadAtStart = (() => {
    assetsManager.init(BABYLON, scene);
    if(!shortcutDetected() === "object") return false;
    assetsManager.loadLevelCollision();
    assetsManager.loadFlat();
    checkTipGlow(scene);
      if (!shortcutDetected()) {
        // if using shortcuts, we do the assetsManager update in helpers/shortcuts.js
       assetsManager.update({ loadingScreen: true });
         scene.onReadyObservable.add(() => {
        tips.goToComputer.setTime(60);
        loadFlatDoors(scene, frameRate).then((e) => {
          doorTriggers = { ...doorTriggers, ...e };
        });
        assetsManager.update({ loadingScreen: true });
    });
  }
  
  })();

  //#endregion

  var crosshair = BABYLON.Mesh.CreateDisc("crosshair", 0.01, 12, scene);
  // crosshair tulee kaiken muun päälle
  crosshair.renderingGroupId = 1;
  // billboardin avulla käännettynä aina ruutuun päin
  crosshair.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
  crosshair.visibility = 1;
  // crosshair saa kameran position
  crosshair.position = camera.getTarget();
  console.log(crosshair.position);




  // These hold information on how many times doors have been clicked – used to display tips
  let whDoorClicked = 0;
  let buDoorClicked = 0;

  // RAYcasting
  function castRay() {

    const warehouseDoor = scene.getMeshByName("hinge2")
    const bunkerDoor = scene.getMeshByName("hinge3")
    //kameran(pelaajan näkövinkkelistä tuleva ray) 10-20 on hyvä matka noin käden mitta
    var ray = camera.getForwardRay(20);
    /* // tämä laittaa rayn näkymään
let rayHelper = new BABYLON.RayHelper(ray); 
rayHelper.show(scene);  */
    const meshesWithActivators = [
      // this LIST consists of objects containing two things:
      // 1: MESH - catches if clicked AND in collision with ray
      // 2. CALLBACK
      {
        mesh: warehouseDoor,
        callback: () => {
          if (whDoorClicked > 2) {
            tips.isThereALock.setTime(0);
          }
          whDoorClicked++;
        },
      },
      {
        mesh: bunkerDoor,
        callback: () => {
          if (buDoorClicked > 2) {
            tips.familiarPicturesInMagazine.setTime(0);
          }
          buDoorClicked++;
        },
      },

      { mesh: flatPuzzle1, callback: buildTwitter },
      { mesh: flatPuzzle2, callback: buildFacebookFlat },
      {
        mesh: flatPuzzle3,
        callback: () => {
          // MATRIX-JULISTE
          window.setTimeout(tips.wayOut.clear, 2000);
          objectBoxState.changeMesh("Huone1_Juliste_matrix", "flat");
          objectBoxState.changeVisibility(true);
        },
      },

      { mesh: warehousePuzzle1, callback: buildFacebookWarehouse },
      {
        mesh: warehousePuzzle2,
        callback: () => {
          magazineOnTable();
          window.setTimeout(tips.familiarPicturesInMagazine.clear, 1000);
          window.setTimeout(tips.lookAtTable.clear, 1000);
        },
      },
      //   {mesh: warehousePuzzle3, callback: buildPuzzle7},
      {
        mesh: warehousePuzzle4,
        callback: () => {
          // check if it's finished already
          if (userChoiceTracker.retrieve().clockPuzzle) return false;
          const callback = async () => {
            assetsManager.loadBunker();
            await assetsManager.update({ async: true, loadingScreen: true });
            bunkerDoorSound.play();
            musicFlat.stop();
            musicWarehouse.stop();
            musicBunker.play();
            userChoiceTracker.addOpenedDoor("bunker");
            doorTriggers.openBunker();
            tips.familiarPicturesInMagazine.clear();
            checkTipGlow(scene);
            tips.familiarPicturesInMagazine.clear();
            tips.somePicturesInFirstRoom.clear();
            tips.clockPicturesInFirstRoom.clear();
            tips.lookAtTable.clear();
            tips.whereWiresLeadTo.setTime(60);
            window.setTimeout(tips.clockPicturesInFirstRoom.clear, 1000)
          };

          clockPuzzle(callback);
        },
      },
      {
        mesh: bunkerPuzzle1,
        callback: () => {
          console.log(scene);
          buildControlPanel(scene, electricPanelSoundSet);
          tips.whereWiresLeadTo.clear();
        },
      },
      { mesh: bunkerPuzzle2, callback: buildFacebookBunker },
      {
        mesh: flatLockConsole,
        callback: () => {
          window.setTimeout(tips.whomToTrust.clear, 2000);

          const cameraHelpers = {
            attachControl: () => camera.attachControl(canvas, true),
            detachControl: () =>
              camera.detachControl(document.querySelector("canvas")),
          };
          buildLockConsole(() => {
                    tips.goToComputer.clear();
                    tips.whomToTrust.clear();
                    tips.lookAtPoster.clear();
            cameraHelpers.detachControl();
            assetsManager.loadWarehouse();
            assetsManager
              .update({ loadingScreen: true, async: true })
              .then((error) => {
                // "warehouse should be loaded, let's load the door leading to from warehouse to bunker & open the door corridor --> warehouse door"
                loadWarehouseDoors(scene, frameRate)
                  .then((e) => {
                    const lukkokonsoliOpen = scene.getMeshByName(
                      "huone1_Lukkokonsoli"
                    );
                    if (lukkokonsoliOpen) lukkokonsoliOpen.visibility = 0;
                    doorTriggers = { ...doorTriggers, ...e };
                    doorTriggers.openWarehouse();
                    cameraHelpers.attachControl();
                    tips.lookAtTable.setTime(60);
    checkTipGlow(scene);
                    warehouseDoorSound.play();
                    musicFlat.stop();
                    musicWarehouse.play();
                    userChoiceTracker.addOpenedDoor("warehouse");
                  })
                  .catch((error) => {
                    console.log(error);
                    cameraHelpers.attachControl();
                  });
              })
              .catch((error) => {
                console.log("error");
                cameraHelpers.attachControl();
                console.log(camera);
                console.log(error);
              });
          });
        },
      },

      {
        mesh: flatDoorKnob,
        callback: () => {
          if (
            doorTriggers.openFlatCorridor &&
            userChoiceTracker.openedDoors.indexOf("flatCorridor") < 0
          ) {
            doorTriggers.openFlatCorridor();
            userChoiceTracker.addOpenedDoor("flatCorridor");
            fcDoorSound.play();
            flatDoorKnob.dispose();
            flatDoorKnob = null;
          }
        },
      },
      {
        mesh: flatPosterSafari,
        callback: () => {
          buildWallSwitch(doorTriggers.openExit, exitDoorsSoundSet);
        },
      },
      {
        mesh: flatExtra1,
        callback: () => {
          objectBoxState.changeMesh("Huone1_Telkkari", "flat");
          objectBoxState.changeVisibility(true);
        },
      },
      {
        mesh: flatExtra2,
        callback: () => {
          objectBoxState.changeMesh("Huone1_Juliste_Pieni002", "flat");
          objectBoxState.changeVisibility(true);
        },
      },
      {
        mesh: flatExtra3,
        callback: () => {
          window.setTimeout(tips.somePicturesInFirstRoom.clear, 1000);
          cameraPuzzle();
        },
      },
      {
        mesh: flatExtra4,
        callback: () => {
          objectBoxState.changeMesh("Huone1_Loisteputki_06", "flat");
          objectBoxState.changeVisibility(true);
        },
      },
      {
        mesh: flatExtra5,
        callback: () => {
          objectBoxState.changeMesh("Huone1_Kirjat_poyta", "flat");
          objectBoxState.changeVisibility(true);
        },
      },
      {
        mesh: flatExtra6,
        callback: () => {
          objectBoxState.changeMesh("Huone1_Kirjat_lattia", "flat");
          objectBoxState.changeVisibility(true);
        },
      },
      {
        mesh: flatExtra7,
        callback: () => {
          objectBoxState.changeMesh("Huone1_Kirjat_patja", "flat");
          objectBoxState.changeVisibility(true);
        },
      },
      {
        mesh: flatExtra8,
        callback: () => {
          objectBoxState.changeMesh("Huone1_Juliste_pieni001", "flat");
          objectBoxState.changeVisibility(true);
        },
      },
      {
        mesh: flatExtra9,
        callback: () => {
          objectBoxState.changeMesh("Huone1_energiajuoma_VIHJE", "flat");
          objectBoxState.changeVisibility(true);
        },
      },
      {
        mesh: flatExtra10,
        callback: () => {
          objectBoxState.changeMesh("Huone1_jalkapallo_VIHJE", "flat");
          objectBoxState.changeVisibility(true);
        },
      },
      {
        mesh: flatExtra11,
        callback: () => {
          objectBoxState.changeMesh("Huone1_Lapio_VIHJE", "flat");
          objectBoxState.changeVisibility(true);
        },
      },
    // PUHELIMET 3KPL
    
      {
        mesh: flatExtra12,
        callback: () => TipWindow(scene),
      },
      {
        mesh: warehouseExtra16,
        callback: () => TipWindow(scene),
      },
      {
        mesh: bunkerExtra4,
        callback: () => TipWindow(scene),
      },
      {
        mesh: warehouseExtra1,
        callback: () => {
          objectBoxState.changeMesh("Huone2_Jakoavain_VIHJE", "warehouse");
          objectBoxState.changeVisibility(true);
        },
      },
      {
        mesh: warehouseExtra2,
        callback: () => {
          objectBoxState.changeMesh("Huone2_Vaokuva03", "warehouse");
          objectBoxState.changeVisibility(true);
        },
      },
      {
        mesh: warehouseExtra3,
        callback: () => {
          objectBoxState.changeMesh("Huone2_kanisteri002", "warehouse");
          objectBoxState.changeVisibility(true);
        },
      },
      {
        mesh: warehouseExtra4,
        callback: () => {
          objectBoxState.changeMesh("Huone2_kanisteriKelta_003", "warehouse");
          objectBoxState.changeVisibility(true);
        },
      },
      {
        mesh: warehouseExtra5,
        callback: () => {
          objectBoxState.changeMesh(
            "Huone2_kanisteriKelta__VIHJE_004",
            "warehouse"
          );
          objectBoxState.changeVisibility(true);
        },
      },
      {
        mesh: warehouseExtra6,
        callback: () => {
          objectBoxState.changeMesh("Huone2_kanisterit_02", "warehouse");
          objectBoxState.changeVisibility(true);
        },
      },
      {
        mesh: warehouseExtra7,
        callback: () => {
          objectBoxState.changeMesh("Huone2_Radio", "warehouse");
          objectBoxState.changeVisibility(true);
        },
      },
      {
        mesh: warehouseExtra8,
        callback: () => {
          objectBoxState.changeMesh("Huone2_ruuvimeisselit", "warehouse");
          objectBoxState.changeVisibility(true);
        },
      },
      {
        mesh: warehouseExtra9,
        callback: () => {
          objectBoxState.changeMesh("Huone2_Sakset", "warehouse");
          objectBoxState.changeVisibility(true);
        },
      },
      {
        mesh: warehouseExtra10,
        callback: () => {
          objectBoxState.changeMesh("Huone2_Spraymaali002", "warehouse");
          objectBoxState.changeVisibility(true);
        },
      },
      {
        mesh: warehouseExtra11,
        callback: () => {
          objectBoxState.changeMesh("Huone2_Spraymaali005", "warehouse");
          objectBoxState.changeVisibility(true);
        },
      },
      {
        mesh: warehouseExtra12,
        callback: () => {
          objectBoxState.changeMesh("Huone2_Spraymaali007", "warehouse");
          objectBoxState.changeVisibility(true);
        },
      },
      {
        mesh: warehouseExtra13,
        callback: () => {
          objectBoxState.changeMesh("Huone2_Teippirulla", "warehouse");
          objectBoxState.changeVisibility(true);
        },
      },
      {
        mesh: warehouseExtra14,
        callback: () => {
          objectBoxState.changeMesh("Huone2_Vasara", "warehouse");
          objectBoxState.changeVisibility(true);
        },
      },
      {
        mesh: warehouseExtra15,
        callback: () => {
          objectBoxState.changeMesh("Huone2_vessapaperirullat", "warehouse");
          objectBoxState.changeVisibility(true);
        },
      },
      {
        mesh: bunkerExtra1,
        callback: () => {
          objectBoxState.changeMesh("Huone3_Puulaatikko_VIHJE", "bunker");
          objectBoxState.changeVisibility(true);
        },
      },
      {
        mesh: bunkerExtra2,
        callback: () => {
          objectBoxState.changeMesh("Huone3_Kirja", "bunker");
          objectBoxState.changeVisibility(true);
        },
      },
      {
        mesh: bunkerExtra3,
        callback: () => {
          objectBoxState.changeMesh("Huone3_kirjoja_Vihje", "bunker");
          objectBoxState.changeVisibility(true);
        },
      },
    ];

    // 1/3 check if there is a collision with any of the meshes specified above
    const checkCollisions = scene.pickWithRay(
      ray,
      (mesh) => meshesWithActivators.map((e) => e.mesh).indexOf(mesh) > -1
    );
    if (checkCollisions.pickedMesh) {
      // 2/3 ok there is a collision, let's check which callback to run
      const arr = meshesWithActivators.filter(
        (e) => e.mesh === checkCollisions.pickedMesh
      );
      // 3/3 if callback found, let's run it
      if (arr.length > 0) arr[0].callback();
    }
  }
  //#endregion

  //#region Muita modeleita ja partikeleita

  //#region
  
  //#region Tv-ruutu
	var tvScreenVideo = BABYLON.MeshBuilder.CreatePlane("planeTv",{width: 12.5, height: 6.3}, scene);
    tvScreenVideo.position = new BABYLON.Vector3(39,9.5,-5.2);
    tvScreenVideo.rotation.y = -0.35;
	var tvScreenVideoMat = new BABYLON.StandardMaterial("m", scene);
	var tvScreenVideoVidTex = new BABYLON.VideoTexture("tvSuhina","assets/Telkkari_suhina2.mp4", scene);
	tvScreenVideoMat.diffuseTexture = tvScreenVideoVidTex;
	tvScreenVideoMat.roughness = 1;
	tvScreenVideoMat.emissiveColor = new BABYLON.Color3.White();
	tvScreenVideo.material = tvScreenVideoMat;
  //#endregion

  //#region  Collision imposters
  // Flat/Huoneisto collision objektien ympärille
  var flatBox1 = BABYLON.MeshBuilder.CreateBox(
    "f_box1",
    { height: 2, width: 20, depth: 8, updatable: false, text: true },
    scene
  );
  flatBox1.position = new BABYLON.Vector3(24.3, 8, -44);
  flatBox1.visibility = 0;
  flatBox1.checkCollisions = true;
  flatBox1.freezeWorldMatrix = true;

  var flatBox2 = flatBox1.clone("f_box2");
  flatBox2.position = new BABYLON.Vector3(78, 7, -41);
  flatBox2.scaling.x = 0.9;
  flatBox2.rotation.y = 1.5;

  var flatBox3 = flatBox1.clone("f_box3");
  flatBox3.position = new BABYLON.Vector3(38.5, 7, -1);
  flatBox3.scaling.x = 0.7;

  var flatBox4 = flatBox1.clone("f_box4");
  flatBox4.position = new BABYLON.Vector3(49.3, 7, -20);
  flatBox4.scaling.x = 0.4;
  flatBox4.scaling.z = 1.2;
  flatBox4.rotation.y = 0.93;

  var flatBox5 = flatBox1.clone("f_box5");
  flatBox5.position = new BABYLON.Vector3(67, 7, -1.5);
  flatBox5.scaling.x = 0.2;

  var flatBox6 = flatBox1.clone("f_box6");
  flatBox6.position = new BABYLON.Vector3(3.1, 7, -50);
  flatBox6.rotation.y = 1.55;

  var flatBox7 = flatBox1.clone("f_box7");
  flatBox7.position = new BABYLON.Vector3(39.6, 7, -44.6);
  flatBox7.scaling.z = 0.3;
  flatBox7.scaling.x = 0.1;
  flatBox7.scaling.y = 2;

  var flatBox8 = flatBox1.clone("f_box8");
  flatBox8.position = new BABYLON.Vector3(30, 7, -38.33);
  flatBox8.scaling.z = 0.5;
  flatBox8.scaling.x = 0.2;
  flatBox8.scaling.y = 2.5;

  var flatExit = flatBox1.clone("f_exit");
  flatExit.position = new BABYLON.Vector3(-15, -1, -10);
  flatExit.scaling.z = 2.5;
  flatExit.scaling.x = 2.5;
  flatExit.scaling.y = 0.1;

  // Warehouse/varasto collision objektien ympärille
  var warehouseBox1 = BABYLON.MeshBuilder.CreateBox(
    "w_box1",
    { height: 10, width: 18, depth: 7, updatable: false, text: true },
    scene
  );
  warehouseBox1.position = new BABYLON.Vector3(66, 2.5, -223);
  warehouseBox1.visibility = 0;
  warehouseBox1.checkCollisions = true;
  warehouseBox1.freezeWorldMatrix = true;

  var warehouseBox2 = warehouseBox1.clone("w_box2");
  warehouseBox2.position = new BABYLON.Vector3(37, -3, -221);
  warehouseBox2.scaling.x = 1.2;
  warehouseBox2.scaling.z = 0.9;
  warehouseBox2.rotation.y = 0.5;

  var warehouseBox3 = warehouseBox1.clone("w_box3");
  warehouseBox3.position = new BABYLON.Vector3(32, 0, -146.5);
  warehouseBox3.scaling.z = 5.9;
  warehouseBox3.scaling.x = 0.4;

  var warehouseBox4 = warehouseBox1.clone("w_box4");
  warehouseBox4.position = new BABYLON.Vector3(36, 2.5, -103);
  warehouseBox4.scaling.x = 0.8;
  warehouseBox4.scaling.z = 1.5;

  var warehouseBox5 = warehouseBox1.clone("w_box5");
  warehouseBox5.position = new BABYLON.Vector3(75, -5, -136.5);
  warehouseBox5.scaling.x = 0.5;
  warehouseBox5.scaling.z = 2.5;

  var warehouseBox6 = warehouseBox1.clone("w_box6");
  warehouseBox6.position = new BABYLON.Vector3(37, -5, -166);
  warehouseBox6.scaling.x = 0.15;
  warehouseBox6.scaling.z = 1.7;

  var warehouseBox7 = warehouseBox1.clone("w_box7");
  warehouseBox7.position = new BABYLON.Vector3(34, -5, -180);
  warehouseBox7.scaling.x = 0.1;
  warehouseBox7.scaling.z = 2.1;
  warehouseBox7.rotation.y = -0.4;

  var warehouseBox8 = warehouseBox1.clone("w_box8");
  warehouseBox8.position = new BABYLON.Vector3(76, -5, -205);
  warehouseBox8.scaling.x = 0.1;
  warehouseBox8.scaling.z = 2;
  warehouseBox8.rotation.y = 0.45;

  var warehouseBox9 = warehouseBox1.clone("w_box9");
  warehouseBox9.position = new BABYLON.Vector3(73, -5, -101);
  warehouseBox9.scaling.x = 0.1;
  warehouseBox9.scaling.z = 1;

  var warehouseBox10 = warehouseBox1.clone("w_box10");
  warehouseBox10.position = new BABYLON.Vector3(125, -8.5, -196);
  warehouseBox10.scaling.x = 0.1;
  warehouseBox10.scaling.z = 2.7;
  warehouseBox10.scaling.y = 0.1;

  // Bunker/bunkkeri collision objektien ympärille
  var bunkerBox1 = BABYLON.MeshBuilder.CreateBox(
    "b_box1",
    { height: 2, width: 26, depth: 10, updatable: false, text: true },
    scene
  );
  bunkerBox1.position = new BABYLON.Vector3(192, -26, -144);
  bunkerBox1.visibility = 0;
  bunkerBox1.checkCollisions = true;
  bunkerBox1.rotation.y = 1.15;

  var bunkerBox2 = bunkerBox1.clone("b_box2");
  bunkerBox2.position = new BABYLON.Vector3(185, -25, -151);
  bunkerBox2.scaling.x = 0.43;
  bunkerBox2.scaling.z = 1.8;
  bunkerBox2.scaling.y = 2;
  bunkerBox2.rotation.y = 0.75;

  var bunkerBox3 = bunkerBox1.clone("b_box3");
  bunkerBox3.position = new BABYLON.Vector3(138, -33, -130);
  bunkerBox3.scaling.x = 0.5;
  bunkerBox3.scaling.z = 1.8;
  bunkerBox3.scaling.y = 0.9;
  bunkerBox3.rotation.y = 0.45;

  var bunkerBox4 = bunkerBox1.clone("b_box4");
  bunkerBox4.position = new BABYLON.Vector3(136, -31.8, -134);
  bunkerBox4.scaling.x = 0.48;
  bunkerBox4.scaling.z = 1.6;
  bunkerBox4.scaling.y = 2;
  bunkerBox4.rotation.y = 0.45;

  var bunkerBox5 = bunkerBox1.clone("b_box5");
  bunkerBox5.position = new BABYLON.Vector3(135, -30, -135);
  bunkerBox5.scaling.x = 0.5;
  bunkerBox5.scaling.z = 1.2;
  bunkerBox5.scaling.y = 2.2;
  bunkerBox5.rotation.y = 0.45;

  var bunkerBox6 = bunkerBox1.clone("b_box6");
  bunkerBox6.position = new BABYLON.Vector3(133, -30, -146);
  bunkerBox6.scaling.x = 0.2;
  bunkerBox6.scaling.z = 1;
  bunkerBox6.scaling.y = 3.5;
  bunkerBox6.rotation.y = 0.75;

  var bunkerBox7 = bunkerBox1.clone("b_box7");
  bunkerBox7.position = new BABYLON.Vector3(133, -5, -205);
  bunkerBox7.scaling.x = 0.6;
  bunkerBox7.scaling.z = 0.5;
  bunkerBox7.scaling.y = 3.5;
  bunkerBox7.rotation.y = 0;

  var bunkerBox8 = bunkerBox1.clone("b_box8");
  bunkerBox8.position = new BABYLON.Vector3(160, -30, -197);
  bunkerBox8.scaling.x = 1;
  bunkerBox8.scaling.z = 2;
  bunkerBox8.scaling.y = 5;
  bunkerBox8.rotation.y = 0;

  var bunkerBox9 = bunkerBox1.clone("b_box9");
  bunkerBox9.position = new BABYLON.Vector3(132.8, -30, -183);
  bunkerBox9.scaling.x = 0.6;
  bunkerBox9.scaling.z = 0.8;
  bunkerBox9.scaling.y = 3;
  bunkerBox9.rotation.y = 1.4;

  //pöly ikkunasta - flat
  var dustPlane = BABYLON.MeshBuilder.CreatePlane(
    "taso1",
    { size: 30, updatable: true, text: false },
    scene
  );
  dustPlane.position = new BABYLON.Vector3(12.5, 7, -26);
  dustPlane.rotation.z = 1.2;
  dustPlane.visibility = 0;
  dustPlane.diffuseColor = new BABYLON.Color3(1, 1, 1);
  dustPlane.useRadianceOverAlpha = false;
  dustPlane.useSpecularOverAlpha = false;

  //pöly katosta - warehouse
  var dustPlane2 = BABYLON.MeshBuilder.CreatePlane(
    "taso2",
    { size: 50, updatable: true, text: false },
    scene
  );
  dustPlane2.position = new BABYLON.Vector3(55, 27, -122);
  dustPlane2.rotation.x = 4.71;
  dustPlane2.visibility = 0;
  dustPlane2.diffuseColor = new BABYLON.Color3(1, 1, 1);
  dustPlane2.useRadianceOverAlpha = false;
  dustPlane2.useSpecularOverAlpha = false;

  //pöly katosta - bunker
  var dustPlane3 = BABYLON.MeshBuilder.CreatePlane(
    "taso3",
    { size: 10, updatable: true, text: false },
    scene
  );
  dustPlane3.position = new BABYLON.Vector3(210, 55, -140);
  dustPlane3.rotation.x = 4.71;
  dustPlane3.visibility = 0;
  dustPlane3.diffuseColor = new BABYLON.Color3(1, 1, 1);
  dustPlane3.useRadianceOverAlpha = false;
  dustPlane3.useSpecularOverAlpha = false;
  //#endregion

  //#region Tehtävät/puzzles ja muut aktivoitavat objektit

  //#region  Flat/Huone1 aktivoitavat objektit

  // Tehtävät/puzzles
  // Flat Puzzle1 - Tietokone 1, jossa Twitter-tehtävä
  var flatPuzzle1 = BABYLON.MeshBuilder.CreateBox(
    "fPuzzle1",
    { height: 4, width: 6.7, depth: 0.1, updatable: true, text: true },
    scene
  );
  flatPuzzle1.position = new BABYLON.Vector3(22, 12, -45);
  flatPuzzle1.visibility = 0;
  flatPuzzle1.rotation.y = 3.8;

  // Flat Puzzle2 - Tietokone 2, jossa lopun tehtävä
  var flatPuzzle2 = BABYLON.MeshBuilder.CreateBox(
    "fPuzzle2",
    { height: 3.5, width: 6.7, depth: 0.1, updatable: false, text: true },
    scene
  );
  flatPuzzle2.position = new BABYLON.Vector3(76.3, 11.2, -40.3);
  flatPuzzle2.visibility = 0;
  flatPuzzle2.rotation.y = 2.1;

  // Flat Puzzle3 - Juliste, löytyy salasana jolla pääsee Tietokone 1
  var flatPuzzle3 = BABYLON.MeshBuilder.CreateBox(
    "fPuzzle3",
    { height: 13, width: 9, depth: 0.5, updatable: false, text: true },
    scene
  );
  flatPuzzle3.position = new BABYLON.Vector3(70, 17, -0.2);
  flatPuzzle3.visibility = 0;

  // Flat LockConsole - lukkokonsoli, jolla aukeaa ovi huoneen 1. ja 2. välillä
  var flatLockConsole = BABYLON.MeshBuilder.CreateBox(
    "fLockConsole",
    { height: 3.5, width: 2.5, depth: 0.1, updatable: false, text: true },
    scene
  );
  flatLockConsole.position = new BABYLON.Vector3(54, 5.5, -92);
  flatLockConsole.visibility = 0;

  // Muut huoneen 1. tärkeät objektit
  // Flat - puuoven aktivaattori
  var flatDoorKnob = BABYLON.MeshBuilder.CreateBox(
    "fDoorKnob",
    { height: 20, width: 10, depth: 0.3, updatable: false, text: true },
    scene
  );
  flatDoorKnob.position = new BABYLON.Vector3(63.5, 10, -50);
  flatDoorKnob.visibility = 0;

  // Flat - safari-juliste, 2D kuva, joka antaa vinkki lopun tehtävään
  var flatPosterSafari = BABYLON.MeshBuilder.CreateBox(
    "fPostSafari",
    { height: 12, width: 8.5, depth: 1, updatable: false, text: true },
    scene
  );
  flatPosterSafari.position = new BABYLON.Vector3(41.7, 15.2, -49.7);
  flatPosterSafari.visibility = 0;

  // Huoneen 1. extra objektit

  // Flat - televisio 2D lähikuva
  var flatExtra1 = BABYLON.MeshBuilder.CreateBox(
    "fExtra1",
    { height: 7.25, width: 13, depth: 0.5, updatable: false, text: true },
    scene
  );
  flatExtra1.position = new BABYLON.Vector3(39, 9.2, -5.5);
  flatExtra1.visibility = 0;
  flatExtra1.rotation.y = -0.315;

  // Flat - keskikokoinen juliste 2D lähikuva
  var flatExtra2 = BABYLON.MeshBuilder.CreateBox(
    "fExtra2",
    { height: 4.2, width: 3, depth: 0.3, updatable: false, text: true },
    scene
  );
  flatExtra2.position = new BABYLON.Vector3(72.5, 5.2, -0.3);
  flatExtra2.visibility = 0;

  // Flat - kamera
  var flatExtra3 = BABYLON.MeshBuilder.CreateBox(
    "fExtra3",
    { height: 2.5, width: 2, depth: 2.7, updatable: false, text: true },
    scene
  );
  flatExtra3.position = new BABYLON.Vector3(8, 11.5, -0.5);
  flatExtra3.visibility = 0;

  // Flat - valotikut nurkassa
  var flatExtra4 = BABYLON.MeshBuilder.CreateBox(
    "fExtra4",
    { height: 12, width: 8, depth: 8, updatable: false, text: true },
    scene
  );
  flatExtra4.position = new BABYLON.Vector3(5, 5, -45);
  flatExtra4.visibility = 0;

  // Flat - kirjat tietokonepöydällä
  var flatExtra5 = BABYLON.MeshBuilder.CreateBox(
    "fExtra5",
    { height: 3, width: 3, depth: 3, updatable: false, text: true },
    scene
  );
  flatExtra5.position = new BABYLON.Vector3(31, 10, -48);
  flatExtra5.visibility = 0;

  // Flat - kirjat lattialla tuolin vieressä
  var flatExtra6 = BABYLON.MeshBuilder.CreateBox(
    "fExtra6",
    { height: 2, width: 5.5, depth: 3, updatable: false, text: true },
    scene
  );
  flatExtra6.position = new BABYLON.Vector3(42.5, 0, -21);
  flatExtra6.visibility = 0;
  flatExtra6.rotation.y = 0.75;

  // Flat - kirjat lattialla patjan vieressä
  var flatExtra7 = BABYLON.MeshBuilder.CreateBox(
    "fExtra7",
    { height: 0.7, width: 2.5, depth: 2, updatable: false, text: true },
    scene
  );
  flatExtra7.position = new BABYLON.Vector3(64.2, 1, -1.5);
  flatExtra7.visibility = 0;

  // Flat - pieni juliste 2D kuva
  var flatExtra8 = BABYLON.MeshBuilder.CreateBox(
    "fExtra8",
    { height: 3, width: 2, depth: 0.3, updatable: false, text: true },
    scene
  );
  flatExtra8.position = new BABYLON.Vector3(76.3, 8.8, -0.3);
  flatExtra8.visibility = 0;

  // Flat - tölkki
  var flatExtra9 = BABYLON.MeshBuilder.CreateBox(
    "fExtra9",
    { height: 2.5, width: 0.75, depth: 0.75, updatable: false, text: true },
    scene
  );
  flatExtra9.position = new BABYLON.Vector3(21, 9.6, -42);
  flatExtra9.visibility = 0;

  // Flat - pallo
  var flatExtra10 = BABYLON.MeshBuilder.CreateBox(
    "fExtra10",
    { height: 2.6, width: 2.6, depth: 2.6, updatable: false, text: true },
    scene
  );
  flatExtra10.position = new BABYLON.Vector3(47.85, 1.3, -47.9);
  flatExtra10.visibility = 0;

  // Flat - lapio
  var flatExtra11 = BABYLON.MeshBuilder.CreateBox(
    "fExtra11",
    { height: 16, width: 2.6, depth: 2.6, updatable: false, text: true },
    scene
  );
  flatExtra11.position = new BABYLON.Vector3(73.5, 1, -89.3);
  flatExtra11.visibility = 0;
  flatExtra11.rotation.x = -0.25;

  // Flat - puhelin
  var flatExtra12 = BABYLON.MeshBuilder.CreateBox(
    "flatPuhelin",
    { height: 2, width: 2.5, depth: 2.5, updatable: false, text: true },
    scene
  );
  flatExtra12.position = new BABYLON.Vector3(48, 4, -17);
  flatExtra12.visibility = 0;

  //#endregion

  //#region Warehouse/Huone2 aktivoitavat objektit

  // Tehtävät/puzzles
  // Warehouse Puzzle1 - tietokone, lopun tehtävään
  var warehousePuzzle1 = BABYLON.MeshBuilder.CreateBox(
    "whPuzzle1",
    { height: 4, width: 6, depth: 0.1, updatable: false, text: true },
    scene
  );
  warehousePuzzle1.position = new BABYLON.Vector3(38, 4.5, -219);
  warehousePuzzle1.visibility = 0;
  warehousePuzzle1.rotation.y = 0.9;

  // Warehouse Puzzle2 - lehti, jossa aktivoituu 2D kuva
  var warehousePuzzle2 = BABYLON.MeshBuilder.CreateBox(
    "whPuzzle2",
    { height: 1, width: 2.7, depth: 2.3, updatable: false, text: true },
    scene
  );
  warehousePuzzle2.position = new BABYLON.Vector3(74.5, 0.7, -135.5);
  warehousePuzzle2.visibility = 0;
  warehousePuzzle2.rotation.y = -0.3;
  /* //näitä objekteja ei ole vielä
// Warehouse Puzzle3 - kamera, josta kuvia mitä selata
var warehousePuzzle3 = BABYLON.MeshBuilder.CreateBox("whPuzzle3",{height: 1, width: 2.7, depth: 2.3, updatable: false, text: true },scene);
    warehousePuzzle3.position = new BABYLON.Vector3(74.5, 0.7, -135.5);
    warehousePuzzle3.visibility = 1;
    warehousePuzzle3.rotation.y = -0.3;
*/
  // Warehouse Puzzle4 - kellolukko, johon pitää aktivoida oikea aika
  var warehousePuzzle4 = BABYLON.MeshBuilder.CreateBox(
    "whPuzzle4",
    { height: 8, width: 1.8, depth: 5.35, updatable: false, text: true },
    scene
  );
  warehousePuzzle4.position = new BABYLON.Vector3(122, 5.3, -196);
  warehousePuzzle4.visibility = 0;

  // Huoneen 2. extra objektit

  // Warehouse - jakoavain
  var warehouseExtra1 = BABYLON.MeshBuilder.CreateBox(
    "whExtra1",
    { height: 0.2, width: 0.6, depth: 2.6, updatable: false, text: true },
    scene
  );
  warehouseExtra1.position = new BABYLON.Vector3(72.8, 0.36, -133.2);
  warehouseExtra1.visibility = 0;
  warehouseExtra1.rotation.y = -1.1;

  // Warehouse - kuvat seinällä 2D lähikuva
  var warehouseExtra2 = BABYLON.MeshBuilder.CreateBox(
    "whExtra2",
    { height: 6, width: 0.1, depth: 9, updatable: false, text: true },
    scene
  );
  warehouseExtra2.position = new BABYLON.Vector3(79.8, 7.2, -134.5);
  warehouseExtra2.visibility = 0;

  // Warehouse - kanisteri002
  var warehouseExtra3 = BABYLON.MeshBuilder.CreateBox(
    "whExtra3",
    { height: 4.5, width: 4.5, depth: 4.5, updatable: false, text: true },
    scene
  );
  warehouseExtra3.position = new BABYLON.Vector3(34.39, 20.3, -154.4);
  warehouseExtra3.visibility = 0;

  // Warehouse - kanisteri keltainen
  var warehouseExtra4 = BABYLON.MeshBuilder.CreateBox(
    "whExtra4",
    { height: 5.5, width: 5, depth: 6.5, updatable: false, text: true },
    scene
  );
  warehouseExtra4.position = new BABYLON.Vector3(60, 7.5, -221.54);
  warehouseExtra4.visibility = 0;

  // Warehouse - kanisteri v
  var warehouseExtra5 = BABYLON.MeshBuilder.CreateBox(
    "whExtra5",
    { height: 9, width: 6, depth: 2.5, updatable: false, text: true },
    scene
  );
  warehouseExtra5.position = new BABYLON.Vector3(84.89, -5, -206);
  warehouseExtra5.rotation.y = 0.33;
  warehouseExtra5.visibility = 0;

  // Warehouse - kanisterit 02
  var warehouseExtra6 = BABYLON.MeshBuilder.CreateBox(
    "whExtra6",
    { height: 7, width: 6, depth: 8.5, updatable: false, text: true },
    scene
  );
  warehouseExtra6.position = new BABYLON.Vector3(34, -6, -135);
  warehouseExtra6.visibility = 0;

  // Warehouse - radio
  var warehouseExtra7 = BABYLON.MeshBuilder.CreateBox(
    "whExtra7",
    { height: 3.5, width: 4.5, depth: 1.6, updatable: false, text: true },
    scene
  );
  warehouseExtra7.position = new BABYLON.Vector3(76.7, 2, -141.18);
  warehouseExtra7.visibility = 0;
  warehouseExtra7.rotation.y = -1.1;

  // Warehouse - ruuvimeisselit
  var warehouseExtra8 = BABYLON.MeshBuilder.CreateBox(
    "whExtra8",
    { height: 0.4, width: 2.3, depth: 2.7, updatable: false, text: true },
    scene
  );
  warehouseExtra8.position = new BABYLON.Vector3(72.2, 0.45, -143.65);
  warehouseExtra8.visibility = 0;

  // Warehouse - sakset
  var warehouseExtra9 = BABYLON.MeshBuilder.CreateBox(
    "whExtra9",
    { height: 0.2, width: 2.5, depth: 2, updatable: false, text: true },
    scene
  );
  warehouseExtra9.position = new BABYLON.Vector3(34, -1.19, -130.77);
  warehouseExtra9.visibility = 0;

  // Warehouse - spraymaalit pöydällä
  var warehouseExtra10 = BABYLON.MeshBuilder.CreateBox(
    "whExtra10",
    { height: 2.6, width: 2.5, depth: 2.5, updatable: false, text: true },
    scene
  );
  warehouseExtra10.position = new BABYLON.Vector3(78.12, 1.75, -131.43);
  warehouseExtra10.visibility = 0;

  // Warehouse - spraymaalit
  var warehouseExtra11 = BABYLON.MeshBuilder.CreateBox(
    "whExtra11",
    { height: 3, width: 3.5, depth: 3.5, updatable: false, text: true },
    scene
  );
  warehouseExtra11.position = new BABYLON.Vector3(33.3, 6.64, -153.06);
  warehouseExtra11.visibility = 0;

  // Warehouse - spraymaalit 007
  var warehouseExtra12 = BABYLON.MeshBuilder.CreateBox(
    "whExtra12",
    { height: 4, width: 1, depth: 1, updatable: false, text: true },
    scene
  );
  warehouseExtra12.position = new BABYLON.Vector3(32.53, 13.54, -157.01);
  warehouseExtra12.visibility = 0;

  // Warehouse - teippirulla
  var warehouseExtra13 = BABYLON.MeshBuilder.CreateBox(
    "whExtra13",
    { height: 1, width: 2.1, depth: 2.1, updatable: false, text: true },
    scene
  );
  warehouseExtra13.position = new BABYLON.Vector3(33.89, -0.86, -127.8);
  warehouseExtra13.visibility = 0;

  // Warehouse - vasara
  var warehouseExtra14 = BABYLON.MeshBuilder.CreateBox(
    "whExtra14",
    { height: 1, width: 2.3, depth: 2.1, updatable: false, text: true },
    scene
  );
  warehouseExtra14.position = new BABYLON.Vector3(35.23, 11.86, -150);
  warehouseExtra14.visibility = 0;

  // Warehouse - vessapaperi
  var warehouseExtra15 = BABYLON.MeshBuilder.CreateBox(
    "whExtra15",
    { height: 5.5, width: 5, depth: 5, updatable: false, text: true },
    scene
  );
  warehouseExtra15.position = new BABYLON.Vector3(33.83, 0.46, -157.99);
  warehouseExtra15.visibility = 0;

  // Warehouse - puhelin
  var warehouseExtra16 = BABYLON.MeshBuilder.CreateBox(
    "whExtra16",
    { height: 2.3, width: 3, depth: 3, updatable: false, text: true },
    scene
  );
  warehouseExtra16.position = new BABYLON.Vector3(41, 3, -106);
  warehouseExtra16.visibility = 0;
  //#endregion

  //#region Bunker/Huone3 aktivoitavat objektit

  // Tehtävät/puzzles
  // Bunker Puzzle1 - sähkötaulu, tietokoneet Bunkerissa, varastossa, huoneistossa käynnistyvät ja niissä on osa lopun tehtävistä
  var bunkerPuzzle1 = BABYLON.MeshBuilder.CreateBox(
    "bPuzzle1",
    { height: 6.5, width: 4.5, depth: 5, updatable: false, text: true },
    scene
  );
  bunkerPuzzle1.position = new BABYLON.Vector3(124, -11.8, -135);
  bunkerPuzzle1.visibility = 0;

  // Bunker Puzzle2 - tietokone, lopun tehtävään
  var bunkerPuzzle2 = BABYLON.MeshBuilder.CreateBox(
    "bPuzzle2",
    { height: 4, width: 7, depth: 0.3, updatable: false, text: true },
    scene
  );
  bunkerPuzzle2.position = new BABYLON.Vector3(191.3, -22, -141);
  bunkerPuzzle2.visibility = 0;
  bunkerPuzzle2.rotation.y = 0.84;

  // Huoneen 3. extra objektit

  // Bunker - laatikko
  var bunkerExtra1 = BABYLON.MeshBuilder.CreateBox(
    "bExtra1",
    { height: 7, width: 11, depth: 18, updatable: false, text: true },
    scene
  );
  bunkerExtra1.position = new BABYLON.Vector3(131, -29, -183.15);
  bunkerExtra1.visibility = 0;
  bunkerExtra1.rotation.y = -0.28;

  // Bunker - kirja yksin
  var bunkerExtra2 = BABYLON.MeshBuilder.CreateBox(
    "bExtra2",
    { height: 0.5, width: 2.3, depth: 3.2, updatable: false, text: true },
    scene
  );
  bunkerExtra2.position = new BABYLON.Vector3(194, -25.18, -150);
  bunkerExtra2.visibility = 0;
  bunkerExtra2.rotation.y = 0.5;

  // Bunker - kirjat
  var bunkerExtra3 = BABYLON.MeshBuilder.CreateBox(
    "bExtra3",
    { height: 3.2, width: 3.2, depth: 3.2, updatable: false, text: true },
    scene
  );
  bunkerExtra3.position = new BABYLON.Vector3(188.66, -24.73, -135.67);
  bunkerExtra3.visibility = 0;
  bunkerExtra3.rotation.y = 0.5

    // Bunker - puhelin
    var bunkerExtra4 = BABYLON.MeshBuilder.CreateBox(
      "bExtra4",
      { height: 2, width: 2.5, depth: 3, updatable: false, text: true },
      scene
    );
    bunkerExtra4.position = new BABYLON.Vector3(136, -27, -145);
    bunkerExtra4.visibility = 0;

  //#endregion

  //#endregion

  const particleSystemStuff = () => {
    //#region //Particle-pöly ikkunasta

    var particleSystem = new BABYLON.GPUParticleSystem("particles", 500, scene);
    particleSystem.particleTexture = new BABYLON.Texture(
      "img/dust_particle.png",
      scene
    );
    particleSystem.glow = new BABYLON.GlowLayer("particles", scene);

    // Where the particles come from
    particleSystem.emitter = dustPlane; // the starting object, the emitter
    particleSystem.minEmitBox = new BABYLON.Vector3(-10, 6, -10); // Starting all from
    particleSystem.maxEmitBox = new BABYLON.Vector3(3, -2, 3); // To...

    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4(0.4, 0.4, 0.2, 0.7);
    particleSystem.color2 = new BABYLON.Color4(0.2, 0.2, 0.1, 0.7);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

    // Size of each particle (random between...
    particleSystem.minSize = 0.01;
    particleSystem.maxSize = 0.07;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 0.3;
    particleSystem.maxLifeTime = 1.5;

    // Emission rate
    particleSystem.emitRate = 100;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.GPUParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3(0, -5, 0);

    // Direction of each particle after it has been emitted
    particleSystem.direction1 = new BABYLON.Vector3(7, 8, 3);
    particleSystem.direction2 = new BABYLON.Vector3(-7, -8, -3);

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    // Nopeus
    particleSystem.minEmitPower = 0.1;
    particleSystem.maxEmitPower = 0.5;
    particleSystem.updateSpeed = 0.002;

    // Particle systemin käynnistys
    particleSystem.start();
    //#endregion

    //#region //Particle-pöly warehousen katosta
    var particleSystem2 = new BABYLON.GPUParticleSystem(
      "particles",
      600,
      scene
    );
    particleSystem2.particleTexture = new BABYLON.Texture(
      "img/dust_particle.png",
      scene
    );
    particleSystem2.glow = new BABYLON.GlowLayer("particles", scene);

    // Where the particles come from
    particleSystem2.emitter = dustPlane2; // the starting object, the emitter
    particleSystem2.minEmitBox = new BABYLON.Vector3(-26, -30, -12); // Starting all from
    particleSystem2.maxEmitBox = new BABYLON.Vector3(28, 105, -2); // To...

    // Colors of all particles
    particleSystem2.color1 = new BABYLON.Color4(0.3, 0.3, 0.3, 0.6);
    particleSystem2.color2 = new BABYLON.Color4(0.2, 0.2, 0.2, 0.5);
    particleSystem2.colorDead = new BABYLON.Color4(0.1, 0.1, 0.1, 0.0);

    // Size of each particle (random between...
    particleSystem2.minSize = 0.05;
    particleSystem2.maxSize = 0.08;

    // Life time of each particle (random between...
    particleSystem2.minLifeTime = 0.5;
    particleSystem2.maxLifeTime = 1.8;

    // Emission rate
    particleSystem2.emitRate = 100;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem2.blendMode = BABYLON.GPUParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particleSystem2.gravity = new BABYLON.Vector3(0, -6, 0);

    // Direction of each particle after it has been emitted
    particleSystem2.direction1 = new BABYLON.Vector3(-0.2, -4, 0.2);
    particleSystem2.direction2 = new BABYLON.Vector3(0.2, -8, -0.2);

    // Angular speed, in radians
    particleSystem2.minAngularSpeed = 0;
    particleSystem2.maxAngularSpeed = 0.15; //Math.PI

    // Nopeus
    particleSystem2.minEmitPower = 0.05;
    particleSystem2.maxEmitPower = 0.08;
    particleSystem2.updateSpeed = 0.002;

    // Particle systemin käynnistys
    particleSystem2.start();
    //#endregion

    //#region //Particle-pöly bunkerin katossa
    var particleSystem3 = new BABYLON.GPUParticleSystem(
      "particles",
      200,
      scene
    );
    particleSystem3.particleTexture = new BABYLON.Texture(
      "img/dust_particle.png",
      scene
    );
    particleSystem3.glow = new BABYLON.GlowLayer("particles", scene);

    // Where the particles come from
    particleSystem3.emitter = dustPlane3; // the starting object, the emitter
    particleSystem3.minEmitBox = new BABYLON.Vector3(-50, -25, -3); // Starting all from
    particleSystem3.maxEmitBox = new BABYLON.Vector3(15, 20, 3); // To...

    // Colors of all particles
    particleSystem3.color1 = new BABYLON.Color4(0.4, 0.4, 0.4, 0.7);
    particleSystem3.color2 = new BABYLON.Color4(0.2, 0.2, 0.2, 0.7);
    particleSystem3.colorDead = new BABYLON.Color4(0.2, 0.2, 0, 0.1);

    // Size of each particle (random between...
    particleSystem3.minSize = 0.08;
    particleSystem3.maxSize = 0.2;

    // Life time of each particle (random between...
    particleSystem3.minLifeTime = 1.3;
    particleSystem3.maxLifeTime = 1.8;

    // Emission rate
    particleSystem3.emitRate = 50;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem3.blendMode = BABYLON.GPUParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particleSystem3.gravity = new BABYLON.Vector3(0, -5.5, 0);

    // Direction of each particle after it has been emitted
    particleSystem3.direction1 = new BABYLON.Vector3(7, 8, 3);
    particleSystem3.direction2 = new BABYLON.Vector3(-7, -8, -3);

    // Angular speed, in radians
    particleSystem3.minAngularSpeed = 0;
    particleSystem3.maxAngularSpeed = Math.PI;

    // Nopeus
    particleSystem3.minEmitPower = 0.1;
    particleSystem3.maxEmitPower = 0.5;
    particleSystem3.updateSpeed = 0.002;

    // Particle systemin käynnistys
    particleSystem3.start();
    //#endregion
  };

  //particleSystemStuff();
  //#endregion

  //#region Musiikki ja äänet
  // Voimakkuus ! voimakkuuden säätö pitää vielä tehdä
  var volumeSoundtrack = 0.2;
  var volumeSounds = 0.5;
  var volumeSounds1 = 1;
  var volumeSounds2 = 1;

  // musiikki

  var musicFlat = new BABYLON.Sound(
    "musicFl",
    "sound/flat_ES_A Family Cursed - Farrell Wooten.mp3",
    scene, null,
    { loop: true,
      volume: volumeSoundtrack,
      autoplay: true }
  );
  var musicWarehouse = new BABYLON.Sound(
    "musicWh",
    "sound/warehouse_ES_Drone Dark Low 1 - SFX Producer.mp3",
    scene, null,
    { loop: true, volume: volumeSoundtrack, autoplay: false }
  );
  var musicBunker = new BABYLON.Sound(
    "musicBk",
    "sound/bunker_ES_Basement - SFX Producer.mp3",
    scene, null,
    { loop: true, volume: volumeSoundtrack, autoplay: false }
  );
  
var musicExit = new BABYLON.Sound(
  "musicE",
  "sound/exit_ES_Sudden Signs.mp3",
  scene, null,
  { loop: true, volume: volumeSoundtrack, autoplay: false }
);

  //äänet
  var sphereMat = new BABYLON.StandardMaterial("sphereMat", scene);
  sphereMat.diffuseColor = BABYLON.Color3.Purple();
  sphereMat.backFaceCulling = false;
  sphereMat.alpha = 0;
  
  var sphereMusic1 = BABYLON.Mesh.CreateSphere("musicsphere", 20, 15, scene);
  sphereMusic1.material = sphereMat;
  sphereMusic1.position = new BABYLON.Vector3(183, -29, -135);

  var sphereMusic2 = BABYLON.Mesh.CreateSphere("musicsphere", 20, 15, scene);
  sphereMusic2.material = sphereMat;
  sphereMusic2.position = new BABYLON.Vector3(180, -29, -135);

  var computerSound = new BABYLON.Sound(
    "soundC1",
    "sound/computer_ES_Electric Hum - SFX Producer.mp3",
    scene,
    null,
    {
      loop: true,
      autoplay: true,
      volume: volumeSounds,
      maxDistance: 30,
      spatialSound: true,
    }
  );
  computerSound.setPosition(new BABYLON.Vector3(18, 9, -43));
  var computerSound2 = new BABYLON.Sound(
    "soundC2",
    "sound/computer_ES_Electric Hum - SFX Producer.mp3",
    scene,
    null,
    {
      loop: true,
      autoplay: false,
      volume: volumeSounds,
      maxDistance: 30,
      spatialSound: true,
    }
  );
  computerSound2.setPosition(new BABYLON.Vector3(77, 5, -35));

  const computerSound3 = new BABYLON.Sound(
    "soundC3",
    "sound/computer_ES_Electric Hum - SFX Producer.mp3",
    scene,
    null,
    {
      loop: true,
      autoplay: false,
      volume: volumeSounds,
      maxDistance: 30,
      spatialSound: true,
    }
  );
  computerSound3.setPosition(new BABYLON.Vector3(35, 5, -220));

  var computerSound4 = new BABYLON.Sound(
    "soundC4",
    "sound/computer_ES_Electric Hum - SFX Producer.mp3",
    scene,
    null,
    {
      loop: true,
      autoplay: false,
      volume: volumeSounds,
      maxDistance: 30,
      spatialSound: true,
    }
  );
  computerSound4.setPosition(new BABYLON.Vector3(183, -29, -135));

  var fcDoorSound = new BABYLON.Sound(
    "soundFcDoor",
    "sound/flatCorridorSound_ES_Door Creak 4 - SFX Producer.mp3",
    scene,
    null,
    { loop: false, autoplay: false, volume: volumeSounds1 }
  );

  var tvSound = new BABYLON.Sound(
    "tvSound",
    "sound/tvsound_ES_CB Radio Static 1.mp3",
    scene,
    null,
    {
      loop: true,
      autoplay: true,
      volume: volumeSounds,
      maxDistance: 30,
      spatialSound: true,
    }
  );
  tvSound.setPosition(new BABYLON.Vector3(39,9.5,-5.2));

  var warehouseDoorSound = new BABYLON.Sound(
    "soundWhDoor",
    "sound/warehouseDoorSound.mp3",
    scene,
    null,
    { loop: false, autoplay: false, volume: volumeSounds }
  );
  var bunkerDoorSound = new BABYLON.Sound(
    "soundBkDoor",
    "sound/bunkerDoorSound.mp3",
    scene,
    null,
    { loop: false, autoplay: false, volume: volumeSounds }
  );
  var ecpSound = new BABYLON.Sound(
    "soundFcDoor",
    "sound/ECP_ES_PREL Distortion 75.mp3",
    scene,
    null,
    { loop: false, autoplay: false, volume: volumeSounds }
  );
 //exit oven äänet
  var exitDoorSound = new BABYLON.Sound(
    "soundExitDoor",
    "sound/exitDoor_ES_Door Creak Wood 1.mp3",
    scene,
    null,
    { loop: false, autoplay: false, volume: 0.8 }
  );
  var exitDoor2Sound = new BABYLON.Sound(
    "soundExitDoor",
    "sound/exitdoor_ES_Static Buzz 3.mp3",
    scene,
    null,
    { loop: false, autoplay: false, volume: 0.8 }
  );

  function exitDoorsSoundSet () {
    exitDoorSound.play(1);
    exitDoor2Sound.play();
  }

  function electricPanelSoundSet () {
    ecpSound.play();
    musicBunker.stop();
    musicExit.play(1);
    computerSound2.play(1);
    computerSound3.play(1);
    computerSound4.play(1);
  }

// askeläänet ! eivät toimi mobiilissa tällä koodilla
const footSound = setInterval(footSteps, 500);
var footSteps = new BABYLON.Sound("footSteps", "sound/ES_Combat Boots Walk 2 - SFX Producer.mp3", scene, null, {loop: false});
document.addEventListener("keydown", function(evt) {
  switch (evt.keyCode) {
    case 37: case 38: case 39: case 40: case 65: case 68: case 83: case 87:
 if (!footSteps.isPlaying) {
   footSteps.play();
 }
 break;
 }
});
document.addEventListener("keyup", function(evt) {
  switch (evt.keyCode) {
    case 37: case 38: case 39: case 40: case 65: case 68: case 83: case 87:
 if (footSteps.isPlaying) {
   footSteps.pause();
 }
 break;
 }
});


  //#endregion

  //#region // pelin lataus ja käynnistys
  const cameraHelpers = {
    camera: camera,
    attachControl: () => camera.attachControl(canvas, true),
    detachControl: () => camera.detachControl(document.querySelector("canvas")),
  };
  return { scene, cameraHelpers };
};

export const customCameraHelpers = (() => {
  let helpers = {};

  let storeHelpers = (newHelpers) => (helpers = { ...helpers, ...newHelpers });

  return {
    getHelpers: () => helpers,
    init: (helpers) => storeHelpers(helpers),
  };
})();

window.addEventListener("DOMContentLoaded", (event) => {
  const canvas = document.getElementById("renderCanvas");
  if (window.location.hash !== "#debug2") {
    pointerLockEvents.init(canvas);
  }

  var engine = new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
  });

  const { scene, cameraHelpers } = createScene(engine, canvas);

  if (window.location.hash === "#debug") {
    scene.debugLayer.show();
  }

  customCameraHelpers.init(cameraHelpers);

  shortcuts(scene, customCameraHelpers);
  const scene2 = viewObjectBox(engine, canvas, scene);
  customCameraHelpers.init(cameraHelpers);
  engine.runRenderLoop(function () {
    if (scene) {
      scene.render();
      if (objectBoxState.visible() || false) {
        scene2.render();
      }
    }
  });
  // Resize
  window.addEventListener("resize", function () {
    engine.resize();
  });
});

//#endregion
