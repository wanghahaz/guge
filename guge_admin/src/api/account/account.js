import { fetchPost } from '../index'


let Account = {};

//获取账号列表
Account.selectAdminUserList = function(params) {
    return fetchPost('/selectAdminUserList', params)
}

//添加账号
Account.insertAdminUser = function(params) {
        return fetchPost('/insertAdminUser', params)
    }
    //修改密码
Account.updateAdminUserPssword = function(params) {
        return fetchPost('/updateAdminUserPssword', params)
    }
    //删除账户
Account.deleteAdminUser = function(params) {
    return fetchPost('/deleteAdminUser', params)
}

//获取被修改账户的信息
Account.selectAdminUserById = function(params) {
        return fetchPost('/selectAdminUserById', params)
    }
    //修改账户
Account.updateAdminUser = function(params) {
    return fetchPost('/updateAdminUser', params)
}


// 注册激活账号

Account.insertOneKeyGenerate = function(params) {
    return fetchPost('/insertOneKeyGenerate', params)
}

export default Account