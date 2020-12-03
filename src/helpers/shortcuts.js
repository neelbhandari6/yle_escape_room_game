import {
  flatDoors as loadFlatDoors,
  warehouseDoors as loadWarehouseDoors,
  load,
} from "../animatedObjects/doors.js";
import { saveDoorTriggers, frameRate, doorTriggers } from "../babylonScene";
import { assetsManager } from "../helpers/assetsManager";
import buildPuzzle8 from "../puzzles/electricControlPanel";
import buildWallSwitch from "../puzzles/wallSwitch";
import { userChoiceTracker } from "../helpers/userChoiceTracker";
import buildPuzzle10 from "../puzzles/lockconsole";
import buildPuzzle1 from "../puzzles/twitter/index.js";
import facebook1Puzzle from "../puzzles/facebook/bunker.js";
import facebook2Puzzle from "../puzzles/facebook/warehouse.js";
import facebook3Puzzle from "../puzzles/facebook/flat.js";
import clockPuzzle from "../puzzles/clock";
import magazine from "../puzzles/magazine/index.js";
import { viewObjectBox, objectBoxState } from "../viewObjectIn3D";
export const shortcutDetected = () => {
  const urlParams = new URLSearchParams(window.location.search);
  let value = false;
  if (urlParams.has("puzzle")) value = true;
  if (urlParams.has("place")) value = true;
  if(urlParams.has("object")) value = "object"

  return value;
};

