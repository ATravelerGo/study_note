# Cesium基础
1. pnpm install cesium
2. pnpm add vite-plugin-cesium
3. 在node_modules中找到cesium，从中把Assets、ThirdParty、Widgets、Workers这四个文件夹copy出来到public文件夹下
4. 然后在vite.config.ts中配置
    ```js
    import { defineConfig } from 'vite'
    import vue from '@vitejs/plugin-vue'
    import cesium from 'vite-plugin-cesium';
    // https://vite.dev/config/
    export default defineConfig({
      plugins: [vue(),cesium()],
      define:{
        CESIUM_BASE_URL:"/" //主要是配置他,配置好后咱们的地图就可以出来了
      }
    })
    ```

5. 设置cesium token
   作用：用于设置 Cesium Ion 服务的访问令牌的属性。Cesium Ion 是一个云端平台，提供地球和场景数据的流式服务，包括 3D
   Tiles、地图、地形等。通过使用 Cesium Ion，您可以轻松加载和展示各种地理空间数据。

    ```js
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MzEyOThkMi1jMmFhLTQ2N2YtOTEyYS1kMjYzMjAyMTYwOTciLCJpZCI6MjU4MDU0LCJpYXQiOjE3MzI2MDI2NTZ9.WEgMITZx7KgH-QcqyMGF7TpgLkHf_lzTAYd7r9uh9G4'
    ```
6. 还可以设置Cesium的默认视角比如默认显示中国，（如果不设置会默认显示美国的区域）

    ```js
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(89.5, 20.4, 110.4, 61.2)
    ```
7. 我们可以隐藏cesium的logo
    ```js
      viewer.cesiumWidget.creditContainer.style.display = "none"
    
    ```

> 至此咱们的Cesium的初始配置就基本配置好了

# Cesium进阶

1. viewer查看器的一些常用配置设置
    ```js
     viewer = new Cesium.Viewer("cesium-container", {
        infoBox: false, //是否显示信息窗口
        geocoder: true,//这个是控制是否显示右上角的搜索框，这个搜索框可以根据位置进行定位
        homeButton: true, //这个是控制Home按钮是否显示
        sceneModePicker: false, //这个是控制查看器的显示模式 3d 2.5d
        baseLayerPicker: true,//这个是控制是否显示图层显示器
        navigationHelpButton: false, //这个是控制是否显示提示按钮
        animation: false,//这个是控制左下角的那个动画控制器是否展示
        timeline: false, //这个是控制是否显示时间轴
        fullscreenButton: false, //是否显示全屏按钮
        terrainProvider: await Cesium.createWorldTerrainAsync() //自带的地形数据
        //设置天空盒子
        // skyBox: new Cesium.SkyBox({
        //   sources: {
        //     positiveX: "",
        //     negativeX: "",
        //     positiveY: "",
        //     negativeY: "",
        //     positiveZ: "",
        //     negativeZ: "",
        //   }
        // })
   
        // imageryProvider: Cesium.WebMapServiceImageryProvider({}) //使用这个的前提baseLayerPicker是false
   
    })
    ```
2. 加载自定义地图(也是在viewer中配置，比如使用天地图,OSM地图)
    ```js
        imageryProvider:new Cesium.WebMapServiceImageryProvider({}) //使用这个的前提baseLayerPicker是false
    ```
   ```js
        //这个是加载OSM地图
    imageryProvider: new Cesium.OpenStreetMapImageryProvider({
      url: 'https://a.tile.openstreetmap.org/'
    })
   ```
   ```js
        //加载高德矢量地图
    imageryProvider: new Cesium.UrlTemplateImageryProvider({})
    
   ```
   > 新版本都不在viewer中直接配置imageryProvider了，需要间接配置

   ***新版方法***

   // 清除现有的图像图层
   viewer.imageryLayers.removeAll();
   // 添加 OpenStreetMap 图像提供者
   viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
   url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
   }));

3. 地图的叠加（核心：***不清除旧图层，给新图层设置透明度***）
   也很简单，不清除现有图层就可以
   ```js
   //地图叠加
   const layer = viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
   url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
   }))
   
   layer.alpha = 0.5 //这个非常关键，如果不设置的话，高德地图的图层会把里面的那个覆盖，要想都显示，就得设置透明度
   ```

