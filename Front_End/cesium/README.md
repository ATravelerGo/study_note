# Cesium

## 1. 展示出地球
    ```html
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <script  src="../lib/Cesium/Cesium.js"></script>
        <link rel="stylesheet" href="../lib/Cesium/Widgets/widgets.css">
    
    </head>
    <body>
    
    
    <div id="cesium-container"></div>
    
    
    <script>
        //必须要填好本账号的使用token
        Cesium.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MzEyOThkMi1jMmFhLTQ2N2YtOTEyYS1kMjYzMjAyMTYwOTciLCJpZCI6MjU4MDU0LCJpYXQiOjE3MzI2MDI2NTZ9.WEgMITZx7KgH-QcqyMGF7TpgLkHf_lzTAYd7r9uh9G4"
        //创建cesium视图 参数是div的id名
        const viewer = new Cesium.Viewer('cesium-container')
    
    
    </script>
    
    </body>
    <style>
        html,body {
            margin: 0;
            padding: 0;
            border: 1px solid red;
        }
    
    </style>
    </html>
    ```
## 2. Cesium四个重要的类
1. Viewer 查看器类
2. Scene 场景类
3. Entity 实体类
4. DataSourceCollection 数据源集合类

## 3. Viewer 展示Cesium展示三维要素内容的主要窗口
不仅仅包含三维地球的视窗，还包含了一些基础的控件
在定义Viewer对象的同时需要设定基础部件，图层等的初始化状态
```js
    new Cesium.Viwer(渲染Cesium主窗口的div的id,options: 可选设置参数)
```
接下来我们针对options来看下常用的配置
![img.png](img.png)
![img_1.png](img_1.png)
viewer在使用中主要用于对视口中各个组件进行一个配置
这里我们对几个核心类做简要说明

## 4. Scene是非常重要的类，是所有3D图形对象的容器
是在viewer内部隐式创建的，我们可以对基础地理环境进行配置
如：将地球设置为隐藏
```js
viewer.scene.globe.show=false
```
![img_2.png](img_2.png)
我们也可以对基础图层进行设置，包括地图，地形等
> 需要注意的是在Viewer类中设置图层等价于在scene中设置图层 ！！！！！！！！！！！！！
> viewer.imgerLaters == viewer.scene.imgerLaters  结果是true

我们还可以对场景数据进行设置，Cesium底层控件数据绘制方法是依赖Primitive
Primitive API功能强大而且非常灵活，为程序员绘制高级图形提供了很大自由度
开发者可根据图形学原理自定义高级图形
Scene还可以进行场景交互如鼠标事件，相机事件等
> 我们可以通过scene控制相机对我们的视口进行一个切换
>  viewer.scene.camera.setView({
destination: Cesium.Cartesian3.fromDegrees(100.39,39.9,1500)
})


## 5. Entity 是由Primitive封装而来，Entity并不属于Scene
Entity封装程度高，构造简单，使用便捷，使得开发者专注于数据的呈现
还提供了用于构建复杂的，时间动态可视化的结构于静态数据自然的结合在一起
```html
//在地图上创建一个圆形，还开启了视角跟随
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script  src="../lib/Cesium/Cesium.js"></script>
    <link rel="stylesheet" href="../lib/Cesium/Widgets/widgets.css">

</head>
<body>
<div id="cesium-container"></div>

<script>
    //必须要填好本账号的使用token
    Cesium.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MzEyOThkMi1jMmFhLTQ2N2YtOTEyYS1kMjYzMjAyMTYwOTciLCJpZCI6MjU4MDU0LCJpYXQiOjE3MzI2MDI2NTZ9.WEgMITZx7KgH-QcqyMGF7TpgLkHf_lzTAYd7r9uh9G4"
    //创建cesium视图,也就是渲染出地球来， 参数是div的id名
    const viewer = new Cesium.Viewer('cesium-container',{
        animation: false,
        timeline: false,
    })

    const entity=viewer.entities.add({
        position:Cesium.Cartesian3.fromDegrees(116.39,39.9,400),
        point:{
            pixelSize:50,
            color:new Cesium.Color(0,1,0,1),
        }
    })
    viewer.trackedEntity=entity

</script>

</body>
<style>
    html,body {
        margin: 0;
        padding: 0;
    }
</style>
</html>
```

## 6. DataSourceCollection 是cesium中加载矢量数据的主要方式之一
最大的特点是支持加载矢量数据集和外部文件的调用
主要有三种调用方法

    1. CzmlDataSource
    2. KmlDataSource
    3. GeoJsonDataSource

在GIS开发中加载矢量数据是必不可少的功能，将矢量数据转换为以上任何一种方式
便可以在Cesium中实现矢量数据的加载和存取
> viewer.dataSources.add(Cesium.GeoJsonDataSource.load("../libs/SampleData/")) 这个是使用GeoJson数据 里面放文件路径 可以给地图增加图层等


## 7. Cesium的坐标和转换(这里学的很懵)
地理坐标和屏幕坐标之间做切换
Cesium有五种坐标系
    
    1. WGS84经纬度坐标系（没有实际的对象）
    2. WGS84弧度坐标系（Catographic） new Cesium.Cartographic(经度，纬度，高度)
![img_3.png](img_3.png)

    3. 笛卡尔空间直角坐标系（Cartesian3） 
    4. 平面坐标系（Cartesian2）也叫屏幕坐标系
    5. 4D笛卡尔坐标系（Cartesian4）用的不多



![img_5.png](img_5.png)

![img_4.png](img_4.png)

![img_6.png](img_6.png)

## 8. 相机系统介绍  不仅要确定视点位置，还要确定视线方向
