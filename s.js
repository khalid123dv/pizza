// Retrieve the <a-gltf-model> element
const gltfModel = document.querySelector("a-gltf-model");

// Add an event listener to increase the size on a custom event
gltfModel.addEventListener("increaseSize", () => {
  const currentScale = gltfModel.getAttribute("scale");
  const newScale = {
    x: currentScale.x * 1.1, // Increase the size by 10%
    y: currentScale.y * 1.1,
    z: currentScale.z * 1.1,
  };
  gltfModel.setAttribute("scale", newScale);
});

// Trigger the increaseSize event example
gltfModel.dispatchEvent(new CustomEvent("increaseSize"));