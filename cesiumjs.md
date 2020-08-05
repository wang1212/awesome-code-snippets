# [Cesium.js](https://cesium.com/cesiumjs/) 相关有用的代码片段

*Useful code snippets for [Cesium.js](https://cesium.com/cesiumjs/).*

> 推荐查看官方示例 (Recommend, here are a lot of official examples) :point_right: [Sandcastle](https://sandcastle.cesium.com/)

## 目录导航

*Navigation.*

- [用户交互（User Interaction）](#用户交互)

## 用户交互

*User Interaction.*

- 调整鼠标习惯

调整为鼠标滚轮缩放地图，右键旋转地图，左键拖拽地图。

*Adjust the mouse wheel to zoom the map, right mouse button to rotate the map, left mouse button to drag the map.*

```js
// see docs: https://cesium.com/docs/cesiumjs-ref-doc/ScreenSpaceCameraController.html#zoomEventTypes
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

- 获取鼠标坐标（经纬度、高程）

```js
const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)

handler.setInputAction((e) => {
  // 1. 获取椭球面坐标，无高程数据（Ellipsoid coordinates, no elevation data）
  // see docs: https://cesium.com/docs/cesiumjs-ref-doc/Camera.html#pickEllipsoid
  const cartesian3 = viewer.camera.pickEllipsoid(e.endPosition)
  
  // 2. 获取场景坐标，有高程数据（Scene coordinates, with elevation data）
  // see docs: https://cesium.com/docs/cesiumjs-ref-doc/Scene.html#pickPosition
  const cartesian3 = viewer.scene.pickPosition(e.endPosition);
  
  // 3. 获取地球表面交点坐标，有高程数据（The coordinates of the intersection point on the surface of the earth, with elevation data）
  // see docs: https://cesium.com/docs/cesiumjs-ref-doc/Globe.html#pick
  const ray = viewer.camera.getPickRay(e.endPosition);
  const cartesian3 = viewer.scene.globe.pick(ray, viewer.scene);
  
  if (!cartesian3) return
  
  const cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian3)
  const longitude = Cesium.Math.toDegrees(cartographic.longitude)
  const latitude = Cesium.Math.toDegrees(cartographic.latitude)
  
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
```

- 相机高度与缩放级别的映射

*Mapping of camera height and zoom level.*

> 查看代码 (See Code at) :point_right: [GitHub Gist](https://gist.github.com/ezze/d57e857a287677c9b43b5a6a43243b14)

<details>
<summary>View code</summary>

```js
function getZoomLevelHeights(precision?: number): Record<'level' | 'height', number>[] {
	function detectZoomLevel(distance) {
		const scene = map.scene
		const tileProvider = scene.globe._surface.tileProvider
		const quadtree = tileProvider._quadtree
		const drawingBufferHeight = map.canvas.height
		const sseDenominator = map.camera.frustum.sseDenominator

		for (let level = 0; level <= 19; level++) {
			const maxGeometricError = tileProvider.getLevelMaximumGeometricError(level)
			const error = (maxGeometricError * drawingBufferHeight) / (distance * sseDenominator)
			if (error < quadtree.maximumScreenSpaceError) {
				return level
			}
		}

		return null
	}

	precision = precision || 10

	let step = 100000.0

	const result = []
	let currentZoomLevel = 0
	for (let height = 100000000.0; height > step; height = height - step) {
		const level = detectZoomLevel(height)
		if (level === null) {
			break
		}

		if (level !== currentZoomLevel) {
			let minHeight = height
			let maxHeight = height + step
			while (maxHeight - minHeight > precision) {
				height = minHeight + (maxHeight - minHeight) / 2
				if (detectZoomLevel(height) === level) {
					minHeight = height
				} else {
					maxHeight = height
				}
			}

			result.push({
				level: level,
				height: Math.round(height),
			})

			currentZoomLevel = level

			if (result.length >= 2) {
				step = (result[result.length - 2].height - height) / 1000.0
			}
		}
	}

	return result
}
```
</details>

