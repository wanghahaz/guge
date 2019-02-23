//logs.js
const util = require('../../utils/util.js')
var http = require('../../utils/http.js')
Page({
    data: {
        phValue: "请 输 入 本 人 的 手 机 号",
        coValue: "请 输 入 验 证 码",
        userPhone: "",
        userCode: "",
        timer: '', //定时器名字
        countDownNum: '60', //倒计时初始值
        bol: false,
        eye: true,
        userImg: "",
        nameUser: "",
        tick: false, //同意协议对勾切换
    },
    //登录倒计时
    countDown: function() {
        let that = this;
        let countDownNum = that.data.countDownNum; //获取倒计时初始值
        //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
        that.setData({
            timer: setInterval(function() { //这里把setInterval赋值给变量名为timer的变量
                //每隔一秒countDownNum就减一，实现同步
                countDownNum--;
                //然后把countDownNum存进data，好让用户知道时间在倒计着
                that.setData({
                        countDownNum: countDownNum
                    })
                    //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
                if (countDownNum == 0) {
                    //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
                    //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
                    clearInterval(that.data.timer);
                    that.setData({
                            bol: (!that.data.bol)
                        })
                        //关闭定时器之后，可作其他处理codes go here
                    let countDownNum = "60"
                    that.setData({
                        countDownNum: countDownNum
                    })
                }
            }, 1000)
        })
    },
    goIndex() {
        wx.navigateTo({
            url: "../indexone/indexone"
        });
    },
    //获取手机号验证码文本框的值
    userNameInput: function(e) {
        this.data.userPhone = e.detail.value;
    },
    userCodeInput: function(e) {
        this.data.userCode = e.detail.value;
    },
    //协议对勾切换
    onTick() {
        this.setData({
            tick: true
        })
    },
    onTicka() {
        this.setData({
            tick: false
        })
    },
    //获取验证码
    findCode(e) {
        var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (this.data.userPhone == "") {
            wx.showToast({
                title: '请输入手机号',
                icon: "none",
                duration: 2000
            })
            return
        }
        if (!reg.test(this.data.userPhone)) {
            wx.showToast({
                title: '手机号格式不正确',
                icon: "none",
                duration: 2000
            })
            return
        }
        var that = this;
        that.setData({
            bol: (!that.data.bol)
        })
        this.countDown()
        http.postReq("findCode", {
            data: {
                userPhone: that.data.userPhone
            }
        }, function(res) {
			
        })
    },
    //登录
    loginUser(e) {
        let openid = wx.getStorageSync('openid')
        var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (this.data.userPhone == "" || this.data.userCode == "") {
            wx.showToast({
                title: '请输入手机号或验证码',
                icon: "none",
                duration: 2000
            })
            return
        }
        if (!reg.test(this.data.userPhone)) {
            wx.showToast({
                title: '手机号格式不正确',
                icon: "none",
                duration: 2000
            })
            return
        }
        if (this.data.tick == true) {
            wx.showToast({
                title: '请同意用户协议及隐私政策',
                icon: "none",
                duration: 3000
            })
            return
        }
        var that = this;
        http.postReq("loginUser", {
            data: {
                userPhone: that.data.userPhone,
                randNum: that.data.userCode,
                openid: openid
            },
            version: "2.0"
        }, function(res) {
            if (res.data.code == "0000") {
                wx.showToast({
                    title: '登录成功',
                    icon: "none",
                    duration: 2000
                })
                wx.setStorage({
                    key: "token",
                    data: res.data.result
                })
                wx.redirectTo({
                    url: '../index/index',
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
    //跳转到用户协议
    goProtocol() {
        wx.navigateTo({
            url: "../protocol/protocol"
        });
    },
    goprivacy(){
      wx.navigateTo({
        url: "../privacy/privacy"
      });
    },
    //分享
    onShareAppMessage(e) {
        return {
            title: "期管云OCEC",
            path: "/pages/login/login"
        }
    },
    //授权
    onLoad: function(options) {
        this.getUserInfoFun()
    },
    onShow() {
        wx.showLoading({
            title: '登陆中',
            mask: true
        })
        let token = wx.getStorageSync('token')
        if (token) {
            wx.redirectTo({
                url: '../index/index',
            })
            wx.hideLoading()
        } else {
            wx.hideLoading()
        }
    },
    getUserInfoFun: function() {
        let openid = wx.getStorageSync('openid')
        var S = this;
        wx.getUserInfo({
            success: function(res) {
                S.setData({
                    userImg: res.userInfo.avatarUrl,
                    nameUser: res.userInfo.nickName,
                    eye: true
                })
                http.postReq("insertUserInformation", {
                    data: {
                        headPortrait: S.data.userImg,
                        nickName: S.data.nameUser,
                        openid: openid
                    },
                    version: "2.0"
                }, function(res) {
                })
            },
            fail: S.showPrePage
        })
    },
    showPrePage: function() {
        this.setData({
            eye: false
        })
    }
})