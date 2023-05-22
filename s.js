document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the <a-gltf-model> element
    console.log("s.js is here")
    const gltfModel = document.querySelectorAll("a-gltf-model");
    
    if (gltfModel) {
        console.log("gltfModel", gltfModel)
      let initialPinchDistance = 0;
  
      // Add an event listener for touchmove to detect the pinch gesture
      window.addEventListener("touchmove", (event) => {
        if (event.touches.length === 2) {
          const touch1 = event.touches[0];
          const touch2 = event.touches[1];
          const currentPinchDistance = Math.hypot(
            touch1.clientX - touch2.clientX,
            touch1.clientY - touch2.clientY
          );
  
          if (initialPinchDistance === 0) {
            initialPinchDistance = currentPinchDistance;
          } else {
            const pinchDelta = currentPinchDistance - initialPinchDistance;
  
            if (pinchDelta > 0) {
                console.log("33 punch")
                console.log("33 gltfModel", gltfModel)
              const currentScale = gltfModel.getAttribute("scale");
                                 
              const newScale = {
                x: currentScale.x * 1.1, // Increase the size by 10%
                y: currentScale.y * 1.1,
                z: currentScale.z * 1.1,
              };
              gltfModel.setAttribute("scale", newScale);
            }
  
            initialPinchDistance = currentPinchDistance;
          }
        }
      });
  
      // Reset the initial pinch distance when the touches end
      window.addEventListener("touchend", () => {
        initialPinchDistance = 0;
      });
    } else {
      console.error("Unable to find the <a-gltf-model> element.");
    }
  });
  