import axios from 'axios'
import qs from 'qs'

import { router } from '@/router/index'
//const apiHost = process.env.API_HOST
/* axios配置 */
axios.defaults.retryDelay = 600 /* 请求延迟 */
axios.defaults.timeout = 5000 /* 响应超时时间 */
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'          /* 配置请求头 */

//axios.defaults.baseURL = apiHost  /* 配置接口地址 */

/* POST传参序列化(添加请求拦截器) */
//axios.interceptors.request.use((config) => {
//	/* 在发送请求之前做某件事 */
// 	if (config.method === 'post') {
// 		config.data = qs.stringify(config.data)
// 	}
//	return config
//}, (error) => {
//	console.log(error)
//	return Promise.reject(error)
//})

/* 返回状态判断(添加响应拦截器) */
//axios.interceptors.response.use((res) => {
//	/* 对响应数据做些事 */
//	if (!res.data.success) {
//		return Promise.reject(res)
//	}
//	if (sessionStorage.getItem('token')) {  /* 在header上添加token */
//      res.headers.Authorization = sessionStorage.getItem('token')
//	}
//	return res
//}, (error) => {
//	console.log(error)
//	return Promise.reject(error)
//})

/* 返回一个Promise(发送post请求) */
export function fetchPost(url, params) {
	return new Promise((resolve, reject) => {
		axios.post(url, params)
			.then(response => {
				if(response.data.code == "3000"){
					//登陆过期
					axios.post('/LoginOut',{}).then(res=>{
						localStorage.removeItem('gugeAdminUser');
						router.push({
					       	name: "login"
					   })
					})
				}else{
					resolve(response.data)
				}
			}, err => {
				reject(err)
			})
			.catch((error) => {
				reject(error)
			})
	})
}

/* 返回一个Promise(发送get请求) */
export function fetchGet(url, param) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
				params: param
			})
			.then(response => {
				resolve(response.data)
			}, err => {
				reject(err)
			})
			.catch((error) => {
				reject(error)
			})
	})
}