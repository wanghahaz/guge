<style scoped lang="less">
	@import url("../less/commonality.less");
	.model_form {
		width: 100%;
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	
	.model_content {
		width: 70%;
		margin: 0 auto;
		padding: 30px 0;
		box-sizing: border-box;
		border-bottom: 1px solid #E8E8E8;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		.model_content_companylist {
			background: #FFFFFF;
			border: 1px solid #E8E8E8;
			border-radius: 3px;
			width: 360px;
			height: 262px;
			padding: 10px 20px;
			box-sizing: border-box;
			overflow-y: auto;
		}
		.model_content_companylist::-webkit-scrollbar {
			/*滚动条整体样式*/
			width: 4px;
			/*高宽分别对应横竖滚动条的尺寸*/
			height: 4px;
		}
		.model_content_companylist::-webkit-scrollbar-thumb {
			/*滚动条里面小方块*/
			border-radius: 5px;
			-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
			background: rgba(0, 0, 0, 0.2);
		}
		.model_content_companylist::-webkit-scrollbar-track {
			/*滚动条里面轨道*/
			-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
			border-radius: 0;
			background: rgba(0, 0, 0, 0.1);
		}
	}
	
	.CheckboxGroup {
		display: flex;
		flex-direction: column;
	}
	
	.upload {
		width: 60px;
		height: 60px;
		background: #F7F7F7;
		border: 1px solid #E8E8E8;
		border-radius: 3px;
		font-size: 14px;
		color: #8E8E8E;
		div {
			width: 60px;
			height: 60px;
			display: flex;
			justify-content: center;
			align-items: center;
			img {
				width: 30px;
				height: 30px;
			}
		}
	}
</style>

