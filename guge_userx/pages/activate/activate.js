var uploadimg = require('../../utils/uploadimg.js')
var http = require('../../utils/http.js')
Page({
    data: {
        alertHint: true, //温馨提示
        quitRegister: true, //退出登录
        alertMarkA: true, //选项A的弹框
        alertMarkB: true, //选项B的弹框
        alertMarkC: true, //选项C的弹框
        alertMarkD: true, //选项D的弹框
        alertMarkE: true, //选项E的弹框 
        pictureA: false,
        pictureB: false,
        pictureC: false,
        pictureD: false,
        urlsArrA: [],
        urlsArrAA: [],
        urlsArrB: [],
        urlsArrBB: [],
        //选项A
        date: " ", //日期
        end: new Date(),
        xieyiUrl: "",
        jihuaUrl: "",
        //选项B
        xieyiBUrl: "",
        jihuaBUrl: "",
        showSearchView: 1,
        // pics: []
        explainAndNeedA: "",
        explainAndNeedB: "",
        explainAndNeedC: "",
        explainAndNeedD: "",

        commentValue: "",
        commentValueKey: "",
        CommentBox: true,
        autoFocusBol: false
    },
    onLoad(options) {
        console.log(options)
        if (options.markD == 'false') {
            this.setData({
                alertMarkD: false
            })
        }
    },
    onShow() {
        // alertMarkA: true, //选项A的弹框
        // alertMarkB: true, //选项B的弹框
        // alertMarkC: true, //选项C的弹框
        // alertMarkD: true, //选项D的弹框
        // alertMarkE: true, //选项E的弹框 
    },
    // 其他说明  -- 点击其他说明
    changeCommentBox(e) {
        if (this.data.commentValue != '') {
            //上次输入未完成
            this.setData({
                commentValueKey: e.currentTarget.dataset.key,
                CommentBox: false,
                autoFocusBol: true
            })
        } else {
            //输入已完成 回显赋值
            this.setData({
                commentValue: this.data[e.currentTarget.dataset.key]
            }, () => {
                this.setData({
                    commentValueKey: e.currentTarget.dataset.key,
                    CommentBox: false,
                    autoFocusBol: true
                })
            })
        }
    },
    closeCommentBox(e) {
        this.setData({
            CommentBox: true,
            autoFocusBol: false
        })
    },
    move() {
        // console.log('滑动')
    },
    hideKeyboard(e) {
        // console.log('失焦')
    },
    setValue(e) {
        // console.log('输入')
        this.setData({
            commentValue: e.detail.value
        })
    },
    catchBubble() {

    },
    checkContent() {
        this.setData({
            [this.data.commentValueKey]: this.data.commentValue,
            CommentBox: true,
            autoFocusBol: false
        })
    },


    //弹起退出登录模态框
    skip(e) {
        if (!wx.getStorageSync('token')) {
            wx.redirectTo({
                url: '../login/login',
            })
            return
        }
        let that = this;
        that.setData({
            quitRegister: false
        })
    },
    //关闭退出登录
    closeloginOut() {
        let that = this;
        that.setData({
            quitRegister: true
        })
    },

    //退出登录
    loginOut(e) {
        let that = this;
        that.setData({
            quitRegister: true
        })
        wx.removeStorageSync('token')
        wx.showToast({
            title: '退出成功',
            icon: "none",
            duration: 2000
        })
        wx.redirectTo({
            url: '../login/login',
        })
    },
    //分享
    onShareAppMessage(e) {
        return {
            title: "期管云OCEC",
            path: "/pages/activate/activate"
        }
    },
    //关闭温馨提示
    closeHint() {
        this.setData({
            alertHint: true
        })
    },
    //去往登录
    goLogin() {
        wx.redirectTo({
            url: '../login/login',
        })
        this.setData({
            alertHint: true
        })
    },
    //弹起ABCD选项
    bounceA() {
        // if (!wx.getStorageSync('token')) {
        //     this.setData({
        //         alertHint: false
        //     })
        //     return
        // }
        this.setData({
            alertMarkA: false, //选项A的弹框
            alertMarkB: true, //选项B的弹框
            alertMarkC: true, //选项C的弹框
            alertMarkD: true, //选项D的弹框
            pictureA: true,
            pictureB: false,
            pictureC: false,
            pictureD: false,
            showSearchView: 0
        })
    },
    bounceB() {
        // if (!wx.getStorageSync('token')) {
        //     this.setData({
        //         alertHint: false
        //     })
        //     return
        // }
        this.setData({
            alertMarkA: true, //选项A的弹框
            alertMarkB: false, //选项B的弹框
            alertMarkC: true, //选项C的弹框
            alertMarkD: true, //选项D的弹框
            pictureA: false,
            pictureB: true,
            pictureC: false,
            pictureD: false,
            showSearchView: 0
        })
    },
    bounceC() {
        // if (!wx.getStorageSync('token')) {
        //     this.setData({
        //         alertHint: false
        //     })
        //     return
        // }
        this.setData({
            alertMarkA: true, //选项A的弹框
            alertMarkB: true, //选项B的弹框
            alertMarkC: false, //选项C的弹框
            alertMarkD: true, //选项D的弹框
            pictureA: false,
            pictureB: false,
            pictureC: true,
            pictureD: false,
            showSearchView: 0
        })
    },
    bounceD() {
        // if (!wx.getStorageSync('token')) {
        //     this.setData({
        //         alertHint: false
        //     })
        //     return
        // }
        this.setData({
            alertMarkA: true, //选项A的弹框
            alertMarkB: true, //选项B的弹框
            alertMarkC: true, //选项C的弹框
            alertMarkD: false, //选项D的弹框
            pictureA: false,
            pictureB: false,
            pictureC: false,
            pictureD: true,
            showSearchView: 0
        })
    },
    //关闭ABCD框
    closeBounce() {
        this.setData({
            alertMarkA: true, //选项A的弹框
            alertMarkB: true, //选项B的弹框
            alertMarkC: true, //选项C的弹框
            alertMarkD: true, //选项D的弹框
            showSearchView: 1,
            commentValue: ""
        })
    },
    //提交选项A
    formSubmit(e) {
        let that = this;
        http.postReq("insertOneKeyGenerate", {
            data: {
                choice: "A",
                name: e.detail.value.nameA,
                post: e.detail.value.postA,
                phone: e.detail.value.phoneA,
                wechat: e.detail.value.wechatA,
                companyName: e.detail.value.companyNameA,
                impowerSharesNum: e.detail.value.impowerSharesNumA,
                autumn: e.detail.value.autumnA,
                eachAppraisement: e.detail.value.eachAppraisementA,
                chargePersonName: e.detail.value.chargePersonNameA,
                chargePersonPhone: e.detail.value.chargePersonPhoneA,
                explainAndNeed: this.data.explainAndNeedA,
                agreementUrl: that.data.xieyiUrl,
                panUrl: that.data.jihuaUrl,
                stockStartTime: that.data.date
            },
            version: "2.0"
        }, function(res) {
            console.log(res)
            if (res.data.code == "0000") {
                wx.navigateTo({
                    url: '../succeed/succeed'
                })
            } else {
                wx.showToast({
                    title: res.data.msg,
                    icon: "none",
                    duration: 2000
                })
            }
        })
    },
    //提交选项B
    formSubmitB(e) {
        let that = this;
        http.postReq("insertOneKeyGenerate", {
            data: {
                choice: "B",
                name: e.detail.value.nameB,
                post: e.detail.value.postB,
                phone: e.detail.value.phoneB,
                wechat: e.detail.value.wechatB,
                companyName: e.detail.value.companyNameB,
                userNum: e.detail.value.userNumB,
                explainAndNeed: this.data.explainAndNeedB,
                agreementUrl: that.data.xieyiBUrl,
                panUrl: that.data.jihuaBUrl
            },
            version: "2.0"
        }, function(res) {
            console.log(res)
            if (res.data.code == "0000") {
                wx.navigateTo({
                    url: '../succeed/succeed'
                })
            } else {
                wx.showToast({
                    title: res.data.msg,
                    icon: "none",
                    duration: 2000
                })
            }
        })
    },
    //提交选项C
    formSubmitC(e) {
        let that = this;
        http.postReq("insertOneKeyGenerate", {
            data: {
                choice: "C",
                name: e.detail.value.nameC,
                post: e.detail.value.postC,
                phone: e.detail.value.phoneC,
                wechat: e.detail.value.wechatC,
                companyName: e.detail.value.companyNameC,
                userNum: e.detail.value.userNumC,
                explainAndNeed: this.data.explainAndNeedC
            },
            version: "2.0"
        }, function(res) {
            console.log(res)
            if (res.data.code == "0000") {
                wx.navigateTo({
                    url: '../succeed/succeed'
                })
            } else {
                wx.showToast({
                    title: res.data.msg,
                    icon: "none",
                    duration: 2000
                })
            }
        })
    },
    //提交选项D
    formSubmitD(e) {
        let that = this;
        http.postReq("insertOneKeyGenerate", {
            data: {
                choice: "D",
                name: e.detail.value.nameD,
                post: e.detail.value.postD,
                phone: e.detail.value.phoneD,
                wechat: e.detail.value.wechatD,
                companyName: e.detail.value.companyNameD,
                explainAndNeed: this.data.explainAndNeedD
            },
            version: "2.0"
        }, function(res) {
            console.log(res)
            if (res.data.code == "0000") {
                wx.navigateTo({
                    url: '../succeed/succeed'
                })
            } else {
                wx.showToast({
                    title: res.data.msg,
                    icon: "none",
                    duration: 2000
                })
            }
        })
    },
    //期权授予协议上传
    uploadFileA() {
        let that = this;
        wx.chooseImage({
            count: 9, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                // console.log(res.tempFilePaths)
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                for (var index in res.tempFilePaths) {
                    that.upload_fileA('https://guge.web.iguge.com/user/uploadFile', res.tempFilePaths[index])
                }
            }
        })
    },
    upload_fileA: function(url, filePath) {
        wx.showToast({
            title: '正在上传...',
            icon: 'loading',
            mask: true,
            duration: 10000
        })
        var that = this;
        wx.uploadFile({
            url: url,
            filePath: filePath,
            name: 'fileName',
            success: function(res) {
                that.data.urlsArrA.push(JSON.parse(res.data).result)
                console.log(that.data.urlsArrA)
                wx.request({
                    url: 'https://guge.web.iguge.com/user/arrayToString',
                    method: 'POST',
                    data: {
                        data: {
                            array: that.data.urlsArrA
                        }
                    },
                    success: (response) => {
                        wx.hideToast()
                        console.log(response.data.result)
                        that.setData({
                            xieyiUrl: response.data.result,
                        })
                        wx.showToast({
                            title: '上传成功',
                            icon: 'success',
                            duration: 2000
                        })
                    },
                    fail: () => {}
                });
            },
            fail: function(res) {
                wx.showModal({
                    title: '提示',
                    content: '上传失败',
                    showCancel: false
                })
            }
        })
    },
    //期权激励计划上传
    uploadA() {
        let that = this;
        wx.chooseImage({
            count: 9, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                // console.log(res.tempFilePaths)
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                for (var index in res.tempFilePaths) {
                    that.upload_fileAA('https://guge.web.iguge.com/user/uploadFile', res.tempFilePaths[index])
                }
            }
        })
    },
    upload_fileAA: function(url, filePath) {
        wx.showToast({
            title: '正在上传...',
            icon: 'loading',
            mask: true,
            duration: 10000
        })
        var that = this;
        wx.uploadFile({
            url: url,
            filePath: filePath,
            name: 'fileName',
            success: function(res) {
                that.data.urlsArrAA.push(JSON.parse(res.data).result)
                console.log(that.data.urlsArrAA)
                wx.request({
                    url: 'https://guge.web.iguge.com/user/arrayToString',
                    method: 'POST',
                    data: {
                        data: {
                            array: that.data.urlsArrAA
                        }
                    },
                    success: (response) => {
                        wx.hideToast()
                        console.log(response.data.result)
                        that.setData({
                            jihuaUrl: response.data.result,
                        })
                        wx.showToast({
                            title: '上传成功',
                            icon: 'success',
                            duration: 2000
                        })
                    },
                    fail: () => {}
                });
            },
            fail: function(res) {
                wx.showModal({
                    title: '提示',
                    content: '上传失败',
                    showCancel: false
                })
            }
        })
    },
    uploadFileB() {
        let that = this;
        wx.chooseImage({
            count: 9, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                // console.log(res.tempFilePaths)
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                for (var index in res.tempFilePaths) {
                    that.upload_fileB('https://guge.web.iguge.com/user/uploadFile', res.tempFilePaths[index])
                }
            }
        })
    },
    upload_fileB: function(url, filePath) {
        wx.showToast({
            title: '正在上传...',
            icon: 'loading',
            mask: true,
            duration: 10000
        })
        var that = this;
        wx.uploadFile({
            url: url,
            filePath: filePath,
            name: 'fileName',
            success: function(res) {
                that.data.urlsArrB.push(JSON.parse(res.data).result)
                console.log(that.data.urlsArrB)
                wx.request({
                    url: 'https://guge.web.iguge.com/user/arrayToString',
                    method: 'POST',
                    data: {
                        data: {
                            array: that.data.urlsArrB
                        }
                    },
                    success: (response) => {
                        wx.hideToast()
                        console.log(response.data.result)
                        that.setData({
                            xieyiBUrl: response.data.result,
                        })
                        wx.showToast({
                            title: '上传成功',
                            icon: 'success',
                            duration: 2000
                        })
                    },
                    fail: () => {}
                });
            },
            fail: function(res) {
                wx.showModal({
                    title: '提示',
                    content: '上传失败',
                    showCancel: false
                })
            }
        })
    },
    //期权激励计划上传
    uploadB() {
        let that = this;
        wx.chooseImage({
            count: 9, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                // console.log(res.tempFilePaths)
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                for (var index in res.tempFilePaths) {
                    that.upload_fileBB('https://guge.web.iguge.com/user/uploadFile', res.tempFilePaths[index])
                }
            }
        })
    },
    upload_fileBB: function(url, filePath) {
        wx.showToast({
            title: '正在上传...',
            icon: 'loading',
            mask: true,
            duration: 10000
        })
        var that = this;
        wx.uploadFile({
            url: url,
            filePath: filePath,
            name: 'fileName',
            success: function(res) {
                that.data.urlsArrBB.push(JSON.parse(res.data).result)
                console.log(that.data.urlsArrBB)
                wx.request({
                    url: 'https://guge.web.iguge.com/user/arrayToString',
                    method: 'POST',
                    data: {
                        data: {
                            array: that.data.urlsArrBB
                        }
                    },
                    success: (response) => {
                        wx.hideToast()
                        console.log(response.data.result)
                        that.setData({
                            jihuaBUrl: response.data.result,
                        })
                        wx.showToast({
                            title: '上传成功',
                            icon: 'success',
                            duration: 2000
                        })
                    },
                    fail: () => {}
                });
            },
            fail: function(res) {
                wx.showModal({
                    title: '提示',
                    content: '上传失败',
                    showCancel: false
                })
            }
        })
    },
    bindDateChange: function(e) {
        this.setData({
            date: e.detail.value
        })
    },
});