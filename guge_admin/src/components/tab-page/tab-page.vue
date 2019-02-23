<style scoped lang="less">
	@import url("./tab-page.less");
	@import url("../model/less/commonality.less");
	.model_content_supportiveShow_Ul {
		width: 100%;
		display: flex;
		align-items: center;
		margin-bottom: 20px;
		li {
			width: 90px;
			height: 36px;
			border-radius: 3px;
			background: #F7F7F7;
			text-align: center;
			line-height: 36px;
			font-size: 16px;
			color: #999999;
		}
		li:hover{
			background: #346EBC !important;
			color: white !important;
		}
	}
	
	.supportiveShow_li {
		background: #346EBC !important;
		color: white !important;
	}
</style>
<template>
	<div>
		<transition name="fade">
			<div @mouseleave="tabMouseleave" v-if="tabZoomType" class="tab_left">
				<div @click="router_push('home')" class="tab_left_log cursor_pointer">
					<img src="@/assets/img/login/log.png" />
				</div>
				<ul>
					<li :class="tabIndex==index?tab_true:tab_false" class="cursor_pointer" v-for="(item,index) in routerList" @click="router_push(item.path)">
						<img class="nopitch" :src="item.img" />
						<img class="pitch" :src="item.imgOn" alt="" />
						<span>{{item.title}}</span>
					</li>
				</ul>
			</div>
		</transition>
		<transition name="fade">
			<div v-if="!tabZoomType" @mouseenter="tabMouseenter" class="tab_min">
				<div  class="tab_left_log cursor_pointer">
					<img class="logmin" src="../../assets/img/tab-page/tab_logmins.png" />
				</div>
				<ul>
					<li v-for="(item,index) in routerList">
						<img v-if="tabIndex==index" class="pitch" :src="item.imgOn" alt="" />
						<img v-else class="nopitch" :src="item.img" />
					</li>
				</ul>
			</div>
		</transition>
		<div v-if="tinymceBol" class="model">
			<div style="height: 580px;" class="addcompany">
				<div class="model_top">
					<div class="model_top_title">
						<img src="../../assets/img/tab-page/tab-guides.png" alt="">
						<span>使用指引</span>
					</div>
					<img @click="tinymceBol = false" class="model_top_off" src="@/assets/img/model/model_off.png" alt="">
				</div>
				<div class="model_content" style="padding: 30px;box-sizing: border-box;">
					<div style="width: 98%;margin: 0 auto;">
						<ul class="model_content_supportiveShow_Ul">
							<li class="cursor_pointer" :class="supportiveShow_li == '激励计划'? 'supportiveShow_li':'' " @click="getContentManagement('激励计划'); supportiveShow_li='激励计划'">激励计划</li>
							<li class="cursor_pointer" :class="supportiveShow_li == '授予协议'? 'supportiveShow_li':'' " @click="getContentManagement('授予协议'); supportiveShow_li='授予协议'">授予协议</li>
							<li class="cursor_pointer" :class="supportiveShow_li == '劳动合同'? 'supportiveShow_li':'' " @click="getContentManagement('劳动合同'); supportiveShow_li='劳动合同'">劳动合同</li>
							<li class="cursor_pointer" :class="supportiveShow_li == '知产竞业'? 'supportiveShow_li':'' " @click="getContentManagement('知产竞业'); supportiveShow_li='知产竞业'">知产竞业</li>
							<li class="cursor_pointer" :class="supportiveShow_li == '使用指南'? 'supportiveShow_li':'' " @click="getContentManagement('使用指南'); supportiveShow_li='使用指南'">使用指南</li>
						</ul>
						<textarea class='tinymce-textarea' id="tinymceEditer"></textarea>
					</div>
				</div>
				<div class="model_operation">
					<button v-if="level == 1" @click="updateContentManagementById" class="model_operation_confirm">确定</button>
					<button v-else class="model_operation_confirm" style="background: gainsboro;">确定</button>
				</div>
			</div>
		</div>
		<div v-if="quitBol" class="model">
			<div class="addcompany">

				<div class="model_top">
					<div class="model_top_title">
						<img src="../../assets/img/tab-page/tab-quits.png" alt="">
						<span>退出</span>
					</div>
					<img @click="quitBol = false" class="model_top_off" src="../../assets/img/model/model_off.png" alt="">
				</div>

				<div class="model_content" style="display: flex;justify-content: center;align-items: center;">
					<span style="font-size: 16px;color: #FF4545;">您确定要退出吗？</span>
				</div>

				<div>
					<Divider style="width: 90%;margin:auto;" />
					<div class="model_operation">
						<button @click="loginOut" class="model_operation_confirm">确定</button>
						<button @click="quitBol = false" class="model_operation_cancel cursor_pointer">取消</button>
					</div>
				</div>
			</div>
		</div>

		<Upload id="fileName" name="fileName" ref="fileName" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png','gif']" :max-size="2048" type="drag" :action="$store.state.fileUrl+'/uploadPicture'" style="display: none;">
		</Upload>
	</div>
