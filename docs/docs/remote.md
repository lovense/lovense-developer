---
title: Developers
---

<Mermaid :graph="`
sequenceDiagram
  participant 开发者
	开发者 ->> Lovense server:使用 dToken 和 uId 调用 getQrcode 接口
	Lovense server -->> 开发者: Qrcode and Code
	开发者->>PC Remote/Connect:让用户输入 Code
	PC Remote/Connect ->> Lovense server: 通过 code 建立 socket.io 连接
	alt 成功
		Lovense server -->> PC Remote/Connect: 响应开发者信息、Callback
	  PC Remote/Connect -->> 开发者:调用 Callback 
		Note left of PC Remote/Connect: 传递 内网连接信息、Lovense 服务器连接状态、指令转发指令 api 地址
		开发者 ->> Lovense server:发送指令
		Lovense server ->>  PC Remote/Connect: 转发指令
	else code 无效
	  PC Remote/Connect -->> 开发者:调用 Callback 通知开发者 code 无效
		Note left of PC Remote/Connect: 传递 内网连接信息、Lovense 服务器连接状态
	end
`" />
