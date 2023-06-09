/* global AFRAME, THREE */

AFRAME.registerComponent("gesture-handler", {
  schema: {
    enabled: { default: true },
    rotationFactor: { default: 5 },
    minScale: { default: 0.3 },
    maxScale: { default: 8 },
  },

  init: function () {
    console.log("registered hai 2");
    console.log("registered hai 2 ", this );
    console.log("registered hai 2 this.el.object3D", this.el.object3D );
    console.log("registered hai 2 this.el.sceneEl", this.el.sceneEl );

    this.handleScale = this.handleScale.bind(this);
    this.handleRotation = this.handleRotation.bind(this);

    this.isVisible = false;
    this.initialScale = this.el.object3D.scale.clone();
    this.scaleFactor = 1;

    this.el.sceneEl.addEventListener("markerFound", (e) => {
      console.log(" see marker found "," Dk" );
      this.isVisible = true;
    });

    this.el.sceneEl.addEventListener("markerLost", (e) => {
      console.log("see marker gone "," Dk" );

      this.isVisible = false;
    });
  },

  update: function () {
    console.log("remove");

    if (this.data.enabled) {
      this.el.sceneEl.addEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
    } else {
      this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
    }
  },

  remove: function () {
    console.log("remove");

    this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
    this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
  },

  handleRotation: function (event) {
    console.log("handleRotation2", event);

    if (this.isVisible) {
      this.el.object3D.rotation.y +=
        event.detail.positionChange.x * this.data.rotationFactor;
      this.el.object3D.rotation.x +=
        event.detail.positionChange.y * this.data.rotationFactor;
        console.log(' rotation x : ',  this.el.object3D.rotation.x  );
        console.log(' rotation y : ',  this.el.object3D.rotation.y  );

    }
  },

  handleScale: function (event) {
    console.log("handleScale2", event);

    if (this.isVisible) {
      this.scaleFactor *=
        1 + event.detail.spreadChange / event.detail.startSpread;

      this.scaleFactor = Math.min(
        Math.max(this.scaleFactor, this.data.minScale),
        this.data.maxScale
      );

      this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
      this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
      this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;

      console.log(' scale x : ',   this.el.object3D.scale.x   );
      console.log(' scale y : ',   this.el.object3D.scale.y   );
      console.log(' scale z : ',   this.el.object3D.scale.z   );

    }
  },
});
