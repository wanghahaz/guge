import { fetchPost } from '../index'


let Exercise = {};

//等待处理
Exercise.selectRightRecordUnapproved = function(params){
	return fetchPost('/selectRightRecordUnapproved', params)
}

//行权概览
Exercise.selectUserOverviewList = function(params){
	return fetchPost('/selectUserOverviewList', params)
}

//图表数据
Exercise.getUserByCompanyId = function(params){
	return fetchPost('/getUserByCompanyId', params)
}



export default  Exercise 