export const shortcuts = async (scene, customCameraHelpers) => {
  const urlParams = new URLSearchParams(window.location.search);
  const helpers = customCameraHelpers.getHelpers();
  const getCameraPosition = () => {
    const camera = customCameraHelpers.getHelpers().camera;
    const { x, y, z } = camera.position;
    const target = camera.getTarget();
    return `{position: [${x}, ${y}, ${z}], target: [${target.x}, ${target.y}, ${target.z}]}`;
  };
  const camera = customCameraHelpers.getHelpers().camera;
  window.camera = customCameraHelpers.getHelpers().camera;

  document.onkeyup = function (e) {
    if (e.ctrlKey && e.shiftKey && e.which == 67) {
      if (shortcutDetected()) {
        alert(getCameraPosition());
      }
    }
  };

  const everythingUpToWarehouseDoor = async () => {
    const flatDoors = await loadFlatDoors(scene, frameRate);
    flatDoors.openFlatCorridor();
    saveDoorTriggers(flatDoors);
    assetsManager.loadWarehouse();
    await assetsManager.update({ loadingScreen: true, async: true });
    const warehouseDoors = await loadWarehouseDoors(scene, frameRate);
    saveDoorTriggers(warehouseDoors);
    return;
  };

  const everythingUpToBunker = async () => {
    await everythingUpToWarehouseDoor();
    doorTriggers.openWarehouse();
    assetsManager.loadBunker();
    await assetsManager.update({ loadingScreen: true, async: true });
    return;
  };

  if (urlParams.get("place") === "warehouse") {
    const cameraData = {
      position: [63.20700695819038, 6.468817336628404, -126.43244948042357],
      target: [63.1805251975246, 6.421243662158218, -127.43096609962905],
    };

    camera.position = new BABYLON.Vector3(...cameraData.position);
    camera.setTarget(new BABYLON.Vector3(...cameraData.target));
    await everythingUpToWarehouseDoor();
    doorTriggers.openWarehouse();
  }

  if (urlParams.get("place") === "bunker") {
    await everythingUpToBunker();
    doorTriggers.openBunker();
    const cameraData = {
      position: [143.96705181257244, -19.424674879691878, -182.4171815132055],
      target: [144.0432728912067, -19.508241739056388, -181.4235986684713],
    };
    camera.position = new BABYLON.Vector3(...cameraData.position);
    camera.setTarget(new BABYLON.Vector3(...cameraData.target));
  }

  if (urlParams.get("place") === "electricPanel") {
    await everythingUpToBunker();
    doorTriggers.openBunker();
    const cameraData = {
      position: [143.96705181257244, -19.424674879691878, -182.4171815132055],
      target: [144.0432728912067, -19.508241739056388, -181.4235986684713],
    };
    camera.position = new BABYLON.Vector3(...cameraData.position);
    camera.setTarget(new BABYLON.Vector3(...cameraData.target));
    buildPuzzle8(scene);
  }

  if (urlParams.get("place") === "endSwitch") {
    await everythingUpToBunker();
    doorTriggers.openBunker();
    const cameraData = {
      position: [45.581961198005935, 14.17480477908031, -35.61015336440213],
      target: [45.403044549975654, 14.070181684879222, -36.58843903468259],
    };
    camera.position = new BABYLON.Vector3(...cameraData.position);
    camera.setTarget(new BABYLON.Vector3(...cameraData.target));
    userChoiceTracker.solved();
    buildWallSwitch(doorTriggers.openExit);
  }

  if (urlParams.get("place") === "twitterLoggedOut") {
    const flatDoors = await loadFlatDoors(scene, frameRate);
    assetsManager.update({ loadingScreen: true });
    const cameraData = {
      position: [21.445510605220562, 14.174805098369626, -37.98654512046784],
      target: [21.920227954034573, 13.872252040699033, -38.813046847572025],
    };
    camera.position = new BABYLON.Vector3(...cameraData.position);
    camera.setTarget(new BABYLON.Vector3(...cameraData.target));
    buildPuzzle1();
  }

  if (urlParams.get("place") === "twitterLoggedIn") {
    const flatDoors = await loadFlatDoors(scene, frameRate);
    assetsManager.update({ loadingScreen: true });
    buildPuzzle1(true);
  }

  if (urlParams.get("place") === "corridor") {
    const flatDoors = await loadFlatDoors(scene, frameRate);
    assetsManager.update({ loadingScreen: true });

    flatDoors.openFlatCorridor();
    flatDoors.openWarehouse();
    const cameraData = 
      {
   position: [63.21063831307472, 6.499209816628406, -68.42085793308043], target: [63.120159341474185, 6.288203950100849, -69.39414623073363]
    }
    camera.position = new BABYLON.Vector3(...cameraData.position);
    camera.setTarget(new BABYLON.Vector3(...cameraData.target));
  }

  if (urlParams.get("place") === "meloniConsole") {
    assetsManager.update({ loadingScreen: true });

    const flatDoors = await loadFlatDoors(scene, frameRate);
    flatDoors.openFlatCorridor();

    const cameraData =  {position: [54.01306813916171, 6.499212103637243, -85.44250137583286], target: [54.08116898646558, 6.163983749898458, -86.38217378632099]}
    camera.position = new BABYLON.Vector3(...cameraData.position);
    camera.setTarget(new BABYLON.Vector3(...cameraData.target));
    buildPuzzle10(async () => {
      await assetsManager.loadWarehouse();
      await assetsManager.update({ loadingScreen: true, async: true });
      const warehouseDoors = await loadWarehouseDoors(scene, frameRate);
      saveDoorTriggers(warehouseDoors);
      flatDoors.openWarehouse()      
    })
  }

  if (urlParams.get("place") === "facebook-bunker") {
    userChoiceTracker.electricPanelPuzzleResolved(true);
    await everythingUpToBunker();
    doorTriggers.openBunker();
    const cameraData = {position: [182.1592728604081, -19.42468030403949, -142.04509832910392], target: [183.06977088344124, -19.766612153757585, -141.81255590370986]}
    camera.position = new BABYLON.Vector3(...cameraData.position);
    camera.setTarget(new BABYLON.Vector3(...cameraData.target));
    facebook1Puzzle();
    
  }

  if (urlParams.get("place") === "facebook-warehouse") {
    userChoiceTracker.electricPanelPuzzleResolved(true);
    await everythingUpToBunker();
    userChoiceTracker.processAnswer("bunkerPuzzle2", true) 
    doorTriggers.openBunker();
    const cameraData = {position: [44.093996237970146, 6.4688294140311555, -216.321583307529], target: [43.28702325747088, 6.1891469565841035, -216.84174904897264]}
    camera.position = new BABYLON.Vector3(...cameraData.position);
    camera.setTarget(new BABYLON.Vector3(...cameraData.target));
    facebook2Puzzle();
  }


  if (urlParams.get("place") === "facebook-flat") {
    userChoiceTracker.electricPanelPuzzleResolved(true);
    await everythingUpToBunker();
    doorTriggers.openBunker();
    userChoiceTracker.processAnswer("warehousePuzzle1", true) 
    userChoiceTracker.processAnswer("bunkerPuzzle2", true) 
    const cameraData = {position: [71.70549292086208, 14.174805011612369, -37.34224694994642], target: [72.59053862808788, 13.797756399971439, -37.615245998179454]} 
    camera.position = new BABYLON.Vector3(...cameraData.position);
    camera.setTarget(new BABYLON.Vector3(...cameraData.target));
    facebook3Puzzle();
  }


  if (urlParams.get("place") === "clock") {
    const cameraData = 
      {position: [110.73811978594826, 6.468827040338221, -198.65477147311142], target: [111.72470951573418, 6.312474892878237, -198.7016189134138]}

    camera.position = new BABYLON.Vector3(...cameraData.position);
    camera.setTarget(new BABYLON.Vector3(...cameraData.target));
    await everythingUpToWarehouseDoor();
    clockPuzzle(async () => {
    assetsManager.loadBunker();
    await assetsManager.update({ loadingScreen: true, async: true });
     doorTriggers.openBunker();
    });
    doorTriggers.openWarehouse();
  }

  if (urlParams.get("place") === "magazine") {
    await everythingUpToWarehouseDoor();
    doorTriggers.openWarehouse();
    const cameraData = {position: [64.52588902530759, 6.468818306197473, -133.6487132440836], target: [65.47321365890592, 6.155798225869486, -133.71649559396812]}

    camera.position = new BABYLON.Vector3(...cameraData.position);
    camera.setTarget(new BABYLON.Vector3(...cameraData.target));
    
    magazine();
  }


  if (urlParams.has("object") && urlParams.has("room") ) {
    const name = urlParams.get("object")
    const room = urlParams.get("room")
    objectBoxState.changeMesh(name, room);
    objectBoxState.changeVisibility(true);
  }



};
