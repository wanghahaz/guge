var http = require('../../utils/http.js')
Page({

    data: {
        feedList: []
    },

    onLoad: function(options) {

    },
    getList() {
        let that = this;
        http.postReq("selectNoticeByUserId", {
            data: {},
            version: "2.0"
        }, function(res) {
            that.setData({
                feedList: res.data.result
            })
            console.log(that.data.feedList)
        })
    },
    onReady: function() {

    },

    onShow: function() {
        this.getList()
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