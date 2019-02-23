<style scoped lang="less">
	@import url("./less/stimulate.less");
</style>

<template>
	<div>
		<div class="stimulate_header">
			<div class="stimulate_header_anchor">
				<a href="javascript:void(0)" :class="gps_a == 1?'gps_a':''" @click="goAnchor('#impowerSharesNum',1)" >分配机制</a>
				<a href="javascript:void(0)" :class="gps_a == 2?'gps_a':''" @click="goAnchor('#autumn',2)">成熟机制</a>
				<a href="javascript:void(0)" :class="gps_a == 3?'gps_a':''" @click="goAnchor('#achievements',3)">行权机制</a>
				<a href="javascript:void(0)" :class="gps_a == 4?'gps_a':''" @click="goAnchor('#theoryAbonus',4)">分红机制</a>
				<a href="javascript:void(0)" :class="gps_a == 5?'gps_a':''" @click="goAnchor('#numReturnedShares',5)">回购机制</a>
			</div>
			<div class="stimulate_header_right">
				<getback></getback>
				<div @mouseleave="exporst = false"  @mouseenter="exporst = true" @click="downLoad" class="stimulate_header_export cursor_pointer">
					<img v-if="exporst" src="../../assets/img/company/company-export.png" alt="">
					<img v-else src="../../assets/img/objects/objects-export.png" alt="">
					<span>导出</span>
				</div>
			</div>
		</div>
		<Form 
			ref="formValidate" 
			label-position="right" 
			:model="formValidate" 
			class="stimulate_form" 
			:rules="ruleValidate" 
			:label-width="160" >
			<Card id="impowerSharesNum" class="cards">
	            <span class="cards_title"></span>
				<p slot="title">分配机制</p>
	            <div class="formbutton">
					<div>
						<FormItem label=" 获授股数：" prop="impowerSharesNum">
							<Input style="width: 200px;" @on-blur="getDefaultValue" v-model="formValidate.impowerSharesNum"></Input>
						</FormItem>
						<FormItem label="获授总数：" prop="totalAwarded">
							<span>{{formValidate.totalAwarded}}</span>
						</FormItem>
					</div>
					<div>
						<FormItem label="追授股数：" prop="numSharesAwarded">
							<span>{{formValidate.numSharesAwarded}}</span>
							<span @click="router_push('awardeds')" class="FormItem_history cursor_pointer">历史记录</span>
						</FormItem>
						<FormItem label="授予日：" prop="stockStartTime">
							<DatePicker @on-change="getDefaultDate" style="width: 200px;" type="date" placeholder="请选择日期" v-model="formValidate.stockStartTime"></DatePicker>
						</FormItem>
					</div>
					<div>
						<FormItem label="获授比例：" prop="awardRatio">
							<span>{{formValidate.awardRatio}}%</span>
						</FormItem>
						<FormItem label="行权价（元/股）：" prop="eachAppraisement">
							<Input style="width: 200px;" v-model="formValidate.eachAppraisement"></Input>
						</FormItem>
					</div>
				</div>
	      	</Card>
			<Card id="autumn" class="cards">
	            <span class="cards_title"></span>
				<p slot="title">成熟机制</p>
	            <div class="formbutton">
					<div>
						<FormItem label="  总成熟期（月）：" prop="autumn">
							<Select @on-change="change_autumn" v-model="formValidate.autumn" style="width: 200px;">
						        <Option :value="36">36</Option>
						        <Option :value="48">48</Option>
						        <Option :value="60">60</Option>
						    </Select>
						</FormItem>
						<FormItem label="  首次等待期（月）：" prop="firstWaitingPeriod">
							<Select @on-change="change_autumn" v-model="formValidate.firstWaitingPeriod" style="width: 200px;">
						        <Option :value="12">12</Option>
						        <Option :value="24">24</Option>
						    </Select>
						</FormItem>
						<FormItem label="首次成熟股数：" prop="firstMaturity">
							<Input style="width: 200px;" @on-blur="getDefaultValue2" v-model="formValidate.firstMaturity"></Input>
						</FormItem>
						<FormItem label="本期成熟股数：" prop="periodMaturity">
							<span>{{formValidate.periodMaturity}}</span>
						</FormItem>
					</div>
					<div style="display: flex;flex-direction: column;justify-content: flex-end;">
						<FormItem label="后续成熟周期（月）：" prop="subsequentMaturityCycle">
							<Input style="width: 200px;" @on-blur="getDefaultValue"  v-model="formValidate.subsequentMaturityCycle"></Input>
						</FormItem>
						<FormItem label="后续成熟周期数（个）：" prop="subsequentMaturityCycleNum">
							<Input style="width: 200px;" @on-blur="getDefaultValue2" v-model="formValidate.subsequentMaturityCycleNum"></Input>
						</FormItem>
						<FormItem label="后续每周期成熟股数：" prop="weeklyMaturity">
							<Input style="width: 200px;" v-model="formValidate.weeklyMaturity"></Input>
						</FormItem>
						<FormItem label="本期成熟加权：" prop="maturityWeighted">
							<span>{{formValidate.maturityWeighted}}</span>
						</FormItem>
					</div>
					<div style="display: flex;flex-direction: column;justify-content: flex-end;">
						<FormItem label="首次可行权日：" prop="oneFrame">
							<!--<Input style="width: 80px;" v-model="formValidate.firstRightDate"></Input>-->
							<span>{{formValidate.firstRightDate}}</span>
							<Input style="width: 80px;margin-left: 10px;" v-model="formValidate.oneFrame"></Input>
						</FormItem>
						<FormItem v-if="oneYearDateShow" label=" 后续第一年届满日：" prop="twoFrame">
							<span>{{formValidate.oneYearDate}}</span>
							<!--<Input style="width: 80px;" v-model="formValidate.oneYearDate"></Input>-->
							<Input style="width: 80px;margin-left: 10px;" v-model="formValidate.twoFrame"></Input>
						</FormItem>
						<FormItem v-if="twoYearDateShow" label=" 后续第二年届满日：" prop="threeFrame">
							<!--<Input style="width: 80px;" v-model="formValidate.twoYearDate"></Input>-->
							<span>{{formValidate.twoYearDate}}</span>
							<Input style="width: 80px;margin-left: 10px;" v-model="formValidate.threeFrame"></Input>
						</FormItem>
						<FormItem v-if="threeYearDateShow" label=" 后续第三年届满日：" prop="fourFrame">
							<span>{{formValidate.threeYearDate}}</span>
							<!--<Input style="width: 80px;" v-model="formValidate.threeYearDate"></Input>-->
							<Input style="width: 80px;margin-left: 10px;" v-model="formValidate.fourFrame"></Input>
						</FormItem>
						<FormItem label=" 成熟期届满日：" prop="fiveFrame">
							<span>{{formValidate.maturityDate}}</span>
							<!--<Input style="width: 80px;" v-model="formValidate.maturityDate"></Input>-->
							<Input style="width: 80px;margin-left: 10px;" v-model="formValidate.fiveFrame"></Input>
						</FormItem>
					</div>
				</div>
	        </Card>
			<Card id="achievements" class="cards">
	            <span class="cards_title"></span>
				<p slot="title">行权机制</p>
	            <div class="formbutton">
					<div>
						<FormItem label="累计可行权股数：" prop="accumulativeAccruedBenefits">
							<span>{{formValidate.accumulativeAccruedBenefits}}</span>
						</FormItem>
						<FormItem label="绩效：" prop="achievements">
							<Input style="width: 200px;" v-model="formValidate.achievements"></Input>
						</FormItem>
						<FormItem label="已到手收益：" prop="handReturn">
							<span>{{formValidate.handReturn}}</span>
						</FormItem>
					</div>
					<div>
						<FormItem label="已行权股数：" prop="exerciseEarnings">
							<span>{{formValidate.exerciseEarnings}}</span>
						</FormItem>
						<FormItem label="调整股数：" prop="adjustmentEarnings">
							<Input style="width: 200px;" v-model="formValidate.adjustmentEarnings"></Input>
						</FormItem>
						<FormItem label="本期累计收益：" prop="periodEarnings">
							<span>{{formValidate.periodEarnings}}</span>
						</FormItem>
					</div>
					<div style="display: flex;flex-direction: column;justify-content: flex-end;">
						<FormItem label="待行权股数：" prop="accruedBenefits">
							<span>{{formValidate.accruedBenefits}}</span>
						</FormItem>
						<FormItem label="昨日新增收益：" prop="earningsYesterday">
							<span>{{formValidate.earningsYesterday}}</span>
						</FormItem>
					</div>
				</div>
	       	</Card>
			<Card id="theoryAbonus" class="cards">
	            <span class="cards_title"></span>
				<p slot="title">分红机制</p>
	            <div class="formbutton">
					<div>
						<FormItem label="理论分红：" prop="theoryAbonus">
							<span>{{formValidate.theoryAbonus}}</span>
						</FormItem>
					</div>
					<div>
						<FormItem label="调整分红：" prop="adjustmentAbonus">
							<Input style="width: 200px;" v-model="formValidate.adjustmentAbonus"></Input>
						</FormItem>
					</div>
					<div>
						<FormItem label="实际分红：" prop="actualAbonus">
							<span>{{formValidate.actualAbonus}}</span>
						</FormItem>
					</div>
				</div>
	        </Card>
			<Card id="numReturnedShares" class="cards">
	            <span class="cards_title"></span>
				<p slot="title">回购机制</p>
	            <div class="formbutton">
					<div>
						<FormItem label="已转让股数：" prop="transferableShares">
							<span>{{formValidate.transferableShares}}</span>
						</FormItem>
						<FormItem label="调整退转股数：" prop="adjustedNumReturnedShares">
							<Input style="width: 200px;" v-model="formValidate.adjustedNumReturnedShares"></Input>
						</FormItem>
					</div>
					<div>
						<FormItem label="已退还股数：" prop="numReturnedShares">
							<span>{{formValidate.numReturnedShares}}</span>
						</FormItem>
						<FormItem label="剩余已行权股数：" prop="remainingAuthorizedShares">
							<span>{{formValidate.remainingAuthorizedShares}}</span>
						</FormItem>
					</div>
					<div></div>
				</div>
	       </Card>
			<Button class="FormItem_btn_button" @click="handleSubmit('formValidate')">确认</Button>
		</Form>
	</div>
