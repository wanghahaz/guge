var http = require('../../utils/http.js')
Page({

    data: {
        feedbackContent: ''
    },

    onLoad: function(options) {

    },
    input(e) {
        this.setData({
            feedbackContent: e.detail.value
        })
    },
    submit() {
        let that = this;
        if (that.data.feedbackContent == '') {
            wx.showToast({
                title: '内容不能为空',
                icon: 'none',
                duration: 1000
            })
        } else {
            http.postReq("addFeedback", {
                data: {
                    feedbackContent: that.data.feedbackContent
                },
                version: "2.0"
            }, function(res) {
                console.log(res.data.code)
                if (res.data.code == "0000") {
                    wx.showToast({
                        title: '发布成功',
                        icon: 'none',
                        duration: 1000
                    })
                    that.setData({
                        feedbackContent: ''
                    })
                } else {
                    wx.showToast({
                        title: '发布失败',
                        icon: 'none',
                        duration: 1000
                    })
                }
            })
        }
    },
    onReady: function() {

    },

    onShow: function() {

    },

    onHide: function() {

    },

    onUnload: function() {

    },

    onPullDownRefresh: function() {

    },

    onReachBottom: function() {

    },

    onShareAppMessage: function() {

    }
});