<template>
	<div class="box">
		<div class="header_user">
			<div class="header_user_left">
				<img v-if="userHeadPortrait" src="../../../static/img/index/index_user.png" />
				<img style="border-radius: 50%;" v-else="!userHeadPortrait" :src="shares.headPortrait" />
				<div>
					<span style="width: 4.8rem;">{{shares.userName}}</span>
					<span style="width: 11rem;">{{shares.companyName}}</span>
				</div>
			</div>
			<div class="header_user_right">
				<img @click="toRouter" src="../../../static/img/index/weidu.png" />
				<img @click="alertmarkD" src="../../../static/img/index/feed.png" />
				<img @click="loginOut(0)" src="../../../static/img/index/index_logon.png" />
				<span>{{weidu}}</span>
			</div>
		</div>
		
		<!--轮播-->
		<div class="banner">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<div class="swiperLift">
							<div @click="openMark('ItReturns')" class="top">
								<span>已到手收益（元）</span>
								<span>￥{{shares.handReturn|NumFormat}}</span>
							</div>
							<div class="bottom">
								<div @click="openMark('accumulatedIncome')" class="bottomlift">
									<span>本期累计收益</span>
									<span>￥{{shares.periodEarnings|NumFormat}}</span>
								</div>
								<div class="bottomcenter">

								</div>
								<div @click="openMark('EarningsYesterday')" class="bottomright">
									<span>昨日新增收益</span>
									<span>￥{{shares.earningsYesterday|NumFormat}}</span>
								</div>
							</div>
						</div>
					</div>
					<div class="swiper-slide">
						<div class="swiperCenter">
							<div @click="openMark('LineHasTheRightTo')" class="top">
								<span>已行归属数</span>
								<span>{{shares.remainingAuthorizedShares}}</span>
							</div>
							<div class="bottom">
								<div @click="openMark('matureBol')" class="bottomlift">
									<span>已成熟股数<a href="JavaScript:;">(本期)</a></span>
									<span>{{shares.periodMaturity}}</span>
								</div>
								<div class="bottomcenter">

								</div>
								<div @click="openMark('toExercise')" class="bottomright">
									<span>待行权股数<a href="JavaScript:;">(累积)</a></span>
									<span>{{shares.accruedBenefits}}</span>
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
							<div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart"></div>
							<div class="swiperRight_bottom">
								<progress class="progr" :max="shares.progressBar" :value="shares.periodMaturity"></progress>
								<div>
									{{shares.periodMaturity}} / {{shares.progressBar}}（本期）
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--概览-->
		<div class="main">
			<div @click="openMark('overviewBol')" class="left">
				<img src="../../../static/img/index/gailan.png" />
				<div>
					<span>概览</span>
					<span>Overview</span>
				</div>
			</div>
			<div class="right">
				<div class="righttop">
					<div @click="awarded" class="mainone">
						<span>{{shares.impowerSharesNum}}股</span>
						<div style="background: #7fc3c6;" >
							获授总数
							<!--<img src="../../../static/img/index/gushu.png" />-->
						</div>
					</div>
					<div @click="ripe" class="mainone">
						<span>{{shares.autumn}}个月</span>
						<div style="background: #e59b7b;" >
							成熟期
							<!--<img src="../../../static/img/index/chengshu.png" />-->
						</div>
					</div>
				</div>
				<div class="righttop" style="margin-top: 0.531rem">
					<div @click="openMark('Currentjvalue')" class="mainone">
						<span>{{shares.currentValuationPer}}元/股</span>
						<div style="background: #e5cca1;">
							当前价值
							<!--<img src="../../../static/img/index/jiazhi.png" />-->
						</div>
					</div>
					<div @click="openMark('exercisePrice')" class="mainone">
						<span>{{shares.eachAppraisement}}元/股</span>
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
			<div @click="openMark('realization')" class="left">
				<img src="../../../static/img/index/bianxian.png" />
				<div>
					<span>变现</span>
					<span>Liquidity</span>
				</div>
			</div>
			<div class="right">
				<div class="righttop">
					<div class="mainone" @click="performance">
						<img style="width: 1.031rem;height: 1.625rem;" src="../../../static/img/index/jixiao.png" />
						<span>绩效</span>
					</div>
					<div class="mainone" @click="dividend">
						<img style="width: 1.438rem;height: 1.469rem;" src="../../../static/img/index/fenhong.png" />
						<span>分红</span>
					</div>
				</div>
				<div class="righttop" style="margin-top: 0.563rem">
					<div class="mainone" @click="changeAlertsell(3)">
						<img style="width: 1.156rem;height: 1.469rem;" src="../../../static/img/index/chushou.png" />
						<span>转让</span>
					</div>
					<div class="mainone" @click="withdrawal(3)">
						<img style="width: 1.438rem;height: 1.125rem;" src="../../../static/img/index/tuigu.png" />
						<span>回购</span>
					</div>
				</div>
			</div>
		</div>
		<!--存证-->
		<div class="inventories">
			<div @click="changecertificate" class="left">
				<img src="../../../static/img/index/cunzheng.png" />
				<div>
					<span>存证</span>
					<span>Escrow</span>
				</div>
			</div>
			<div class="right">
				<div class="rightmain" @click="stimulate">
					<span>激励计划</span>
					<img style="width: 4.156rem;height: 2.5rem;" src="../../../static/img/index/jili.png" />
				</div>
				<div class="rightmain" @click="deal">
					<span>授予协议</span>
					<img style="width: 4.156rem;height: 2.5rem;" src="../../../static/img/index/xieyi.png" />
				</div>
			</div>
		</div>
		<!--使用指引-->
		<div class="employ">
			<div class="employmain" @click="file">
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
				<p class="fenhong">绩效</p>
				<img class="close" src="../../../static/img/index/close.png" @click="closePerformance" />
				<div class="dimission" style="margin-top: 3rem">
					<p>{{shares.userName}}先生/女士，</p>
					<p>您当前的绩效考核为：</p>
					<p>{{shares.achievements}}</p>
				</div>
				<div class="dimissionfoot" style="margin-top: 2.5rem">
					<span style="background: #80C9CD;" @click="closePerformance">我知道了</span>
					<span style="color: #80C9CD;" @click="two('绩效')">查看绩效制度</span>
				</div>
			</div>
		</div>
		<!--点击出售模态框-->
		<!--<div class="mark" v-show="alertsell">
			<div class="mark_content">
				<p class="fenhong">出售</p>
				<img class="close" src="../../../static/img/index/close.png" @click="closeSell" />
				<div class="dimission" style="margin-top: 3rem">
					<p>{{shares.userName}}先生/女士，</p>
					<p>您的所属公司：</p>
					<p>{{shares.sell}}</p>
				</div>
				<div class="dimissionfoot" style="margin-top: 2.5rem">
					<span style="background: #80C9CD;" @click="closeSell">我知道了</span>
					<span style="color: #80C9CD;" @click="three('出售')">查看出售制度</span>
				</div>
			</div>
		</div>-->
		
		<div class="mark" @touchmove.prevent  v-show="alertsell">
			<div class="mark_content">
				<img class="close" src="../../../static/img/index/close.png" @click="changeAlertsell(2)" />
				<p class="fenhong" style="margin-bottom: 2rem;">转让</p>
				<div class="dimission">
					<p>您当前已行权股数为{{shares.remainingAuthorizedShares}}</p>
					<p>可在此范围内申请转让，</p>
					<div class="exercisemain">
						<span>转让股数：</span>
						<input @blur="floatBlur" type="text" placeholder="请输入转让股数" v-model="floatSell">
					</div>
				</div>
				<div class="dimissionfoot" style="margin-top: 1.7rem;">
					<span style="background: #80C9CD;" @click="changeAlertsell(0)">生成转让申请书</span>
					<span style="color: #80C9CD;" @click="changeAlertsell(2)">取消</span>
				</div>
			</div>
		</div>
		<!--点击转让模态框-->
		<div class="mark"  @touchmove.prevent v-show="alertsell2">
			<div class="mark_content">
				<img class="close" src="../../../static/img/index/close.png" @click="changeAlertsell(2)" />
				<p class="fenhong" style="margin-bottom: 2rem;">转让</p>
				<div class="dimission">
					<p>本人{{shares.userName}}，已行权股数为：{{shares.remainingAuthorizedShares}}</p>
					<p>特向公司申请转让{{floatSell}}股，</p>
					<p>请予批准</p>
				</div>
				<div class="dimissionfoot" style="margin-top: 3.4rem">
					<span style="background: #80C9CD;" @click="changeAlertsell(1)">发送</span>
					<span style="color: #80C9CD;" @click="changeAlertsell(2)">取消</span>
				</div>
			</div>
		</div>
		<!--确认转让模态框-->
		<div class="mark"  @touchmove.prevent v-show="alertsell3">
			<div class="mark_content">
				<img class="close" src="../../../static/img/index/close.png" @click="changeAlertsell(2)" />
				<p class="fenhong" style="margin-bottom: 2rem;">转让</p>
				<div class="markmain" style="font-size: 1.125rem;line-height: 1.69rem;padding-top: 1.905rem;margin-bottom: 3rem">
					<p>公司已收到您的转让申请，</p>
					<p>将及时审核。</p>
				</div>
				<div class="base" @click="changeAlertsell(2)">
					我知道了
				</div>
			</div>
		</div>
		
		<!--点击激励计划模态框-->
		<div class="mark" v-show="alertstimulate">
			<div class="mark_content">
				<p class="fenhong">激励计划</p>
				<img class="close" src="../../../static/img/index/close.png" @click="closeStimulate" />
				<div class="dimission" style="margin-top: 3rem">
					<p>《激励计划》是公司实施股权激励的基本文件。</p>
					<p>期管云已接受公司委托，</p>
					<p>代为存证和管理激励计划。</p>
				</div>
				<div class="dimissionfoot" style="margin-top: 2.6rem">
					<span style="background: #80C9CD;" @click="closeStimulate">我知道了</span>
					<span style="color: #80C9CD;" @click="four('激励计划')">查看激励计划</span>
				</div>
			</div>
		</div>
		<!--点击授予协议模态框-->
		<div class="mark" v-show="alertdeal">
			<div class="mark_content">
				<p class="fenhong">授予协议</p>
				<img class="close" src="../../../static/img/index/close.png" @click="closeDeal" />
				<div class="dimission" style="margin-top: 3rem">
					<p>如您需要在线签署《授予协议》，</p>
					<p>请点击“前往签约”；</p>
					<p>如您已签署，可“查看授予协议”。</p>
				</div>
				<div class="dimissionfoot" style="margin-top: 2.6rem">
					<span style="background: #80C9CD;" @click="fddExtsign">前往签约</span>
					<span style="color: #80C9CD;" @click="fddQuerySignStatus('授予协议')">查看授予协议</span>
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
					<span>{{shares.actualAbonus}}</span> 元
				</p>
				<div class="dimissionfoot">
					<span style="background: #80C9CD;" @click="diviDend">我知道了</span>
					<span style="color: #80C9CD;" @click="six('分红')">查看分红制度</span>
				</div>
			</div>
		</div>
		<!--打开回购模态框-->
		<div class="mark"  @touchmove.prevent v-show="alertDimission">
			<div class="mark_content">
				<img class="close" src="../../../static/img/index/close.png" @click="withdrawal(2)" />
				<p class="fenhong" style="margin-bottom: 2rem;">回购</p>
				<div class="dimission">
					<p>您当前已行权股数为{{shares.remainingAuthorizedShares}}</p>
					<p>可在此范围内申请回购，</p>
					<div class="exercisemain">
						<span>退还股数：</span>
						<input @blur="floatBlur" type="text" placeholder="请输入退还股数" v-model="float">
					</div>
				</div>
				<div class="dimissionfoot" style="margin-top: 1.7rem;">
					<span style="background: #80C9CD;" @click="withdrawal(0)">生成回购申请书</span>
					<span style="color: #80C9CD;" @click="withdrawal(2)">取消</span>
				</div>
			</div>
		</div>
		<!--点击回购模态框-->
		<div class="mark"  @touchmove.prevent v-show="clickDimission">
			<div class="mark_content">
				<img class="close" src="../../../static/img/index/close.png" @click="withdrawal(2)" />
				<p class="fenhong" style="margin-bottom: 2rem;">回购</p>
				<div class="dimission">
					<p>本人{{shares.userName}}，已行权股数为：{{shares.remainingAuthorizedShares}}</p>
					<p>特向公司申请退还{{float}}股，</p>
					<p>请予批准</p>
				</div>
				<div class="dimissionfoot" style="margin-top: 3.4rem">
					<span style="background: #80C9CD;" @click="withdrawal(1)">发送</span>
					<span style="color: #80C9CD;" @click="withdrawal(2)">取消</span>
				</div>
			</div>
		</div>
		<!--确认回购模态框-->
		<div class="mark"  @touchmove.prevent v-show="affirmDimission">
			<div class="mark_content">
				<img class="close" src="../../../static/img/index/close.png" @click="withdrawal(2)" />
				<p class="fenhong" style="margin-bottom: 2rem;">回购</p>
				<div class="markmain" style="font-size: 1.125rem;line-height: 1.69rem;padding-top: 1.905rem;margin-bottom: 3rem">
					<p>公司已收到您的回购申请，</p>
					<p>将及时审核。</p>
				</div>
				<div class="base" @click="withdrawal(2)">
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
					<p>{{shares.userName}}先生/女士，</p>
					<p>您当前还没有可行权股数，</p>
					<p>距离下次可行权还有<span style="color: #80C9CD">{{numDay}}</span>天。</p>
				</div>
				<div class="dimissionfoot" style="margin-top: 0">
					<span style="background: #80C9CD;" @click="closeJudge">我知道了</span>
					<span style="color: #80C9CD;" @click="one('使用指南')">使用指引</span>
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
					<p>您当前累积可行权股数为{{shares.accruedBenefits}}，</p>
					<p>行权价为{{shares.eachAppraisement}}元/股</p>
				</div>
				<div class="exercisemain">
					<span>行权股数：</span>
					<input type="text" placeholder="请输入本次行权股数" v-model="rightNumber">
				</div>
				<div class="dimissionfoot">
					<span style="background: #80C9CD;letter-spacing: 0;" @click="exercise(0)">生成行权申请书</span>
					<span style="color: #80C9CD;" @click="exercise(2)">取消</span>
				</div>
			</div>
		</div>
		<!--生成行权申请书-->
		<div class="mark" v-show="generateExercise">
			<div class="mark_content" v-show="!check">
				<img class="close" src="../../../static/img/index/close.png" @click="exercise(2)" />
				<p class="fenhong">行权申请书</p>
				<div class="dimission">
					<p>本人{{shares.userName}}，现有{{shares.accruedBenefits}}股期权累积可行权，</p>
					<p>特向公司申请以{{shares.eachAppraisement}}元/股的价格，</p>
					<p>对其中<span style="color: #80C9CD">{{rightNumber}}</span>股予以行权，行权价合计<span style="color: #80C9CD">{{multiplication}}</span>元。
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
		<!--点击获授总数模态框-->
		<!--<div class="mark" v-show="alertAwarded">
			<div class="mark_content">
				<p class="fenhong">获授总数</p>
				<img class="close" src="../../../static/img/index/close.png" @click="closeAwarded" />
				<div class="dimission" style="margin:3rem 0 4rem 0;">
					<p>获授比例：{{shares.awardRatio}}%</p>
					<p>授予日：{{shares.stockStartTime}}</p>
				</div>
				<div class="base" style="letter-spacing: 2px;" @click="closeAwarded">
					我知道了
				</div>
			</div>
		</div>-->
		<!--点击成熟期模态框-->
		<!--<div class="mark" v-show="alertRipe">
			<div class="mark_content">
				<p class="fenhong">成熟期</p>
				<img class="close" src="../../../static/img/index/close.png" @click="closeRipe" />
				<div class="dimission" style="margin-top:1rem;">
					<p>首次等待期：{{shares.firstWaitingPeriod}}</p>
					<p>首次成熟股数：{{shares.firstMaturity}}</p>
					<p>后续成熟周期：每{{shares.subsequentMaturityCycle}}个月</p>
					<p>后续成熟周期数：{{shares.subsequentMaturityCycleNum}}个</p>
				</div>
				<div class="base" style="letter-spacing: 2px;margin-top:1.7rem;" @click="closeRipe">
					我知道了
				</div>
			</div>
		</div>-->
		<!--1.点击待行权股数-->
		<div class="mark" v-show="toExercise">
			<div class="mark_content">
				<p class="fenhong">待行权股数</p>
				<img class="close" src="../../../static/img/index/close.png" @click="closeMark('toExercise')" />
				<div class="dimission" style="margin-top:1rem;">
					<div class="bianxianLebars">
						<span>申请中的行权股数：</span>
						<span>{{modelMsg.applicationExercise}}</span>
					</div>
					<div class="bianxianLebars">
						<span>累计申请行权股数：</span>
						<span>{{modelMsg.applyExercise}}</span>
					</div>
					<div class="bianxianLebars">
						<span>累计批准行权股数：</span>
						<span>{{modelMsg.approvalExercise}}</span>
					</div>
				</div>
				<div class="base" style="letter-spacing: 2px;margin-top:1.7rem;" @click="closeMark('toExercise')">
					我知道了
				</div>
			</div>
		</div>
		<!--2,点击概览-->
		<div class="mark" v-show="overviewBol">
			<div class="mark_content">
				<p class="fenhong">概览</p>
				<img class="close" src="../../../static/img/index/close.png" @click="closeMark('overviewBol')" />
				<div class="dimission" style="margin-top:1rem;">
					<div class="lebars">
						<span>获授总数：</span>
						<span>{{shares.totalAwarded}}</span>
					</div>
					<div class="lebars">
						<span>总成熟期：</span>
						<span>{{shares.autumn}}</span>
					</div>
					<div class="lebars">
						<span>当前价值：</span>
						<span>{{shares.currentValuationPer}}</span>
					</div>
					<div class="lebars">
						<span>行权价：</span>
						<span>{{shares.eachAppraisement}}</span>
					</div>
				</div>
				<div class="base" style="letter-spacing: 2px;margin-top:1.7rem;" @click="closeMark('overviewBol')">
					我知道了
				</div>
			</div>
		</div>
		<!--3,打开获授总数模态框-->
		<div class="mark" v-show="alertAwarded">
			<div class="mark_content">
				<p class="fenhong">获授总数</p>
				<img class="close" src="../../../static/img/index/close.png" @click="closeMark('alertAwarded')" />
				<div class="dimission" style="margin:3rem 0 4rem 0;">
					<div class="lebars">
						<span>获授股数：</span>
						<span>{{shares.impowerSharesNum}}</span>
					</div>
					<div class="lebars">
						<span>追授股数：</span>
						<span>{{shares.numSharesAwarded}}</span>
					</div>
					<div class="lebars">
						<span>获授比例：</span>
						<span>{{shares.awardRatio}}%</span>
					</div>
					<div class="lebars">
						<span>授予日：</span>
						<span>{{shares.stockStartTime}}</span>
					</div>
				</div>
				<div class="base" style="letter-spacing: 2px;" @click="closeMark('alertAwarded')">
					我知道了
				</div>
			</div>
		</div>
		<!--4,打开成熟期模态框-->
		<div class="mark" v-show="alertRipe">
			<div class="mark_content">
				<p class="fenhong">成熟期</p>
				<img class="close" src="../../../static/img/index/close.png" @click="closeMark('alertRipe')" />
				<div class="dimission" style="margin:3rem 0 4rem 0;">
					<div class="lebars">
						<span>首次等待期：</span>
						<span>{{shares.firstWaitingPeriod}}</span>
					</div>
					<div class="lebars">
						<span>首次成熟股数：</span>
						<span>{{shares.firstMaturity}}</span>
					</div>
					<div class="lebars">
						<span>后续成熟周期：</span>
						<span>每{{shares.subsequentMaturityCycle}}个月</span>
					</div>
					<div class="lebars">
						<span>后续成熟周期数：</span>
						<span>{{shares.subsequentMaturityCycleNum}}个</span>
					</div>
				</div>
				<div class="base" style="letter-spacing: 2px;" @click="closeMark('alertRipe')">
					我知道了
				</div>
			</div>
		</div>
		<!--5.点击当前价值-->
		<div class="mark" v-show="Currentjvalue">
			<div class="mark_content">
				<p class="fenhong">当前价值</p>
				<img class="close" src="../../../static/img/index/close.png" @click="closeMark('Currentjvalue')" />
				<div class="dimission" style="margin:3rem 0 4rem 0;">
					<div class="lebars">
						<span>当前价值：</span>
						<span>{{shares.currentValuationPer}}</span>
					</div>
					<div class="lebars">
						<span>更新日期：</span>
						<span>{{shares.companyUpdateTime}}</span>
					</div>
				</div>
				<div class="base" style="letter-spacing: 2px;" @click="closeMark('Currentjvalue')">
					我知道了
				</div>
			</div>
		</div>
		<!--6.点击行权价-->
		<div class="mark" v-show="exercisePrice">
			<div class="mark_content">
				<p class="fenhong">行权价</p>
				<img class="close" src="../../../static/img/index/close.png" @click="closeMark('exercisePrice')" />
				<div class="dimission" style="margin:3rem 0 4rem 0;">
					<div class="lebars">
						<span>行权价：</span>
						<span>{{shares.eachAppraisement}}</span>
					</div>
					<div class="lebars">
						<span>首次可行权日：</span>
						<span>{{shares.firstRightDate}}</span>
					</div>
				</div>
				<div class="base" style="letter-spacing: 2px;" @click="closeMark('exercisePrice')">
					我知道了
				</div>
			</div>
		</div>
		<!--7.点击已成熟股数-->
		<div class="mark" v-show="matureBol">
			<div class="mark_content">
				<p class="fenhong">已成熟股数</p>
				<img class="close" src="../../../static/img/index/close.png" @click="closeMark('matureBol')" />
				<div class="dimission" style="margin:3rem 0 4rem 0;">
					<div>想要查看本期成熟进度，</div>
					<div>请将轮播向左滑动。</div>
				</div>
				<div class="base" style="letter-spacing: 2px;" @click="closeMark('matureBol')">
					我知道了
				</div>
			</div>
		</div>
		<!--9.点击变现-->
		<div class="mark" v-show="realization">
			<div class="mark_content">
				<p class="fenhong">变现</p>
				<img class="close" src="../../../static/img/index/close.png" @click="closeMark('realization')" />
				<div class="dimission" style="margin:3rem 0 4rem 0;">
					<div class="bianxianLebars">
						<span>申请中的转让股数：</span>
						<span>{{modelMsg.applicationTransfer}}</span>
					</div>
					<div class="bianxianLebars">
						<span>累计批准转让股数：</span>
						<span>{{modelMsg.approvalTransfer}}</span>
					</div>
					<div class="bianxianLebars">
						<span>申请中的退还股数：</span>
						<span>{{modelMsg.applicationReturn}}</span>
					</div>
					<div class="bianxianLebars">
						<span>累计批准退还股数：</span>
						<span>{{modelMsg.approvalReturn}}</span>
					</div>
					<!--<p>申请中的转让股数：{{modelMsg.applicationTransfer}}</p>
					<p>累计批准转让股数：{{modelMsg.approvalTransfer}}</p>
					<p>申请中的退还股数：{{modelMsg.applicationReturn}}</p>
					<p>累计批准退还股数：{{modelMsg.approvalReturn}}</p>-->
				</div>
				<div class="base" style="letter-spacing: 2px;" @click="closeMark('realization')">
					我知道了
				</div>
			</div>
		</div>
		<!--11.点击昨日新增收益-->
		<div class="mark" v-show="EarningsYesterday">
			<div class="mark_content">
				<p class="fenhong">昨日新增收益</p>
				<img class="close" src="../../../static/img/index/close.png" @click="closeMark('EarningsYesterday')" />
				<div class="dimission" style="margin:3rem 0 4rem 0;">
					<p>昨日新增收益 =</p>
					<p>成熟中的股数（昨日）*当前价值（每股）</p>
				</div>
				<div class="base" style="letter-spacing: 2px;" @click="closeMark('EarningsYesterday')">
					我知道了
				</div>
			</div>
		</div>
		<!--12.点击本期累积收益-->
		<div class="mark" v-show="accumulatedIncome">
			<div class="mark_content">
				<p class="fenhong">本期累积收益</p>
				<img class="close" src="../../../static/img/index/close.png" @click="closeMark('accumulatedIncome')" />
				<div class="dimission" style="margin:3rem 0 4rem 0;">
					<p>本期累积收益 =</p>
					<p>本期成熟股数*当前价值（每股）</p>
				</div>
				<div class="base" style="letter-spacing: 2px;" @click="closeMark('accumulatedIncome')">
					我知道了
				</div>
			</div>
		</div>
		<!--13.点击已到手收益-->
		<div class="mark" v-show="ItReturns">
			<div class="mark_content">
				<p class="fenhong">已到手收益</p>
				<img class="close" src="../../../static/img/index/close.png" @click="closeMark('ItReturns')" />
				<div class="dimission" style="margin:3rem 0 4rem 0;">
					<p>已到手收益 =</p>
					<p>已行权股数*当前价值（每股）</p>
				</div>
				<div class="base" style="letter-spacing: 2px;" @click="closeMark('ItReturns')">
					我知道了
				</div>
			</div>
		</div>
		<!--14.点击已行权股数-->
		<div class="mark" v-show="LineHasTheRightTo">
			<div class="mark_content">
				<p class="fenhong">已行权股数</p>
				<img class="close" src="../../../static/img/index/close.png" @click="closeMark('LineHasTheRightTo')" />
				<div class="dimission" style="margin:3rem 0 4rem 0;">
					<div class="bianxianLebars">
						<span>累积已批准股数：</span>
						<span>{{shares.approvalNum}}</span>
					</div>
					<div class="bianxianLebars">
						<span>累积已转让股数：</span>
						<span>{{shares.transferableShares}}</span>
					</div>
					<div class="bianxianLebars">
						<span>累积已退还股数：</span>
						<span>{{shares.numReturnedShares}}</span>
					</div>
					<div class="bianxianLebars">
						<span>调整退转股数：</span>
						<span>{{shares.adjustedNumReturnedShares}}</span>
					</div>
				</div>
				<div class="base" style="letter-spacing: 2px;" @click="closeMark('LineHasTheRightTo')">
					我知道了
				</div>
			</div>
		</div>
		
		<div v-if="certificateBol" @click="certificateBol = false" class="certificate">
			<div>
				<img src="../../../static/img/index/certificate.jpg"/>
				<span>{{shares.userPhone}}</span>
				<span>{{shares.userName}}</span>
				<span>{{shares.companyName}}</span>
				<!--<span>你不信你就数数这是十四个汉字</span>-->
				<span>{{shares.totalAwarded}}</span>
				<span>{{shares.stockStartTime}}</span>
			</div>
			
		</div>
		
		<div class="mark" v-show="quitRegister">
	      	<div class="mark_content">
	        	<img class="close" src="../../../static/img/index/close.png" @click="loginOut(2)"/>
	        	<p class="clickDimissionP">您确定要退出吗？</p>
	        	<div class="dimissionfoot" style="margin-top: 5rem">
	          		<span style="background: #80C9CD;" @click="loginOut(1)">确定</span>
	          		<span style="color: #80C9CD;" @click="loginOut(2)">取消</span>
	        	</div>
	      	</div>
	   </div>
	</div>
