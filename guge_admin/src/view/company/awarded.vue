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
		/*position: fixed;
		bottom: 150px;
		left:50px;*/
		margin-top: 50px;
	}
</style>

<template>
	<div>
		<div class="awarded_header">
			<div>
				<span>{{$route.query.title}}</span>
				<span>——  历史记录</span>
				<getback></getback>
			</div>
			<div class="cursor_pointer" @click="addHistoryBol = true">
				<img src="../../assets/img/company/company-add.png">
				<span>添加</span>
			</div>
		</div>
		<card class="cards">
			<Table class="awarded_table" border stripe :columns="columns" :data="CompanyHistoryList"></Table>
		</card>
		<Page 
			class="page" 
			:current="current"
			:total="total" 
			:page-size="pageSize"
			@on-change="selectCompanyHistoryList"/>
		<div v-if="addHistoryBol" class="model">
			<div style="height: 380px;" class="addcompany">
				<div class="model_top">
					<div class="model_top_title">
						<img src="@/assets/img/company/company-add.png" alt="">
						<span>添加</span>
					</div>
					<img  @click="addHistoryBol = false" class="model_top_off cursor_pointer" src="@/assets/img/model/model_off.png" alt="">
				</div>
				<div class="model_content">
					<Form label-position="right" style="margin-top: 50px;" :label-width="150" ref="formInline" :model="formInline" :rules="ruleValidate">
				        <FormItem prop="applicationTime" label="操作日期：">
			                <DatePicker style="width: 200px;" type="date" v-model="formInline.applicationTime"></DatePicker>
			            </FormItem>
				        <FormItem :label="$route.query.title+'：'" prop="rightNumber">
				            <Input style="width: 200px;" v-model="formInline.rightNumber"></Input>
				        </FormItem>
				    </Form>
				</div>
				<div>
					<Divider style="width: 90%;margin:auto;" />
					<div class="model_operation">
						<button @click="handleSubmit('formInline')" class="model_operation_confirm cursor_pointer">确定</button>
						<button  @click="addHistoryBol = false" class="model_operation_cancel cursor_pointer">取消</button>
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
						您确定删除该历史记录吗？
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
        	var  validateusers = function(rule, value, callback){
                if(!value){
                    return callback(new Error('不能为空'));
                }else{
                    callback();
                }
            };
			return {
				formInline: {
                    applicationTime: '',
                    rightNumber: ''
                },
                ruleValidate: {
					applicationTime: [{
						required: true,
						trigger: 'blur',
						validator:validateusers
					}],
					rightNumber: [{
						required: true,
						trigger: 'blur',
						validator:validateuser
					}]
				},
				addHistoryBol:false,
				delHistoryBol:false,
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
					title: '总股数',
					align: 'center',
					key: 'sharesNum'
				}, {
					title: '操作日期',
					align: 'center',
					key: 'recordTime'
				}, {
					title: '操作',
					key: 'action',
					align: 'center',
					render: (h, params) => {
						var state = 'none';
						if(params.row.flag == 1) {
							state = 'inline-block';
						}
						return h('div', [
							h('img', {
								props: {
									type: 'primary'
								},
								attrs: {
									src: delImg,
									style: 'width: 22px;height: 22px;'
								},
								style: {
									display: state
								},
								on: {
									click: () => {
										this.delHistoryBol = true;
										this.HistoryId = params.row.id;
										this.HistoryTime = params.row.recordTime;
									}
								}
							})
//							h('Button', {
//								props: {
//									type: 'error',
//									size: 'small'
//								},
//								style: {
//									marginRight: '5px',
//									display: state
//								},
//								on: {
//									click: () => {
//										this.Modal = true;
//										this.HistoryId = params.row.id;
//										this.HistoryTime = params.row.recordTime;
//									}
//								}
//							}, '删除')
						]);
					}
				}]
			};
		},
		created() {

		},
		mounted() {
			this.changeColumns();
			this.selectCompanyHistoryList(1)
		},
		methods: {
			del() {
				this.$axios.Company.delectCompanyHistory({
					data: {
						companyId:this.HistoryId / 1,
    					recordTime:this.HistoryTime
					},
					version: '2.0'
				}).then(res => {
					this.$Message.success(res.msg);
					this.selectCompanyHistoryList(1);
					this.delHistoryBol = false;
				});
			},
			handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
						this.addCompanyHistory();
                    } else {
                        this.$Message.error('请检查是否输入正确!');
                    }
                })
            },
            addCompanyHistory(){
            	var data = {
            		id:0,
					registeredCapital:"",
					sharesNum:"",
					currentValuationWhole:"",
					netAssetsWhole:"",
					distributiveProfit:"",
					totalNumPool:"",
					currentValuationPer:"",
					netAssetsPer:"",
					recordTime:""
            	};
            	data.id = this.$route.query.id/1;
            	data[this.$route.query.key] = this.formInline.rightNumber;
            	data.recordTime = this.formattingDate(this.formInline.applicationTime);
            	this.$axios.Company.addCompanyHistory({
					data,
					version: '2.0'
				}).then(res => {
					if(res.code == '1000') {
						this.$Message.error(res.msg);
					} else {
						this.$Message.success(res.msg);
						this.formInline.rightNumber = "";
						this.formInline.applicationTime = "";
						this.addHistoryBol = false;
						this.selectCompanyHistoryList(1);
					}
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
			},
			selectCompanyHistoryList(e) {
				this.$axios.Company.selectCompanyHistoryList({
					data: {
						id: this.$route.query.id / 1,
						pageNum: e
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
			},
			changeColumns() {
				this.columns[1].title = this.$route.query.title;
				this.columns[1].key = this.$route.query.key;
			}
		}
	}
</script>