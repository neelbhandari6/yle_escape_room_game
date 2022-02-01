import {objectBoxState } from "./index.js"
import { customCameraHelpers } from "../babylonScene";
import pointerLockEvents from "~/src/helpers/pointerLockEvents.js"
let advancedTexture;

    var text1 = new BABYLON.GUI.TextBlock();
     text1.text = "Loading";
    text1.color = "white";
    text1.fontSize = 24;


  var button = BABYLON.GUI.Button.CreateSimpleButton("but", "Back");
    button.width = 0.2;
    button.height = "40px";
    button.color = "white";
    button.top = "-50px";
    button.background = "black";
    button.hoverCursor = "pointer"
    button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    button.onPointerClickObservable.add(function () {
      customCameraHelpers.getHelpers().attachControl();
      advancedTexture.removeControl(button);
      document.body.style.cursor = "unset";
      objectBoxState.changeVisibility(false);
    pointerLockEvents.lockPointerToCanvas();
    });

export const updateGUI = (scene, isLoading) => {
  if(!advancedTexture) advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
    "UI"
  );

  if(isLoading) {
    advancedTexture.removeControl(button)
    advancedTexture.addControl(text1);    
  } else {
    advancedTexture.removeControl(text1)
    advancedTexture.addControl(button)
  }

    objectBoxState.storeCallback(() => advancedTexture.addControl(button));
    
    scene.executeOnceBeforeRender(() => advancedTexture.addControl(button));
  };