</template>

<script>
	export default {
		data() {
			var validateuser = function(rule, value, callback) {
				if(value === '') {
					// 不能为空
					return callback(new Error('不能为空'));
				} else if(isNaN(value)) {
					//只能为数字
					return callback(new Error("只能为数字"));
				} else {
					callback();
				}
			};
			var validatefirstWaitingPeriod = function(rule, value, callback) {
				if(value == ""){
					return callback(new Error('不能为空'));
				}else if(value == 12 || value == 24){
					callback();
				}else{
					return callback(new Error('请选择首次等待期（月）'));
				}
			};
			var validateautumn = function(rule, value, callback) {
				if(value == ""){
					return callback(new Error('不能为空'));
				}else if(value == 36 || value == 48 || value == 60){
					callback();
				}else{
					return callback(new Error('请选择总成熟期（月）'));
				}
			};
			return {
				gps_a:1,
				exporst:false,
				formValidate: {},
				ruleValidate: {
					//获受股数：
					impowerSharesNum: [{
						required: true,
						trigger: 'blur',
						validator: validateuser
					}],
					//行权价：
					eachAppraisement: [{
						required: true,
						trigger: 'blur',
						validator: validateuser
					}],
					//获授总数：
					totalAwarded: [{
						required: true,
						trigger: 'blur',
						validator: validateuser
					}],
					//追授股数：
					numSharesAwarded: [{
						required: true,
						trigger: 'blur',
						validator: validateuser
					}],
					//总成熟期（月）：
					autumn: [{
						required: true,
						trigger: 'blur',
						validator: validateautumn
					}],
					//首次等待期（月）：
					firstWaitingPeriod: [{
						required: true,
						trigger: 'blur',
						validator: validatefirstWaitingPeriod
					}],
					//首次成熟股数：
					firstMaturity: [{
						required: true,
						trigger: 'blur',
						validator: validateuser
					}],
					//本期成熟股数：
					periodMaturity: [{
						required: true,
						trigger: 'blur',
						validator: validateuser
					}],
					//后续成熟周期（月）：
					subsequentMaturityCycle: [{
						required: true,
						trigger: 'blur',
						validator: validateuser
					}],
					//后续成熟周期数（个）：
					subsequentMaturityCycleNum: [{
						required: true,
						trigger: 'blur',
						validator: validateuser
					}],
					//后续每周期成熟股数：
					weeklyMaturity: [{
						required: true,
						trigger: 'blur',
						validator: validateuser
					}],
					//本期成熟加权：
					maturityWeighted: [{
						required: true,
						trigger: 'blur',
						validator: validateuser
					}],
					//首次可行权日：
					oneFrame: [{
						required: true,
						trigger: 'blur',
						validator: validateuser
					}],
					//后续第一年届满日：
					twoFrame: [{
						required: true,
						trigger: 'blur',
						validator: validateuser
					}],
					//后续第二年届满日：
					threeFrame: [{
						required: true,
						trigger: 'blur',
						validator: validateuser
					}],
					//后续第三年届满日：
					fourFrame: [{
						required: true,
						trigger: 'blur',
						validator: validateuser
					}],
					//成熟期届满日：
					fiveFrame: [{
						required: true,
						trigger: 'blur',
						validator: validateuser
					}]
				},
				oneYearDateShow:true,
				twoYearDateShow:true,
				threeYearDateShow:true,
			};
		},
		created() {
			
		},
		mounted() {
			this.getUser();
		},
		methods:{
			//导出
			downLoad(){
				var str = this.$store.state.fileUrl+"/downLoadExcelMotivatingObject?id="+this.$route.query.data
				window.location.href = str;
			},
			change_autumn(){
				this.getDefaultDate();
				this.getDefaultValue();
			},
			//计算默认值1
			getDefaultValue(){
				this.$axios.Objects.getDefaultValue({
					data:{
						impowerSharesNum:String(this.formValidate.impowerSharesNum),
						numSharesAwarded:String(this.formValidate.numSharesAwarded),
						autumn:String(this.formValidate.autumn),
						firstWaitingPeriod:String(this.formValidate.firstWaitingPeriod),
						subsequentMaturityCycle:String(this.formValidate.subsequentMaturityCycle)
					},
					version:"2.0"
				}).then( res => {
					if(res.code == '1000') {
						//计算异常
						return;
					} else {
						this.formValidate.firstMaturity = res.result.firstMaturity;
						this.formValidate.totalAwarded = res.result.totalAwarded;
						this.formValidate.weeklyMaturity = res.result.weeklyMaturity;
						this.formValidate.subsequentMaturityCycleNum = res.result.subsequentMaturityCycleNum;
					}
				})
			},
			//计算默认值2
			getDefaultValue2(){
				this.$axios.Objects.getDefaultValue2({
					data:{
						impowerSharesNum:String(this.formValidate.impowerSharesNum),
						numSharesAwarded:String(this.formValidate.numSharesAwarded),
						firstMaturity:String(this.formValidate.firstMaturity),
						subsequentMaturityCycleNum:String(this.formValidate.subsequentMaturityCycleNum)
					},
					version:"2.0"
				}).then( res => {
					if(res.code == '1000') {
						//计算异常
						return;
					} else {
						this.formValidate.weeklyMaturity = res.result;
					}
				})
			},
			//计算默认日期
			getDefaultDate(){
				this.$axios.Objects.getDefaultDate({
					data:{
						stockStartTime:this.formattingDate(this.formValidate.stockStartTime),
						autumn:this.formValidate.autumn / 1,
						firstWaitingPeriod:this.formValidate.firstWaitingPeriod / 1
					},
					version:"2.0"
				}).then( res => {
					this.formValidate.firstRightDate = res.result.firstRightDate;
					this.formValidate.maturityDate = res.result.maturityDate;
					
					if(res.result.oneYearDate == undefined){
						//后续第一年届满日不存在
						this.oneYearDateShow = false;
					}else{
						this.formValidate.oneYearDate = res.result.oneYearDate;
						this.oneYearDateShow = true;
					}
					
					if(res.result.twoYearDate == undefined){
						//后续第二年届满日不存在
						this.twoYearDateShow = false;
					}else{
						this.formValidate.twoYearDate = res.result.twoYearDate;
						this.twoYearDateShow = true;
					}
					
					if(res.result.threeYearDate == undefined){
						//后续第三年届满日不存在
						this.threeYearDateShow = false;
					}else{
						this.formValidate.threeYearDate = res.result.threeYearDate;
						this.threeYearDateShow = true;
					}
				})
			},
			//设置期权参数接口
			updateUserOptionParameters(){
				var data = {
					userId:this.$route.query.data/1,
					impowerSharesNum:String(this.formValidate.impowerSharesNum),
					autumn:String(this.formValidate.autumn),
					eachAppraisement:String(this.formValidate.eachAppraisement),
					firstWaitingPeriod:String(this.formValidate.firstWaitingPeriod),
					firstMaturity:String(this.formValidate.firstMaturity),
					subsequentMaturityCycle:String(this.formValidate.subsequentMaturityCycle),
					subsequentMaturityCycleNum:String(this.formValidate.subsequentMaturityCycleNum),
					weeklyMaturity:String(this.formValidate.weeklyMaturity),
					adjustmentEarnings:String(this.formValidate.adjustmentEarnings),	
					adjustmentAbonus:String(this.formValidate.adjustmentAbonus),
					adjustedNumReturnedShares:String(this.formValidate.adjustedNumReturnedShares),
					achievements:String(this.formValidate.achievements),	
				    stockStartTime:this.formattingDate(this.formValidate.stockStartTime),
				    
					firstRightDate:this.formattingDate(this.formValidate.firstRightDate), //首次可行权日
					oneFrame:String(this.formValidate.oneFrame), //首次可行权日
					
					maturityDate:this.formattingDate(this.formValidate.maturityDate),//成熟期届满日
					fiveFrame:String(this.formValidate.fiveFrame),//成熟期届满日
					
					oneYearDate:String(this.formValidate.oneYearDate),//后续第一年届满日：
					twoFrame:String(this.formValidate.twoFrame),//后续第一年届满日：
					
					twoYearDate:String(this.formValidate.twoYearDate),//后续第二年届满日：
					threeFrame:String(this.formValidate.threeFrame),//后续第二年届满日：
					
					threeYearDate:String(this.formValidate.threeYearDate),//后续第三年届满日：
					fourFrame:String(this.formValidate.fourFrame),//后续第三年届满日：
				}
				if(this.oneYearDateShow == false){
					//后续第一年届满日不存在
					delete data.oneYearDate;
					delete data.twoFrame;
					delete data.twoYearDate;
					delete data.threeFrame;
					delete data.threeYearDate;
					delete data.fourFrame;
				}else if(this.twoYearDateShow == false){
					//后续第二年届满日不存在
					delete data.twoYearDate;
					delete data.threeFrame;
					delete data.threeYearDate;
					delete data.fourFrame;
				}else if(this.threeYearDateShow == false){
					//后续第三年届满日不存在
					delete data.threeYearDate;
					delete data.fourFrame;
				}
				this.$axios.Objects.updateUserOptionParameters({
					data,
					version:"2.0"
				}).then( res => {
					this.getUser();
					this.$Message.success('设置成功！');
				})
			},
			//获取当前用户参数
			getUser(){
				this.$axios.Objects.selectUserByID({
					data:{
						userId:this.$route.query.data/1
					},
					version:"2.0"
				}).then( res => {
					this.formValidate = res.result;
					if(res.result.oneYearDate == ""){
						//不存在
						this.oneYearDateShow = false;
						this.twoYearDateShow = false;
						this.threeYearDateShow = false;
					}else if(res.result.twoYearDate == ""){
						this.twoYearDateShow = false;
						this.threeYearDateShow = false;
					}else if(res.result.threeYearDate == ""){
						this.threeYearDateShow = false;
					}
				})
			},
			//锚链接
			goAnchor(selector,num) {
				this.gps_a = num;
				document.querySelector(selector).scrollIntoView(true); 
			},
			//路由跳转
			router_push(path) {
				this.$util.router_push(this, path,this.$route.query.data)
			},
			//提交验证事件
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.updateUserOptionParameters();
					} else {
						this.$Message.error('请检查输入格式是否正确或者是否填写完整');
					}
				})
			},
			// 时间格式化
			formattingDate(time) {
				if(typeof(time) == 'string') {
					return time;
				} else {
					var year = time.getFullYear();
					var month = change(time.getMonth() + 1);
					var day = change(time.getDate());
					var hour = change(time.getHours());
					var minute = change(time.getMinutes());
					var second = change(time.getSeconds());

					function change(t) {
						if(t < 10) {
							return "0" + t;
						} else {
							return t;
						}
					}
					var times = year + '-' + month + '-' + day;
					return times;
				}
			}
		}
	}
</script>


