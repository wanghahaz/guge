import * as echarts from '../../ec-canvas/echarts';
var http = require('../../utils/http.js')
var barec = null
Page({
    data: {
		canvasImgUrl: "",
		canvasImgUrlBol:false,
		echartsBol:true,
        ec: {
            // 将 lazyLoad 设为 true 后，需要手动初始化图表
            lazyLoad: true
        },
        alertHint: true, //温馨提示
        indicatorDots: false,
        autoplay: false,
        duration: 1000,
        current: 1,
        displaymultipleitems: 1,
        alertDividend: true, //分红模态框
        alertDimission: true, //打开离职模态框
        clickDimission: true, //点击离职
        affirmDimission: true, //确认离职
        alertAeart: true, //打开比alertawarded心手势
        alertExercise: true, //打开行权
        generateExercise: true, //生成行权申请书
        sendExercise: true, //发送
        quitRegister: true, //退出登录
        handReturn: "", //已到手收益
        earningsYesterday: "", //昨日最新收益
        monthEarnings: "", //本月累计收益
        exerciseEarnings: "", //已行权股数
        maturity: "", //已成熟股数
        accruedBenefits: "", //待行权股数/可行权股数
        currentValuation: "", //当前价值
        eachAppraisement: "", //行权价
        impowerSharesNum: "", //获予权数
        progreeBar: "", //进度条最大值
        autumn: "", //成熟期
        abonus: "", //分红
        immature: "",
        quit: "", //离职
        userName: "", //用户名
        numDay: "", //天数
        imgBol: false, //比心图片的切换
        pilesNum: "", //用户输入的行权股数
        check: false, //行权动图
        canvas: false,
        alertperformance: true, //绩效模态框
        alertsell: true, //出售模态框
        alertplan: true, //激励计划模态框
        alertagreement: true, //授予协议模态框
    },
    init() {
        this.ecComponent.init((canvas, width, height) => {
            // 获取组件的 canvas、width、height 后的回调函数
            // 在这里初始化图表
            const chart = echarts.init(canvas, null, {
                width: width,
                height: height
            });
            this.echartsshow(chart)
                //   setOption(chart);
                // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
            this.chart = chart;

            this.setData({
                isLoaded: true,
                isDisposed: false
            });

            // 注意这里一定要返回 chart 实例，否则会影响事件处理等
            return chart;
        });
    },
	generateimg() {
		wx.canvasToTempFilePath({
			canvasId: 'mychartPie',
			success:res=>{
				this.setData({
					canvasImgUrl: res.tempFilePath,
					canvas:true,
					canvasImgUrlBol:true
				})
			}
		},this.ecComponent)
	},
    bindanimationfinish(e) {
        if (e.detail.current == 2) {
            this.setData({
                canvas: false
            })
            this.init()
			setTimeout(()=>{
				this.generateimg()
			},1000)
        }
    },
    bindchange(e) {
        if (e.detail.current == 1) {
            this.setData({
                canvas: true,
				canvasImgUrlBol:false
            })
        }
    },
    move: function() {},
    onReady() {
        this.ecComponent = this.selectComponent('#mychart-dom-pie');
    },
    echartsshow(chart) {
        let that = this
        let option = {
            backgroundColor: "#7FCBCF",
            color: ["#BFCE92", "#ED9D79", "#E9D0A1", "#FFFFFF"],
            series: [{
                label: {
                    normal: {
                        fontSize: 10
                    }
                },
                silent: true,
                animation: true,
                hoverAnimation: false,
                avoidLabelOverlap: false,
                legendHoverLink: false,
                selectedMode: false,
                type: "pie",
                // radius: ["75%", "85%"],
                radius: ["45%", "55%"],
                center: ["50%", "52%"],
                data: [{
                    value: 0,
                    name: '已行权' + 0 + "股",
                }, {
                    value: 0,
                    name: '待行权' + 0 + '股（累积）',
                }, {
                    value: 0,
                    name: '本期成熟' + 0 + '股',
                }, {
                    value: 0,
                    name: '未成熟' + 0 + '股',
                }]
            }]
        }
        chart.setOption(option);
    },
    onShow() {},
    //用户输入的行权股数
    pilesNumInput: function(e) {
        this.setData({
                pilesNum: e.detail.value
            })
            // this.data.pilesNum = e.detail.value;
    },
    //倒计时
    changeIndicatorDots: function(e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeAutoplay: function(e) {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },
    durationChange: function(e) {
        this.setData({
            duration: e.detail.value
        })
    },
    //跳转到免费激活
    activate() {
        wx.navigateTo({
            url: '../activate/activate'
        })
    },
    //关闭温馨提示
    closeHint() {
        this.setData({
            alertHint: true
        })
    },
    //去往登录
    goLogin() {
        this.setData({
            alertHint: true
        })
        wx.redirectTo({
            url: '../login/login',
        })
    },
    //去往配套文件
    goFile() {
        wx.redirectTo({
            url: '../file/file',
        })
    },
    //获授股数
    acquire() {
        if (!wx.getStorageSync('token')) {
            this.setData({
                alertHint: false
            })
            return
        }
    },
    //成熟期
    adultness() {
        if (!wx.getStorageSync('token')) {
            this.setData({
                alertHint: false
            })
            return
        }
    },
    //分红模态框
    dividend() {
        if (!wx.getStorageSync('token')) {
            this.setData({
                alertHint: false
            })
            return
        }
        this.setData({
            alertDividend: false
        })
    },
    //关闭分红模态框
    closeDividend() {
        this.setData({
            alertDividend: true
        })
    },
    //打开离职
    dimission() {
        if (!wx.getStorageSync('token')) {
            this.setData({
                alertHint: false
            })
            return
        }
        this.setData({
            alertDimission: false,
            clickDimission: true,
            affirmDimission: true
        })
    },
    clickdimission() {
        this.setData({
            alertDimission: true,
            clickDimission: false,
            affirmDimission: true
        })
    },
    affirmdimission() {
        this.setData({
            alertDimission: true,
            clickDimission: true,
            affirmDimission: false
        })
    },
    //关闭离职
    closedimission() {
        this.setData({
            alertDimission: true,
            clickDimission: true,
            affirmDimission: true
        })
    },
    //打开比心
    alertaeart() {
        if (!wx.getStorageSync('token')) {
            this.setData({
                alertHint: false
            })
            return
        }
        this.setData({
            alertAeart: false,
        })
    },
    //关闭比心
    closeaeart() {
        this.setData({
            alertAeart: true,
        })
    },
    //打开行权
    alertexercise() {
        if (!wx.getStorageSync('token')) {
            this.setData({
                alertHint: false
            })
            return
        }
        this.setData({
            check: false
        })
        setTimeout(() => {
            this.setData({
                check: true
            })
        }, 1240);
        this.setData({
            alertExercise: false,
            generateExercise: true,
            sendExercise: true
        })
    },
    //生成行权数
    generateexercise() {
        if (this.data.pilesNum > this.data.accruedBenefits) {
            wx.showToast({
                title: '您没有那么多可行权股数',
                icon: "none",
                duration: 2000
            })
            return
        }
        if (this.data.pilesNum == "") {
            wx.showToast({
                title: '请输入行权股数',
                icon: "none",
                duration: 2000
            })
            return
        }
        this.setData({
            alertExercise: true,
            generateExercise: false,
            sendExercise: true
        })
    },
    sendexercise() {
        let that = this;
        let token = wx.getStorageSync('token')
        wx.request({
            url: "https://guge.web.iguge.com/user/insertRightRecord",
            method: 'POST',
            data: {
                data: {
                    rightNumber: that.data.pilesNum
                },
                version: "2.0"
            },
            header: {
                Authorization: "Bearer " + token
            },
            success: res => {
                console.log(res)
                this.setData({
                    alertExercise: true,
                    generateExercise: true,
                    sendExercise: false
                })
            }
        })
    },
    //关闭行权
    closeexercise() {
        this.setData({
            alertExercise: true,
            generateExercise: true,
            sendExercise: true,
            pilesNum: ""
        })
        this.selectUserByID()
    },
    //打开绩效模态框
    performance() {
        if (!wx.getStorageSync('token')) {
            this.setData({
                alertHint: false
            })
            return
        }
        this.setData({
            alertperformance: false
        })
    },
    //关闭绩效模态框
    closePerformance() {
        this.setData({
            alertperformance: true
        })
    },
    //去往绩效
    goPerformance() {
        this.setData({
            alertperformance: true
        })
        wx.navigateTo({
            url: "../textOne/textOne"
        })
    },
    //打开出售模态框
    sell() {
        if (!wx.getStorageSync('token')) {
            this.setData({
                alertHint: false
            })
            return
        }
        this.setData({
            alertsell: false
        })
    },
    //关闭出售模态框
    closeSell() {
        this.setData({
            alertsell: true
        })
    },
    //去往出售
    goSell() {
        this.setData({
            alertsell: true
        })
        wx.navigateTo({
            url: "../textTwo/textTwo"
        })
    },
    //打开激励计划模态框
    plan() {
        if (!wx.getStorageSync('token')) {
            this.setData({
                alertHint: false
            })
            return
        }
        this.setData({
            alertplan: false
        })
    },
    //关闭激励计划模态框
    closePlan() {
        this.setData({
            alertplan: true
        })
    },
    //去激励计划
    goPlan() {
        this.setData({
            alertplan: true
        })
        wx.navigateTo({
            url: "../textThree/textThree"
        })
    },
    //打开授予协议模态框
    agreement() {
        if (!wx.getStorageSync('token')) {
            this.setData({
                alertHint: false
            })
            return
        }
        this.setData({
            alertagreement: false
        })
    },
    //关闭授予协议模态框
    closeAgreement() {
        this.setData({
            alertagreement: true
        })
    },
    //去授予协议
    goAgreement() {
        this.setData({
            alertagreement: true
        })
        wx.navigateTo({
            url: "../textFour/textFour"
        })
    },
    //去使用指引
    goFingerpost() {
        this.setData({
            alertAeart: true,
        })
        wx.navigateTo({
            url: "../textFive/textFive"
        })
    }
})