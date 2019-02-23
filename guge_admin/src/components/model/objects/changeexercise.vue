<style scoped lang="less">
	@import url("../less/commonality.less");
	.model_content {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.ivu-input {
		height: 42px;
	}
</style>

<template>
	<div v-show="show" class="model">
		<div class="addcompany">
			<div class="model_top">
				<div class="model_top_title">
					<img src="../../../assets/img/feedback/h5-Admin.png" alt="">
					<span>{{title}}</span>
				</div>
				<img @click="$store.commit('offMolde')" class="model_top_off" src="../../../assets/img/model/model_off.png" alt="">
			</div>
			<div class="model_content">
				<Form :rules="ruleValidate" ref="formInline" :model="formInline" label-position="right" :label-width="150">
					<FormItem prop="approval" :label="formitem.top">
		                <Input v-model="formInline.approval" style="width: 300px" />
		            </FormItem>
			        <FormItem :label="formitem.bottom" prop="receivables">
			           	<Input v-model="formInline.receivables" style="width: 300px" />
			        </FormItem>
				</Form>
			</div>
			<div>
				<Divider style="width: 90%;margin:auto;" />
				<div class="model_operation">
					<button @click="handleSubmit('formInline')" class="model_operation_confirm">确定</button>
					<button @click="$store.commit('offMolde')" class="model_operation_cancel">取消</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			show: Boolean,
			chageExerciseObj:{}
		},
		data() {
			var  validateuser = function(rule, value, callback){
                if(!value){
                    return callback(new Error('不能为空'));
                }else if(isNaN(value)){
                    return callback(new Error("只能为数字"));
                }else{
                    callback();
                }
            };
			return {
				userId:"",
				title: '修改行权申请',
				formitem:{
					top:"批准行权股数：",
					bottom:"已收款："
				},
				formInline: {
                    approval: '',
                    receivables: ''
                },
                ruleValidate: {
					approval: [{
						required: true,
						trigger: 'blur',
						validator:validateuser
					}],
					receivables: [{
						required: true,
						trigger: 'blur',
						validator:validateuser
					}]
				}
			};
		},
		created() {

		},
		mounted() {
			
		},
		methods: {
			handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
						this.updateRightRecordById();
                    } else {
                        this.$Message.error('不能为空');
                    }
                })
            },
            updateRightRecordById(){
				this.$axios.Objects.updateRightRecordById({
					data: {
						id:this.userId/1,
						approval:String(this.formInline.approval),
						receivables:String(this.formInline.receivables)
					},
					version: '2.0'
				}).then(res => {
					this.formInline.approval = '';
					this.formInline.receivables = '';
					this.$store.commit('offMolde');
					this.$Message.success('设置成功！');
					this.$emit('succeed',true);
				})
			},
			selectRightRecordById(){
				this.$axios.Objects.selectRightRecordById({
					data: {
						id:this.userId/1
					},
					version: '2.0'
				}).then(res => {
					this.formInline.approval = res.result.approval;
					this.formInline.receivables = res.result.receivables;
				})
			}
		},
		watch: {
			chageExerciseObj(newVal, oldVal){
				this.userId = newVal.userId;
				this.selectRightRecordById();
				if(newVal.type == 1){
					var obj = {
						top:"批准行权股数：",
						bottom:"已收款："
					}
					this.formitem = obj;
					this.title = "设置行权申请";
				}else if(newVal.type == 2){
					var obj = {
						top:"批准退还股数：",
						bottom:"已付款："
					}
					this.formitem = obj;
					this.title = "设置回购申请";
				}else if(newVal.type == 3){
					var obj = {
						top:"批准转让股数：",
						bottom:"已补款："
					}
					this.formitem = obj;
					this.title = "设置转让申请";
				}
				
			}
//			ercise(newVal, oldVal) {
//				if(newVal.result.type == 1){
//					var obj = {
//						top:"批准行权股数：",
//						bottom:"已收款："
//					}
//					this.formitem = obj;
//					this.title = "添加行权申请";
//				}else if(newVal.result.type == 2){
//					var obj = {
//						top:"批准退还股数：",
//						bottom:"已付款："
//					}
//					this.formitem = obj;
//					this.title = "添加回购申请";
//				}else if(newVal.result.type == 3){
//					var obj = {
//						top:"批准转让股数：",
//						bottom:"已补款："
//					}
//					this.formitem = obj;
//					this.title = "添加转让申请";
//				}
//			}
		}
	}
</script>