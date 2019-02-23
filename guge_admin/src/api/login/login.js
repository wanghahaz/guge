import { fetchPost } from '../index'


let Login = {};

//获取验证码
Login.findCode = function(params){
	return fetchPost('/findCode', params)
}

//登录
Login.LoginOk = function(params){
	return fetchPost('/LoginOk', params)
}
//登出
Login.LoginOut = function(params){
	return fetchPost('/LoginOut', params)
}
Login.selectJudge = function(params){
	return fetchPost('/selectJudge', params)
}

export default  Login 
