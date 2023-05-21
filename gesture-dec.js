AFRAME.registerComponent("gesture-dec", {
    schema: {
      element: { default: "" },
    },
    
    init: function() {
      this.targetElement = this.data.element && document.querySelector(this.data.element);
      if (!this.targetElement) {
        this.targetElement = this.el;
      }
      
      // Add event listeners for touch events
      this.targetElement.addEventListener("touchstart", this.onTouchStart.bind(this));
      this.targetElement.addEventListener("touchmove", this.onTouchMove.bind(this));
      
      // Initialize touch state
      this.touchState = {
        touchCount: 0,
        startPosition: { x: 0, y: 0 },
        startSpread: 0,
      };
    },
    
    onTouchStart: function(event) {
      this.updateTouchState(event);
    },
    
    onTouchMove: function(event) {
      if (event.touches.length !== 2) return;
      
      // Calculate the current spread distance between touches
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      const currentSpread = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
      
      // Update the object scale based on the change in spread
      const scaleChange = currentSpread / this.touchState.startSpread;
      const newScale = scaleChange * this.el.getAttribute("scale");
      this.el.setAttribute("scale", newScale);
    },
    
    updateTouchState: function(event) {
      const touchCount = event.touches.length;
      
      if (touchCount === 2) {
        // Store the initial touch position and spread
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        const startPosition = { x: (touch1.clientX + touch2.clientX) / 2, y: (touch1.clientY + touch2.clientY) / 2 };
        const startSpread = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
        
        // Update the touch state
        this.touchState = {
          touchCount: touchCount,
          startPosition: startPosition,
          startSpread: startSpread,
        };
      } else {
        // Reset the touch state
        this.touchState = {
          touchCount: 0,
          startPosition: { x: 0, y: 0 },
          startSpread: 0,
        };
      }
    },
  });
  