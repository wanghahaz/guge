import { fetchPost } from '../index'


let Home = {};

//首页
Home.selectHomePageData = function(params) {
    return fetchPost('/selectHomePageData', params)
}

//首页图表数据
Home.getUserByCompanyId = function(params) {
    return fetchPost('/getUserByCompanyId', params)
}


Home.getContentManagement = function(params) {
    return fetchPost('/getContentManagement', params)
}

Home.updateContentManagementById = function(params) {
        return fetchPost('/updateContentManagementById', params)
    }
    //   首页行权申请、转让申请、退股申请显示未读数字
Home.selectRightRecordUnapprovedCount = function(params) {
    return fetchPost('/selectRightRecordUnapprovedCount', params)
}

export default Home