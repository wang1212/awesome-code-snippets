<div align="center">
  <h1>Awesome-Code-Snippets</h1>
  
  <p>:heart: 很棒的且可重用的代码片段。</p>
 </div>

## 目录

*Content.*

- [HTML Template](https://wang1212.github.io/awesome-code-snippets)
- [Leaflet-With-Plugins](https://wang1212.github.io/awesome-code-snippets/leaflet-with-plugins.html)
- [Cesium.js](cesiumjs.md)

## 代码片段

*Code Snippets.*

### JavaScript

- [ESRI Shapefile][2] 文件中 [dbf][1] 文件的属性字段类型

*[Field data type][0] mapping in the [dbf][1] file of [ESRI Shapefile][2].*

[0]: http://www.dbase.com/Knowledgebase/INT/db7_file_fmt.htm "Data File Header Structure for the dBASE Version 7 Table File"
[1]: https://www.loc.gov/preservation/digital/formats/fdd/fdd000326.shtml "dBASE Table for ESRI Shapefile (DBF)"
[2]: https://www.esri.com/library/whitepapers/pdfs/shapefile.pdf

```javascript
{
	B: 'Binary',
	C: 'Character',
	D: 'Date',
	N: 'Numeric',
	L: 'Logical',
	M: 'Memo',
	'@': 'Timestamp',
	I: 'Long',
	'+': 'Autoincrement',
	F: 'Float',
	O: 'Double',
	G: 'OLE'
}
```

### HTML

- `MediaDevices.getUserMedia()` vs `<input type="file" capture />`

为了使用 JavaScript 在移动终端上调用媒体设备（相机/麦克风等），H5 API 提供了 [`MediaDevices.getUserMedia()`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)，但是存在许多兼容性问题；然而，你可以使用 `input` 标签的 [`capture`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#capture) 属性作为备选方案。

```
// `accept` attribute can restrict media type.
// no accept - When the accept attribute does not exist, it will include the camera / camcorder / recorder / file system.
// accept=image/* - camera only.
// accept=video/* - camcorder only.
// accept=audio/* - recorder only.
<input type="file" capture />
```

### CSS

- 使用 [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) 隐藏不需要打印的 DOM 元素

```css
@media print {
  .not-print {
    display: none;
  }
}
```

标记不需要打印的 DOM 元素：

```html
<div class="not-print"></div>
```

- 使用 CSS 规则 [`break-before`](https://developer.mozilla.org/en-US/docs/Web/CSS/break-before) 和` break-after` 在打印时强制分页：

```css
.page {
  break-before: auto;
  break-after: always;
}
```

然后:

```html
<section class="page">Page One</section>
<section class="page">Page Two</section>
```

- 使用 [`CSS contain`](https://developer.mozilla.org/en-US/docs/Web/CSS/contain) 优化性能

```css
contain: strict;
```

### Node.js

- 在 Node.js 中用 **POST** 请求提交 `multipart/form-data` 表单数据

Node.js 默认对 `multipart/form-data` 数据在请求时不进行编码，[form-data](https://github.com/form-data/form-data) 模块提供了解决方案：

```javascript
import FormData from 'form-data'
import axios from 'axios'

const formData = new FormData()
formData.append('username', username)
formData.append('password', password)

// `headers` are very important
axios.post(api, formData, { headers: formData.getHeaders() })
```

- `npm link`

在 Node.js 模块/包开发中，`npm link` 命令可以在本地进行发布前调试，但会造成一点的问题和文件夹污染，下面提供一个更干净的方式：

```json
"dependencies": {
  "my-dev-module": "file:../my-dev-module/index.min.js"
}
```

- 移除 *node_modules* 文件夹

*node_modules* 文件夹通常包含大量文件，要在 **Windows** 系统上删除该文件夹需要耗费很长时间，提供一个有用的命令来快速删除该文件夹：

```cmd
rmdir "node_modules\" /S /Q
```

- 安装 `node-sass`

安装 `node-sass` 的过程中总会出现网络错误，可以使用国内镜像源进行安装：

*It is easy to **fail** to install in **China** in the normal way. Can be installed in the following ways:*

```shell
npm i -D node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```

现在，推荐使用 [`sass`](https://www.npmjs.com/package/sass) 作为替代。

## 其它

*Other.*

The reason this repository exists is because gistub's gist cannot be accessed in the normal way.
