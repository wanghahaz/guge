import * as echarts from '../../ec-canvas/echarts';
var http = require('../../utils/http.js')
var barec = null
Page({
    data: {
        weidu: 0,
        certificateBol: true,
        canvasImgUrl: "",
        canvasImgUrlBol: false,
        echartsBol: true,
        ec: {
            // 将 lazyLoad 设为 true 后，需要手动初始化图表
            lazyLoad: true
        },
        indicatorDots: false,
        autoplay: false,
        duration: 1000,
        current: 1,
        displaymultipleitems: 1,
        alertDividend: true, //分红模态框
        alertDimission: true, //打开离职模态框
        clickDimission: true, //点击离职
        affirmDimission: true, //确认离职
        alertAeart: true, //打开比心手势
        alertExercise: true, //打开行权
        generateExercise: true, //生成行权申请书
        sendExercise: true, //发送
        actualQuitRegister: true, //退出登录
        handReturn: "", //已到手收益
        earningsYesterday: "", //昨日最新收益
        periodEarnings: "", //本月累计收益
        remainingAuthorizedShares: "", //已行权股数
        periodMaturity: "", //已成熟股数
        accruedBenefits: "", //待行权股数
        currentValuationPer: "", //当前价值
        companyUpdateTime: "", //当前价值
        eachAppraisement: "", //行权价
        impowerSharesNum: "", //获予权数
        progressBar: "", //进度条最大值
        autumn: "", //成熟期
        actualAbonus: "", //分红
        immature: "",
        achievements: "", //绩效
        userName: "", //用户名
        numDay: "", //天数
        imgBol: false, //比心图片的切换
        pilesNum: "", //用户输入的行权股数
        floatNum: "", //用户输入的退还股数
        check: false, //行权动图
        canvas: false,
        alertperformance: true, //绩效模态框
        alertsell: true, //出售模态框
        alertsell2: true, //出售模态框
        alertsell3: true, //出售模态框
        alertplan: true, //激励计划模态框
        alertagreement: true, //授予协议模态框
        alertawarded: true, //获授股数模态框
        awardRatio: "", //获授比例
        stockStartTime: "", //授予日
        alertmaturation: true, //打开成熟期模态框
        firstWaitingPeriod: "", //首次等待期
        firstMaturity: "", //首次成熟股数
        subsequentMaturityCycle: "", //后续成熟周期
        subsequentMaturityCycleNum: "", //后续成熟周期数
        toExercise: true, //待行权模态框
        overviewBol: true, //概览模态框
        Currentjvalue: true, //当前价值模态框
        exercisePrice: true, //行权价模态框
        matureBol: true, //已成熟股数模态框
        realization: true, //变现模态框
        EarningsYesterday: true, //昨日新增收益模态框
        accumulatedIncome: true, //本期累积收益-模态框
        ItReturns: true, //到手收益模态框
        LineHasTheRightTo: true, //已行权股数模态框

        totalAwarded: "", //获授总数
        numSharesAwarded: "", //追授股数
        firstRightDate: "", //首次可行权日
        approvalNum: "", //累积已批准股数
        transferableShares: "", //累积已转让股数
        numReturnedShares: "", //累积已退还股数
        adjustedNumReturnedShares: "", //调整退转股数

        applicationExercise: "", //申请中的行权股数
        applyExercise: "", //累计申请行权股数
        approvalExercise: "", //累计批准行权股数
        applicationTransfer: "", //申请中的转让股数
        approvalTransfer: "", //累计批准转让股数
        applicationReturn: "", //申请中的退还股数
        approvalReturn: "", //累计批准退还股数
        companyName: "",
        headerUserName: "",
        userPhone: "",
        floatSell: "",
        quitRegister: true
    },
    //初始化图表
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
            success: res => {
                this.setData({
                    canvasImgUrl: res.tempFilePath,
                    canvas: true,
                    canvasImgUrlBol: true
                })
            }
        }, this.ecComponent)
    },
    bindanimationfinish(e) {
        //轮播滑动显示
        if (e.detail.current == 2) {
            this.setData({
                canvas: false
            })
            this.init()
            setTimeout(() => {
                this.generateimg()
            }, 1000)

        }
    },
    bindchange(e) {
        if (e.detail.current == 1) {
            this.setData({
                canvas: true,
                canvasImgUrlBol: false
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
                radius: ["45%", "55%"],
                center: ["50%", "52%"],
                data: [{
                    value: that.data.remainingAuthorizedShares,
                    name: '已行权' + that.data.remainingAuthorizedShares + "股",
                    label: {
                        show: function() {
                            if (that.data.remainingAuthorizedShares == 0 && that.data.accruedBenefits == 0 && that.data.periodMaturity ==
                                0 && that.data.immature == 0) {
                                return true;
                            }
                            if (that.data.remainingAuthorizedShares == 0) {
                                return false;
                            }
                            if (that.data.remainingAuthorizedShares != 0) {
                                return true;
                            }
                        }()
                    },
                    labelLine: {
                        show: function() {
                            if (that.data.remainingAuthorizedShares == 0 && that.data.accruedBenefits == 0 && that.data.periodMaturity ==
                                0 && that.data.immature == 0) {
                                return true;
                            }
                            if (that.data.remainingAuthorizedShares == 0) {
                                return false;
                            }
                            if (that.data.remainingAuthorizedShares != 0) {
                                return true;
                            }
                        }()
                    }
                }, {
                    value: that.data.accruedBenefits,
                    name: '待行权' + that.data.accruedBenefits + '股',
                    label: {
                        show: function() {
                            if (that.data.remainingAuthorizedShares == 0 && that.data.accruedBenefits == 0 && that.data.periodMaturity ==
                                0 && that.data.immature == 0) {
                                return true;
                            }
                            if (that.data.accruedBenefits == 0) {
                                return false;
                            }
                            if (that.data.accruedBenefits != 0) {
                                return true;
                            }
                        }()
                    },
                    labelLine: {
                        show: function() {
                            if (that.data.remainingAuthorizedShares == 0 && that.data.accruedBenefits == 0 && that.data.periodMaturity ==
                                0 && that.data.immature == 0) {
                                return true;
                            }
                            if (that.data.accruedBenefits == 0) {
                                return false;
                            }
                            if (that.data.accruedBenefits != 0) {
                                return true;
                            }
                        }()
                    }
                }, {
                    value: that.data.periodMaturity,
                    name: '本期成熟' + that.data.periodMaturity + '股',
                    label: {
                        show: function() {
                            if (that.data.remainingAuthorizedShares == 0 && that.data.accruedBenefits == 0 && that.data.periodMaturity ==
                                0 && that.data.immature == 0) {
                                return true;
                            }
                            if (that.data.periodMaturity == 0) {
                                return false;
                            }
                            if (that.data.periodMaturity != 0) {
                                return true;
                            }
                        }()
                    },
                    labelLine: {
                        show: function() {
                            if (that.data.remainingAuthorizedShares == 0 && that.data.accruedBenefits == 0 && that.data.periodMaturity ==
                                0 && that.data.immature == 0) {
                                return true;
                            }
                            if (that.data.periodMaturity == 0) {
                                return false;
                            }
                            if (that.data.periodMaturity != 0) {
                                return true;
                            }
                        }()
                    }
                }, {
                    value: that.data.immature,
                    name: '未成熟' + that.data.immature + '股',
                    label: {
                        show: function() {
                            if (that.data.remainingAuthorizedShares == 0 && that.data.accruedBenefits == 0 && that.data.periodMaturity ==
                                0 && that.data.immature == 0) {
                                return true;
                            }
                            if (that.data.immature == 0) {
                                return false;
                            }
                            if (that.data.immature != 0) {
                                return true;
                            }
                        }()
                    },
                    labelLine: {
                        show: function() {
                            if (that.data.remainingAuthorizedShares == 0 && that.data.accruedBenefits == 0 && that.data.periodMaturity ==
                                0 && that.data.immature == 0) {
                                return true;
                            }
                            if (that.data.immature == 0) {
                                return false;
                            }
                            if (that.data.immature != 0) {
                                return true;
                            }
                        }()
                    }
                }]
            }]
        }
        chart.setOption(option);
    },
    toRouter(e) {
        console.log(e.currentTarget.dataset.type)
        wx.navigateTo({
            url: '../' + e.currentTarget.dataset.type
        })
    },
    //获取未读数
    getWeiDu() {
        let that = this
        http.postReq("selectUnreadNoticeCountByUserId", {
            data: {},
            version: "2.0"
        }, function(res) {
            that.setData({
                weidu: res.data.result
            })
        })
    },
    onShow() {
        this.getWeiDu()
        this.selectUserByID()
        this.dayNum()
        this.selectCalculationExercise()
            // this.getData()
    },
    //用户输入的行权股数
    pilesNumInput: function(e) {
        this.setData({
            pilesNum: e.detail.value
        })
    },
    //用户输入的退还股数
    floatNumInput: function(e) {
        this.setData({
            floatNum: e.detail.value
        })
    },
    floatSellInput: function(e) {
        this.setData({
            floatSell: e.detail.value
        })
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
    alertmarkD() {
        wx.navigateTo({
            url: '../activate/activate?markD=false'
        })
    },
    //去往配套文件
    file() {
        wx.navigateTo({
            url: '../file/file'
        })
    },
    //分享
    onShareAppMessage(e) {
        return {
            title: "期管云OCEC",
            path: "/pages/indexone/indexone"
        }
    },
    //首页数据展示
    selectUserByID() {
        let that = this;
        http.postReq("selectUserByID", {
            data: {},
            version: "2.0"
        }, function(res) {
            console.log(res)
            if (res.data.code == "0000") {
                wx.setStorage({
                    key: "companyId",
                    data: res.data.result.companyId
                })
                if (res.data.result.companyName == null) {
                    that.setData({
                        companyName: "公司名称"
                    })
                } else {
                    that.setData({
                        companyName: res.data.result.companyName
                    })
                }


                if (res.data.result.userName == null) {
                    that.setData({
                        handReturn: res.data.result.handReturn,
                        earningsYesterday: res.data.result.earningsYesterday,
                        periodEarnings: res.data.result.periodEarnings, //本月累计收益
                        remainingAuthorizedShares: res.data.result.remainingAuthorizedShares, //已行权股数
                        periodMaturity: res.data.result.periodMaturity, //已成熟股数
                        currentValuationPer: res.data.result.currentValuationPer, //当前价值
                        companyUpdateTime: res.data.result.companyUpdateTime, //当前价值
                        eachAppraisement: res.data.result.eachAppraisement, //行权价
                        impowerSharesNum: res.data.result.impowerSharesNum, //获予权数
                        autumn: res.data.result.autumn, //成熟期
                        actualAbonus: res.data.result.actualAbonus, //分红
                        accruedBenefits: res.data.result.accruedBenefits, //累积待行权股数
                        achievements: res.data.result.achievements, //绩效
                        userName: "",
                        progressBar: res.data.result.progressBar,
                        immature: res.data.result.immature,
                        awardRatio: res.data.result.awardRatio, //获授比例
                        stockStartTime: res.data.result.stockStartTime, //授予日
                        firstWaitingPeriod: res.data.result.firstWaitingPeriod, //首次等待期
                        firstMaturity: res.data.result.firstMaturity, //首次成熟股数
                        subsequentMaturityCycle: res.data.result.subsequentMaturityCycle, //后续成熟周期
                        subsequentMaturityCycleNum: res.data.result.subsequentMaturityCycleNum, //后续成熟周期数

                        totalAwarded: res.data.result.totalAwarded, //获授总数
                        numSharesAwarded: res.data.result.numSharesAwarded, //追授股数
                        firstRightDate: res.data.result.firstRightDate, //首次可行权日
                        approvalNum: res.data.result.approvalNum, //累积已批准股数
                        transferableShares: res.data.result.transferableShares, //累积已转让股数
                        numReturnedShares: res.data.result.numReturnedShares, //累积已退还股数
                        adjustedNumReturnedShares: res.data.result.adjustedNumReturnedShares, //调整退转股数
                        headerUserName: "姓名",
                        userPhone: res.data.result.userPhone
                    })
                } else {
                    that.setData({
                        handReturn: res.data.result.handReturn,
                        earningsYesterday: res.data.result.earningsYesterday,
                        periodEarnings: res.data.result.periodEarnings, //本月累计收益
                        remainingAuthorizedShares: res.data.result.remainingAuthorizedShares, //已行权股数
                        periodMaturity: res.data.result.periodMaturity, //已成熟股数
                        currentValuationPer: res.data.result.currentValuationPer, //当前价值
                        companyUpdateTime: res.data.result.companyUpdateTime, //当前价值
                        eachAppraisement: res.data.result.eachAppraisement, //行权价
                        impowerSharesNum: res.data.result.impowerSharesNum, //获予权数
                        autumn: res.data.result.autumn, //成熟期
                        actualAbonus: res.data.result.actualAbonus, //分红
                        accruedBenefits: res.data.result.accruedBenefits, //累积待行权股数
                        achievements: res.data.result.achievements, //绩效
                        userName: res.data.result.userName,
                        progressBar: res.data.result.progressBar,
                        immature: res.data.result.immature,
                        awardRatio: res.data.result.awardRatio, //获授比例
                        stockStartTime: res.data.result.stockStartTime, //授予日
                        firstWaitingPeriod: res.data.result.firstWaitingPeriod, //首次等待期
                        firstMaturity: res.data.result.firstMaturity, //首次成熟股数
                        subsequentMaturityCycle: res.data.result.subsequentMaturityCycle, //后续成熟周期
                        subsequentMaturityCycleNum: res.data.result.subsequentMaturityCycleNum, //后续成熟周期数

                        totalAwarded: res.data.result.totalAwarded, //获授总数
                        numSharesAwarded: res.data.result.numSharesAwarded, //追授股数
                        firstRightDate: res.data.result.firstRightDate, //首次可行权日
                        approvalNum: res.data.result.approvalNum, //累积已批准股数
                        transferableShares: res.data.result.transferableShares, //累积已转让股数
                        numReturnedShares: res.data.result.numReturnedShares, //累积已退还股数
                        adjustedNumReturnedShares: res.data.result.adjustedNumReturnedShares, //调整退转股数
                        headerUserName: res.data.result.userName,
                        userPhone: res.data.result.userPhone
                    })
                }
            } else if (res.data.code == "2000") {
                wx.removeStorageSync('token')
                wx.showToast({
                    title: res.data.msg,
                    icon: "none",
                    duration: 2000
                })
                wx.redirectTo({
                    url: '../login/login',
                })
            } else {
                wx.showToast({
                    title: res.data.msg,
                    icon: "none",
                    duration: 2000
                })
            }
            if (res.data.result.accruedBenefits > 0) {
                that.setData({
                    imgBol: true
                })
            } else {
                that.setData({
                    imgBol: false
                })
            }
        })
    },
    selectCalculationExercise() {
        http.postReq("selectCalculationExercise", {
            data: {},
            version: "2.0"
        }, res => {
            this.setData({
                applicationExercise: res.data.result.applicationExercise, //申请中的行权股数
                applyExercise: res.data.result.applyExercise, //累计申请行权股数
                approvalExercise: res.data.result.approvalExercise, //累计批准行权股数
                applicationTransfer: res.data.result.applicationTransfer, //申请中的转让股数
                approvalTransfer: res.data.result.approvalTransfer, //累计批准转让股数
                applicationReturn: res.data.result.applicationReturn, //申请中的退还股数
                approvalReturn: res.data.result.approvalReturn, //累计批准退还股数
            })
        })
    },


    //获取天数接口
    dayNum() {
        let that = this;
        http.postReq("dayNum", {
            data: {},
            version: "2.0"
        }, function(res) {
            that.setData({
                numDay: res.data.result
            })
        })
    },
    //分红模态框
    dividend() {
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
    goDividend() {
        this.setData({
            alertDividend: true
        })
        wx.navigateTo({
            url: "../textSix/textSix"
        })
    },
    //打开回购
    dimission() {
        this.setData({
            alertDimission: false,
            clickDimission: true,
            affirmDimission: true
        })
    },
    clicksell() {
        if (this.data.floatSell > this.data.remainingAuthorizedShares) {
            wx.showToast({
                title: '您没有那么多转让股数',
                icon: "none",
                duration: 2000
            })
            return
        }
        if (this.data.floatSell == "") {
            wx.showToast({
                title: '请输入转让股数',
                icon: "none",
                duration: 2000
            })
            return
        }
        if (this.data.floatSell == 0) {
            wx.showToast({
                title: '转让股数不能为0',
                icon: "none",
                duration: 2000
            })
            return
        }
        this.setData({
            alertsell: true,
            alertsell2: false,
            alertsell3: true
        })
    },
    clickdimission() {
        if (this.data.floatNum > this.data.remainingAuthorizedShares) {
            wx.showToast({
                title: '您没有那么多退还股数',
                icon: "none",
                duration: 2000
            })
            return
        }
        if (this.data.floatNum == "") {
            wx.showToast({
                title: '请输入退还股数',
                icon: "none",
                duration: 2000
            })
            return
        }
        if (this.data.floatNum == 0) {
            wx.showToast({
                title: '退还股数不能为0',
                icon: "none",
                duration: 2000
            })
            return
        }
        this.setData({
            alertDimission: true,
            clickDimission: false,
            affirmDimission: true
        })
    },
    affirmdimission() {
        let that = this;
        http.postReq("insertRightRecord", {
            data: {
                type: "2",
                rightNumber: that.data.floatNum
            },
            version: "2.0"
        }, function(res) {
            that.setData({
                alertDimission: true,
                clickDimission: true,
                affirmDimission: false
            })
        })
    },
    affirsell() {
        let that = this;
        http.postReq("insertRightRecord", {
            data: {
                type: "3",
                rightNumber: that.data.floatSell
            },
            version: "2.0"
        }, function(res) {
            that.setData({
                alertsell: true,
                alertsell2: true,
                alertsell3: false
            })
        })
    },
    //关闭离职
    closedimission() {
        this.setData({
            alertDimission: true,
            clickDimission: true,
            affirmDimission: true,
            floatNum: ""
        })
    },
    closealertsell() {
        this.setData({
            alertsell: true,
            alertsell2: true,
            alertsell3: true,
            floatSell: ""
        })
    },
    //打开比心
    alertaeart() {
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
        http.postReq("insertRightRecord", {
            data: {
                type: "1",
                rightNumber: that.data.pilesNum
            },
            version: "2.0"
        }, function(res) {
            that.setData({
                alertExercise: true,
                generateExercise: true,
                sendExercise: false
            })
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
    //打开获授股数模态框
    awarded() {
        this.setData({
            alertawarded: false
        })
    },
    closeAwarded() {
        this.setData({
            alertawarded: true
        })
    },
    //打开成熟期模态框
    maturation() {
        this.setData({
            alertmaturation: false
        })
    },
    closeMaturation() {
        this.setData({
            alertmaturation: true
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
    //去使用指引
    goFingerpost() {
        this.setData({
            alertAeart: true,
        })
        wx.navigateTo({
            url: "../textFive/textFive"
        })
    },
    //前往签约
    goSigned() {
        let that = this;
        http.postReq("fddExtsign", {
            version: "2.0"
        }, function(res) {
            if (res.data.code == "0000") {
                that.setData({
                    alertagreement: true
                })
                wx.navigateTo({
                    url: "../fddExtsign/fddExtsign"
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
    //查看合同
    goContract() {
        this.setData({
            alertagreement: true
        })
        wx.navigateTo({
            url: "../fddQuerySignStatus/fddQuerySignStatus"
        })
    },
    openMark(e) {
        // console.log(e)
        var item = e.currentTarget.dataset.openmark;
        this.setData({
            [item]: false
        })
    },
    closeMark(e) {
        var item = e.currentTarget.dataset.closemark;
        this.setData({
            [item]: true
        })
    },
    changeCertificateTrue() {
        this.setData({
            certificateBol: true
        })
    },
    changeCertificateFalse() {
        this.setData({
            certificateBol: false
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
    }
})