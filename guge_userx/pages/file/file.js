var uploadimg = require('../../utils/uploadimg.js')
var http = require('../../utils/http.js')
Page({
    data: {
        alertHint: true, //温馨提示
        alertMarkD: true, //选项D的弹框
        pictureA: false,
        pictureB: false,
        pictureC: false,
        pictureD: false,
        showSearchView: 1,
        // pics: []
		explainAndNeedD:"",
		
		commentValue:"",
		commentValueKey:"",
		CommentBox:true,
		autoFocusBol:false
    },
    onShow() {

    },
	
	// 其他说明  -- 点击其他说明
	changeCommentBox(e){
		if(this.data.commentValue != ''){
			//上次输入未完成
			this.setData({
				commentValueKey:e.currentTarget.dataset.key,
				CommentBox:false,
				autoFocusBol:true
			})
		}else{
			//输入已完成 回显赋值
			this.setData({
				commentValue:this.data[e.currentTarget.dataset.key]
			},()=>{
				this.setData({
					commentValueKey:e.currentTarget.dataset.key,
					CommentBox:false,
					autoFocusBol:true
				})
			})
		}
	},
	closeCommentBox(e){
		this.setData({
			CommentBox:true,
			autoFocusBol:false
		})
	},
	move(){
		// console.log('滑动')
	},
	hideKeyboard(e){
		// console.log('失焦')
	},
	setValue(e){
		// console.log('输入')
		this.setData({
			commentValue:e.detail.value
		})
	},
	catchBubble(){
		
	},
	checkContent(){
		this.setData({
			[this.data.commentValueKey]:this.data.commentValue,
			CommentBox:true,
			autoFocusBol:false
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
    //跳转到期权激励计划（ESOP）
    skipA() {
        if (!wx.getStorageSync('token')) {
            this.setData({
                alertHint: false
            })
            return
        }
        this.setData({
            pictureA: true,
            pictureB: false,
            pictureC: false,
            pictureD: false,
        })
        wx.navigateTo({
            url: "../imgStimulate/imgStimulate"
        })
    },
    //期权授予协议（事业合伙人共创协议）
    skipB() {
        if (!wx.getStorageSync('token')) {
            this.setData({
                alertHint: false
            })
            return
        }
        this.setData({
            pictureA: false,
            pictureB: true,
            pictureC: false,
            pictureD: false,
        })
        wx.navigateTo({
            url: "../imgAward/imgAward"
        })
    },
    //劳动合同书（及员工手册）
    skipC() {
        if (!wx.getStorageSync('token')) {
            this.setData({
                alertHint: false
            })
            return
        }
        this.setData({
            pictureA: false,
            pictureB: false,
            pictureC: true,
            pictureD: false,
        })
        wx.navigateTo({
            url: "../imgContract/imgContract"
        })
    },
    //保密知识产权与竞业限制协议
    skipD() {
        if (!wx.getStorageSync('token')) {
            this.setData({
                alertHint: false
            })
            return
        }
        this.setData({
            pictureA: false,
            pictureB: false,
            pictureC: false,
            pictureD: true,
        })
        wx.navigateTo({
            url: "../imgKnowledge/imgKnowledge"
        })
    },
    //发送至邮箱
    bounceD() {
        if (!wx.getStorageSync('token')) {
            this.setData({
                alertHint: false
            })
            return
        }
        this.setData({
            alertMarkD: false, //选项D的弹框
            showSearchView: 0
        })
    },
    //关闭ABCD框
    closeBounce() {
        this.setData({
            alertMarkD: true, //选项D的弹框
            showSearchView: 1
        })
    },
    //提交选项D
    formSubmit(e) {
        console.log(e.detail.value)
        let emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        let that = this;
        if (e.detail.value.wechatD == "") {
            wx.showToast({
                title: '请输入您的邮箱',
                icon: "none",
                duration: 2000
            })
            return
        }
        if (!emailReg.test(e.detail.value.wechatD)) {
            wx.showToast({
                title: '请输入正确的邮箱格式',
                icon: "none",
                duration: 2000
            })
            return
        }
        http.postReq("insertOneKeyGenerate", {
            data: {
                choice: "D-邮箱",
                name: e.detail.value.nameD,
                post: e.detail.value.postD,
                phone: e.detail.value.phoneD,
                email: e.detail.value.wechatD,
                companyName: e.detail.value.companyNameD,
                explainAndNeed: e.detail.value.explainAndNeedD
            },
            version: "2.0"
        }, function(res) {
            console.log(res)
            if (res.data.code == "0000") {
                wx.navigateTo({
                    url: '../mailbox/mailbox'
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
    bindDateChange: function(e) {
        this.setData({
            date: e.detail.value + "-01"
        })
    },
})