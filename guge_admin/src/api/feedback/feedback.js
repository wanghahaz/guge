import {
    fetchPost
} from '../index'


let Feedback = {};
// 发布公告
Feedback.addNotice = function(params) {
        return fetchPost('/addNotice', params)
    }
    // 查询历史公告
Feedback.selectHistoryNotice = function(params) {
        return fetchPost('/selectHistoryNotice', params)
    }
    //意见反馈详情查询
Feedback.selectFeedbackDetails = function(params) {
        return fetchPost('/selectFeedbackDetails', params)
    }
    //查询员工意见
Feedback.selectFeedbackList = function(params) {
    return fetchPost('/selectFeedbackList', params)
}

Feedback.selectQuestionnaireList = function(params) {
    return fetchPost('/selectQuestionnaireList', params)
}

Feedback.selectOneKeyGenerateList = function(params) {
    return fetchPost('/selectOneKeyGenerateList', params)
}


Feedback.selectOneKeyUrl = function(params) {
    return fetchPost('/selectOneKeyUrl', params)
}



export default Feedback