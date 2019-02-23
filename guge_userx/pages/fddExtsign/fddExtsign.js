var http = require('../../utils/http.js')
Page({
    data: {
        extsignUrl: ""
    },
    onLoad() {
        let that = this;
        http.postReq("fddExtsign", {
            version: "2.0"
        }, function(res) {
            console.log(res)
            if (res.data.code == "0000") {
                that.setData({
                    extsignUrl: res.data.result
                })
            } else {
                wx.showToast({
                    title: res.data.msg,
                    icon: "none",
                    duration: 2000
                })
            }
        })
    }
})