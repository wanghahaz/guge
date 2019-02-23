<style scoped lang="less">
	@import url("./less/awarded.less");
	.model {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.50);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 9;
	}
	
	.addcompany {
		width: 720px;
		height: 387px;
		background: white;
		display: flex;
		flex-direction: column;
	}
	
	.model_content {
		width: 100%;
		flex: 1;
	}
	
	.model_top {
		width: 100%;
		opacity: 0.75;
		background: #346EBC;
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	
	.model_top_title {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		color: #FFFFFF;
		img {
			width: 18px;
			height: 18px;
			margin-right: 10px;
		}
	}
	
	.model_top_off {
		width: 20px;
		height: 20px;
		position: absolute;
		top: 20px;
		right: 20px;
	}
	
	.model_operation {
		width: 100%;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.model_operation_confirm {
		background: #346EBC;
		border-radius: 3px;
		width: 78px;
		height: 34px;
		font-size: 16px;
		color: #FFFFFF;
		border: none;
	}
	
	.model_operation_cancel {
		border: 1px solid #CCCCCC;
		border-radius: 3px;
		width: 78px;
		height: 34px;
		font-size: 16px;
		color: #BBBBBB;
		background: white;
		margin-left: 50px;
	}
	
	.model_content {
		width: 90%;
		margin: 20px auto;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		color: #303133;
	}
	.page{
		margin-top: 50px;
	}
</style>

<template>
	<div>
		<div class="awarded_header">
			<div>
				<span>追授股数</span>
				<span>——  历史记录</span>
				<div class="aadiv cursor_pointer" @click="addHistoryBol = true;formInline.time = ''">
					<img src="../../assets/img/company/company-add.png">
					<span>添加</span>
				</div>
			</div>
			
			<getback></getback>
		</div>
		<card class="cards">
			<Table class="awarded_table" border stripe :columns="columns" :data="CompanyHistoryList"></Table>
		</card>
		<Page 
			class="page" 
			:current="current"
			:total="total" 
			:page-size="pageSize"
			@on-change="selectSharesAwardedList"/>
		<div v-if="addHistoryBol" class="model">
			<div style="height: 300px;" class="addcompany">
				<div class="model_top">
					<div class="model_top_title">
						<img src="@/assets/img/company/company-add.png" alt="">
						<span>添加</span>
					</div>
					<img  @click="addHistoryBol = false" class="model_top_off" src="@/assets/img/model/model_off.png" alt="">
				</div>
				<div class="model_content">
					<Form label-position="right" style="margin-top: 50px;" :label-width="150" ref="formInline" :model="formInline" :rules="ruleValidate">
				        <FormItem label="追授股数：" prop="sharesAwarded">
				            <Input style="width: 350px;" v-model="formInline.sharesAwarded"></Input>
				        </FormItem>
						<FormItem label="追授时间：">
				             <DatePicker v-model="formInline.time" type="datetime" placeholder="请选择授权时间" style="width: 200px"></DatePicker>
				        </FormItem>
				    </Form>
				</div>
				<div>
					<Divider style="width: 90%;margin:auto;" />
					<div class="model_operation">
						<button @click="handleSubmit('formInline')" class="model_operation_confirm">确定</button>
						<button  @click="addHistoryBol = false" class="model_operation_cancel">取消</button>
					</div>
				</div>
			</div>
		</div>
		<div v-if="changeHistoryBol" class="model">
			<div style="height: 300px;" class="addcompany">
				<div class="model_top">
					<div class="model_top_title">
						<img src="../../assets/img/company/company-amend.png" alt="">
						<span>修改</span>
					</div>
					<img  @click="changeHistoryBol = false;formInline.sharesAwarded = ''" class="model_top_off" src="@/assets/img/model/model_off.png" alt="">
				</div>
				<div class="model_content">
					<Form label-position="right" style="margin-top: 50px;" :label-width="150" ref="formInline" :model="formInline" :rules="ruleValidate">
				        <FormItem label="追授股数：" prop="sharesAwarded">
				            <Input style="width: 350px;" v-model="formInline.sharesAwarded"></Input>
				        </FormItem>
						<FormItem label="追授时间：">
				            <DatePicker v-model="formInline.time" type="datetime" placeholder="请选择授权时间" style="width: 200px"></DatePicker>
				        </FormItem>
				    </Form>
				</div>
				<div>
					<Divider style="width: 90%;margin:auto;" />
					<div class="model_operation">
						<button @click="changeHistoryBtn('formInline')" class="model_operation_confirm">确定</button>
						<button  @click="changeHistoryBol = false;formInline.sharesAwarded = ''"  class="model_operation_cancel">取消</button>
					</div>
				</div>
			</div>
		</div>
		
		<div v-if="delHistoryBol" class="model">
			<div style="height: 38.6%;" class="addcompany">
				<div class="model_top">
					<div class="model_top_title">
						<img src="../../assets/img/company/company-del.png" alt="">
						<span>删除</span>
					</div>
					<img  @click="delHistoryBol = false" class="model_top_off" src="@/assets/img/model/model_off.png" alt="">
				</div>
				<div class="model_content">
					<div style="color: red;">
						您确定删除该追授股数吗？
					</div>
				</div>
				<div>
					<Divider style="width: 90%;margin:auto;" />
					<div class="model_operation">
						<button @click="del" class="model_operation_confirm">确定</button>
						<button  @click="delHistoryBol = false" class="model_operation_cancel">取消</button>
					</div>
				</div>
			</div>
		</div>
		
		
		
	</div>
</template>

<script>
	import addawarded from '@/components/model/objects/addawarded.vue'
	import changeImg from '@/assets/img/feedback/h5-changeAdmin.png'
	import delImg from '@/assets/img/objects/objects-del.png'
	export default {
		components: {
			addawarded
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
				formInline: {
					sharesAwarded:"",
                    applicationTime: '',
					rightNumber: '',
					time:''
                },
                ruleValidate: {
					sharesAwarded: [{
						required: true,
						trigger: 'blur',
						validator:validateuser
					}]
				},
				addHistoryBol:false,
				delHistoryBol:false,
				changeHistoryBol:false,
				pageSize: 0, //每页显示条数
				total: 0, //总条数
				current: 1, //当前页数
				HistoryId: "",
				HistoryTime: "",
				CompanyHistoryList: [],
				columns: [{
					title: '序号',
					type: 'index',
					align: 'center',
				}, {
					title: '追授股数',
					align: 'center',
					key: 'num_shares_awarded'
				}, {
					title: '操作日期',
					align: 'center',
					key: 'createTime'
				}, {
					title: '操作',
					key: 'action',
					align: 'center',
					render: (h, params) => {
						return h('div', [
							h('img', {
								props: {
									type: 'primary'
								},
								attrs: {
									src: changeImg,
									style: 'width: 22px;height: 22px;'
								},
								on: {
									click: () => {
										console.log( params.row)
										this.changeHistoryBol = true;
										this.HistoryId = params.row.id;
										this.HistoryTime = params.row.recordTime;
										this.formInline.sharesAwarded = params.row.num_shares_awarded;
										this.formInline.time = params.row.createTime;
									}
								}
							}),
							h('img', {
								props: {
									type: 'primary'
								},
								attrs: {
									src: delImg,
									style: 'width: 22px;height: 22px;margin-left: 20px;'
								},
								on: {
									click: () => {
										this.delHistoryBol = true;
										this.HistoryId = params.row.id;
										this.HistoryTime = params.row.recordTime;
									}
								}
							})
						]);
					}
				}]
			};
		},
		created() {

		},
		mounted() {
			this.selectSharesAwardedList(1)
		},
		methods: {
			del() {
				this.$axios.Objects.deleteSharesAwarded({
					data: {
						id:this.HistoryId / 1
					},
					version: '2.0'
				}).then(res => {
					this.$Message.success(res.msg);
					this.selectSharesAwardedList(1);
					this.delHistoryBol = false;
				});
			},
			handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
						this.addSharesAwarded();
                    } else {
                        this.$Message.error(' 请检查输入格式是否正确或者是否填写完整！');
                    }
                })
            },
			changeHistoryBtn(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
						this.$axios.Objects.updateSharesAwarded({
							data: {
								id:this.HistoryId / 1,
								sharesAwarded:this.formInline.sharesAwarded
							},
							version: '2.0'
						}).then(res => {
							this.$Message.success('修改成功！');
							this.formInline.sharesAwarded = "";
							this.formInline.time="";
							this.changeHistoryBol = false;
							this.selectSharesAwardedList(1);
							
						})
                    } else {
                        this.$Message.error('不能为空!');
                    }
                })
            },
            addSharesAwarded(){
				var date='';
				if(this.formInline.time){
					date=this.$util.formatDate(this.formInline.time,'yyyy-mm-dd hh:mm:ss')
				}	
            	this.$axios.Objects.addSharesAwarded({
					data: {
						userId:this.$route.query.data / 1,
						sharesAwarded:this.formInline.sharesAwarded,
						time:date
					},
					version: '2.0'
				}).then(res => {
					this.$Message.success('新增成功！');
					this.formInline.sharesAwarded = "";
					this.formInline.time="";
					this.addHistoryBol = false;
					this.selectSharesAwardedList(1);
					
				})
            },
			selectSharesAwardedList(e) {
				this.$axios.Objects.selectSharesAwardedList({
					data: {
						userId:this.$route.query.data / 1,
						pageNum:e,
					    type:"1"
					},
					version: '2.0'
				}).then(res => {
					this.CompanyHistoryList = res.result.list;
					this.total = res.result.total / 1;
					this.pageSize = res.result.pageSize / 1;
					if(res.result.pageNum == 0) {
						this.current = 1
					} else {
						this.current = res.result.pageNum / 1;
					}
				})
			}
		}
	}
</script>