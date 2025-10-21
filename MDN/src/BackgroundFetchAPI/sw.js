self.addEventListener('install', event => {
    console.log("service worker install 安装完成");
    self.skipWaiting(); // 立即激活
})
// 激活 Service Worker
self.addEventListener('activate', (event) => {
    console.log('Service Worker 激活成功');
    self.clients.claim(); // 立即控制所有页面
});

// 监听后台下载成功事件
self.addEventListener('backgroundfetchsuccess', (event) => {
    console.log('后台下载完成！');

    event.waitUntil(
        (async () => {
            // 获取下载任务信息
            const bgFetch = event.registration;

            // 获取所有下载的文件
            const records = await bgFetch.matchAll();

            // 处理每个下载的文件
            for (const record of records) {
                // 获取文件内容
                const response = await record.responseReady;
                console.log('下载的文件:', response);

                // 可以在这里保存文件或处理数据
            }

            // 更新通知（在手机上会显示）
            event.updateUI({ title: '下载完成！' });
        })()
    );
});
