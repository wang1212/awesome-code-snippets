# Useful code snippets for [Cesium.js](https://cesium.com/cesiumjs/)

> Recommend, here are a lot of official examples :point_right: [Sandcastle](https://sandcastle.cesium.com/)

## Content

- [User interaction](#user-interaction)

## User interaction

- Adjust mouse habits

Adjust the mouse wheel to zoom the map, right mouse button to rotate the map, left mouse button to drag the map.

```js
map.scene.screenSpaceCameraController.zoomEventTypes = [Cesium.CameraEventType.WHEEL, Cesium.CameraEventType.PINCH]
map.scene.screenSpaceCameraController.tiltEventTypes = [
  Cesium.CameraEventType.PINCH,
  Cesium.CameraEventType.RIGHT_DRAG,
  {
    eventType: Cesium.CameraEventType.RIGHT_DRAG,
    modifier: Cesium.KeyboardEventModifier.CTRL,
  },
]
```
