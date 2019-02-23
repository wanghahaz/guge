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
				Input {
					width: 330px;
					
				}
			}
		}
	}
</style>

<template>
	<div v-show="addUserBol" class="model">
		<div style="height: 90%;" class="addcompany">
			<div class="model_top">
				<div class="model_top_title">
					<img src="../../../assets/img/company/company-add.png" alt="">
					<span>新增</span>
				</div>
				<img @click="offAddUser" class="model_top_off" src="../../../assets/img/model/model_off.png" alt="">
			</div>
			<div class="model_content">
				<div class="model_content_left">
					<img src="../../../assets/img/model/model-adduser.png" />
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
							<Input v-model="newUserObj.annualSalary" placeholder="请输入月薪" style="width:330px"></Input>
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
		
	</div>
</template>

<script>
	export default {
		computed:{
			addUserBol(){
	    		return this.$store.state.admin.addUserBol
	    	}, 
		},
		props:{
			show:Boolean
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
			return {
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
					userName: "",
					gender:"",
					companyId:"",
					userPhone:"",
					idNumber:"",
					jobNum:"",
					wechat:"",
					position:"",
					annualSalary:""
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
//						trigger: 'change' 
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
			offAddUser(){
				this.$store.commit('setaddUserCompayId','');
				this.$store.commit('setaddUserBol',false);
			},
			//新增会员
			insertUserBtn (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                       	this.insertUser();
                    } else {
                        this.$Message.error('请检查输入格式是否正确！');
                    }
                })
            },
            //提交数据
            insertUser(){
            	this.$axios.Objects.insertUser({
					data:this.newUserObj,
					version:"2.0"
				}).then( res => {
					if(res.code == '1000'){
						this.$Message.error(res.msg);
					}else{
						this.$Message.success('添加成功！');
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
					this.newUserObj.companyId = this.$store.state.admin.addUserCompayId;
					this.companyList = res.result;
				})
			},
		}
	}
</script>
