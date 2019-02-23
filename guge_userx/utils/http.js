// var rootDocment = 'https://guge.web.iguge.com/user/';
var rootDocment = 'http://guge.web.yunpaas.cn/user/';

function getReq(url, cb) {
    wx.showLoading({
        title: '加载中',
    })
    wx.request({
        url: rootDocment + url,
        method: 'GET',
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
            wx.hideLoading();
            return typeof cb == "function" && cb(res)
        },
        fail: function(e) {
            wx.hideLoading();
            wx.showModal({
                title: '网络错误',
                content: '网络出错，请刷新重试',
                showCancel: false
            })
            return typeof cb == "function" && cb(e)
        }
    })
}

function postReq(url, data, cb) {
    wx.showLoading({
        title: '加载中',
        mask: true
    })
    wx.request({
        url: rootDocment + url,
        header: {
            'Accept': 'application/json',
            'Authorization': wx.getStorageSync('token') ? 'Bearer ' + wx.getStorageSync('token') : "",
        },
        data: data,
        method: 'POST',
        success: function(res) {
            wx.hideLoading();
            return typeof cb == "function" && cb(res)
        },
        fail: function(e) {
            wx.hideLoading();
            wx.showModal({
                title: '网络错误',
                content: '网络出错，请刷新重试',
                showCancel: false
            })
            return typeof cb == "function" && cb(e)
        }
    })
}
module.exports = {
    getReq: getReq,
    postReq: postReq,
}