const assetsManager = (() => {
  let assetsManager;

  const store = (BABYLON, scene) => {
    assetsManager = new BABYLON.AssetsManager(scene);
    assetsManager.onProgress = function(remainingCount, totalCount, lastFinishedTask) {
      const message = 'Loading ' 
      document.getElementById("loading-message").innerHTML = message
  };
  
  assetsManager.onTasksDoneObservable.add(function(tasks) {
    var errors = tasks.filter(function(task) {return task.taskState === BABYLON.AssetTaskState.ERROR});
    var successes = tasks.filter(function(task) {return task.taskState !== BABYLON.AssetTaskState.ERROR});
    if(errors.length > 0){ 
      console.log("error loading assets")
    }
  });
}; 


  const update = (props) => {
    if (props && props.loadingScreen !== false) {
      assetsManager.useDefaultLoadingScreen = true;
    } else {
      assetsManager.useDefaultLoadingScreen = false;
    }

    if (props && props.async) {
      return assetsManager.loadAsync();
    } else {
      assetsManager.load();
    }
  };

  return {
    init: (BABYLON, scene) => store(BABYLON, scene),
    loadLevelCollision: () => {
      var meshLevel_c = assetsManager.addMeshTask(
        "level_collision",
        "",
        "assets/level_v0.51_collision.babylon"
      );
      meshLevel_c.onSuccess = function (task) {
        var mesh = task.loadedMeshes[1];

        mesh.position = BABYLON.Vector3.Zero();
      };
    },
    loadFlat: () => {
      var meshFlat = assetsManager.addMeshTask(
        "level_flat",
        "",
        "assets/level_v1.1a_flat.glb"
      );
      meshFlat.onSuccess = function (taskFlat) {
        taskFlat.loadedMeshes[0].position = BABYLON.Vector3.Zero();
      //  taskFlat.freezeWorldMatrix();
        const array = taskFlat.loadedMeshes;
        const lukkokonsoliAuki = taskFlat.loadedMeshes.find(e => e.name === "huone1_Lukkokonsoli_auki")
        lukkokonsoliAuki.visibility = 1;
        const naytto = taskFlat.loadedMeshes.find(e => e.name === "Huone1_Naytto_Avattu")
        naytto.visibility = 0;
      };
    }, 
    loadWarehouse: () => {
        //#region // varasto
      var meshWarehouse = assetsManager.addMeshTask(
        "levelWarehouse",
        "",
        "assets/level_v1.1_warehouse.glb"
      );
      meshWarehouse.onError = () => console.log("errorrrr")
      meshWarehouse.onSuccess = function (taskWarehouse) {
      //  taskWarehouse.freezeWorldMatrix();
        taskWarehouse.loadedMeshes[0].position = BABYLON.Vector3.Zero();
        const array = taskWarehouse.loadedMeshes;
        const naytto = taskWarehouse.loadedMeshes.find(e => e.name === "Huone2_Naytto_Avattu")
        naytto.visibility = 0;
      };
    },
    loadBunker: () => {
      
      var meshBunker = assetsManager.addMeshTask(
        "level_bunker",
        "",
        "assets/level_v1.1_bunker.glb"
      );
      
      meshBunker.onError = function (task, message, exception) {
    }
      meshBunker.onSuccess = function (task) {
        var mesh = task.loadedMeshes[1];
        mesh.freezeWorldMatrix() ;
        mesh.position = BABYLON.Vector3.Zero();
        const array = task.loadedMeshes;
        const naytto = task.loadedMeshes.find(e => e.name === "Huone3_Naytto_Avattu")
        naytto.visibility = 0;
      };
    },
    update: ({loadingScreen, async}) => update({loadingScreen, async}),
  };
})();

export { assetsManager };
