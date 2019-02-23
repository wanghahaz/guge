var WxParse = require('../../wxParse/wxParse.js');
var http = require('../../utils/http.js')
Page({
    data: {
        textBol: true
    },
    onShow() {
        this.selectAssess()
    },
    selectAssess() {
        let that = this;
        let companyId = wx.getStorageSync('companyId')
        http.postReq("selectCompanyAssess", {
            data: {
                assessName: "绩效",
                companyId: companyId
            },
            version: "2.0"
        }, function(res) {
            console.log(res)
            if (res.data.result == null) {
                that.setData({
                    textBol: false
                })
            } else {
                WxParse.wxParse('performance', 'html', res.data.result.assessContent, that);
            }
        })
    }
})