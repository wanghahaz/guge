<style scoped lang="less">
	@import url("./less/setparameter.less");
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s
	}
	
	.fade-enter,
	.fade-leave-active {
		opacity: 0
	}
</style>

<template>
	<div>
		<div class="setparameter_header">
			<div class="setparameter_header_left">
				<span class="setparameter_header_left_companyName">{{companyName}}</span>
				<getback></getback>
			</div>
			<div @mouseleave="exports = false"  @mouseenter="exports = true" @click="downLoad" class="setparameter_header_export">
				<img v-if="exports"src="../../assets/img/company/company-export.png" alt="">
				<img v-else src="../../assets/img/objects/objects-export.png" alt="">
				<span>导出</span>
			</div>
		</div>
		<div class="setparameter_content">
			<Form ref="parameterForm" :model="parameter" :rules="ruleValidate" label-position="right" :label-width="150" class="setparameter_content_from">
				<div class="setparameter_content_from_top">
					<div>
						<div class="setparameter_content_from_FormItem">
							<FormItem style="width: 500px;" label="当前注册资本：" prop="registeredCapital">
								<Input v-model="parameter.registeredCapital" style="width: 300px;"></Input>
							</FormItem>
							<span @click="router_pushHistory('registeredCapital', '当前注册资本')" class="setparameter_content_from_history">历史记录</span>
						</div>
						<div class="setparameter_content_from_FormItem">
							<FormItem style="width: 500px;" label="当前总股数：" prop="sharesNum">
								<Input v-model="parameter.sharesNum" style="width: 300px;"></Input>
							</FormItem>
							<span @click="router_pushHistory('sharesNum', '当前总股数')" class="setparameter_content_from_history">历史记录</span>
						</div>
						<div class="setparameter_content_from_FormItem">
							<FormItem style="width: 500px;" label="当前可分配利润：" prop="distributiveProfit">
								<Input v-model="parameter.distributiveProfit" style="width: 300px;"></Input>
							</FormItem>
							<span @click="router_pushHistory('distributiveProfit', '当前可分配利润')" class="setparameter_content_from_history">历史记录</span>
						</div>
						<div class="setparameter_content_from_FormItem">
							<FormItem style="width: 500px;" label="当前期权池总数：" prop="totalNumPool">
								<Input v-model="parameter.totalNumPool" style="width: 300px;"></Input>
							</FormItem>
							<span @click="router_pushHistory('totalNumPool', '当前期权池总数')" class="setparameter_content_from_history">历史记录</span>
						</div>
					</div>
					<div>
						<div class="setparameter_content_from_FormItem">
							<FormItem style="width:500px;" label="当前估值（整体）：" prop="currentValuationWhole">
								<Input v-model="parameter.currentValuationWhole" style="width: 300px;"></Input>
							</FormItem>
							<span @click="router_pushHistory('currentValuationWhole', '当前估值（整体）')" class="setparameter_content_from_history">历史记录</span>
						</div>
						<div class="setparameter_content_from_FormItem">
							<FormItem style="width: 500px;" label="当前估值（每股）：" prop="currentValuationPer">
								<!--<Input v-model="parameter.currentValuationPer" style="width: 300px;"></Input>-->
								<span style="font-weight: 900;">{{parameter.currentValuationPer}}</span>
							</FormItem>
							<span @click="router_pushHistory('currentValuationPer', '当前估值（每股）')" class="setparameter_content_from_history">历史记录</span>
						</div>
						<div class="setparameter_content_from_FormItem">
							<FormItem style="width: 500px;" label="当前净资产（整体）：" prop="netAssetsWhole">
								<Input v-model="parameter.netAssetsWhole" style="width: 300px;"></Input>
							</FormItem>
							<span @click="router_pushHistory('netAssetsWhole', '当前净资产（整体）')" class="setparameter_content_from_history">历史记录</span>
						</div>
						<div class="setparameter_content_from_FormItem">
							<FormItem style="width: 500px;" label="当前净资产（每股）：" prop="netAssetsPer">
								<!--<Input v-model="parameter.netAssetsPer" style="width: 300px;"></Input>-->
								<span style="font-weight: 900;">{{parameter.netAssetsPer}}</span>
							</FormItem>
							<span @click="router_pushHistory('netAssetsPer', '当前净资产（每股）')" class="setparameter_content_from_history">历史记录</span>
						</div>
					</div>
				</div>
				<div class="setparameter_content_from_buttom">
					<div class="red_fromitem">
						<FormItem label="首次可行权日：" prop="oneFrame">
							<Input v-model="parameter.oneFrame" style="width: 80px;"></Input>
						</FormItem>
					</div>
					<div class="green_fromitem">
						<FormItem label="后续第一年届满日：" prop="twoFrame">
							<Input v-model="parameter.twoFrame" style="width: 80px;"></Input>
						</FormItem>
					</div>
					<div class="green_fromitem">
						<FormItem label="后续第二年届满日：" prop="threeFrame">
							<Input v-model="parameter.threeFrame" style="width: 80px;"></Input>
						</FormItem>
					</div>
					<div class="green_fromitem">
						<FormItem label="后续第三年届满日：" prop="fourFrame">
							<Input v-model="parameter.fourFrame" style="width: 80px;"></Input>
						</FormItem>
					</div>
					<div class="red_fromitem">
						<FormItem label="成熟期届满日：" prop="FiveFrame">
							<Input v-model="parameter.FiveFrame" style="width: 80px;"></Input>
						</FormItem>
					</div>
				</div>
				<div class="setparameter_content_btn">
					<Button @click="parameterFormBtn('parameterForm')" style="background: #346EBC;color: white;width: 78px;">确定</Button>
					<Button @click="changehistoryBol" style="margin-left: 50px;width: 104px;color: #346EBC;">全部历史记录</Button>
				</div>
			</Form>
		</div>
		<transition name="fade">
			<card id="headerCard" transiton="fade" v-if="historyBol" class="cards">
				<Table style="margin: 20px 0;" border stripe :columns="columns" :data="history"></Table>
			</card>
		</transition>
	</div>
