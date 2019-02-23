<style scoped lang="less">
	@import url("../less/commonality.less");

	.model_content {
		width: 90%;
		margin: 0 auto;
		border-bottom: 1px solid #E8E8E8;
		display: flex;

		.model_content_left {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.model_content_right {
			flex: 3;
			margin: auto;
			height: 500px;
			
			.model_content_right_form {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding: 20px 0;
				border-left: 1px solid #E8E8E8;
				/*background: pink;*/
				Input {
					width: 330px;
				}
			}
		}
	}
	.table{
		width: 620px;
		border: 1px solid gainsboro;
		.table_top{
			width: 100%;
			height: 49px;
			display: flex;
			justify-content: center;
			align-items: center;
			background: rgba(52,110,188,0.20);
			font-size: 16px;
			color: #333333;
			div{
				height: 100%;
				line-height: 49px;
				flex: 1;
				text-align: center;
			}
			div:nth-child(1){
				border-right: 1px solid gainsboro;
			}
		}
		.table_tr{
			width: 100%;
			height: 49px;
			display: flex;
			justify-content: center;
			align-items: center;
			div{
				height: 100%;
				line-height: 49px;
				flex: 1;
				text-align: center;
			}
			div:nth-child(1){
				border-right: 1px solid gainsboro;
			}
		}
	}
</style>

<template>
	<div v-show="show" class="model">
		<div style="height: 75%;" class="addcompany">
			<div class="model_top">
				<div class="model_top_title">
					<img src="../../../assets/img/feedback/h5-Admin.png" alt="">
					<span>修改</span>
				</div>
				<img @click="$store.commit('offMolde')" class="model_top_off" src="../../../assets/img/model/model_off.png" alt="">
			</div>
			<div class="model_content">
				<div class="model_content_left">
					<img v-if="newUserObj.headPortrait == ''" src="../../../assets/img/model/model-adduser.png" />
					<img v-else style="border-radius: 50%;border: 1px solid gainsboro;" :src="newUserObj.headPortrait" />
				</div>
				<div class="model_content_right">
					<Form ref="formValidate" class="model_content_right_form" :rules="ruleValidate" :model="newUserObj" label-position="right" :label-width="100">
						<FormItem label=" 姓名：" prop="userName">
							<Input :maxlength="10" v-model="newUserObj.userName" placeholder="中英文2-10位" style="width:330px"></Input>
						</FormItem>
						<FormItem label=" 性别：" prop="gender">
							<Select v-model="newUserObj.gender" style="width:330px">
						        <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.value }}</Option>
						    </Select>
						</FormItem>
						<FormItem label=" 所属公司：" prop="companyId">
							<Select v-model="newUserObj.companyId" style="width:330px">
								<Option v-for="item in companyList" :value="item.id" :key="item.companyName">{{ item.companyName }}</Option>
							</Select>
						</FormItem>
						<FormItem label="  手机号：" prop="userPhone">
							<Input v-model="newUserObj.userPhone" placeholder="请输入手机号" style="width:330px"></Input>
						</FormItem>
						<FormItem label=" 身份证号：" prop="idNumber">
							<Input v-model="newUserObj.idNumber" placeholder="请输入身份证号" style="width:330px"></Input>
						</FormItem>
						<FormItem label=" 工号：" prop="jobNum">
							<Input v-model="newUserObj.jobNum" placeholder="请输入工号" style="width:330px"></Input>
						</FormItem>
						<FormItem label=" 微信号码：" prop="wechat">
							<Input v-model="newUserObj.wechat" placeholder="请输入微信号码" style="width:330px"></Input>
						</FormItem>
						<FormItem label=" 职位：" prop="position">
							<Select v-model="newUserObj.position" style="width:330px">
								<Option v-for="item in positionList" :value="item.value" :key="item.value">{{ item.value }}</Option>
							</Select>
						</FormItem>
						<FormItem label=" 月薪：" prop="annualSalary">
							<div class="cursor_pointer" style='width: 100%;display: flex;align-items: center;justify-content: center;'>
								<Input v-model="newUserObj.annualSalary" placeholder="请输入月薪" style="width:300px;margin-right: 5px;"></Input>
								<img @click="changehistoryTabel" src="../../../assets/img/objects/objects-history.png"/>
							</div>
						</FormItem>
					</Form>
				</div>
			</div>
			<div>
				<div class="model_operation">
					<button  @click="insertUserBtn('formValidate')" class="model_operation_confirm">确定</button>
				</div>
			</div>
		</div>
		<div v-if="historyTabel" class="model">
			<div class="addcompany" style="height: auto;">
				<div class="model_top">
					<div class="model_top_title">
						<img src="../../../assets/img/company/company-historys.png" alt="">
						<span>历史记录</span>
					</div>
					<img @click="historyTabel = false" class="model_top_off" src="../../../assets/img/model/model_off.png" alt="">
				</div>
				<div style="padding: 30px; box-sizing: border-box;display: flex;justify-content: center;align-items: center;height: 100%;">
					<div class="table">
						<div class="table_top">
							<div>时间</div>
							<div>月薪（元）</div>
						</div>
						<div v-for="item in historyArr" class="table_tr">
							<div>{{item.createTime}}</div>
							<div>{{item.num_shares_awarded}}</div>
						</div>
					</div>
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
			var validateUserName = function(rule, value, callback){
				var reg = new RegExp("^[A-Za-z\u4e00-\u9fa5]\{2,10}$");
				if(value == ''){
					return callback(new Error('请输入姓名'));
				}else if(!reg.test(value)){
					return callback(new Error('中英文2-10位'));
				}else{
					callback();
				}
			};
			var validateuserPhone = function(rule, value, callback){
				if(value == ''){
					return callback(new Error('请输入手机号'));
				}else if(!/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(value)){
					return callback(new Error('手机号格式不正确'));
				}else{
					callback();
				}
			};
			var validateidNumber = function(rule, value, callback){
				if(value == ''){
					callback();
				}else if(!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/.test(value)){
					return callback(new Error('身份证格式不正确'));
				}else{
					callback();
				}
			};
			var validateidcompanyId = function(rule, value, callback){
				console.log(value)
				if(value == '' || value == undefined){
					return callback(new Error('请选择公司'));
				}else{
					callback();
				}
			};
			return {
				historyArr:[],
				historyTabel:false,
				companyList:[],
				sexList:[{
					value:"男"
				},{
					value:"女"
				}],
				positionList:[{
					value:"CEO"
				},{
					value:"VP"
				},{
					value:"总监"
				},{
					value:"经理"
				},{
					value:"主管"
				}],
				newUserObj: {
					userid:"",
					userName: "",
					gender:"男",
					companyId:"",
					userPhone:"",
					idNumber:"",
					jobNum:"",
					wechat:"",
					position:"",
					annualSalary:"",
					headPortrait:""
				},
				ruleValidate:{
					userName:[{ 
						required: true,
						validator: validateUserName, 
						trigger: 'blur' 
					}],
					gender:[{ 
						required: true,
						message: '请选择性别'
					}],
					companyId:[{ 
						required: true, 
						message: '请选择公司'
						
					}],
					userPhone:[{
						required: true,
						validator: validateuserPhone, 
						trigger: 'blur' 
					}],
					idNumber:[{
						validator: validateidNumber, 
						trigger: 'blur' 
					}],
				}
			};
		},
		created() {

		},
		mounted() {
			this.selectCompanyListByAdminId();
		},
		methods: {
			changehistoryTabel(){
				this.historyTabel = true;
				this.selectSharesAwardedList();
			},
			selectSharesAwardedList(){
				this.$axios.Objects.selectSharesAwardedList({
					data:{
						userId:this.newUserObj.userid / 1,
						pageNum:1,
				    	type:"2"
				  },
				  version:"2.0"
				}).then( res => {
					this.historyArr = res.result;
				})
			},
			//查询会员
			getUser(){
				this.$axios.Objects.selectUserByID({
					data:{
						userId:this.newUserObj.userid
					},
					version:"2.0"
				}).then( res => {
					this.newUserObj.headPortrait = res.result.headPortrait == null? '':res.result.headPortrait;
					this.newUserObj.userName = res.result.userName == null? '':res.result.userName;
					this.newUserObj.gender = res.result.gender == null? '':res.result.gender;
					this.newUserObj.userPhone = res.result.userPhone == null? '':res.result.userPhone;
					this.newUserObj.idNumber = res.result.idNumber == null? '':res.result.idNumber;
					this.newUserObj.jobNum = res.result.jobNum == null? '':res.result.jobNum;
					this.newUserObj.wechat = res.result.wechat == null? '':res.result.wechat;
					this.newUserObj.position = res.result.position == null? '':res.result.position;
					this.newUserObj.annualSalary = res.result.annualSalary == null? '':res.result.annualSalary;
					this.newUserObj.companyId = res.result.companyId == null? '':res.result.companyId;
				})
			},
			//新增会员
			insertUserBtn (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                       	this.updateUser();
                    } else {
                        this.$Message.error('请检查输入格式是否正确！');
                    }
                })
            },
            //提交数据
            updateUser(){
            	this.$axios.Objects.updateUser({
					data:{
						userId:this.newUserObj.userid / 1,
						userName:String(this.newUserObj.userName),
						gender:String(this.newUserObj.gender),
						userPhone:String(this.newUserObj.userPhone),
						idNumber:String(this.newUserObj.idNumber),
						jobNum:String(this.newUserObj.jobNum),
						wechat:String(this.newUserObj.wechat),
						position:String(this.newUserObj.position),
						annualSalary:String(this.newUserObj.annualSalary),
						companyId:this.newUserObj.companyId / 1,
					},
					version:"2.0"
				}).then( res => {
					if(res.code == '1000'){
						this.$Message.error(res.msg);
					}else{
						this.$Message.success('修改成功！');
						for(var k in this.newUserObj){
							this.newUserObj[k] = "";
						}
						this.$emit('succeed',true);
						this.$store.commit('offMolde');
					}
				})
            },
            //选择公司下拉框列表
            selectCompanyListByAdminId(){
				this.$axios.Company.selectCompanyListByAdminId({
					data:{
						adminId:JSON.parse(localStorage.gugeAdminUser).id / 1,
						companyName:''
					},
					version:"2.0"
				}).then( res => {
					this.newUserObj.companyId = res.result[0].id ;
					this.newUserObj.gender = '男' ;
					this.companyList = res.result;
				})
			}
		},
		watch:{
			userId(newVal,oldVal){
				this.newUserObj.userid = newVal;
			},
			show(newVal,oldVal){
				if(newVal){
					this.getUser();
				}
			}
		}
	}
</script>
