# 纹理

3D世界的纹理由图片组成
将纹理以一定的规则映射到几何体上，一般是三角形，那么这个几何体就有纹理皮肤了
加载纹理：

```js
const loader = new THREE.TextureLoader();
loader.load(
    'path/to/texture.jpg',    // 纹理图片路径
    function (texture) {       // 成功加载后的回调函数
        console.log('纹理加载成功:', texture);
        // 这里可以将加载的纹理赋值给材质
        const material = new THREE.MeshBasicMaterial({map: texture});
        const geometry = new THREE.BoxGeometry(10, 10, 10);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
    },
    undefined,                // 可选：加载进度的回调函数
    function (error) {         // 可选：加载出错时的回调函数
        console.error('纹理加载失败:', error);
    }
);
```

最后纹理应用于材质