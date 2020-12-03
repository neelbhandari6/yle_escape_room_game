import { frameRate } from "../babylonScene";


let alreadyLoaded = {
    bunker: false,
}

const sweepAnimation = (clockwise) => {
  // suunta määrrittyy clockwise-parametrissä
  // bunkerilla oma animaatio, muut käyttää tätä
  // Nopeutin keyframeja jakamalla ne kolmella, voidaan säätää joskus
  const sweep = new BABYLON.Animation(
    "sweep",
    "rotation.y",
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
  );

  let sweep_keys = [];

  sweep_keys.push({
    frame: 0,
    value: 0,
  });

  sweep_keys.push({
    frame: 1/3 * frameRate,
    value: 0,
  });

  sweep_keys.push({
    frame: 7/3 * frameRate,
    value: Math.PI / (clockwise ?  -3 : 3),
  });

  sweep_keys.push({
    frame: 15/3* frameRate,
    value: Math.PI / (clockwise ? -1.5 :1.5),
  });

  sweep.setKeys(sweep_keys);
  return sweep;
};

const bunkerDoor = async (scene) => {
  //warehouse-bunker metalliovi
  var doorBunkerHinge = BABYLON.MeshBuilder.CreateBox("hinge3", {height: 6, width: 2, depth: 15, updatable: false, text: true }, scene)
  doorBunkerHinge.visibility = 0;
  doorBunkerHinge.position = new BABYLON.Vector3(123.5, 3, -197);
  doorBunkerHinge.checkCollisions = true;




  const animation = async (bunkerDoor) => {
    console.log(bunkerDoor)
  const clock = scene.getMeshByName("Huone2_lukkokonsoli");
  bunkerDoor.rotation = new BABYLON.Vector3(-11, 0, 0);
  bunkerDoor.visibility = 1;
  bunkerDoor.addChild(doorBunkerHinge);
  bunkerDoor.addChild(clock);
  //bunkerDoor.addChild(warehousePuzzle4);

  var sweepBunk = new BABYLON.Animation("sweepBunk", "rotation.y", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
  
  var sweepBunk_keys = []; 
  
  sweepBunk_keys.push({
      frame: 0,
      value: 0
  });
  
  sweepBunk_keys.push({
      frame: 1 * frameRate,
      value: 0
  });
  
  sweepBunk_keys.push({
      frame: 5 * frameRate,
      value: Math.PI/-3
  });
  
  sweepBunk_keys.push({
      frame: 8 * frameRate,
      value: Math.PI/-2
  });
  /*
  sweepBunk_keys.push({
    frame: 20 * frameRate,
    value: Math.PI/-2
  });
  */
  
  sweepBunk.setKeys(sweepBunk_keys);

  return () =>
  scene.beginDirectAnimation(
    bunkerDoor,
    [sweepBunk],
    0,
    25 * frameRate,
    false
  );
};

const result = await BABYLON.SceneLoader.ImportMeshAsync(
  ["Huone2_turvaovi","Huone2_lukkokonsoli"], "assets/","level_warehouse_bunker_door.glb",
  scene
);


alreadyLoaded.bunker = result;

return await animation(result.meshes[1]);
}


const flatExitDoor = async (scene) => {
  var doorExitHinge = BABYLON.MeshBuilder.CreateBox("hinge4", {height: 6, width: 1, depth: 10, updatable: false, text: true }, scene)
  doorExitHinge.visibility = 0;
  doorExitHinge.position = new BABYLON.Vector3(-1, 7, -11);
  doorExitHinge.checkCollisions = true;

  const animation = async (exitDoor) => {
    exitDoor.rotation = new BABYLON.Vector3(-11, 0, 0);
    exitDoor.visibility = 1;
    exitDoor.addChild(doorExitHinge);
    

    const sweep = sweepAnimation(true);

    return () =>
      scene.beginDirectAnimation(
        exitDoor,
        [sweep],
        0,
        25 * frameRate,
        false
      );
  };

const result = await BABYLON.SceneLoader.ImportMeshAsync(
  ["huone1_ulko_ovi"], "assets/","level_flat_exit_door.glb",
  scene
);

return await animation(result.meshes[1]);

}



const corridorWarehouse = async (scene) => {
  //corridor-warehouse metalliovi

  var doorMetalHinge = BABYLON.MeshBuilder.CreateBox(
    "hinge2",
    { height: 6, width: 10, depth: 1, updatable: false, text: true },
    scene
  );
  doorMetalHinge.visibility = 0;
  doorMetalHinge.position = new BABYLON.Vector3(63.8, 3, -95.2);
  doorMetalHinge.checkCollisions = true;

  const animation = async (metalDoorWarehouse) => {
    metalDoorWarehouse.rotation = new BABYLON.Vector3(-11, 0, 0);
    metalDoorWarehouse.visibility = 1;
    metalDoorWarehouse.addChild(doorMetalHinge);

    const sweep = sweepAnimation();

    return () =>
      scene.beginDirectAnimation(
        metalDoorWarehouse,
        [sweep],
        0,
        25 * frameRate,
        false
      );
  };

  const result = await BABYLON.SceneLoader.ImportMeshAsync(
    ["Huone1_turvaovi_ovi"],
    "assets/",
    "level_corridor_warehouse_metaldoor.glb",
    scene
  );

  return await animation(result.meshes[1]);
};

const flatCorridor = async (scene, frameRate) => {
  var doorWoodHinge = BABYLON.MeshBuilder.CreateBox(
    "hinge",
    { height: 6, width: 10, depth: 0.8, updatable: false, text: true },
    scene
  );
  doorWoodHinge.visibility = 0;
  doorWoodHinge.position = new BABYLON.Vector3(64, 7, -51.3);
  doorWoodHinge.checkCollisions = true;

  const animation = async (doorWood) => {
    doorWood.rotation = new BABYLON.Vector3(-11, 0, 0);
    doorWood.visibility = 1;
    doorWood.addChild(doorWoodHinge);

    const sweep = sweepAnimation();
    return () =>
      scene.beginDirectAnimation(doorWood, [sweep], 0, 25 * frameRate, false);
  };

  const result = await BABYLON.SceneLoader.ImportMeshAsync(
    ["huone1_ovi_sisa_ovi"],
    "assets/",
    "level_flat_inner_door_v0.83c.glb",
    scene
  );

  return await animation(result.meshes[1]);
};

const flatDoors = async (scene, frameRate) => {
  return {
    openFlatCorridor: await flatCorridor(scene, frameRate),
    openWarehouse: await corridorWarehouse(scene, frameRate),
    openExit: await flatExitDoor(scene, frameRate)
  };
};

const warehouseDoors = async (scene, frameRate) => {
    return { openBunker: alreadyLoaded.bunker ? alreadyLoaded.bunker : await bunkerDoor(scene, frameRate)}
}
export { flatDoors, warehouseDoors};
