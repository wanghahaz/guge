<template>
	<div class="box">
		<div class="header_user">
			<div class="header_user_left">
				<img src="../../../static/img/index/index_user.png" /> 
				<div>
					<span style="width: 4.8rem;">姓名</span>
					<span style="width: auto;">公司名称</span>
				</div>
			</div>
			<div  @click="acquire" class="header_user_right">
				<img  src="../../../static/img/index/weidu.png" />
				<img  src="../../../static/img/index/feed.png" />
				<img src="../../../static/img/index/index_logon.png" />
			</div>
		</div>
		<!--轮播-->
		<div class="banner">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<div @click="acquire" class="swiperLift">
							<div class="top">
								<span>已到手收益（元）</span>
								<span>￥{{0|NumFormat}}</span>
							</div>
							<div class="bottom">
								<div class="bottomlift">
									<span>本期累计收益</span>
									<span>￥{{0|NumFormat}}</span>
								</div>
								<div class="bottomcenter">

								</div>
								<div class="bottomright">
									<span>昨日新增收益</span>
									<span>￥{{0|NumFormat}}</span>
								</div>
							</div>
						</div>
					</div>
					<div class="swiper-slide">
						<div @click="acquire" class="swiperCenter">
							<div class="top">
								<span>已行权股数</span>
								<span>0</span>
							</div>
							<div class="bottom">
								<div class="bottomlift">
									<span>已成熟股数<a href="JavaScript:;">(本期)</a></span>
									<span>0</span>
								</div>
								<div class="bottomcenter">

								</div>
								<div class="bottomright">
									<span>待行权股数<a href="JavaScript:;">(累计)</a></span>
									<span>0</span>
								</div>
							</div>
							<div class="imgss" v-show="!heartBol">
								<img style="width: 100%;height: 100%" src="../../../static/img/index/shoushi.gif" @click="judge" />
							</div>
							<div class="imgss" v-show="heartBol">
								<img style="width: 100%;height: 100%" src="../../../static/img/index/bixin.png" @click="judge" />
							</div>
						</div>
					</div>
					<div class="swiper-slide">
						<div class="swiperRight swipermsg">
							<!--<div class="swiperRight_top">-->
								<div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart"></div>
							<!--</div>-->
							<div class="swiperRight_bottom">
								<progress class="progr" max="0" value="0"></progress>
								<div>0 / 0（本期）</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--概览-->
		<div class="main">
			<div @click="acquire" class="left">
				<img src="../../../static/img/index/gailan.png" />
				<div>
					<span>概览</span>
					<span>Overview</span>
				</div>
			</div>
			<div class="right">
				<div class="righttop">
					<div @click="acquire" class="mainone">
						<span>0股</span>
						<div style="background: #7fc3c6;">
							获授总数
							<!--<img src="../../../static/img/index/gushu.png" />-->
						</div>
					</div>
					<div @click="acquire" class="mainone">
						<span>0个月</span>
						<div style="background: #e59b7b;">
							成熟期
							<!--<img src="../../../static/img/index/chengshu.png" />-->
						</div>
					</div>
				</div>
				<div class="righttop" style="margin-top: 0.531rem">
					<div @click="acquire" class="mainone">
						<span>0元/股</span>
						<div style="background: #e5cca1;">
							当前价值
							<!--<img src="../../../static/img/index/jiazhi.png" />-->
						</div>
					</div>
					<div @click="acquire" class="mainone">
						<span>0元/万股</span>
						<div style="background: #bcca92;">
							行权价
							<!--<img src="../../../static/img/index/xingjiaquan.png" />-->
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--变现-->
		<div class="realization">
			<div @click="acquire" class="left">
				<img src="../../../static/img/index/bianxian.png" />
				<div>
					<span>变现</span>
					<span>Liquidity</span>
				</div>
			</div>
			<div class="right">
				<div class="righttop">
					<div @click="acquire" class="mainone">
						<img style="width: 1.031rem;height: 1.625rem;" src="../../../static/img/index/jixiao.png" />
						<span>绩效</span>
					</div>
					<div @click="acquire" class="mainone">
						<img style="width: 1.438rem;height: 1.469rem;" src="../../../static/img/index/fenhong.png" />
						<span>分红</span>
					</div>
				</div>
				<div class="righttop" style="margin-top: 0.563rem">
					<div @click="acquire" class="mainone">
						<img style="width: 1.156rem;height: 1.469rem;" src="../../../static/img/index/chushou.png" />
						<span>转让</span>
					</div>
					<div class="mainone" @click="acquire">
						<img style="width: 1.438rem;height: 1.125rem;" src="../../../static/img/index/tuigu.png" />
						<span>回购</span>
					</div>
				</div>
			</div>
		</div>
		<!--存证-->
		<div class="inventories">
			<div @click="acquire" class="left">
				<img src="../../../static/img/index/cunzheng.png" />
				<div>
					<span>存证</span>
					<span>Escrow</span>
				</div>
			</div>
			<div class="right">
				<div @click="acquire" class="rightmain">
					<span>激励计划</span>
					<img style="width: 4.156rem;height: 2.5rem;" src="../../../static/img/index/jili.png" />
				</div>
				<div @click="acquire" class="rightmain">
					<span>授予协议</span>
					<img style="width: 4.156rem;height: 2.5rem;" src="../../../static/img/index/xieyi.png" />
				</div>
			</div>
		</div>
		<!--使用指引-->
		<div class="employ">
			<div class="employmain" @click="goFile">
				<div>
					<span>配</span>
					<span>套</span>
					<span>文</span>
					<span>件</span>
				</div>
				<span>Supporting files</span>
			</div>
			<div class="employmain" @click="activate">
				<div>
					<span>自</span>
					<span>主</span>
					<span>激</span>
					<span>活</span>
				</div>
				<span>Activate Now</span>
			</div>
		</div>
		<!--点击绩效模态框-->
		<div class="mark" v-show="alertperformance">
			<div class="mark_content">
				<img class="close" src="../../../static/img/index/close.png" @click="closePerformance" />
				<div class="dimission" style="margin-top: 6rem">
					<p>先生/女士，</p>
					<p>您当前的绩效考核为：</p>
				</div>
				<div class="dimissionfoot" style="margin-top: 4rem">
					<span style="background: #80C9CD;" @click="closePerformance">我知道了</span>
					<span style="color: #80C9CD;" @click="two('绩效')">查看绩效制度</span>
				</div>
			</div>
		</div>
		<!--点击出售模态框-->
		<div class="mark" v-show="alertsell">
			<div class="mark_content">
				<img class="close" src="../../../static/img/index/close.png" @click="closeSell" />
				<div class="dimission" style="margin-top: 6rem">
					<p>先生/女士，</p>
					<p>您的所属公司：</p>
				</div>
				<div class="dimissionfoot" style="margin-top: 4rem">
					<span style="background: #80C9CD;" @click="closeSell">我知道了</span>
					<span style="color: #80C9CD;" @click="three('出售')">查看出售制度</span>
				</div>
			</div>
		</div>
		<!--点击激励计划模态框-->
		<div class="mark" v-show="alertstimulate">
			<div class="mark_content">
				<img class="close" src="../../../static/img/index/close.png" @click="closeStimulate" />
				<div class="dimission" style="margin-top: 6rem">
					<p>期管云已接受公司委托，</p>
					<p>代为存证和管理激励计划</p>
				</div>
				<div class="dimissionfoot" style="margin-top: 4rem">
					<span style="background: #80C9CD;" @click="closeStimulate">我知道了</span>
					<span style="color: #80C9CD;" @click="four('激励计划')">查看激励计划</span>
				</div>
			</div>
		</div>
		<!--点击授予协议模态框-->
		<div class="mark" v-show="alertdeal">
			<div class="mark_content">
				<img class="close" src="../../../static/img/index/close.png" @click="closeDeal" />
				<div class="dimission" style="margin-top: 6rem">
					<p>期管云已联合法大大，</p>
					<p>代您提供授予协议电子签约</p>
				</div>
				<div class="dimissionfoot" style="margin-top: 4rem">
					<span style="background: #80C9CD;" @click="closeDeal">前往签约</span>
					<span style="color: #80C9CD;" @click="five('授予协议')">查看授予协议</span>
				</div>
			</div>
		</div>
		<!--分红模态框-->
		<div class="mark" v-show="alertDividend">
			<div class="mark_content">
				<img class="close" src="../../../static/img/index/close.png" @click="diviDend" />
				<p class="fenhong">分红</p>
				<div class="markmain">
					<p>依据公司的盈利状况，在分红期到来前，</p>
					<p>您已累计可获分红</p>
				</div>
				<p class="money">
					<span>{{shares.abonus}}</span> 元
				</p>
				<div class="dimissionfoot">
					<span style="background: #80C9CD;" @click="diviDend">我知道了</span>
					<span style="color: #80C9CD;">查看分红制度</span>
				</div>
			</div>
		</div>
		<!--打开回购模态框-->
		<div class="mark" v-show="alertDimission">
			<div class="mark_content">
				<img class="close" src="../../../static/img/index/close.png" @click="goLike(3)" />
				<p class="fenhong">回购</p>
				<div class="dimission">
					<p>先生/女士，</p>
					<p>依据公司的《激励计划》与您的《授予协议》，</p>
					<p>现在回购，您的所有已行权股数将被收回，</p>
					<p>并且公司会为您补偿现金<span style="color: #80C9CD">0</span>元</p>
				</div>
				<div class="dimissionfoot">
					<span style="background: #80C9CD;" @click="goLike(1)">回购</span>
					<span style="color: #80C9CD;" @click="goLike(3)">取消</span>
				</div>
			</div>
		</div>
		<!--点击回购模态框-->
		<div class="mark" v-show="clickDimission">
			<div class="mark_content">
				<img class="close" src="../../../static/img/index/close.png" @click="goLike(3)" />
				<p class="clickDimissionP">您真的确定要回购吗？</p>
				<div class="dimissionfoot" style="margin-top: 5rem">
					<span style="background: #80C9CD;" @click="goLike(2)">确定</span>
					<span style="color: #80C9CD;" @click="goLike(3)">取消</span>
				</div>
			</div>
		</div>
		<!--确认回购模态框-->
		<div class="mark" v-show="affirmDimission">
			<div class="mark_content">
				<img class="close" src="../../../static/img/index/close.png" @click="goLike(3)" />
				<div class="markmain" style="font-size: 1.125rem;line-height: 1.69rem;padding-top: 4.905rem;margin-bottom: 3rem">
					<p>公司已收到您的回购申请，</p>
					<p>将及时审核。</p>
					<p>感谢您为公司作出的贡献！</p>
				</div>
				<div class="base" @click="goLike(3)">
					我知道了
				</div>
			</div>
		</div>
		<!--比心手势模态框-->
		<div class="mark" v-show="alertAeart">
			<div class="mark_content">
				<img class="close" src="../../../static/img/index/close.png" @click="closeJudge" />
				<p class="fenhong" style="margin-bottom: 1.72rem">行权</p>
				<img class="gantan" src="../../../static/img/index/gantan.png" />
				<div class="dimission" style="margin-bottom: 1.2rem">
					<p>先生/女士，</p>
					<p>您当前还没有可行权股数，</p>
					<p>距离下次可行权还有<span style="color: #80C9CD">0</span>天。</p>
				</div>
				<!--<div class="base">-->
				<!--好的，我要去工作了-->
				<!--</div>-->
				<div class="dimissionfoot" style="margin-top: 0">
					<span style="background: #80C9CD;" @click="closeJudge">我知道了</span>
					<span style="color: #80C9CD;" @click="one('用户指南')">使用指引</span>
				</div>
			</div>
		</div>
		<!--打开行权-->
		<div class="mark" v-show="alertExercise">
			<img class="dongtu" src="../../../static/img/index/dong.gif" v-show="check" />
			<div class="mark_content" v-show="!check">
				<img class="close" src="../../../static/img/index/close.png" @click="exercise(2)" />
				<p class="fenhong">行权</p>
				<div class="dimission">
					<p>您当前累积可行权股数为0，</p>
					<p>行权价为0元/股</p>
				</div>
				<div class="exercisemain">
					<span>行权股数：</span>
					<input type="text" placeholder="请输入本次行权股数" v-model="rightNumber">
				</div>
				<div class="dimissionfoot">
					<span style="background: #80C9CD;letter-spacing: 0;" @click="exercise(0)">生成行权申请书</span>
					<span style="color: #80C9CD;">取消</span>
				</div>
			</div>
		</div>
		<!--生成行权申请书-->
		<div class="mark" v-show="generateExercise">
			<div class="mark_content" v-show="!check">
				<img class="close" src="../../../static/img/index/close.png" @click="exercise(2)" />
				<p class="fenhong">行权申请书</p>
				<div class="dimission">
					<p>本人，现有{{0}}股期权累积可行权，</p>
					<p>特向公司申请以{{0}}元/股的价格，</p>
					<p>对其中<span style="color: #80C9CD">0</span>股予以行权，行权价合计<span style="color: #80C9CD">0</span>元。
					</p>
					<p>请予批准。</p>
				</div>
				<div class="dimissionfoot">
					<span style="background: #80C9CD;" @click="exercise(1)">发送</span>
					<span style="color: #80C9CD;" @click="exercise(2)">取消</span>
				</div>
			</div>
		</div>
		<!--发送-->
		<div class="mark" v-show="sendExercise">
			<div class="mark_content" v-show="!check">
				<img class="close" src="../../../static/img/index/close.png" @click="exercise(2)" />
				<div class="markmain" style="font-size: 1.125rem;line-height: 1.69rem;padding-top: 4.905rem;margin-bottom: 5rem">
					<p>公司已收到您的行权申请，</p>
					<p>将及时审核，请耐心等待。</p>
				</div>
				<div class="base" style="letter-spacing: 2px;" @click="exercise(2)">
					我知道了
				</div>
			</div>
		</div>
		<!--注册-->
		<div class="mark" v-show="alertRegister">
			<div class="mark_content">
				<img class="close" src="../../../static/img/index/close.png" @click="notLogin" />
				<p class="fenhong">温馨提示：</p>
				<div class="markmain" style="font-size: 1.125rem;line-height: 1.69rem;padding-top: 0.905rem;margin-bottom: 3.5rem">
					<p>您需要首先注册，</p>
					<p>才可以继续使用“期管云”。</p>
				</div>
				<div class="base" style="letter-spacing: 2px;" @click="goLogin">
					好的，我现在就去注册
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import echarts from "echarts";
	import Swiper from 'swiper';
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import { Toast } from 'mint-ui';

	export default {
		props: {
			className: {
				type: String,
				default: "yourClassName"
			},
			id: {
				type: String,
				default: "yourID"
			},
			width: {
				type: String,
				default: "100%"
			},
			height: {
				type: String,
				default: "70%"
			}
		},
		name: "indexone",
		data() {
			return {
				alertRegister: false,
				shares: [],
				token: "",
				rightNumber: "", //行权的文本框
				alertDividend: false, //分红模态框
				alertDimission: false, //回购模态框
				clickDimission: false, //点击回购打开模态框
				affirmDimission: false, //确认回购模态框
				alertAeart: false, //比心手势
				alertExercise: false, //打开行权
				generateExercise: false, //生成行权申请书
				sendExercise: false, //发送
				numDay: "", //获取天数
				heartBol: true, //比心手势切换
				check: true, //心跳动图
				progressNum: 0,
				animationBol: false,
				bol: false,
				list: [],
				chart: null,
				imgBol: true,
				alertperformance: false, //打开绩效模态框
				alertsell: false, //打开出售模态框
				alertstimulate: false, //打开激励计划模态框
				alertdeal: false, //打开授予协议模态框
			}
		},
		mounted() {
			this.token = localStorage.token;
			if(!this.token) {
				this.shares.abonus = 0;
				this.shares.accumulativeAccruedBenefits = 0;
				this.shares.autumn = 0;
				this.shares.currentValuation = 0;
				this.shares.eachappraisement = 0;
				this.shares.earningsYesterday = 0;
				this.shares.exerciseEarnings = 0;
				this.shares.handReturn = 0;
				this.shares.immature = 0;
				this.shares.impowerSharesNum = 0;
				this.shares.maturity = 0;
				this.shares.monthEarnings = 0;
				this.shares.progreeBar = 0;
				this.shares.quit = 0;
				this.shares.userName = "";
			}
			// this.selectUserByID();
			// this.dayNum();
			this.initChart();
			var that = this;
			var mySwiper = new Swiper('.swiper-container', {
				direction: 'horizontal',
				slidesPerView: "1.15",
				centeredSlides: true,
				spaceBetween: 10,
				resistanceRatio: 0,
				initialSlide: 1,
				on: {
					slideChangeTransitionEnd: function() {
						if(this.activeIndex == 2) {
							var arr = [{
								value: 0,
								name: "已行权" + 0 + "股",
								itemStyle: {
									color: "#BFCE92"
								},
								label: {
									color: "#BFCE92",
								},
								labelLine: {
									color: "#BFCE92",
									lineStyle: {
										color: '#BFCE92'
									},
								}
							}, {
								value: 0,
								name: "待行权" + 0 + "股",
								itemStyle: {
									color: "#ED9D79"
								},
								label: {
									color: "#ED9D79",
								},
								labelLine: {
									color: "#ED9D79",
									lineStyle: {
										color: '#ED9D79'
									},
								}
							}, {
								value: 0,
								name: "本期成熟" + 0 + "股",
								itemStyle: {
									color: "#E9D0A1"
								},
								label: {
									color: "#E9D0A1",
								},
								labelLine: {
									color: "#E9D0A1",
								}
							}, {
								value: 0,
								name: "未成熟" + 0 + "股",
								itemStyle: {
									color: "#FFFFFF"
								},
								label: {
									color: "#FFFFFF",
								},
								labelLine: {
									color: "#FFFFFF",
									lineStyle: {
										color: '#FFFFFF'
									},
								}
							}]
							that.list = arr;
							that.initChart(that.list);
							that.progressNum = 0;
							// that.go();
						} else {
							that.list = [];
							that.initChart(that.list);
						}
					}
				}
			})
		},
		methods: {
			initChart(list) {
				this.chart = echarts.init(this.$refs.myEchart);
				// 把配置和数据放这里
				this.chart.setOption({
					series: [{
						//name: "访问来源",
						silent: true,
						animation: true,
						hoverAnimation: false,
						avoidLabelOverlap: false,
						legendHoverLink: false,
						selectedMode: false,
						type: "pie",
						// radius: ["75%", "85%"],
						radius: ["45%", "55%"],
						center: ["45%", "52%"],
						data: list
					}]
				});
			},

			//获取天数接口
			// dayNum() {
			//   this.$http.post("/dayNum", {
			//     data: {},
			//     version: "2.0"
			//   }, {
			//     headers: {
			//       Authorization: "Bearer " + this.token
			//     }
			//   }).then(res => {
			//     this.numDay = res.data.result
			//   })
			// },
			//使用指引
			one(a) {
				this.$router.push({
					path: "/one",
					query: {
						imgText: a
					}
				})
			},
			//获授股数
			acquire() {
				if(!localStorage.token) {
					this.alertRegister = true;
					return
				}
			},
			//成熟期
			adultness() {
				if(!localStorage.token) {
					this.alertRegister = true;
					return
				}
			},
			//打开绩效模态框
			performance() {
				if(!localStorage.token) {
					this.alertRegister = true;
					return
				}
				this.alertperformance = true;
			},
			//关闭绩效
			closePerformance() {
				this.alertperformance = false;
			},
			//绩效
			two(a) {
				this.$router.push({
					path: "/two",
					query: {
						imgText: a
					}
				})
			},
			//打开出售模态框
			sell() {
				if(!localStorage.token) {
					this.alertRegister = true;
					return
				}
				this.alertsell = true;
			},
			//关闭出售
			closeSell() {
				this.alertsell = false;
			},
			//出售
			three(a) {
				this.$router.push({
					path: "/three",
					query: {
						imgText: a
					}
				})
			},
			//打开激励计划模态框
			stimulate() {
				if(!localStorage.token) {
					this.alertRegister = true;
					return
				}
				this.alertstimulate = true;
			},
			//关闭激励计划
			closeStimulate() {
				this.alertstimulate = false;
			},
			//激励计划
			four(a) {
				this.$router.push({
					path: "/four",
					query: {
						imgText: a
					}
				})
			},
			//打开授予协议模态框
			deal() {
				if(!localStorage.token) {
					this.alertRegister = true;
					return
				}
				this.alertdeal = true;
			},
			//关闭授予协议
			closeDeal() {
				this.alertdeal = false;
			},
			//授予协议
			five(a) {
				this.$router.push({
					path: "/five",
					query: {
						imgText: a
					}
				})
			},
			//首页数据
			// selectUserByID() {
			//   this.$http.post("/selectUserByID", {
			//     data: {},
			//     version: "2.0"
			//   }, {
			//     headers: {
			//       Authorization: "Bearer " + this.token
			//     }
			//   }).then(res => {
			//     console.log(res)
			//     if (res.data.code == "0000") {
			//       this.shares = res.data.result;
			//     }
			//     if (res.data.result.accumulativeAccruedBenefits > 0) {
			//       this.heartBol = false;
			//     } else {
			//       this.heartBol = true;
			//     }
			//   })
			// },
			//免费激活
			activate() {
				this.$router.push({
					path: "/activate"
				})
			},
			//分红模态框
			dividend() {
				if(!localStorage.token) {
					this.alertRegister = true;
					return
				}
				this.alertDividend = true
			},
			//关闭分红
			diviDend() {
				this.alertDividend = false
			},
			//回购模态框一连串
			goLike(demo) {
				switch(demo) {
					case 0:
						if(!localStorage.token) {
							this.alertRegister = true;
							return
						}
						this.alertDimission = true;
						this.clickDimission = false;
						this.affirmDimission = false;
						break;
					case 1:
						this.alertDimission = false;
						this.clickDimission = true;
						this.affirmDimission = false;
						break;
					case 2:
						this.alertDimission = false;
						this.clickDimission = false;
						this.affirmDimission = true;
						break;
					case 3:
						this.alertDimission = false;
						this.clickDimission = false;
						this.affirmDimission = false;
						break;
				}
			},
			//跳转配置文件
			goFile() {
				this.$router.push({
					path: "/file"
				})
			},
			//未登录关闭
			notLogin() {
				this.alertRegister = false;
			},
			goLogin() {
				this.$router.push({
					path: "/"
				})
			},
			//行权判断
			judge() {
				if(!localStorage.token) {
					this.alertRegister = true;
					return
				}
				let that = this;
				if(that.shares.accumulativeAccruedBenefits > 0) {
					that.check = true;
					setTimeout(() => {
						that.check = false;
					}, 1240);
					that.alertExercise = true;
					that.generateExercise = false;
					that.sendExercise = false;
				} else {
					that.alertAeart = true
				}
			},
			//关闭比心
			closeJudge() {
				this.alertAeart = false
			},
			//行权
			exercise(demo) {
				switch(demo) {
					case 0:
						var regNum = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
						if(!regNum.test(this.rightNumber)) {
							Toast('行权股数只可输入整数或小数！');
							return
						}
						if(this.rightNumber == "") {
							Toast('请填写行权股数！');
							return
						}
						if(this.rightNumber > this.shares.accumulativeAccruedBenefits) {
							Toast('您没有那么多可行权股数！');
							return
						}
						this.alertExercise = false;
						this.generateExercise = true;
						this.sendExercise = false;
						break;
					case 1:
						this.$http.post("/insertRightRecord", {
							data: {
								rightNumber: this.rightNumber
							},
							version: "2.0"
						}, {
							headers: {
								Authorization: "Bearer " + this.token
							}
						}).then(res => {
							this.alertExercise = false;
							this.generateExercise = false;
							this.sendExercise = true;
						})
						break;
					case 2:
						this.alertExercise = false;
						this.generateExercise = false;
						this.sendExercise = false;
						this.rightNumber = "";
						// this.check = true;
						this.selectUserByID()
						break;
				}
			}
		},
		computed: {
			// multiplication() {
			//   var zong = 0;
			//   zong += this.rightNumber * 10000 * this.shares.eachappraisement / 10000;
			//   return zong
			// }
		}
	}
</script>

<style scoped lang="less">
	@import "../../assets/css/index_header.less";
</style>