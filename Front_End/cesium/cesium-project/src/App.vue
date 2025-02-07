<script setup lang="ts">
import {onMounted} from 'vue'
import * as Cesium from 'cesium'
import "cesium/Source/Widgets/widgets.css"

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
    infoBox: false, //是否显示信息窗口
    geocoder: true,//这个是控制是否显示右上角的搜索框，这个搜索框可以根据位置进行定位
    homeButton: true, //这个是控制Home按钮是否显示
    sceneModePicker: true, //这个是控制查看器的显示模式 3d 2.5d
    baseLayerPicker: false,//这个是控制是否显示图层显示器
    navigationHelpButton: false, //这个是控制是否显示提示按钮
    animation: false,//这个是控制左下角的那个动画控制器是否展示
    timeline: false, //这个是控制是否显示时间轴
    fullscreenButton: false, //是否显示全屏按钮
    terrainProvider: await Cesium.createWorldTerrainAsync({
      requestVertexNormals: true,//法相  光照效果，有阴影效果
      requestWaterMask: true //水纹贴图
    }) //自带的地形数据



  })
  //隐藏logo
  viewer.cesiumWidget.creditContainer.style.display = "none"

  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(
        113.3191,
        23.109,
        500
    )
  })


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
    },
  })

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
      height: 20,
      
    }
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