</template>

<script>
	import companyon from '../../assets/img/tab-page/tab-company-on.png';
	import company from '../../assets/img/tab-page/tab-company.png';
	import objecton from '../../assets/img/tab-page/tab-object-ons.png';
	import objects from '../../assets/img/tab-page/tab-object.png';
	import estateon from '../../assets/img/tab-page/tab-estate-on.png';
	import estate from '../../assets/img/tab-page/tab-estate.png';
	import exerciseon from '../../assets/img/tab-page/tab-exercise-ons.png';
	import exercise from '../../assets/img/tab-page/tab-exercise.png';

	import account from '../../assets/img/tab-page/tab-account.png';
	import accounton from '../../assets/img/tab-page/tab-accounton.png';
	import h5 from '../../assets/img/tab-page/tab-h5.png';
	import h5on from '../../assets/img/tab-page/tab-h5on.png';
	import guide from '../../assets/img/tab-page/tab-guide.png';
	import guideon from '../../assets/img/tab-page/tab-guideon.png';
	import quit from '../../assets/img/tab-page/tab-quit.png';
	import quiton from '../../assets/img/tab-page/tab-quiton.png';

	import tinymce from 'tinymce';

	export default {
		name: "home",
		data() {
			return {
				contentId: "",
				supportiveShow_li: '激励计划',
				contentText: "",
				tinymceBol: false,
				quitBol: false,
				tab_true: "tab_true",
				tab_false: "tab_false",
				tabIndex: "0",
				routerList: [{
						imgOn: companyon,
						img: company,
						title: "我的公司",
						path: "company"
					},
					{
						imgOn: objecton,
						img: objects,
						title: "激励对象",
						path: "objects"
					},
					{
						imgOn: exerciseon,
						img: exercise,
						title: "行权处理",
						path: "exercise"
					},
					{
						imgOn: estateon,
						img: estate,
						title: "财税核算",
						path: "estate"
					},
					{
						imgOn: h5on,
						img: h5,
						title: "前端反馈",
						path: "feedback"
					},
					{
						imgOn: guideon,
						img: guide,
						title: "使用指引",
						path: "guide"
					},
					{
						imgOn: accounton,
						img: account,
						title: "账户设置",
						path: "account"
					},
					{
						imgOn: quiton,
						img: quit,
						title: "安全退出",
						path: "quit"
					}
				]
			}
		},
		computed: {
			tabZoomType() {
				return this.$store.state.tabZoom.tabZoomType
			},
			level(){
				return JSON.parse(localStorage.gugeAdminUser).level
			}
		},
		created() {

		},
		mounted() {
			this.changeTab();
			this.ifRoute();
		},
		methods: {
			changeTab(){
				if(this.level != 1){
					//非超级管理员
					this.routerList.forEach((item,index)=>{
						if(item.title == '前端反馈'){
							this.routerList.splice(index,1)
						}
					})
				}else{
					return
				}
			},
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

			updateContentManagementById() {
				this.$axios.Home.updateContentManagementById({
					data: {
						contentText: this.contentText,
						id: this.contentId
					},
					version: '2.0'
				}).then(res => {
					this.$Message.success('更新成功！');
				}).catch(res => {
					if(res.response.status == 500) {
						this.$Message.error('文本过多，无法添加！');
					}
				})
			},
			getContentManagement(type) {
				this.$axios.Home.getContentManagement({
					data: {
						contentName: type
					},
					version: '2.0'
				}).then(res => {
					this.contentId = res.result.id;
					this.contentText = res.result.contentText == null ? '' : res.result.contentText;
					tinymce.get('tinymceEditer').setContent(this.contentText)
				})
			},
			
			loginOut(){
				this.$axios.Login.LoginOut({
            	}).then(res => {
                   	localStorage.removeItem('gugeAdminUser');
                    this.$router.push({
                        name: 'login'
                    });
                });
			},
			
			//路由跳转
			router_push(path) {
				if(path == "guide") {
					this.tinymceBol = true;
				} else if(path == 'quit') {
					this.quitBol = true;
				} else {
					this.$util.router_push(this, path);
				}
			},
			//判断当前页路由
			ifRoute() {
				if(this.$route.name == 'home') {
					this.tabIndex = "1000";
				} else {
					this.routerList.forEach((item, index) => {
						if(item.path == this.$route.name) {
							this.tabIndex = index;
						}
					})
				}
			},
			//鼠标移入事件
			tabMouseenter() {
				this.$store.commit('changeTabZoomType', true);
			},
			//鼠标移出事件
			tabMouseleave() {
				this.$store.commit('changeTabZoomType', false);
			}
		},
		watch: {
			$route(to, from) {
				this.ifRoute();
			},
			tinymceBol(val) {
				if(val) {
					this.init();
					this.getContentManagement(this.supportiveShow_li);
				} else {
					tinymce.get('tinymceEditer').destroy();
				}
			}
		},
	}
</script>