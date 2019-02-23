<style scoped lang="less">
	@import url("../less/commonality.less");

	.model_content {
		width: 90%;
		margin: 0 auto;
		border-bottom: 1px solid #E8E8E8;
		display: flex;

		.model_content_left {
			flex: 1;
			border-right: 1px solid #E8E8E8;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.model_content_right {
			flex: 3;
			height: 100%;
			.model_content_right_form {
				height: 100%;
				
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				Input {
					width: 330px;
				}
			}
		}
	}
	.model_operation_btn{
		width: 110px;
		height: 34px;
		background: #FFFFFF;
		border: 1px solid #346EBC;
		border-radius: 3px;
		font-size: 14px;
		color: #346EBC;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 50px;
		img{
			width: 18px;
			height: 18px;
			margin-right: 5px;
		}
	}
</style>

<template>
	<div v-show="show" class="model">
		<div style="height: 65%;" class="addcompany">
			<div class="model_top">
				<div class="model_top_title">
					<img src="../../../assets/img/objects/objects-parameters.png" alt="">
					<span>激励参数</span>
				</div>
				<img @click="$store.commit('offMolde')" class="model_top_off" src="../../../assets/img/model/model_off.png" alt="">
			</div>
			<div class="model_content">
				<div class="model_content_left">
					<img src="../../../assets/img/model/model-adduser.png" />
				</div>
				<div class="model_content_right">
					<Form ref="incentiveFrom" class="model_content_right_form" :rules="ruleValidate" :model="incentive" label-position="right" :label-width="100">
						<FormItem label="获授股数：" prop="impowerSharesNum">
							<Input v-model="incentive.impowerSharesNum" style="width: 360px"></Input>
						</FormItem>
						<FormItem label="总成熟期：" prop="autumn">
							<Select v-model="incentive.autumn" style="width:360px">
						        <Option :value="36">36</Option>
						        <Option :value="48">48</Option>
						        <Option :value="60">60</Option>
						    </Select>
						</FormItem>
						<FormItem label="授予日：" prop="stockStartTime">
							<DatePicker v-model="incentive.stockStartTime" type="date" style="width: 360px"></DatePicker>
						</FormItem>
						<FormItem label="行权价：" prop="eachAppraisement">
							<Input v-model="incentive.eachAppraisement" style="width: 360px"></Input>
						</FormItem>
					</Form>
				</div>
			</div>
			<div>
				<div class="model_operation">
					<div @click="router_push('stimulate')" class="model_operation_btn cursor_pointer">
						<img src="../../../assets/img/company/company-major.png" alt="">
						<span>专业入口</span>
					</div>
					<button @click="fromBtn('incentiveFrom')" class="model_operation_confirm cursor_pointer">确定</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			show:Boolean,
			userId:""
		},
		data() {
			var incentiveFormRules = function(rule, value, callback){
				if(value === ''){
					return callback(new Error(rule.message));
				}else{
					callback();
				}
			};
			return {
				incentive: {
					userid:"",
					impowerSharesNum:"",
					autumn: 36,
					stockStartTime:"",
					eachAppraisement:""
				},
				ruleValidate:{
					impowerSharesNum:[{ 
						required: true,
						validator: incentiveFormRules, 
						message: '请输入获授股数',
						trigger: 'blur' 
					}],
					autumn:[{ 
						required: true,
						message: '请选择总成熟期',
					}],
					stockStartTime:[{ 
						required: true,
						message: '请选择授予日',
					}],
					eachAppraisement:[{ 
						required: true,
						message: '请输入行权价',
						trigger: 'blur' ,
						validator: incentiveFormRules
					}]
				}
			};
		},
		created() {

		},
		mounted() {
			
		},
		methods: {
			//表单验证
			fromBtn (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                       	this.updateFourParameters();
                    } else {
                        this.$Message.error('请检查输入格式是否正确！');
                    }
                })
            },
			//提交
			updateFourParameters(){
				this.$axios.Objects.updateFourParameters({
					data:{
						userId:this.incentive.userid/1,
						impowerSharesNum:String(this.incentive.impowerSharesNum),
						autumn:String(this.incentive.autumn),
						stockStartTime:this.$util.formatDate(this.incentive.stockStartTime,'YYYY-MM-DD'),
						eachAppraisement:String(this.incentive.eachAppraisement)
					},
					version:"2.0"
				}).then( res => {
					if(res.code == '1000'){
						this.$Message.error(res.msg);
					}else{
						this.$Message.success('设置成功！');
						this.$store.commit('offMolde');
					}
				})
			},
			//查询会员
			getUser(){
				this.$axios.Objects.selectUserByID({
					data:{
						userId:this.incentive.userid
					},
					version:"2.0"
				}).then( res => {
					this.incentive.impowerSharesNum = res.result.impowerSharesNum == null? '':res.result.impowerSharesNum;
					if(res.result.autumn == null || res.result.autumn == ""){
						this.incentive.autumn = "36"
					}else{
						this.incentive.autumn = res.result.autumn
					}
					this.incentive.stockStartTime = res.result.stockStartTime == null? '':res.result.stockStartTime;
					this.incentive.eachAppraisement = res.result.eachAppraisement == null? '':res.result.eachAppraisement;
				})
			},
			//路由跳转
			router_push(path) {
				this.$store.commit('offMolde');
				this.$util.router_push(this, path,this.incentive.userid)
			}
		},
		watch:{
			userId(newVal,oldVal){
				this.incentive.userid = newVal;
			},
			show(newVal,oldVal){
				if(newVal){
					this.getUser();
				}
			}
		}
	}
</script>