4. 地形（好多地形数据可以在***地理空间数据云***网站查询）
   即在地图上设置凹凸不平的效果,其实也是在viewer中进行配置
   ```js
      terrainProvider: await Cesium.createWorldTerrainAsync({
      requestVertexNormals: true,//法相  光照效果，有阴影效果
      requestWaterMask: true //水纹贴图，地图上的水面效果增强
    }) //自带的地形数据
   ```
   当我们在地理空间数据云下载好地形数据后，是TIF文件，需要做个转换 在cesiumLab上
   我们需要下载cesiumLab
   进入之后左侧菜单列表我们选择***地形切片***
   然后把所有文件都添加进去后，处理参数三角算法：***vcg***  存储类型：***散列***
   输出路径选择项目的public文件夹下的terrain文件夹下
   这个平台要花钱！！！！！！！！！！！
   ***使用(也是在viewer中配置)***
   ```js
   terrainProvider: new Cesium.CesiumTerrainProvider({
   url: './treeains/gz',
   }) //自带的地形数据
   ```

# 坐标系与坐标系数值转换

1. 屏幕坐标系
   也就是二维的笛卡尔坐标系 Cartesian2类型
2. 地理坐标系
   WGS-84坐标系 Cartographic类型 把地球作为一个椭球体，然后定义经纬线，高度
3. 笛卡尔空间直角坐标系
   也就是三维的笛卡尔坐标系 Cartesian3类型
4. 角度与弧度的转换

   角度转弧度多少PI
   ```js
   const radians = Cesium.Math.toRadians(90)
   console.log("radians", radians) // 1.5707963267948966
   ```

   弧度转角度
   ```js
   const degrees = Cesium.Math.toDegrees(radians)
   console.log("degrees", degrees)// 90
   ```

5. 经纬度转为笛卡尔坐标
   ```js
    const position = Cesium.Cartesian3.fromDegrees(
      89.5,
      20.4,
      100
   )
   
   ```
6. 笛卡尔坐标系转经纬度（(这里有个细节点，经纬度转为笛卡尔坐标的时候并不是直接给的角度
   给的是弧度，所以需要我们去做角度转换)） 也就是说 ***转经纬度不是一下转成功的***
   ```js
   const position = Cesium.Cartographic.fromCartesian(cartesian3)
   //这里给的position里的值是一个弧度制，而不是角度，所以我们要转成角度
   const la = Cesium.Math.toDegrees(position.latitude)
   const lo = Cesium.Math.toDegrees(position.longitude)
   ```

# 相机(相机也是在viewer下的一个属性)

当我们用鼠标旋转地球的时候，看似是地球在旋转，其实是相机在进行移动，所以给人的感觉是地球在转动
> //获取相机离地面的高度
> const height = viewer.camera.positionCartographic.height

1. setView 方法，代表瞬间到达指定位置,视角
   ```js
    viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(
        116.393428,
        39.90923,
        100
    ),//这是位置，我们还可以指定视角
    orientation: { //这是设置视角  这里要给弧度,所以使用toRadians
      heading: Cesium.Math.toRadians(0),//设置相机的朝向，水平方向
      pitch: Cesium.Math.toRadians(-90),//相机的俯仰角 上下方向
      roll: Cesium.Math.toRadians(0) //相机的滚转角
    }
   })
   ```
2. 相机动画与相机动态交互 flyTo 会慢慢飞到目的地,实现动态飞往的过程
   ```js
    viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(
        116.393428,
        39.90923,
        100
    )
   })
   ```

3. 可以通过交互（按键）来操作相机 moveForward 精细移动 这个是向前移动，视角是朝向哪里就向前移动
   ***viewer.camera.moveForward(0.5)*** 向前移动
   ***viewer.camera.moveBackward(height / 100)*** 向后移动
   ***viewer.camera.moveLeft(height / 100)*** 向左移动
   ***viewer.camera.moveRight(height / 100)*** 向右移动
   ***viewer.camera.lookLeft(Cesium.Math.toRadians(1))*** 视角向左转
   ***viewer.camera.lookRight(Cesium.Math.toRadians(1))*** 视角向右转 当然还有向上，向下

# 添加物体与建筑物 （即entities 也是在viewer下的一个属性）

