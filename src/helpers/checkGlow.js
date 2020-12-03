import { checkIfNoGlow } from "~src/tips/index.js";

let hl;
export const checkTipGlow = (scene) => {
  scene.executeWhenReady(function () {
    var alpha = 0;
    scene.registerBeforeRender(() => {
      alpha += 0.06;
      hl.blurHorizontalSize = 0.5 + Math.sin(alpha) * 0.7 + 0.7;
      hl.blurVerticalSize = 0.5 + Math.cos(alpha) * 0.7 + 0.7;
    });
  });
  if(!hl) hl = new BABYLON.HighlightLayer("hl", scene);
  if (interval) clearInterval(interval);

  let flatGlowing = false;
  let bunkerGlowing = false;
  let warehouseGlowing = false;

  var phone1Sound = new BABYLON.Sound(
    "soundP1",
    "sound/phone_placeholder_ES_Static 1 - SFX Producer.mp3",
    scene,
    null,
    {
      loop: true,
      autoplay: false,
      volume: 0.4,
      maxDistance: 70,
      spatialSound: true,
    }
  );
  phone1Sound.setPosition(new BABYLON.Vector3(48, 4, -17));

  var phone2Sound = new BABYLON.Sound(
    "soundP2",
    "sound/phone_placeholder_ES_Static 1 - SFX Producer.mp3",
    scene,
    null,
    {
      loop: true,
      autoplay: false,
      volume: 0.4,
      maxDistance: 70,
      spatialSound: true,
    }
  );
  phone2Sound.setPosition(new BABYLON.Vector3(41, 3, -105.92));

  var phone3Sound = new BABYLON.Sound(
    "soundP3",
    "sound/phone_placeholder_ES_Static 1 - SFX Producer.mp3",
    scene,
    null,
    {
      loop: true,
      autoplay: false,
      volume: 0.4,
      maxDistance: 70,
      spatialSound: true,
    }
  );
  phone3Sound.setPosition(new BABYLON.Vector3(135.26, -27.35, -145));

  let interval = window.setInterval(() => {
    const flatPuhelin = scene.getMeshByName("Huone1_Puhelin");
    const warehousePuhelin = scene.getMeshByName("Huone2_Puhelin");
    const bunkerPuhelin = scene.getMeshByName("Huone3_puhelin")
  
    if (!checkIfNoGlow()) { 
        // Tämä ajetaan, jos on vinkkejä
      if (flatPuhelin && !flatGlowing) {
        hl.addMesh(flatPuhelin, BABYLON.Color3.Green());
        flatGlowing = true;
        phone1Sound.play();
      }
      if (bunkerPuhelin && !bunkerGlowing) {
        bunkerPuhelin
          ? hl.addMesh(bunkerPuhelin, BABYLON.Color3.Green())
          : null;
       bunkerGlowing = true;
       phone3Sound.play();
      }
      if (warehousePuhelin && !warehouseGlowing) {
        warehousePuhelin
          ? hl.addMesh(warehousePuhelin, BABYLON.Color3.Green())
          : null;
        warehouseGlowing = true;
        phone2Sound.play();
      }
    } else {
        // Tämä ajetaan, jos ei ole vinkkejä
      if (flatGlowing) {
        hl.removeMesh(flatPuhelin);
        flatGlowing = false;
        phone1Sound.stop();
      }
      if (bunkerGlowing) {
        hl.removeMesh(bunkerPuhelin);
        bunkerGlowing = false;
        phone3Sound.stop();
      }
      if (warehouseGlowing) {
        hl.removeMesh(warehousePuhelin);
        warehouseGlowing = false;
        phone2Sound.stop();
      }
    }
  }, 1000);
};
