var WxParse = require('../../wxParse/wxParse.js');
var http = require('../../utils/http.js')
Page({
    data: {
        textBol: true
    },
    onShow() {
        this.selectContentByName()
    },
    selectContentByName() {
        let that = this;
        http.postReq("selectContentByName", {
            data: {
                contentName: "使用指南"
            },
            version: "2.0"
        }, function(res) {
            console.log(res)
            if (res.data.result.contentText == null) {
                that.setData({
                    textBol: false
                })
            } else {
                WxParse.wxParse('fingerpost', 'html', res.data.result.contentText, that);
            }
        })
    }
})