</template>

<script>
	export default {
		data() {
			var validateuser = function(rule, value, callback) {
				if(value === "") {
					return callback(new Error("不能为空"));
				} else if(isNaN(value)) {
					return callback(new Error("只能为数字"));
				} else {
					callback();
				}
			};
			return {
				exports:false,
				historyBol: false,
				parameter: {},
				companyName: "",
				ruleValidate: {
					sharesNum: [{
						required: true,
						trigger: 'blur',
						validator: validateuser
					}],
					totalNumPool: [{
						required: true,
						trigger: 'blur',
						validator: validateuser
					}],
					currentValuationWhole: [{
						required: true,
						trigger: 'blur',
						validator: validateuser
					}],
					netAssetsWhole: [{
						required: true,
						trigger: 'blur',
						validator: validateuser
					}],
					oneFrame: [{
						required: true,
						trigger: 'blur',
						validator: validateuser
					}],
					twoFrame: [{
						required: true,
						trigger: 'blur',
						validator: validateuser
					}],
					threeFrame: [{
						required: true,
						trigger: 'blur',
						validator: validateuser
					}],
					fourFrame: [{
						required: true,
						trigger: 'blur',
						validator: validateuser
					}],
					FiveFrame: [{
						required: true,
						trigger: 'blur',
						validator: validateuser
					}],
				},
				columns: [{
						title: '记录日期',
						key: 'recordTime'
					},
					{
						title: '注册资本',
						key: 'registeredCapital'
					},
					{
						title: '总股数',
						key: 'sharesNum'
					},
					{
						title: '可分配利润',
						key: 'distributiveProfit'
					},
					{
						title: '期权池总数',
						key: 'totalNumPool'
					},
					{
						title: '当前估值（整体）',
						key: 'currentValuationWhole'
					},
					{
						title: '当前估值（每股）',
						key: 'currentValuationPer'
					},
					{
						title: '净资产（整体）',
						key: 'netAssetsWhole'
					},
					{
						title: '净资产（每股）',
						key: 'netAssetsPer'
					}
				],
				history: []
			};
		},
		created() {

		},
		mounted() {
			this.selectCompanyById();
			this.selectCompanyHistoryList();
		},
		methods: {
			changehistoryBol() {
				this.historyBol = !this.historyBol;
				if(this.historyBol){
					
				}
			},
			//导出
			downLoad() {
				var str = this.$store.state.fileUrl + "/downLoadExcelCompanyHistory?companyId=" + this.$route.query.data
				window.location.href = str;
			},
			//公司参数历史纪录
			selectCompanyHistoryList() {
				this.$axios.Company.selectCompanyHistoryList({
					data: {
						id: this.$route.query.data / 1,
						pageNum: 1
					},
					version: "2.0"
				}).then(res => {
					res.result.list.forEach(item=>{
						item.recordTime = item.recordTime.substring(0,7);
					})
					this.history = res.result.list;
				})
			},
			//更新公司参数
			updateCompanyParameter() {
				this.$axios.Company.updateCompanyParameter({
					data: {
						id: this.$route.query.data / 1,
						registeredCapital: String(this.parameter.registeredCapital),
						sharesNum: String(this.parameter.sharesNum),
						currentValuationWhole: String(this.parameter.currentValuationWhole),
						netAssetsWhole: String(this.parameter.netAssetsWhole),
						distributiveProfit: String(this.parameter.distributiveProfit),
						totalNumPool: String(this.parameter.totalNumPool),
						oneFrame: String(this.parameter.oneFrame),
						twoFrame: String(this.parameter.twoFrame),
						threeFrame: String(this.parameter.threeFrame),
						fourFrame: String(this.parameter.fourFrame),
						fiveFrame: String(this.parameter.FiveFrame)
					},
					version: "2.0"
				}).then(res => {
					this.$Message.success('设置成功！');
					this.selectCompanyById();
				})
			},
			//表单验证
			parameterFormBtn(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.updateCompanyParameter();
					} else {
						this.$Message.error('请检查输入格式是否正确！');
					}
				})
			},
			//获取当前公司参数
			selectCompanyById() {
				this.$axios.Company.selectCompanyById({
					data: {
						id: this.$route.query.data / 1
					},
					version: "2.0"
				}).then(res => {
					this.parameter = res.result;
					this.companyName = res.result.companyName;
				})
			},
			router_pushHistory(key, title) {
				this.$router.push({
					name: 'awarded',
					query: {
						id: this.$route.query.data,
						key,
						title
					}
				});
			}
		}
	}
</script>