</template>

<script>
	import echarts from "echarts";
	import Swiper from 'swiper';
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import { Toast, Indicator } from 'mint-ui';

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
		name: "index",
		data() {
			return {
				weidu:0,
				quitRegister:false,
				floatSell:"",
				hrefUrl: "", //合同模板url
				redirectionUrl: "", //查看合同url
				shares: [],
				token: "",
				rightNumber: "", //行权的文本框
				float: "", //回购的文本框
				alertDividend: false, //分红模态框
				alertDimission: false, //回购模态框
				clickDimission: false, //点击回购打开模态框
				affirmDimission: false, //确认回购模态框
				alertAeart: false, //比心手势
				alertExercise: false, //打开行权
				generateExercise: false, //生成行权申请书
				sendExercise: false, //发送
				alertAwarded: false, //获授总数
				alertRipe: false, //成熟期
				numDay: "", //获取天数
				heartBol: true, //比心手势切换
				check: true, //心跳动图
				certificateBol:false,
				progressNum: 0,
				animationBol: false,
				bol: false,
				list: [],
				chart: null,
				imgBol: true,
				alertperformance: false, //打开绩效模态框
				alertsell: false, //打开出售模态框
				alertsell2: false, //打开出售模态框
				alertsell3: false, //打开出售模态框
				alertstimulate: false, //打开激励计划模态框
				alertdeal: false, //打开授予协议模态框
				
				toExercise:false,//待行权模态框
				overviewBol:false,//概览模态框
				Currentjvalue:false,//当前价值模态框
				exercisePrice:false,//行权价模态框
				matureBol:false,//已成熟股数模态框
				realization:false,//变现模态框
				EarningsYesterday:false,//昨日新增收益模态框
				accumulatedIncome:false,//本期累积收益-模态框
				ItReturns:false,//到手收益模态框
				LineHasTheRightTo:false,//已行权股数模态框
				userHeadPortrait:false,
				modelMsg:{},
				userName:""
			}
		},
		mounted() {
			this.token = localStorage.token;
			this.getWei()
			this.selectUserByID();
			this.selectCalculationExercise();
			this.dayNum();
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
								value: that.shares.remainingAuthorizedShares,
								name: "已行权" + that.shares.remainingAuthorizedShares + "股",
								itemStyle: {
									color: "#BFCE92"
								},
								label: {
									color: "#BFCE92",
									show: function() {
										if(that.shares.remainingAuthorizedShares == 0 && that.shares.accruedBenefits == 0 && that.shares.periodMaturity == 0 && that.shares.immature == 0) {
											return true;
										}
										if(that.shares.remainingAuthorizedShares == 0) {
											return false;
										}
										if(that.shares.remainingAuthorizedShares != 0) {
											return true;
										}
									}()
								},
								labelLine: {
									color: "#BFCE92",
									lineStyle: {
										color: '#BFCE92'
									},
									show: function() {
										if(that.shares.remainingAuthorizedShares == 0 && that.shares.accruedBenefits == 0 && that.shares.periodMaturity == 0 && that.shares.immature == 0) {
											return true;
										}
										if(that.shares.remainingAuthorizedShares == 0) {
											return false;
										}
										if(that.shares.remainingAuthorizedShares != 0) {
											return true;
										}
									}()
								}
							}, {
								value: that.shares.accruedBenefits,
								name: "待行权" + that.shares.accruedBenefits + "股",
								itemStyle: {
									color: "#ED9D79"
								},
								label: {
									color: "#ED9D79",
									show: function() {
										if(that.shares.remainingAuthorizedShares == 0 && that.shares.accruedBenefits == 0 && that.shares.periodMaturity == 0 && that.shares.immature == 0) {
											return true;
										}
										if(that.shares.accruedBenefits == 0) {
											return false;
										}
										if(that.shares.accruedBenefits != 0) {
											return true;
										}
									}()
								},
								labelLine: {
									color: "#ED9D79",
									lineStyle: {
										color: '#ED9D79'
									},
									show: function() {
										if(that.shares.remainingAuthorizedShares == 0 && that.shares.accruedBenefits == 0 && that.shares.periodMaturity == 0 && that.shares.immature == 0) {
											return true;
										}
										if(that.shares.accruedBenefits == 0) {
											return false;
										}
										if(that.shares.accruedBenefits != 0) {
											return true;
										}
									}()
								}
							}, {
								value: that.shares.periodMaturity,
								name: "本期成熟" + that.shares.periodMaturity + "股",
								itemStyle: {
									color: "#E9D0A1"
								},
								label: {
									color: "#E9D0A1",
									show: function() {
										if(that.shares.remainingAuthorizedShares == 0 && that.shares.accruedBenefits == 0 && that.shares.periodMaturity == 0 && that.shares.immature == 0) {
											return true;
										}
										if(that.shares.periodMaturity == 0) {
											return false;
										}
										if(that.shares.periodMaturity != 0) {
											return true;
										}
									}()
								},
								labelLine: {
									color: "#E9D0A1",
									show: function() {
										if(that.shares.remainingAuthorizedShares == 0 && that.shares.accruedBenefits == 0 && that.shares.periodMaturity == 0 && that.shares.immature == 0) {
											return true;
										}
										if(that.shares.periodMaturity == 0) {
											return false;
										}
										if(that.shares.periodMaturity != 0) {
											return true;
										}
									}()
								}
							}, {
								value: that.shares.immature,
								name: "未成熟" + that.shares.immature + "股",
								itemStyle: {
									color: "#FFFFFF"
								},
								label: {
									color: "#FFFFFF",
									// normal: {
									//   textStyle: {
									//     fontSize: 14
									//   }
									// },
									show: function() {
										if(that.shares.remainingAuthorizedShares == 0 && that.shares.accruedBenefits == 0 && that.shares.periodMaturity == 0 && that.shares.immature == 0) {
											return true;
										}
										if(that.shares.immature == 0) {
											return false;
										}
										if(that.shares.immature != 0) {
											return true;
										}
									}()
								},
								labelLine: {
									color: "#FFFFFF",
									lineStyle: {
										color: '#FFFFFF'
									},
									show: function() {
										if(that.shares.remainingAuthorizedShares == 0 && that.shares.accruedBenefits == 0 && that.shares.periodMaturity == 0 && that.shares.immature == 0) {
											return true;
										}
										if(that.shares.immature == 0) {
											return false;
										}
										if(that.shares.immature != 0) {
											return true;
										}
									}()
								}
							}]
							that.list = arr;
							that.initChart(that.list);
							that.progressNum = 0;
							that.go();
						} else {
							that.list = [];
							that.initChart(that.list);
						}
					}
				}
			})
		},
		methods: {
			getWei(){
				this.$http.post("/selectUnreadNoticeCountByUserId",{
					data: {
						feedbackContent:this.feedbackContent
					},
					version: "2.0"
					},
					{
						headers: {
							Authorization: "Bearer " + localStorage.token
						}
					}
				).then (res =>{
					this.weidu=res.data.result
				})
			},
			toRouter(){
				this.$router.push({
					path:'/feedList'
				})
			},
			loginOut(dome) {
		        switch (dome) {
		          case 0:
		            if (!localStorage.token) {
		              this.$router.push({
		                path: "/"
		              });
		              return
		            }
		            this.quitRegister = true;
		            break;
		          case 1:
		            this.quitRegister = false;
		            localStorage.removeItem("token");
		            Toast('退出成功');
		            this.$router.push({
		              path: "/"
		            });
		            break;
		          case 2:
		            this.quitRegister = false;
		            break;
		        }
		    },
			changecertificate(){
				this.certificateBol = true;
			},
			go() {
				var that = this;
				var num = that.shares.periodMaturity;
				var numOne = that.shares.progressBar / 100;
				var set = setInterval(function() {
					if(that.progressNum != num) that.progressNum = that.progressNum / 1 + numOne;
					else clearTimeout(set);
				}, 1);
			},
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
			dayNum() {
				this.$http.post("/dayNum", {
					data: {},
					version: "2.0"
				}, {
					headers: {
						Authorization: "Bearer " + this.token
					}
				}).then(res => {
					this.numDay = res.data.result
				})
			},
			//使用指引
			one(a) {
				this.$router.push({
					path: "/one",
					query: {
						imgText: a
					}
				})
			},
			//打开绩效模态框
			performance() {
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
			//分红
			six(a) {
				this.$router.push({
					path: "/six",
					query: {
						imgText: a
					}
				})
			},
			//打开授予协议模态框
			deal() {
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
			selectUserByID() {
				this.$http.post("/selectUserByID", {
					data: {},
					version: "2.0"
				}, {
					headers: {
						Authorization: "Bearer " + this.token
					}
				}).then(res => {
					console.log(res)
					if(res.data.code == "0000") {
						this.shares = res.data.result;
						if(this.shares.companyName == null || this.shares.companyName == ''){
							this.shares.companyName = "公司名称"
						}
						if(this.shares.headPortrait == null || this.shares.headPortrait == ''){
							this.userHeadPortrait = true
						}
						if(this.shares.userName == null || this.shares.userName == ''){
							this.userName = '姓名'
						}
						localStorage.setItem("companyId", res.data.result.companyId)
					} else if(res.data.code == "2000") {
						Toast(res.data.msg);
						localStorage.removeItem("token");
						this.$router.push({
							path: "/"
						});
					} else {
						Toast(res.data.msg);
					}
					if(res.data.result.accruedBenefits > 0) {
						this.heartBol = false;
					} else {
						this.heartBol = true;
					}
				})
			},
			selectCalculationExercise(){
				this.$http.post("/selectCalculationExercise", {
					data: {},
					version: "2.0"
				}, {
					headers: {
						Authorization: "Bearer " + this.token
					}
				}).then(res => {
					this.modelMsg = res.data.result;
				})
			},
			
			
			//免费激活
			activate() {
				this.$router.push({
					path: "/activate"
				})
			},
			//配套文件
			file() {
				this.$router.push({
					path: "/file"
				})
			},
			//分红模态框
			dividend() {
				this.alertDividend = true
			},
			//关闭分红
			diviDend() {
				this.alertDividend = false
			},
			//获授总数模态框
			awarded() {
				this.alertAwarded = true
			},
			closeAwarded() {
				this.alertAwarded = false
			},
			//成熟期模态框
			ripe() {
				this.alertRipe = true
			},
			closeRipe() {
				this.alertRipe = false
			},
			//行权判断
			judge() {
				let that = this;
				if(that.shares.accruedBenefits > 0) {
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
						if(this.rightNumber > this.shares.accruedBenefits) {
							Toast('您没有那么多可行权股数！');
							return
						}
						this.alertExercise = false;
						this.generateExercise = true;
						this.sendExercise = false;
						break;
					case 1:
						Indicator.open();
						this.$http.post("/insertRightRecord", {
							data: {
								type: "1",
								rightNumber: this.rightNumber
							},
							version: "2.0"
						}, {
							headers: {
								Authorization: "Bearer " + this.token
							}
						}).then(res => {
							Indicator.close();
							console.log(res);
							this.alertExercise = false;
							this.generateExercise = false;
							this.sendExercise = true;
						});
						break;
					case 2:
						this.alertExercise = false;
						this.generateExercise = false;
						this.sendExercise = false;
						this.rightNumber = "";
						// this.check = true;
						this.selectUserByID();
						break;
				}
			},
			//转让
			floatBlur(){
				window.scrollTo(0, document.documentElement.clientHeight);
			},
			changeAlertsell(demo) {
				switch(demo) {
					case 0:
						var regNum = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
						if(!regNum.test(this.floatSell)) {
							Toast('转让股数只可输入整数或小数！');
							return
						}
						if(this.floatSell == "") {
							Toast('请填写您需要转让的股数！');
							return
						}
						if(this.floatSell > this.shares.remainingAuthorizedShares) {
							Toast('您没有那么多转让股数！');
							return
						}
						if(this.floatSell == 0){
							Toast('转让股数不能为0！');
							return
						}
						this.alertsell = false;
						this.alertsell2 = true;
						this.alertsell3 = false;
						break;
					case 1:
						Indicator.open();
						this.$http.post("/insertRightRecord", {
							data: {
								type: "3",
								rightNumber: this.floatSell
							},
							version: "2.0"
						}, {
							headers: {
								Authorization: "Bearer " + this.token
							}
						}).then(res => {
							Indicator.close();
							console.log(res);
							this.alertsell = false;
							this.alertsell2 = false;
							this.alertsell3 = true;
						});
						break;
					case 2:
						this.alertsell = false;
						this.alertsell2 = false;
						this.alertsell3 = false;
						this.floatSell = "";
						// this.check = true;
						this.selectUserByID();
						break;
					case 3:
						this.alertsell = true;
						this.alertsell2 = false;
						this.alertsell3 = false;
						break;
				}
			},
			//回购
			withdrawal(demo) {
				switch(demo) {
					case 0:
						var regNum = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
						if(!regNum.test(this.float)) {
							Toast('退还股数只可输入整数或小数！');
							return
						}
						if(this.float == "") {
							Toast('请填写您需要退还的股数！');
							return
						}
						if(this.float > this.shares.remainingAuthorizedShares) {
							Toast('您没有那么多退还股数！');
							return
						}
						if(this.float == 0){
							Toast('退还股数不能为0！');
							return
						}
						this.alertDimission = false;
						this.clickDimission = true;
						this.affirmDimission = false;
						break;
					case 1:
						Indicator.open();
						this.$http.post("/insertRightRecord", {
							data: {
								type: "2",
								rightNumber: this.float
							},
							version: "2.0"
						}, {
							headers: {
								Authorization: "Bearer " + this.token
							}
						}).then(res => {
							Indicator.close();
							console.log(res);
							this.alertDimission = false;
							this.clickDimission = false;
							this.affirmDimission = true;
						});
						break;
					case 2:
						this.alertDimission = false;
						this.clickDimission = false;
						this.affirmDimission = false;
						this.float = "";
						// this.check = true;
						this.selectUserByID();
						break;
					case 3:
						this.alertDimission = true;
						this.clickDimission = false;
						this.affirmDimission = false;
						break;
				}
			},
			//获取法大大合同模板
			fddExtsign() {
				Indicator.open();
				this.$http.post('/fddExtsignGZH', {
					version: "2.0"
				}, {
					headers: {
						Authorization: "Bearer " + this.token
					}
				}).then(res => {
					Indicator.close();
					if(res.data.code == "0000") {
						this.hrefUrl = res.data.result;
						window.location.href = this.hrefUrl;
					} else {
						Toast(res.data.msg);
					}
				})
			},
			//获取查看合同模板url
			fddQuerySignStatus() {
				this.$http.post('/fddQuerySignStatus', {
					version: "2.0"
				}, {
					headers: {
						Authorization: "Bearer " + this.token
					}
				}).then(res => {
					if(res.data.code == "0000") {
						this.redirectionUrl = res.data.result;
						window.location.href = this.redirectionUrl;
					} else {
						Toast(res.data.msg);
					}
				})
			},
			//打开模态框
			openMark(item){
				this[item] = true;
			},
			//关闭模态框
			closeMark(item){
				this[item] = false;
			},
			alertmarkD() {
		        // if (!localStorage.token) {
		        //   this.alertRegister = true;
		        //   return
		        // }
		        // this.bolA = true;
		        // this.bolB = true;
		        // this.bolC = true;
		        // this.bolD = false;
		        this.$router.push({
		          path: "/feed"
		        })
	      	},
		},
		computed: {
			multiplication() {
				var zong = 0;
				zong += this.rightNumber * 10000 * this.shares.eachAppraisement / 10000;
				return zong
			}
		}
	}
</script>

<style scoped lang="less">
	@import "../../assets/css/index_header.less";
</style>