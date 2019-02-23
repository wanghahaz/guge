Page({
    data: {},
    goIndex() {
        if (wx.getStorageSync('token')) {
            wx.redirectTo({
                url: '../index/index',
            })
        } else {
            wx.redirectTo({
                url: '../indexone/indexone',
            })
        }

    }
})