1. 添加物体
   ```js
   //这是添加点
      viewer.entities.add({
         position: Cesium.Cartesian3.fromDegrees(
         113.3191,
         23.109,
         200
         ),
         // billboard: { //定位点的图标
         // image: './assets/img.png',
         // //图标的大小
         // height: 30,
         // width: 30
         // }
         point: {//这是点
         pixelSize: 10,
         color: Cesium.Color.RED,
         outlineColor: Cesium.Color.RED
         }
      })
   ```
2. 添加Cesium自带的模型

   ```js
     const osmBuildings = await Cesium.createOsmBuildingsAsync();
     viewer.scene.primitives.add(osmBuildings);
   ```


3. 添加文字标签

   ```js
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(
              113.3191,
              23.109,
              200
      ),
      label: {//这是点
         text: "广州塔",
         font: "24px sans-serif",
         fillColor: Cesium.Color.BLACK,
         outlineWidth: 2
      }
   })
   ```
4. 添加图片
   ```js
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(
              113.3191,
              23.109,
              220
      ),
   
      label: {
         text: "广州塔",
         font: "24px sans-serif",
         fillColor: Cesium.Color.BLACK,
         outlineWidth: 4,
         horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
         verticalOrigin: Cesium.VerticalOrigin.BOTTOM
      },
      billboard: {
         image: '/img.png',
         width: 20,
         height: 20
      }
   })
   ```

> Cesium用到的所有东西都放到public中


git remote -v 可以查看当前url

git remote add source + url

git remote remove source

4. 3D模型添加和设定
   ```js
    const model = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(
        113.3191,
        23.109,
        800
    ),
    model: {
      uri: '/model/yellow_submarine_beatles.glb',
      minimumPixelSize: 128, //缩小后的最小像素 这个必须填，不然的话出不来东西
      silhouetteSize: 2,//设置飞机的轮廓
      silhouetteColor: Cesium.Color.WHITE,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000) //设置最近与最远可以查看范围
    }

   })
   
   // 模拟模型向东移动
   let lon = 113.3191; // 初始经度
   const speed = 0.0001; // 移动速度
   
   function moveModel() {
   lon += speed; // 更新经度
   const newPosition = Cesium.Cartesian3.fromDegrees(lon, 23.109, 800);
   model.position = newPosition; // 更新模型位置
   requestAnimationFrame(moveModel);
   }
   
   moveModel()
   
   ```

# Primitive，使用会很复杂，但是会更灵活(学的不认真，需要在复习)

Entities是高度封装的API
如果我们想要更底层的就需要Primitive来创建

1. 使用primitive来创建几何体

   ```js
   const polygonInstance = new Cesium.GeometryInstance({
      id: 'polygonInstance',
      geometry: new Cesium.PolygonGeometry({
         polygonHierarchy: new Cesium.PolygonHierarchy(
                 Cesium.Cartesian3.fromDegreesArray([-109, 45, -105, 45, -104, 44, -104, 41])
         ),
      }),
   });
   
   const polygonPrimitive = new Cesium.Primitive({
      geometryInstances: polygonInstance,
      appearance: new Cesium.MaterialAppearance({
         material: Cesium.Material.fromType("Color", {
            color: Cesium.Color.RED.withAlpha(0.5),
         }),
      }),
   });
   
   viewer.scene.primitives.add(polygonPrimitive);
   
   ```

# 与entity和primitive物体交互

1. 要想进行交互，需要先创建交互对象( const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas))

   ```js
   //与物体的交互
   //点击拾取
   //1.创建出屏幕事件对象,new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas) ,然后处理用户输入事件
   const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
   handler.setInputAction((movement) => {
      console.log("movement", movement)//这个拿到的是鼠标单击出的坐标
   //viewer.scene.pick（二维坐标）可以查看是否点击到了对象，里面的id就是实体
      const pickObject = viewer.scene.pick(movement.position)
      console.log("pickObject", pickObject) //这个就是鼠标单击出的物体
   }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
   ```

# entity材质使用materialProperty 这是关于面的材质

这个需要去官网看，里面也有不少样例
> const material = new Cesium.ColorMaterialProperty(Cesium.Color.BLUE)

# entity 关于线的材质

   ```js
   const redLine = viewer.entities.add({
   polyline: { //这代表是线
      positions: Cesium.Cartesian3.fromDegreesArray([
         89.5, 20.4,
         110.4, 61.2
      ]),
      width: 4,
      material: Cesium.Color.BLUE //这是给线设置材质，也可用作设置线的颜色
   }
})
   ```

