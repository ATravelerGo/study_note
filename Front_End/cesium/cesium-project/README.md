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

# 3D模型添加和设定
