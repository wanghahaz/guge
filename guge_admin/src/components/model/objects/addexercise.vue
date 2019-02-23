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
					<img src="../../../assets/img/company/company-add.png" alt="">
					<span>{{title}}</span>
				</div>
				<img @click="$store.commit('offMolde')" class="model_top_off" src="../../../assets/img/model/model_off.png" alt="">
			</div>
			<div style="width: 100%;height: 220px;display: flex;justify-content: center;align-items: center;">
				<Form 
					ref="formInline" 
					:model="formInline" 
					label-position="right" 
					:label-width="100"
					:rules="ruleValidate">
					<FormItem label="申请时间：" prop="applicationTime" >
		                <DatePicker style="width: 200px;" type="date" v-model="formInline.applicationTime"></DatePicker>
		            </FormItem>
			        <FormItem :label="formitem_bottom" prop="rightNumber">
			            <Input style="width: 200px;" v-model="formInline.rightNumber"></Input>
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
			addexercise:{}
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
				type:"1",
				title: '添加行权申请',
				formitem_bottom:'申请行权股数:',
				formInline: {
                    applicationTime: '',
                    rightNumber: ''
                },
                ruleValidate: {
					applicationTime: [{
						required: true,
						trigger: 'blur',
						validator:validateuser
					}],
					rightNumber: [{
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
						this.insertRightRecord();
                    } else {
                        this.$Message.error('不能为空');
                    }
                })
            },
            insertRightRecord(){
            	this.$axios.Objects.insertRightRecord({
					data: {
						userId:this.userId / 1,
						rightNumber:this.formInline.rightNumber,
						applicationTime:this.formattingDate(this.formInline.applicationTime),
						type:this.type
					},
					version: '2.0'
				}).then(res => {
					this.formInline.rightNumber = '';
					this.formInline.applicationTime = '';
					this.$store.commit('offMolde');
					this.$Message.success('添加成功！');
					this.$emit('succeed',true);
				})
            },
            formattingDate(time){
				if(typeof(time) == 'string'){
					return time;
				}else{
					var year = time.getFullYear();
					var month = change(time.getMonth()+1);
					var day = change(time.getDate());
					var hour = change(time.getHours());
					var minute = change(time.getMinutes());
					var second = change(time.getSeconds());
					function change(t){
					    if(t<10){
					    	return "0"+t;
					    }else{
					     	return t;
					    }
					}
					var times = year+'-'+month+'-'+day;
					return times;
				}
			}
		},
		watch: {
			addexercise(newVal,oldVal){
				this.userId = newVal.userId;
				if(newVal.type == 1){
					this.title = '添加行权申请';
					this.formitem_bottom = '申请行权股数:';
					this.type = "1";
				}else if(newVal.type == 2){
					this.title = "添加回购申请";
					this.formitem_bottom = '申请回购股数:';
					this.type = "2";
				}else if(newVal.type == 3){
					this.title = "添加转让申请";
					this.formitem_bottom = '申请转让股数:';
					this.type = "3";
				}
			}
		}
	}
</script>