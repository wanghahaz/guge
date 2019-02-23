import { fetchPost } from '../index'


let Company = {};

//公司下拉框列表
Company.selectCompanyListByAdminId = function(params){
	return fetchPost('/selectCompanyListByAdminId', params)
}
//获取当前公司信息
Company.selectCompanyById = function(params){
	return fetchPost('/selectCompanyById', params)
}

//更新公司上面四个参数的接口
Company.updateSingleCompanyParameter = function(params){
	return fetchPost('/updateSingleCompanyParameter', params)
}
//更新公司下面四个参数的接口
Company.updateCompanyDefaultParameter = function(params){
	return fetchPost('/updateCompanyDefaultParameter', params)
}
//添加公司
Company.addCompany = function(params){
	return fetchPost('/addCompany', params)
}
//添加公司
Company.updateCompany = function(params){
	return fetchPost('/updateCompany', params)
}
//删除公司
Company.delectCompanyById = function(params){
	return fetchPost('/delectCompanyById', params)
}

//更新公司参数
Company.updateCompanyParameter = function(params){
	return fetchPost('/updateCompanyParameter', params)
}

//公司参数历史纪录
Company.selectCompanyHistoryList = function(params){
	return fetchPost('/selectCompanyHistoryList', params)
}
//查询激励计划
Company.selectCompanyAssess = function(params) {
	return fetchPost('/selectCompanyAssess', params)
}
//更新激励计划
Company.updateCompanyAssess = function(params) {
	return fetchPost('/updateCompanyAssess', params)
}


Company.selectCompanyHistoryList = function(params) {
	return fetchPost('/selectCompanyHistoryList', params)
}
Company.addCompanyHistory = function(params) {
	return fetchPost('/addCompanyHistory', params)
}
Company.delectCompanyHistory = function(params) {
	return fetchPost('/delectCompanyHistory', params)
}
Company.downLoadExcelExerciseOverview = function(params) {
	return fetchPost('/downLoadExcelExerciseOverview', params)
}


export default  Company 
