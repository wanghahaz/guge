import { fetchPost } from '../index'


let Objects = {};
// 删除公告
Objects.deleteNoticeById = function(params) {
        return fetchPost('/deleteNoticeById', params)
    }
    //查询所有用户
Objects.selectUserOverviewList2 = function(params) {
        return fetchPost('/selectUserOverviewList2', params)
    }
    //查询所有用户
Objects.selectUserOverviewList = function(params) {
        return fetchPost('/selectUserOverviewList', params)
    }
    //新增会员接口
Objects.insertUser = function(params) {
    return fetchPost('/insertUser', params)
}

//查询单条会员
Objects.selectUserByID = function(params) {
        return fetchPost('/selectUserByID', params)
    }
    //修改会员
Objects.updateUser = function(params) {
    return fetchPost('/updateUser', params)
}

//删除会员接口
Objects.deleteUserByID = function(params) {
    return fetchPost('/deleteUserByID', params)
}

//修改激励参数弹窗
Objects.updateFourParameters = function(params) {
    return fetchPost('/updateFourParameters', params)
}

//设置期权参数接口
Objects.updateUserOptionParameters = function(params) {
    return fetchPost('/updateUserOptionParameters', params)
}


//计算默认日期
Objects.getDefaultDate = function(params) {
        return fetchPost('/getDefaultDate', params)
    }
    //计算默认值2
Objects.getDefaultValue2 = function(params) {
        return fetchPost('/getDefaultValue2', params)
    }
    //计算默认值1
Objects.getDefaultValue = function(params) {
        return fetchPost('/getDefaultValue', params)
    }
    //申请
Objects.selectRightRecordList = function(params) {
        return fetchPost('/selectRightRecordList', params)
    }
    //删除申请
Objects.deleteRightRecordById = function(params) {
    return fetchPost('/deleteRightRecordById', params)
}

//添加申请
Objects.insertRightRecord = function(params) {
    return fetchPost('/insertRightRecord', params)
}

//查询申请
Objects.selectRightRecordById = function(params) {
    return fetchPost('/selectRightRecordById', params)
}

//设置申请
Objects.updateRightRecordById = function(params) {
    return fetchPost('/updateRightRecordById', params)
}

Objects.fddQuerySignStatus = function(params) {
    return fetchPost('/fddQuerySignStatus', params)
}
Objects.selectSharesAwardedList = function(params) {
    return fetchPost('/selectSharesAwardedList', params)
}
Objects.addSharesAwarded = function(params) {
    return fetchPost('/addSharesAwarded', params)
}

Objects.deleteSharesAwarded = function(params) {
    return fetchPost('/deleteSharesAwarded', params)
}


Objects.updateSharesAwarded = function(params) {
    return fetchPost('/updateSharesAwarded', params)
}



export default Objects