材质有的时候也会影响线的外观，比如箭头外观

```js
const material1 = new Cesium.PolylineArrowMaterialProperty(
        Cesium.Color.BLUE,
)
const redLine = viewer.entities.add({
   polyline: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
         89.5, 20.4, 1000,
         110.4, 61.2, 1000
      ]),
      width: 4,
      material: material1
   }
})
```

设置发光飞线

```js
//设置发光飞线的效果(但是效果不太好)
const material2 = new Cesium.PolylineGlowMaterialProperty({
   glowPower: 0.8, //发光程度
   taperPower: 0.7,//到哪里可以收尾了，这个代表百分之70
   color: Cesium.Color.RED
})

const redLine = viewer.entities.add({
   polyline: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
         89.5, 20.4, 1000,
         110.4, 61.2, 1000
      ]),
      width: 5,
      material: material2
   }
})

```

# 加载渲染GeoJson数据

GeoJSON是一种用于编码各种地理数据结构的格式
Cesium可以进行加载并进行一些配置

```js
 const geoJson1 = await Cesium.GeoJsonDataSource.load("https://geo.datav.aliyun.com/areas_v3/bound/130600_full.json", {
   stroke: Cesium.Color.RED,
   fill: Cesium.Color.SKYBLUE.withAlpha(0.5)
})
console.log("geoJson", geoJson1)
await viewer.dataSources.add(geoJson1)
}

```

# 自定义GeoJson生成物体的样式

```js
const geoJson1 = await Cesium.GeoJsonDataSource.load("https://geo.datav.aliyun.com/areas_v3/bound/130600_full.json", {
   stroke: Cesium.Color.RED,
   fill: Cesium.Color.SKYBLUE.withAlpha(0.5)
})
await viewer.dataSources.add(geoJson1)

const entity = geoJson1.entities.values //以下两个步骤就是自定义Geojson生成物体的样式
entity.forEach((entity: any) => {
   entity._polygon.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromRandom())
})

```

# kml数据生成全球科学研究所地理标记  kml是谷歌的一个标准 也是相当于geojson 只不过标准是谷歌的 所以叫kml

kml格式与kmz格式都是kml类型的数据

# 初识CZML数据与应用

CZML数据也是一种json的数据格式，用于描述时间动态图像场景，主要用于在运行Cesium的web浏览器中显示，他描述线，点，广告牌，模型和其他图形基元
并制定他们如何随时间变化

```js

const czml = [
   {
      id: "document",
      name: "CZML Point - Time Dynamic",
      version: "1.0"
   },
   {
      id: "point",
      availability: "2012-08-04T16:00:00Z/2012-08-04T16:05:00Z",
      position: {
         epoch: "2012-08-04T16:00:00Z",
         //设置了四个维度为一个整体 【时间s，经度，纬度，高度】
         cartographicDegrees: [
            0, -70, 20, 150000, 100, -80, 44, 150000, 200, -90, 18, 150000, 300, -98, 52, 150000
         ]
      },
      point: {
         color: {
            rgba: [255, 255, 255, 128],
         },
         outlineColor: {
            rgba: [255, 0, 0, 128],
         },
         outlineWidth: 3,
         pixelSize: 15
      }

   }
]

//加载czml数据
const promiseData = Cesium.CzmlDataSource.load(czml)
promiseData.then((data) => {
   console.log("data", data)
   viewer.dataSources.add(data)
   // viewer.flyTo(data)
})


```

# 模拟飞机从机场起飞，到另一个机场降落的路线

SampledPositionProperty 适用于 动态对象（如飞机、卫星、车辆等），可以：
存储多个时间点的位置（经度、纬度、高度）。
自动计算中间点，实现平滑插值（如线性插值、样条曲线插值）。
让实体平滑移动，而不是瞬间跳跃

