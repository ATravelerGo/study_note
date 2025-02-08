<script setup lang="ts">
import {onMounted} from 'vue'
import * as Cesium from 'cesium'
import "cesium/Source/Widgets/widgets.css"
import planeData from '../public/json/plane.json'
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MzEyOThkMi1jMmFhLTQ2N2YtOTEyYS1kMjYzMjAyMTYwOTciLCJpZCI6MjU4MDU0LCJpYXQiOjE3MzI2MDI2NTZ9.WEgMITZx7KgH-QcqyMGF7TpgLkHf_lzTAYd7r9uh9G4'
let viewer: any = null
// //✅ 确保 3D Tiles 的 URL 是有效的
// const tileset = await Cesium.Cesium3DTileset.fromUrl("/model/modeOne/tileset.json");
// // ✅ 添加 Tileset 到场景
// viewer.value.scene.primitives.add(tileset);
// // ✅ 等待 Tileset 加载完成
// console.log("✅ 3D Tiles 加载成功");
// // ✅ 调整视角
// viewer.value.zoomTo(tileset);

//设置cesium的默认视角
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(89.5, 20.4, 110.4, 61.2)


const init = async () => {
  viewer = new Cesium.Viewer("cesium-container", {
    infoBox: true, //是否显示信息窗口
    geocoder: true,//这个是控制是否显示右上角的搜索框，这个搜索框可以根据位置进行定位
    homeButton: true, //这个是控制Home按钮是否显示
    sceneModePicker: true, //这个是控制查看器的显示模式 3d 2.5d
    baseLayerPicker: false,//这个是控制是否显示图层显示器
    navigationHelpButton: false, //这个是控制是否显示提示按钮
    animation: true,//这个是控制左下角的那个动画控制器是否展示
    timeline: true, //这个是控制是否显示时间轴
    fullscreenButton: false, //是否显示全屏按钮
    terrainProvider: await Cesium.createWorldTerrainAsync({
      requestVertexNormals: true,//法相  光照效果，有阴影效果
      requestWaterMask: true //水纹贴图
    }) //自带的地形数据



  })
  //隐藏logo
  viewer.cesiumWidget.creditContainer.style.display = "none"

  // viewer.camera.flyTo({
  //   destination: Cesium.Cartesian3.fromDegrees(
  //       113.3191,
  //       23.109,
  //       1000
  //   )
  // })


  const point = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(
        113.3191,
        23.109,
        200
    ),

    point: {//这是点
      pixelSize: 10,
      color: Cesium.Color.RED,
      outlineColor: Cesium.Color.RED
    },
  })

  viewer.zoomTo(point)


//https://geo.datav.aliyun.com/areas_v3/bound/130000.json  这是geojson地址
  //
  const geoJson1 = await Cesium.GeoJsonDataSource.load("https://geo.datav.aliyun.com/areas_v3/bound/130600_full.json", {
    stroke: Cesium.Color.RED,
    fill: Cesium.Color.SKYBLUE.withAlpha(0.5)
  })
  await viewer.dataSources.add(geoJson1)

  const entity = geoJson1.entities.values

  entity.forEach((entity: any) => {
    entity._polygon.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromRandom())
  })


// 3. 创建矩形光墙实体
  const positions = Cesium.Cartesian3.fromDegreesArray([
    110.0, 30.0, // 西南角
    120.0, 30.0, // 西北角
    120.0, 35.0, // 东北角
    110.0, 35.0, // 东南角
    110.0, 30.0  // 返回到西南角形成闭合
  ]);

// 3. 添加边界线（光墙的外框）
  viewer.entities.add({
    polyline: {
      positions: positions,
      width: 4,
      material: new Cesium.ColorMaterialProperty(Cesium.Color.BLUE.withAlpha(0.8)) // 光墙外框的颜色
    }
  });

// 4. 定义光墙的高度和材质
  const wallHeight = 1000; // 光墙的高度

// 5. 添加光墙的四个面
  const walls = [
    viewer.entities.add({
      wall: {
        positions: Cesium.Cartesian3.fromDegreesArray([
          110.0, 30.0, // 西南角
          120.0, 30.0  // 西北角
        ]),
        maximumHeights: [wallHeight, wallHeight],
        minimumHeights: [0, 0],
        material: new Cesium.ColorMaterialProperty(Cesium.Color.BLUE.withAlpha(0.5))
      }
    }),
    viewer.entities.add({
      wall: {
        positions: Cesium.Cartesian3.fromDegreesArray([
          120.0, 30.0, // 西北角
          120.0, 35.0  // 东北角
        ]),
        maximumHeights: [wallHeight, wallHeight],
        minimumHeights: [0, 0],
        material: new Cesium.ColorMaterialProperty(Cesium.Color.BLUE.withAlpha(0.5))
      }
    }),
    viewer.entities.add({
      wall: {
        positions: Cesium.Cartesian3.fromDegreesArray([
          120.0, 35.0, // 东北角
          110.0, 35.0  // 东南角
        ]),
        maximumHeights: [wallHeight, wallHeight],
        minimumHeights: [0, 0],
        material: new Cesium.ColorMaterialProperty(Cesium.Color.BLUE.withAlpha(0.5))
      }
    }),
    viewer.entities.add({
      wall: {
        positions: Cesium.Cartesian3.fromDegreesArray([
          110.0, 35.0, // 东南角
          110.0, 30.0  // 西南角
        ]),
        maximumHeights: [wallHeight, wallHeight],
        minimumHeights: [0, 0],
        material: new Cesium.ColorMaterialProperty(Cesium.Color.BLUE.withAlpha(0.5))
      }
    })
  ];






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
  // const promiseData = Cesium.CzmlDataSource.load(czml)
  // promiseData.then((data) => {
  //   console.log("data", data)
  //   viewer.dataSources.add(data)
  //   // viewer.flyTo(data)
  // })


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
  //3d tiles调试面板
  //viewer.extend(Cesium.viewerCesium3DTilesInspectorMixin)


  const tiles3D = await Cesium.createOsmBuildingsAsync()
  const osmBuildings = viewer.scene.primitives.add(tiles3D)


  osmBuildings.style = new Cesium.Cesium3DTileStyle({
    color: "color('yellow')",
    show: true
  })


}

onMounted(async () => {

  await init()

})

</script>

<template>
  <div id="cesium-container" ref="cesiumContainerRef">
  </div>
</template>

<style scoped>
#cesium-container {
  width: 98vw;
  height: 98vh;
}
</style>
