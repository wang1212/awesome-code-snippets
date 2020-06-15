# Useful code snippets for [Cesium.js](https://cesium.com/cesiumjs/)

> Recommend, here are a lot of official examples :point_right: [Sandcastle](https://sandcastle.cesium.com/)

## Content

- [User Interaction](#user-interaction)

## User Interaction

- Adjust mouse habits

Adjust the mouse wheel to zoom the map, right mouse button to rotate the map, left mouse button to drag the map.

```js
viewer.scene.screenSpaceCameraController.zoomEventTypes = [Cesium.CameraEventType.WHEEL, Cesium.CameraEventType.PINCH]
viewer.scene.screenSpaceCameraController.tiltEventTypes = [
  Cesium.CameraEventType.PINCH,
  Cesium.CameraEventType.RIGHT_DRAG,
  {
    eventType: Cesium.CameraEventType.RIGHT_DRAG,
    modifier: Cesium.KeyboardEventModifier.CTRL,
  },
]
```

- Get mouse position

```js
const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)

handler.setInputAction((e) => {

  const cartesian3 = viewer.camera.pickEllipsoid(e.endPosition)
  if (!cartesian3) return
  
  const cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian3)
  const longitude = Cesium.Math.toDegrees(cartographic.longitude)
  const latitude = Cesium.Math.toDegrees(cartographic.latitude)
  
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
```
