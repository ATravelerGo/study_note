# WireMock
WireMock 是一个非常强大的 HTTP 请求模拟工具，常用于单元测试、集成测试、模拟外部服务等场景。它的主要作用是模拟 HTTP API 请求和响应，从而帮助开发者在不依赖真实外部服务的情况下进行测试和开发。

# 使用步骤
1. 下载wiremock-standalone-3.12.1.jar文件
2. 执行运行命令
    > java -jar wiremock-standalone-3.12.1.jar -port 9999
3. 执行命令后会生成两个文件夹_files,mappings
   _files文件夹里面存放接口返回值的json
   api_hello.json文件
    ```json
    {
    "name":"张辰",
    "age":"15"
    }
    ```

   mappings文件夹存放接口相关设置也是json文件
   mockData.json文件
    ```json
    {
      "mappings": [
       {
        "request": {
         "method": "GET",
         "url": "/api/hello"
        },
        "response": {
        "bodyFileName": "api_hello.json",
         "headers": {
          "Content-Type": "text/plain"
         },
         "status": 200
        }
       }
      ]
     }
    ```
4. 每次在两个文件夹中修改任何文件后，都要重新执行一个启动命令

5. 给wiremock配置https
   5.1 创建ssl证书
   > openssl req -x509 -newkey rsa:2048 -keyout wiremock.key -out wiremock.crt -days 365 -nodes
   创建完成后会发现在执行命令的路径下出现两个文件***wiremock.crt***  ***wiremock.key***
   
   5.2 然后执行新的启动命令(这里我没走通)
   > java -Dhttps.port=8443 -Dwiremock.https.cert=C:\桌面\wiremock.crt -Dwiremock.https.key=C:\桌面\wiremock.key -jar wiremock-standalone-3.12.1.jar
