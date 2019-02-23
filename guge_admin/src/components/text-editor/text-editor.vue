<style lang="less">
	@import '../../assets/css/loading.less';
</style>

<template>
	<div>
		<Card shadow>
			<textarea class='tinymce-textarea' id="tinymceEditer"></textarea>
		</Card>
		<Spin fix v-if="spinShow">
			<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
			<div>加载组件中...</div>
		</Spin>
		<Upload 
			id="fileName" 
			name="fileName" 
			ref="fileName" 
			:show-upload-list="false" 
			:on-success="handleSuccess" 
			:format="['jpg','jpeg','png','gif']" 
			:max-size="2048" 
			type="drag" 
			:action="$store.state.fileUrl+'/uploadPicture'" 
			style="display: none;">
		</Upload>
	</div>
</template>

<script>
	import tinymce from 'tinymce';
	if(process.env.NODE_ENV == 'development') {
		window.tinymce.baseURL = ''
	} else {
		window.tinymce.baseURL = './static/js';
	}
	export default {
		computed: {
			texteDitorModel(){
				return this.$store.state.texteDitor.texteDitorModel
			}
		},
		name: 'text-editor',
		data() {
			return {
				spinShow: true,
				contentText: ''
			};
		},
		methods: {
			init() {
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
								tinymce.get('tinymceEditer').setContent(vm.$store.state.texteDitor.texteDitorText)
							});
							editor.on('input', function(e) {
								vm.$store.state.texteDitor.texteDitorText = tinymce.get('tinymceEditer').getContent();
							});
							editor.on('change', function(e) {
								vm.$store.state.texteDitor.texteDitorText = tinymce.get('tinymceEditer').getContent();
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
			}
		},
		mounted() {
//			this.init();
		},
		destroyed() {
//			tinymce.get('tinymceEditer').destroy();
		},
		watch:{
			texteDitorModel(val){
				if(val == true){
					setTimeout(() => {
						this.init();
					},500);
				}else if(val == false){
					tinymce.get('tinymceEditer').destroy();
				}
			}
		}
	};
</script>