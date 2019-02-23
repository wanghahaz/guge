<style scoped lang="less">
	@import url("./less/company.less");
</style>

<template>
	<div>
		<div class="company_header">
			<div v-if="level == 1" @click="changeModel('addcompanyShow',true)" class="company_header_add cursor_pointer">
				<img src="@/assets/img/company/company-add.png" alt="">
				<span>添加公司</span>
			</div>
			<div v-else></div>
			<div class="company_header_search">
				<Select @on-change="changeCompanyId" v-model="companyId" class="Select">
					<Option v-for="item in companyList" :value="item.id" :key="item.companyName">{{ item.companyName }}</Option>
				</Select>
				<Input clearable v-model="companyName" placeholder="请输入公司名称关键字" class="Input" />
				<div @click="selectCompanyListByAdminId(undefined)" class="company_header_search_btn cursor_pointer">
					<img src="@/assets/img/company/company-search.png" alt="">
					<span>搜索</span>
				</div>
			</div>
		</div>
		<Card class="company_Card">
			<div class="company_Card_header">
				<div class="company_Card_header_left">
					<div class="company_Card_header_left_user">
						<!--<img class="home-user" style="border-radius: 50%;" :src="userImage" alt="">-->
						<img class="home-user" v-if = "userImageBol" style="border-radius: 50%;" src="../../assets/img/home/home-user.png"/>
						<img class="home-user" v-else style="border-radius: 50%;" :src="userImage"/>
						<div class="user_msg">
							<span class="company_name">{{companyMsg.companyName}}</span>
							<div>
								<span>{{companyMsg.createTime}} 创建</span>
								<div class="cursor_pointer" @click="changeModel('changecompanyShow',true)">
									<img src="../../assets/img/feedback/h5-changeAdmin.png" alt="">
								</div>
								<div class="cursor_pointer" v-if="level == 1" @click="changeModel('delcompanyShow',true)">
									<img src="../../assets/img/company/company-del.png" alt="">
								</div>
							</div>
						</div>
					</div>
					<!--<div @click="texteDitorShow('incentiveShow')" class="company_Card_header_left_btn">-->
					<div @mouseleave="plans = false"  @mouseenter="plans = true" @click="incentiveShow = true" class="company_Card_header_left_btn cursor_pointer">
						<img v-if="plans" src="../../assets/img/company/company-plan.png" alt="">
						<img v-else src="../../assets/img/company/company-plans.png" alt="">
						<span>激励计划</span>
					</div>
					<!--<div @click="texteDitorShow('supportiveShow')" class="company_Card_header_left_btn">-->
					<div @mouseleave="mating = false"  @mouseenter="mating = true" @click="supportiveShow = true" class="company_Card_header_left_btn cursor_pointer">
						<img v-if="mating" src="../../assets/img/company/company-matings.png" alt="">
						<img v-else src="../../assets/img/company/company-mating.png" alt="">
						<span>配套文件</span>
					</div>
				</div>
				<div class="company_Card_header_right">
					<div @mouseleave="major = false"  @mouseenter="major = true" class="cursor_pointer" @click="router_push('setparameter',companyId)">
						<img v-if="major" src="../../assets/img/company/company-majors.png" alt="">
						<img v-else src="../../assets/img/company/company-major.png" alt="">
						<span>专业入口</span>
					</div>
				</div>
			</div>
			<div class="company_content">
				<div class="company_content_msg">
					<div class="number">
						<input v-if="contentNum == 1" @blur="changeCompanyMsg('currentValuationWhole')" v-model.number="companyMsg.currentValuationWhole" />
						<span class="cursor_pointer" :title="companyMsg.currentValuationWhole" v-else @click="contentNum=1">￥{{companyMsg.currentValuationWhole}}</span>
					</div>
					<div class="company_content_title">
						<span>当前估值（整体）</span>
						<div class="cursor_pointer" @click="router_pushHistory('currentValuationWhole', '当前估值（整体）')">
							<img src="../../assets/img/company/company-history.png" alt="">
						</div>
					</div>
				</div>
				<div class="company_content_msg">
					<div class="number">
						<input v-if="contentNum == 2" @blur="changeCompanyMsg('sharesNum')" v-model.number="companyMsg.sharesNum" />
						<span class="cursor_pointer" :title="companyMsg.sharesNum" v-else @click="contentNum=2">{{companyMsg.sharesNum}}</span>
						
					</div>
					<div class="company_content_title">
						<span>当前总股数</span>
						<div class="cursor_pointer" @click="router_pushHistory('sharesNum', '当前总股数')">
							<img src="../../assets/img/company/company-history.png" alt="">
						</div>
					</div>
				</div>
				<div class="company_content_msg">
					<div class="number">
						<input v-if="contentNum == 3" @blur="changeCompanyMsg('totalNumPool')" v-model.number="companyMsg.totalNumPool" />
						<span class="cursor_pointer" :title="companyMsg.totalNumPool" v-else @click="contentNum=3">{{companyMsg.totalNumPool}}</span>
					</div>
					<div class="company_content_title">
						<span>当前期权池总数</span>
						<div class="cursor_pointer" @click="router_pushHistory('totalNumPool', '当前期权池总数')">
							<img src="../../assets/img/company/company-history.png" alt="">
						</div>
					</div>
				</div>
				<div class="company_content_msg">
					<div class="number">
						<input v-if="contentNum == 4" @blur="changeCompanyMsg('netAssetsWhole')" v-model.number="companyMsg.netAssetsWhole" />
						<span class="cursor_pointer" :title="companyMsg.netAssetsWhole" v-else @click="contentNum=4">￥{{companyMsg.netAssetsWhole}}</span>
					</div>
					<div class="company_content_title">
						<span>当前净资产（整体）</span>
						<div class="cursor_pointer" @click="router_pushHistory('netAssetsWhole', '当前净资产（整体）')">
							<img src="../../assets/img/company/company-history.png" alt="">
						</div>
					</div>
				</div>
			</div>
			<div class="company_content">
				<div class="company_content_msg">
					<div class="number">
						<Select class="Select" v-if="contentNum == 5" @on-change="changeCompanyMsg('autumn')" v-model="companyMsg.autumn" style="width: 50%;">
							<Option :value="36">36</Option>
							<Option :value="48">48</Option>
							<Option :value="60">60</Option>
						</Select>
						<!--<input v-if="contentNum == 5" @blur="changeCompanyMsg('autumn')" v-model.number="companyMsg.autumn" />-->
						<span class="cursor_pointer" :title="companyMsg.autumn" v-else @click="contentNum=5">{{companyMsg.autumn}}</span>
					</div>
					<div class="company_content_title">
						<span>总成熟期（月）</span>
					</div>
				</div>
				<div class="company_content_msg">
					<div class="number">
						<Select class="Select" v-if="contentNum == 6" @on-change="changeCompanyMsg('firstWaitingPeriod')" v-model="companyMsg.firstWaitingPeriod" style="width: 50%;">
							<Option :value="12">12</Option>
							<Option :value="24">24</Option>
						</Select>
						<!--<input v-if="contentNum == 6" @blur="changeCompanyMsg('firstWaitingPeriod')" v-model.number="companyMsg.firstWaitingPeriod" />-->
						<span class="cursor_pointer" :title="companyMsg.firstWaitingPeriod" v-else @click="contentNum=6">{{companyMsg.firstWaitingPeriod}}</span>
					</div>
					<div class="company_content_title">
						<span>首次等待期（月）</span>
					</div>
				</div>
				<div class="company_content_msg">
					<div class="number">
						<input v-if="contentNum == 7" @blur="changeCompanyMsg('subsequentMaturityCycle')" v-model.number="companyMsg.subsequentMaturityCycle" />
						<span class="cursor_pointer" :title="companyMsg.subsequentMaturityCycle" v-else @click="contentNum=7">{{companyMsg.subsequentMaturityCycle}}</span>
					</div>
					<div class="company_content_title">
						<span>后续成熟周期（月）</span>
					</div>
				</div>
				<div class="company_content_msg">
					<div class="number">
						<input v-if="contentNum == 8" @blur="changeCompanyMsg('subsequentMaturityCycleNum')" v-model.number="companyMsg.subsequentMaturityCycleNum" />
						<span class="cursor_pointer" :title="companyMsg.subsequentMaturityCycleNum" v-else @click="contentNum=8">{{companyMsg.subsequentMaturityCycleNum}}</span>
					</div>
					<div class="company_content_title">
						<span>后续成熟周期数（个）</span>
					</div>
				</div>
			</div>
		</Card>
		<div v-if="!(contentNum == 100)" @click="contentNum = 100" class="company_content_model"></div>

		<Upload id="fileName" name="fileName" ref="fileName" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png','gif']" :max-size="2048" type="drag" :action="$store.state.fileUrl+'/uploadPicture'" style="display: none;">
		</Upload>

		<div v-if="incentiveShow" class="model">
			<div style="height: 580px;" class="addcompany">
				<div class="model_top">
					<div class="model_top_title">
						<img src="@/assets/img/company/company-plan.png" alt="">
						<span>激励计划</span>
					</div>
					<img @click="incentiveShow = false" class="model_top_off" src="@/assets/img/model/model_off.png" alt="">
				</div>
				<div class="model_content" style="padding: 30px;box-sizing: border-box;">
					<div style="width: 98%;margin: 0 auto;">
						<textarea class='tinymce-textarea' id="tinymceEditer"></textarea>
					</div>
				</div>
				<div class="model_operation">
					<button @click="updateCompanyAssess('激励计划')" class="model_operation_confirm">确定</button>
				</div>
			</div>
		</div>

		<div v-show="supportiveShow" class="model">
			<div style="height: 580px;" class="addcompany">
				<div class="model_top">
					<div class="model_top_title">
						<img style="width: 20px;height: 20px;" src="@/assets/img/company/company-matings.png" alt="">
						<span>配套文件</span>
					</div>
					<img @click="supportiveShow = false" class="model_top_off" src="@/assets/img/model/model_off.png" alt="">
				</div>
				<div class="model_content" style="padding: 30px;box-sizing: border-box;">
					<div style="width: 98%;margin: 0 auto;">
						<ul class="model_content_supportiveShow_Ul">
							<li class="cursor_pointer" :class="supportiveShow_li == 1? 'supportiveShow_li':'' " @click="selectCompanyAssess('分红');supportiveShow_li=1">分红</li>
							<li class="cursor_pointer" :class="supportiveShow_li == 2? 'supportiveShow_li':'' " @click="selectCompanyAssess('绩效'); supportiveShow_li=2">绩效</li>
						</ul>
						<textarea class='tinymce-textarea' id="tinymceEditer"></textarea>
					</div>

				</div>
				<div class="model_operation">
					<button @click="updateCompanyAssess(supportiveShow_li)" class="model_operation_confirm">确定</button>
				</div>
			</div>
		</div>

		<addcompany @succeed="modelSucceed" :show="modelShow.addcompanyShow">
		</addcompany>
		<changecompany @succeed="modelSucceed" :show="modelShow.changecompanyShow" :companyName="companyMsg.companyName" :companyId="companyId">
		</changecompany>
		<delcompany :companyId="companyId" @succeed="modelDelSucceed" :show="modelShow.delcompanyShow">
		</delcompany>
		<incentive :show="modelShow.incentiveShow">
		</incentive>
		<supportive :show="modelShow.supportiveShow">
		</supportive>
	</div>