```js
// 1. 创建 Viewer
const viewer = new Cesium.Viewer("cesiumContainer", {shouldAnimate: true});

// 2. 创建 SampledPositionProperty 存储飞行路径
const positionProperty = new Cesium.SampledPositionProperty();

// 3. 定义飞行轨迹数据
const flightPath = [
   {time: 0, lon: 116.4074, lat: 39.9042, alt: 100},  // 起点
   {time: 10, lon: 117.0000, lat: 39.5000, alt: 5000},
   {time: 20, lon: 118.5000, lat: 39.0000, alt: 10000},
   {time: 30, lon: 119.5000, lat: 38.5000, alt: 9000},
   {time: 40, lon: 121.4737, lat: 31.2304, alt: 50}     // 终点
];

// 4. 逐个添加时间和位置
const startTime = Cesium.JulianDate.now(); // 当前时间
flightPath.forEach(point => {
   let time = Cesium.JulianDate.addSeconds(startTime, point.time, new Cesium.JulianDate());
   let position = Cesium.Cartesian3.fromDegrees(point.lon, point.lat, point.alt);
   positionProperty.addSample(time, position);
});

// 5. 创建飞机实体并绑定 `SampledPositionProperty`
const planeEntity = viewer.entities.add({
   id: "plane",
   position: positionProperty, // 绑定位置
   model: {
      uri: "path/to/airplane.glb",
      minimumPixelSize: 64,
      maximumScale: 2000
   },
   orientation: new Cesium.VelocityOrientationProperty(positionProperty) // 方向随轨迹变化
});

// 6. 让相机跟随飞机
viewer.trackedEntity = planeEntity;

```

> 总代码

```js
//创建时间间隔
const timeStepSeconds = 30 //每个点之间的间隔 30s
const totalTime = timeStepSeconds * (planeData.length - 1) //飞行花费的总时间

//设置起点时间
const startTime = new Date("2022-03-09T23:10:00Z")
//cesium 默认使用的是儒略日的时间，所以我们需要转换
//这是起点时间
const start = Cesium.JulianDate.fromDate(startTime)
//设置终点时间
const stop = Cesium.JulianDate.addSeconds(
        start,
        totalTime,
        new Cesium.JulianDate()
)
console.log("stop", stop)

//将查看器的时间调整到起点和结束点的范围
viewer.clock.startTime = start.clone()
viewer.clock.stopTime = stop.clone()
viewer.clock.currentTime = start.clone()
viewer.timeline.zoomTo(start, stop)

const samplePosition = new Cesium.SampledPositionProperty() //创建采样点

planeData.forEach((position: any, i) => {
   const time = Cesium.JulianDate.addSeconds(
           start,
           i * timeStepSeconds,
           new Cesium.JulianDate()
   )

   //添加轨迹的采样点
   samplePosition.addSample(time, Cesium.Cartesian3.fromDegrees(
           position.lon,
           position.lat,
           position.alt
   ))
   //添加点  这个时候地图上的点的间隔距离是根据实际经纬度来的，有的间隔会非常大，有的会很小
   viewer.entities.add({
      // position: Cesium.Cartesian3.fromDegrees(
      //     position.lon,
      //     position.lat,
      //     position.alt
      // ),
      point: {
         pixelSize: 10,
         color: Cesium.Color.RED
      }
   })

})
viewer.clock.shouldAnimate = true
//创建飞机
const planeEntity = viewer.entities.add({
   name: "Plane Entity",
   position: samplePosition,
   orientation: new Cesium.VelocityOrientationProperty(samplePosition),//这个方法会根据采样点，计算出飞机的速度和方向
   model: {
      uri: "/model/yellow_submarine_beatles.glb",
      minimumPixelSize: 128,
      maximumPixelSize: 20000,
      runAnimations: true
   },
   //绘制轨迹线
   path: new Cesium.PathGraphics({
      width: 5
   }),
   availability: new Cesium.TimeIntervalCollection([
      new Cesium.TimeInterval({
         start: start,
         stop: stop,
      })
   ])
})
//相机追踪物体
viewer.trackedEntity = planeEntity
```

# 3DTiles

3D瓦片格式
3DTiles规范，这是一种用于流式传输大量异构3D地理空间数据集的开放标准
其实这里就用到了3DTiles
他会按需流式传输，只加载视野范围内的数据

```js
// 添加了3D建筑
const tiles3D = await Cesium.createOsmBuildingsAsync()
const osmBuildings = viewer.scene.primitives.add(tiles3D)
```

```js
 //3d tiles调试面板
viewer.extend(Cesium.viewerCesium3DTilesInspectorMixin)

```

# 根据不同条件设置3D_tiles样式

```js
const tiles3D = await Cesium.createOsmBuildingsAsync()
const osmBuildings = viewer.scene.primitives.add(tiles3D)


osmBuildings.style = new Cesium.Cesium3DTileStyle({
   color: "color('yellow')",
   show: true
})
```
