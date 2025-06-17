import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export class UseWebSocket {
	private readonly url: string; // websocket 连接url
	private socket: Socket | null; // websocket实例
	private stompClient: Client;
	private reconnectionAttempts = 5; // 最多重连 5 次
	public messageList = [];

	private reconnectCount = 0; //已经重连次数
	private reconnectTimer = null;

	constructor(url: string) {
		this.url = url;
		this.connect();
	}

	connect() {
		this.reconnectCount = 0;
		this.socket = new SockJS(this.url);
		this.stompClient = new Client({
			webSocketFactory: () => this.socket,
			connectHeaders: {
				userId: '111'
			},
			// debug: (str) => {
			// 	console.log('STOMP: ' + str); // 打印调试信息
			// },
			onConnect: () => {
				console.log('🟢 STOMP connected');

				if (!this.stompClient.connected) {
					console.warn('⚠️ STOMP 连接尚未准备好，稍后再发送');
					return;
				}

				// 给后端发送消息
				this.stompClient.publish({
					headers: {
						userId: '111'
					},
					destination: '/app/subscribe',
					body: JSON.stringify({ userId: 111, topic: '111' })
				});

				// // 订阅后端广播消息
				this.stompClient.subscribe('/user/queue/111', (message) => {
					console.log('🟢收到广播:', message.body);
				});
			},
			onStompError: (frame) => {
				this.stompClient.deactivate().then(() => {
					console.error('🔴 STOMP 错误:onStompError', frame);
				});
			},
			onWebSocketClose: (frame) => {
				this.stompClient.deactivate().then(() => {
					console.error('🔴 STOMP 错误:onWebSocketClose', frame);
					this.reconnect();
				});
			},
			onWebSocketError: (frame) => {
				this.stompClient.deactivate().then(() => {
					console.error('🔴 STOMP 错误:onWebSocketError', frame);
					this.reconnect();
				});
			}
		});

		this.stompClient.activate();
	}

	private reconnect() {
		if (this.reconnectCount >= this.reconnectionAttempts) {
			console.warn('🚫 已达最大重连次数，放弃重连');
			return;
		}

		if (this.reconnectTimer) return;

		this.reconnectCount++;
		console.log(`🕐 第 ${this.reconnectCount} 次尝试重连...`);

		this.reconnectTimer = setTimeout(() => {
			this.reconnectTimer = null;
			this.connect();
		}, 5000);
	}

	close() {
		this.stompClient.deactivate();
	}
}