</template>

<script>
	import tinymce from 'tinymce';
	import addcompany from '@/components/model/company/addcompany.vue'
	import changecompany from '@/components/model/company/changecompany.vue'
	import delcompany from '@/components/model/company/delcompany.vue'
	import incentive from '@/components/model/company/incentive.vue'
	import supportive from '@/components/model/company/supportive.vue'
	export default {
		components: {
			addcompany,
			changecompany,
			delcompany,
			incentive,
			supportive
		},
		computed: {
			modelShow() {
				return this.$store.state.model
			},
			level(){
        		return JSON.parse(localStorage.gugeAdminUser).level
        	}
		},
		data() {
			return {
				userImageBol:false,
				userImage:"",
				companyId: "",
				companyMsg: {},
				companyList: [],
				companyName: "",
				contentNum: 100,
				contentText: "",
				spinShow: true,
				incentiveShow: false,
				supportiveShow: false,
				supportiveShow_li: '1',
				typeNum:0,
				plans:false,
				mating:false,
				major:false
			};
		},
		created() {

		},
		mounted() {
			this.userImage = JSON.parse(localStorage.gugeAdminUser).userImage == '' ? '@/assets/img/home/home-user.png':JSON.parse(localStorage.gugeAdminUser).userImage;
			if(JSON.parse(localStorage.gugeAdminUser).userImage == '' || JSON.parse(localStorage.gugeAdminUser).userImage == null){
				this.userImageBol = true;
			}else{
				this.userImageBol = false;
			}
			this.userImage = JSON.parse(localStorage.gugeAdminUser).userImage;
			this.selectCompanyListByAdminId()
		},
		methods: {
			init() {
				this.$Spin.show();
				this.$nextTick(() => {
					let vm = this;
					tinymce.init({
						selector: '#tinymceEditer',
						branding: false,
						elementpath: false,
						height: "300",
						language: 'zh_CN.GB2312',
						menubar: 'edit',
						plugins: [
							'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
							'searchreplace visualblocks visualchars code fullpage',
							'insertdatetime media nonbreaking save table contextmenu directionality',
							'emoticons paste textcolor colorpicker textpattern imagetools codesample'
						],
						toolbar1: ' undo redo | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify |outdent indent | link imgSelector ',
						autosave_interval: '20s',
						image_advtab: true,
						table_default_styles: {
							width: '100%',
							borderCollapse: 'collapse'
						},
						setup: function(editor) {
							editor.on('init', function(e) {
								vm.spinShow = false;
								vm.$Spin.hide();
								tinymce.get('tinymceEditer').setContent(vm.contentText)

							});
							editor.on('input', function(e) {
								vm.contentText = tinymce.get('tinymceEditer').getContent();
							});
							editor.on('change', function(e) {
								vm.contentText = tinymce.get('tinymceEditer').getContent();
							});
							editor.addButton("imgSelector", {
								icon: "image",
								tooltip: "上传图片",
								onclick: function(e) {
									return document.getElementsByClassName("ivu-upload-input")[0].click();
								}
							});
						}
					});
				});
			},
			handleSuccess(res) {
				var urls = '<img src="' + res.result + '"/>';
				tinymce.execCommand('mceReplaceContent', false, urls);
			},

			updateCompanyAssess(assessName) {
				var type = ""
				if(assessName == 1){
					type = "分红"
				}else if(assessName == 2){
					type = "绩效"
				}else if(assessName == 3){
					type = "转让"
				}else{
					type = '激励计划'
				}
				this.$axios.Company.updateCompanyAssess({
					data: {
						companyId: this.companyId,
						assessName: type,
						assessContent: this.contentText
					},
					version: '2.0'
				}).then(res => {
//					this.supportiveShow = false;
					this.incentiveShow = false;
					this.$Message.success('更新成功！');
				}).catch(res => {
					if(res.response.status == 500) {
						this.$Message.error('文本过多，无法添加！');
					}
				})
			},

			selectCompanyAssess(type) {
				this.$axios.Company.selectCompanyAssess({
					data: {
						companyId: this.companyId,
						assessName: type
					},
					version: '2.0'
				}).then(res => {
					this.contentText = res.result == null ? '' : res.result.assessContent;
					tinymce.get('tinymceEditer').setContent(this.contentText)
				})
			},

			//富文本弹框
			texteDitorShow(model) {
				//				this.changeModel('incentiveShow',true);
				this.changeModel(model, true);
				this.$store.commit('changeTexteDitorId', this.companyId);
				this.$store.commit('changeTexteDitorModel', true);
			},
			//模态框确定
			modelSucceed(res) {
				if(res.id == ''){
					this.selectCompanyListByAdminId();					
				}else{
					this.selectCompanyListByAdminId(res.id);	
				}
			},
			modelDelSucceed(res) {
				if(res) {
					this.changeCompanyId();
				}
			},
			//下拉框改变事件
			changeCompanyId(res) {
				if(res == undefined) {
					this.selectCompanyListByAdminId();
				} else {
					this.selectCompanyById(this.companyId)
				}
			},
			//input 失焦事件
			changeCompanyMsg(type) {
				let contentNum = this.contentNum;
				this.contentNum = 100;
				//判断输入值是否为空
				if(this.companyMsg[type] == '') {
					this.companyMsg[type] = 0;
				}
				if(contentNum < 5) {
					this.updateSingleCompanyParameter(type);
				} else {
					this.updateCompanyDefaultParameter(type);
				}
			},
			//更新公司上面四个参数的接口
			updateSingleCompanyParameter(type) {
				this.$axios.Company.updateSingleCompanyParameter({
					data: {
						id: this.companyId / 1,
						[type]: String(this.companyMsg[type])
					},
					version: "2.0"
				}).then(res => {
					//					console.log('上4更新成功')
				})
			},
			//更新公司下面四个参数的接口
			updateCompanyDefaultParameter(type) {
				this.$axios.Company.updateCompanyDefaultParameter({
					data: {
						id: this.companyId / 1,
						[type]: String(this.companyMsg[type])
					},
					version: "2.0"
				}).then(res => {
					//					console.log('下4更新成功')
				})
			},
			//获取当前公司信息
			selectCompanyById(companyId) {
				this.$axios.Company.selectCompanyById({
					data: {
						id: companyId / 1
					},
					version: "2.0"
				}).then(res => {
					this.companyMsg = res.result;
				})
			},
			//获取公司列表下拉框
			selectCompanyListByAdminId(id) {
				this.$axios.Company.selectCompanyListByAdminId({
					data: {
						adminId: JSON.parse(localStorage.gugeAdminUser).id / 1,
						companyName: this.companyName
					},
					version: "2.0"
				}).then(res => {
					if(this.companyName == '') {
						//未查询
						if(id == undefined){
							this.companyId = res.result[0].id;
							this.companyList = res.result;
							this.selectCompanyById(res.result[0].id);
						}else{
							this.companyId = id;
							this.companyList = res.result;
							this.selectCompanyById(id);
						}
					} else {
						//查询状态
						if(res.result.length == 0) {
							//未满足查询条件的公司
							this.$Message.error('未找到该公司！');
						} else {
							this.companyId = res.result[0].id;
							this.selectCompanyById(res.result[0].id);
						}
					}
				})
			},
			router_pushHistory(key,title){
				this.$router.push({
					name: 'awarded',
					query: {
						id:this.companyId,
						key,
						title
					}
				});
			},
			//路由跳转
			router_push(path, id) {
				this.$util.router_push(this, path, id)
			},
			//打开弹窗
			changeModel(str, bol) {
				var obj = {
					str,
					bol
				}
				this.$store.commit('changeShow', obj);
			}
		},
		watch: {
			incentiveShow(val) {
				if(val) {
					this.init();
					this.selectCompanyAssess('激励计划');
				} else {
					tinymce.get('tinymceEditer').destroy();
				}
			},
			supportiveShow(val) {
				if(val) {
					this.init();
					this.selectCompanyAssess('分红');
				} else {
					tinymce.get('tinymceEditer').destroy();
				}
			}
		},
		beforeRouteLeave(to, from, next) {
			if (to.name == "setparameter" || to.name == "awarded") {
			  from.meta.keepAlive = true;
			} else {
			  from.meta.keepAlive = false;
			}
			next();
		}
	}
</script>