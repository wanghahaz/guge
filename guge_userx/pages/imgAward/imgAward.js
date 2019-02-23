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
                contentName: "授予协议"
            },
            version: "2.0"
        }, function(res) {
            console.log(res)
            if (res.data.result.contentText == null) {
                that.setData({
                    textBol: false
                })
            } else {
                WxParse.wxParse('performance', 'html', res.data.result.contentText, that);
            }
        })
    }
})