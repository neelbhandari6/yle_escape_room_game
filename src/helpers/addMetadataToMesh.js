const addMetadataToMesh = (mesh, newData) => {
    const currentMetadata = JSON.parse(mesh.metadata);
    mesh.metadata = JSON.stringify({ ...currentMetadata, ...newData });
    return mesh;
  };
  
  export default addMetadataToMesh;