import { fetchPost } from '../index'


let Estate = {};

//股份支付计提列表
Estate.selectFirstWaitingList = function(params){
	return fetchPost('/selectFirstWaitingList', params)
}

// 企业所得税扣除总数
Estate.selectRightFinancialTaxNum = function(params){
	return fetchPost('/selectRightFinancialTaxNum', params)
}

// 应纳个税所得额总和
Estate.selectTaxPayableListNum = function(params){
	return fetchPost('/selectTaxPayableListNum', params)
}

// 查询企业所得税扣除列表
Estate.selectRightFinancialTaxList = function(params){
	return fetchPost('/selectRightFinancialTaxList', params)
}
// 应纳个税所得额列表
Estate.selectTaxPayableList = function(params){
	return fetchPost('/selectTaxPayableList', params)
}
// 应纳个税所得额总和
Estate.selectFirstWaitingListNum = function(params){
	return fetchPost('/selectFirstWaitingListNum', params)
}


export default  Estate 
