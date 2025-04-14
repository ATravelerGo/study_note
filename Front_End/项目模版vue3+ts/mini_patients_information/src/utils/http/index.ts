import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

// 定义接口返回数据的通用结构
interface ApiResponse<T = any> {
	code: number;
	data: T;
	message: string;
}

class HttpClient {
	private instance: AxiosInstance;

	constructor(config: AxiosRequestConfig) {
		this.instance = axios.create(config);

		// 请求拦截
		this.instance.interceptors.request.use(
			(config: InternalAxiosRequestConfig) => {
				// 在这里添加请求前的逻辑，如添加token
				const token = localStorage.getItem('token');
				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}
				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);

		// 响应拦截
		this.instance.interceptors.response.use(
			(response: AxiosResponse<ApiResponse>) => {
				// 对响应数据做统一处理
				if (response.data.code !== 200) {
					// 处理业务逻辑错误
					return Promise.reject(response.data);
				}
				return response.data.data; // 直接返回有用的数据部分
			},
			(error) => {
				// 处理HTTP错误
				if (error.response) {
					switch (error.response.status) {
						case 401:
							// 处理未授权
							break;
						case 404:
							// 处理404
							break;
						case 500:
							// 处理服务器错误
							break;
					}
				}
				return Promise.reject(error);
			}
		);
	}

	// 封装通用请求方法
	public request<T = any>(config: AxiosRequestConfig): Promise<T> {
		return this.instance.request(config);
	}

	public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
		return this.instance.get(url, config);
	}

	public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
		return this.instance.post(url, data, config);
	}

	public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
		return this.instance.put(url, data, config);
	}

	public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
		return this.instance.delete(url, config);
	}
}

// 创建实例并导出
const http = new HttpClient({
	baseURL: '/api', // 从环境变量读取
	timeout: 10000 // 10秒超时
});

export default http;
