const blob = new Blob(["hello world"], {type: "text/plain"});


blob.slice(0, 5).text().then((data) => {
    console.log("data", data)
})

blob.arrayBuffer().then((arrayBuffer) => {
    console.log("arrayBuffer", arrayBuffer)
})
//获取Blob的可读流
const stream = blob.stream()
//创建一个默认的文件读取器  blob的流自带读取器
const reader = stream.getReader()

// 用于读取流并输出到控制台
function readStream() {
    reader.read().then(({done, value}) => {
        if (done) {
            console.log('Stream complete');
            return;
        }
        // 将 Uint8Array 转换为字符串并输出
        console.log(new TextDecoder("utf-8").decode(value));
        // 继续读取下一个块
        return readStream(); // 递归调用
    }).catch(err => {
        console.error('Stream failed:', err);
    });
}

readStream();
