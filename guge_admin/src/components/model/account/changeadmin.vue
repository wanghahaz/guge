<style scoped lang="less">
	@import url("../less/commonality.less");

	.model_content {
		width: 90%;
		margin: 0 auto;
		border-bottom: 1px solid #E8E8E8;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		.ivu-input{
			height: 42px;
		}
	}
</style>

<template>
	<div v-show="changeAdminBol" class="model">
		<div style="height: 400px;" class="addcompany">
			<div class="model_top">
				<div class="model_top_title">
					<img src="../../../assets/img/account/accout-changePass.png" alt="">
					<span>密码重置</span>
				</div>
				<img @click="cancel" class="model_top_off" src="../../../assets/img/model/model_off.png" alt="">
			</div>
			<div class="model_content">
				<Form ref="formInline" :model="formInline" :rules="ruleInline">
			        <FormItem prop="pass">
			            <Input :maxlength="12" class="inputPass" type="password" v-model="formInline.pass" placeholder="请输入密码" style="width: 620px">
			                <Icon size="20" style="margin-top: 4px;" type="ios-lock-outline" slot="prefix" />
			            </Input>
			        </FormItem>
			        <FormItem prop="password">
			            <Input :maxlength="12" class="inputPass" type="password" v-model="formInline.password" placeholder="再次输入密码" style="width: 620px">
			                <Icon size="20" style="margin-top: 4px;" type="ios-lock-outline" slot="prefix" />
			            </Input>
			        </FormItem>
			   </Form>
			</div>
			<div>
				<div class="model_operation">
					<button @click="handleSubmit('formInline')" class="model_operation_confirm">确定</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		computed:{
	    	changeAdminBol(){
	    		return this.$store.state.admin.changeAdminBol
	    	}, //修改模态框
       	},
		data() {
			var that = this;
			var validatePass = function(rule, value, callback) {
                if(value == ""){
               		return callback(new Error('请输入密码'));
               	}else if(value.length < 6 || value.length > 12){
               		return callback(new Error('密码格式为6-12个字符'));
               	}else{
               		callback();
               	}
            };
            var validatePassCheck = function(rule, value, callback){
                if (value === '') {
                    return callback(new Error('请再次输入密码'));
                } else if (value !== that.formInline.pass) {
                    return callback(new Error('两次密码不一致'));
                } else {
                    callback();
                }
            };
			return {
				formInline: {
                   	pass: '',
                    password: ''
                },
                ruleInline: {
                    pass: [{validator: validatePass, trigger: 'blur' },{min:6,message:'请输入最少6位'}],
                    password: [{validator: validatePassCheck, trigger: 'blur' },{min:6,message:'请输入最少6位'}]
                }
			};
		},
		created() {

		},
		mounted() {

		},
		methods: {
			cancel(){
				this.$store.commit('setchangeAdminId', '');
				this.$store.commit('setchangeAdminBol',false);
			},
			handleSubmit(name) {
				var that = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        that.$axios.Account.updateAdminUserPssword({
							data: {
								id:that.$store.state.admin.changeAdminId/1,
								password:that.formInline.pass
							},
							version: '2.0'
						}).then(res => {
							this.$store.commit('setchangeAdminId', '');
							this.$store.commit('setchangeAdminBol',false);
							that.formInline.pass = '';
							that.formInline.password = '';
							if(res.code == '1000') {
								this.$Message.error('修改失败！');
							} else {
								this.$Message.success('修改成功！');
							}
						})
                    } else {
                        this.$Message.error('请输入检查输入是否正确');
                    }
                })
            }
		}
	}
</script>
