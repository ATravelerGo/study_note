//启动后端node服务器
const http = require("http");
const multiparty = require("multiparty");
const path = require("node:path");
const fse = require("fs-extra");
const fs = require("node:fs");
const UPLOAD_DIR = path.resolve(__dirname, ".", "chunks"); // 准备好地址用来存切片
const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // 允许所有的请求源来跨域
  res.setHeader("Access-Control-Allow-Headers", "*"); // 允许所有的请求头来跨域
  if (req.method === "OPTIONS") {
    res.status = 200;
    res.end();
    return;
  }
  if (req.url === "/upload") {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      const [file] = files.file;
      const [fileName] = fields.fileName;
      const [chunkName] = fields.chunkName;
      //保存切片
      const chunkDir = path.resolve(UPLOAD_DIR, `${fileName}-chunks`);
      if (!fse.pathExistsSync(chunkDir)) {
        //该路径是否有效
        fse.mkdirpSync(chunkDir);
      }
      //存入切片

      //通常在文件上传过程中，后端接收到的文件会首先存放在临时空间中。这个临时空间是一个用于存储文件在处理过程中的临时存储位置。一旦文件上传完成并存放在临时目录中，后端可以进一步处理这些文件，比如将其移动到最终存储位置、进行合并、验证、压缩等操作。
      fse.moveSync(file.path, `${chunkDir}/${chunkName}`);
      res.end(
        JSON.stringify({
          code: 0,
          message: "切片上传成功",
        }),
      );
    });

    return res.end("123");
  } else if (req.url === "/merge") {
    console.log("jinlaile");
    const { fileName, size } = await resolvePost(req);
    console.log("fileName", fileName);
    console.log("size", size);

    await mergeFileChunk(fileName, size);
  }
});

function resolvePost(req) {
  return new Promise((resolve, reject) => {
    req.on("data", (data) => {
      resolve(JSON.parse(data.toString()));
    });
  });
}
//要想合并就得先读取文件
async function mergeFileChunk(fileName, size) {
  //拿到所有切片的路径
  const chunkDir = path.resolve(UPLOAD_DIR, `${fileName}-chunks`);
  //拿到所有切片 读取出来所有的文件，但是是无序的我们需要把他排好序
  let chunksList = fs.readdirSync(chunkDir); //读取所有文件的文件名

  chunksList.sort((a, b) => {
    return Number(a.split("-")[2]) - Number(b.split("-")[2]);
  }); //切成数组取下标1
  console.log("chunksList", chunksList); //这些都是真正的文件资源，需要都转成流然后汇总
  //合并之前需要将切片转换成流类型，我再写个函数 pipeStream 将这些切片转成流类型，我们需要告诉这个函数切片的路径以及切片名
  const outputDir = path.resolve(UPLOAD_DIR, "output.pdf");
  const outputStream = fs.createWriteStream(outputDir);
  // 逐个读取文件并写入到目标文件
  chunksList.forEach((fileName) => {
    const filePath = path.join(chunkDir, fileName);

    // 读取文件内容
    const fileContent = fs.readFileSync(filePath);

    // 写入到目标文件
    outputStream.write(fileContent);
  });

  // 关闭写入流
  outputStream.end(() => {
    console.log("文件合并完成");
  });
}

server.listen(3000, () => {
  console.log("server started");
});