<template>
	<div v-show="changeBol" class="model">
		<div style="height:80%;" class="addcompany">
			<div class="model_top">
				<div class="model_top_title">
					<img src="../../../assets/img/feedback/h5-Admin.png" alt="">
					<span>修改</span>
				</div>
				<img @click="cancel" class="model_top_off" src="../../../assets/img/model/model_off.png" alt="">
			</div>
			<div class="model_content">
				<Form ref="formValidate" class="model_form" :model="admin" label-position="right" :label-width="100" :rules="ruleValidate">
					<FormItem label=" 手机号：" prop="adminName">
						<Input v-model="admin.adminName" style="width: 360px;" placeholder="请输入手机号"></Input>
					</FormItem>
					<FormItem label=" 真实姓名：" prop="name">
						<Input :maxlength="6" v-model="admin.name" style="width: 360px;" placeholder="2-6位中文"></Input>
					</FormItem>
					<FormItem label="公司范围：" prop="companyIdArr">
						<div class="model_content_companylist">
							<Checkbox :disabled="changeId == AdminId" :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
							<Divider style="margin: 0;" />
							<CheckboxGroup class="CheckboxGroup" v-model="admin.companyIdArr" @on-change="checkAllGroupChange">
								<Checkbox :disabled="changeId == AdminId" v-for="item in companyArr" :key="item.id" :label="item.id">{{item.companyName}}</Checkbox>
							</CheckboxGroup>
						</div>
					</FormItem>
					<FormItem label="上传头像：" prop="userImage">
						<div style="width: 360px;">
							<div class="upload">
								<Upload name="fileName" ref="upload" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" type="drag" :action="$store.state.fileUrl+'/uploadPicture'" style="display: inline-block;width:58px;">
									<div style="width: 58px;height:58px;line-height: 58px;">
										<img v-if="!visible" src="../../../assets/img/model/model-add.png" alt="">
										<img style="width: 100%;height: 100%;" v-if="visible" class="img" :src="admin.userImage" />
									</div>
								</Upload>
							</div>
						</div>
					</FormItem>
				</Form>
			</div>
			<div class="model_operation">
				<button @click="insertUserBtn('formValidate')" class="model_operation_confirm">确定</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			changeBol() {
				return this.$store.state.admin.changeBol
			}, //修改模态框
			changeId(){
				return this.$store.state.admin.changeId
			},
			AdminId(){
				return JSON.parse(localStorage.gugeAdminUser).id
			}
		},
		props: {
			companyList: Array
		},
		data() {
			var validatetel = function(rule, value, callback) {
				if(value == '') {
					return callback(new Error('请输入手机号'));
				} else if(!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
					return callback(new Error('请输入正确手机号'));
				} else {
					callback();
				}
			};
			var validateName = function(rule, value, callback) {
				var reg = new RegExp("^[A-Za-z\u4e00-\u9fa5]\{2,6}$");
				if(value == ''){
					return callback(new Error('请输入真实姓名'));
				}else if(!reg.test(value)){
					return callback(new Error('中英文2-6位'));
				}else{
					callback();
				}
			};
			var validateCompanyIdArr = function(rule, value, callback) {
				if(value.length == 0) {
					return callback(new Error('请选择公司'));
				} else {
					callback();
				}
			};
			var validatePassword = function(rule, value, callback) {
				if(value == "") {
					return callback(new Error('请输入密码'));
				} else if(value.length < 6 || value.length > 12) {
					return callback(new Error('密码格式为6-12个字符'));
				} else {
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if(value == "") {
					return callback(new Error('请再次输入密码'));
				} else if(value != this.admin.password) {
					return callback(new Error('两次输入密码不一致'));
				} else {
					callback();
				}
			};
			var validateuser = function(rule, value, callback) {
				if(!value) {
					return callback(new Error('不能为空'));
				} else if(isNaN(value)) {
					return callback(new Error("只能为数字"));
				} else {
					callback();
				}
			};
			return {
				visible: false,
				companyArr: [],
				admin: {
					adminName: "",
					name: "",
					companyIdArr: [],
					userImage: "",
					password: "",
					pass: ""
				},
				indeterminate: true,
				checkAll: false,
				ruleValidate: {
					adminName: [{
						required: true,
						trigger: 'blur',
						validator: validatetel
					}],
					name: [{
						required: true,
						trigger: 'blur',
						validator: validateName
					}],
					companyIdArr: [{
						required: true,
						trigger: 'change',
						validator: validateCompanyIdArr
					}]
				}
			};
		},
		created() {

		},
		mounted() {

		},
		methods: {
			handleSuccess(res, file) {
				this.admin.userImage = res.result;
				this.visible = true;
			},
			updateAdminUser() {
				this.$axios.Account.updateAdminUser({
					data: {
						id: this.$store.state.admin.changeId / 1,
						adminName: this.admin.adminName,
						name: this.admin.name,
						companyId: this.admin.companyIdArr,
						userImage: this.admin.userImage
					},
					version: '2.0'
				}).then(res => {
					if(res.code == "1000"){
						this.$Message.error(res.msg);
						return ;
					}
					if(this.$store.state.admin.changeId == JSON.parse(localStorage.gugeAdminUser).id) {
						//当前用户 重新登陆
						this.$Message.success('修改成功,请重新登录！');
						this.$axios.Login.LoginOut({}).then(res => {
							localStorage.removeItem('gugeAdminUser');
							this.$router.push({
								name: 'login'
							});
						});
					} else {
						this.$Message.success('修改成功！');
						this.$axios.Account.selectAdminUserList({
							data: {
								adminName: "",
								name: "",
								companyId: "",
								adminId: JSON.parse(localStorage.gugeAdminUser).id
							},
							version: '2.0'
						}).then(res => {
							res.result.forEach(item => {
								if(item.id == 1) {
									item.companyName = "全部"
								}
							})
							this.$store.commit('setadminList', res.result);
						})
					}
					this.$store.commit('setchangeId', '');
					this.$store.commit('setchangeBol', false);
				})
			},
			//获取被修改账户的公司
			selectAdminUserById() {
				this.$axios.Account.selectAdminUserById({
					data: {
						id: this.$store.state.admin.changeId
					},
					version: "2.0"
				}).then(res => {
					this.admin.adminName = res.result.adminName;
					this.admin.name = res.result.name;
					this.admin.userImage = res.result.userImage;
					this.visible = res.result.userImage == '' ? false : true;
					if(res.result.companyId == undefined) {
						this.admin.companyIdArr = [];
					} else {
						this.admin.companyIdArr = res.result.companyId;
					}
					this.checkAllGroupChange(this.admin.companyIdArr);
				})
			},
			insertUserBtn(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.updateAdminUser();
					} else {
						this.$Message.error('请检查输入格式是否正确！');
					}
				})
			},
			insertAdminUser() {
				this.$axios.Account.insertAdminUser({
					data: {
						adminName: this.admin.adminName,
						name: this.admin.name,
						companyId: this.admin.companyIdArr,
						userImage: this.admin.userImage,
						password: this.admin.password,
						adminId: JSON.parse(localStorage.gugeAdminUser).id,
						level: JSON.parse(localStorage.gugeAdminUser).level
					},
					version: '2.0'
				}).then(res => {
					this.$Message.success('添加成功！');
					this.$emit('succeed', true);
					this.$store.commit('offMolde');
				})
			},
			handleCheckAll() {
				if(this.indeterminate) {
					this.checkAll = false;
				} else {
					this.checkAll = !this.checkAll;
				}
				this.indeterminate = false;
				if(this.checkAll) {
					this.companyArr.forEach(item => {
						this.admin.companyIdArr.push(item.id)
					})
				} else {
					this.admin.companyIdArr = [];
				}
			},
			checkAllGroupChange(data) {
				if(data.length === this.companyArr.length) {
					this.indeterminate = false;
					this.checkAll = true;
				} else if(data.length > 0) {
					this.indeterminate = true;
					this.checkAll = false;
				} else {
					this.indeterminate = false;
					this.checkAll = false;
				}
			},
			cancel() {
				this.$store.commit('setchangeId', '');
				this.$store.commit('setchangeBol', false);
			},
		},
		watch: {
			companyList(val) {
				this.companyArr = val;
			},
			changeBol(val) {
				if(val) {
					this.selectAdminUserById();
				}
			}
		}
	}
</script>