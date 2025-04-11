# FRP内网穿透  https://gofrp.org/zh-cn/docs/overview/
FRP是一款开源的反向代理工具，主要用于内网穿透和远程访问，他可以通过映射网络服务（http，https，tcp，udp等）到公网，实现内网服务的外网访问，特别适合
在无公网IP或有防火墙限制的现场下使用
在windows中就下载windows版本，linux就下载linux版本

服务端（frps）：
部署在公网服务器（如云端的Linux），负责接收外网请求并转发到内网客户端。
它是穿透的核心枢纽，需要暴露在公网（有固定IP或域名）。
使用以下命令启动服务器：./frps -c ./frps.toml。


客户端（frpc）：
部署在内网机器（如你的Windows），主动连接公网服务端，建立隧道。
它负责将内网服务（如Web、SSH）暴露给服务端。
使用以下命令启动客户端：./frpc -c ./frpc.toml。


