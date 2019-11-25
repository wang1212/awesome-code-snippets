<div align="center">
  <h1>Awesome-Code-Snippets</h1>
  
  <p>:heart: Some great code snippets that are very useful and reusable.</p>
 </div>

## Content

- [HTML Template](https://wang1212.github.io/awesome-code-snippets)
- [Leaflet-With-Plugins](https://wang1212.github.io/awesome-code-snippets/leaflet-with-plugins.html)

## Code Snippets

- Remove `node_modules`

The `node_modules` folder usually contains **a lot of small files**, which takes **a long time** to delete on **Windows**. You can save time with the following command:

```
rmdir "node_modules\" /S /Q
```

- Install `node-sass`

It is easy to **fail** to install in **China** in the normal way. Can be installed in the following ways:

```
npm i -D node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```

- [Field data type][0] mapping in the [dbf][1] file of [ESRI Shapefile][2]

[0]: http://www.dbase.com/Knowledgebase/INT/db7_file_fmt.htm "Data File Header Structure for the dBASE Version 7 Table File"
[1]: https://www.loc.gov/preservation/digital/formats/fdd/fdd000326.shtml "dBASE Table for ESRI Shapefile (DBF)"
[2]: https://www.esri.com/library/whitepapers/pdfs/shapefile.pdf

```
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

## Other

The reason this repository exists is because gistub's gist cannot be accessed in the normal way.
