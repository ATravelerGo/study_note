const uploadFileDom = document.getElementById("uploadFile");

let fileObj = {};

uploadFileDom.addEventListener("change", (e) => {
  const file = e.target.files[0];
  fileObj = file;
  console.log("file", file);

  //这里应该开始切片了
  const chunk = sliceFile(file, 20 * 1024 * 1024);
  console.log("chunk", chunk);
  //这里应该在进行数组处理
  const chunks = chunk.map((item, index) => {
    return {
      file: item.file, //切片文件
      size: item.file.size, //切片文件大小
      percent: 0,
      chunkName: `${file.name}-${index}`,
      fileName: `${file.name}`,
      index,
    };
  });
  //然后开始发请求了该
  uploadChunks(chunks);
});

const sliceFile = (targetFile, SIZE) => {
  const chunk = [];
  let current = 0;

  while (current < targetFile.size) {
    chunk.push({
      file: targetFile.slice(current, current + SIZE),
      chunkIndex: current,
      chunkSize: SIZE,
      fileName: targetFile.name,
    });

    current += SIZE;
  }

  return chunk;
};

//封装axios请求
const requestUpload = ({
  url,
  method = "post",
  data,
  headers = {},
  onUploadProgress = (e) => e,
}) => {
  return new Promise((resolve, reject) => {
    axios[method](url, data, { headers, onUploadProgress })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
const createProgress = (item) => {
  return (e) => {
    // 为何函数需要return出来，因为axios的onUploadProgress就是个函数体
    // 并且这个函数体参数e就是进度
    item.percent = parseInt(String(e.loaded / e.total) * 100); // axios提供的
  };
};
//改发请求了
const uploadChunks = (chunks) => {
  console.log("chunks", chunks);
  //这里还要做处理  因为后端不认识文件数组，我们需要把他转成fileData 这样后端就会识别出来他是个文件
  ///发请求并不是直接将封装好的切片数组 chunks 交给后端，因为后端并不认识这个对象格式，我们需要先将其转换成数据流。
  // 刚才的 Blob 在 介绍中就说到了， Blob 可以按二进制的格式进行读取，也可以用ReadableStream数据操作
  // 这里我用原生 js 的表单数据流来传递，因此将其转成表单格式的数据流，它是二进制的
  //

  //blob是js独有的
  //核心 后端不认识前端的blob对象 需要转化成后端认识ide格式例如FormData 或者以二进制流的方式传输
  const formChunks = chunks.map(({ file, chunkName, fileName, index }) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("chunkName", chunkName);
    formData.append("fileName", fileName);
    return { formData, index };
  });

  console.log("formChunks", formChunks);
  //接下来就是上传了
  const requestList = formChunks.map(({ formData, index }) => {
    return requestUpload({
      url: "http://localhost:3000/upload",
      data: formData,
      onUploadProgress: createProgress(chunks[index]),
    });
  });
  console.log("requestList", requestList);

  Promise.all(requestList).then((res) => {
    console.log("res", res);

    mergeChunks();
  });
};

function mergeChunks(size = 20 * 1024 * 1024) {
  axios
    .post("http://localhost:3000/merge", {
      fileName: fileObj.name,
      size,
    })
    .then((res) => {
      console.log(`${fileObj.name}合并完成`);
    });
}
