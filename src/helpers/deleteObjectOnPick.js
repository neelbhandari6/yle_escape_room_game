/*const deleteObjectOnPick = scene => {
    window.addEventListener("click", () => {
      const pickResult = scene.pick(scene.pointerX, scene.pointerY);
      // pickResult on nyt objekti sisältää meshin jota klikattu eli valitaan se
      const { pickedMesh } = pickResult;
      // jos metadatassa on mitään ja sisältää "disposable"...
      if(!pickedMesh) return false
      const metadata = JSON.parse(pickedMesh.metadata)
      const disposable = metadata ? metadata.disposable : null;
      if (disposable) {
        // ... poistetaan mesh
        pickResult.pickedMesh.dispose();
      }
    });
  };
  
  export default deleteObjectOnPick; */