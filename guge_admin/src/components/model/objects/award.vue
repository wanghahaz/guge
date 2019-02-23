<style scoped lang="less">
	@import url("../less/commonality.less");

	.model_content {
		width: 90%;
		margin: 0 auto;
		border-bottom: 1px solid #E8E8E8;
		padding-top: 50px;
		box-sizing: border-box;
		.model_content_top{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.upload{
			margin-left: 173px;
			margin-top: 30px;
			width: 60px;
			height: 60px;
			background: #F7F7F7;
			border: 1px solid #E8E8E8;
			border-radius: 3px;
			font-size: 14px;
			color: #8E8E8E;
			div{
				width: 60px;
				height: 60px;
				display: flex;
				justify-content: center;
				align-items: center;
				img{
					width: 30px;
					height: 30px;
				}
			}
		}
	}
	.model_operation_btn{
		width: 120px;
		height: 34px;
		background: #FFFFFF;
		border: 1px solid #346EBC;
		border-radius: 3px;
		font-size: 14px;
		color: #346EBC;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 50px;
		img{
			width: 18px;
			height: 18px;
			margin-right: 5px;
		}
	}
	
</style>

<template>
	<div v-show="show" class="model">
		<div style="height:500px;" class="addcompany">
			<div class="model_top">
				<div class="model_top_title">
					<img src="../../../assets/img/objects/object-awards.png" alt="">
					<span>授予协议</span>
				</div>
				<img @click="offAward" class="model_top_off" src="../../../assets/img/model/model_off.png" alt="">
			</div>
			<div class="model_content">
				<div class="model_content_top">
					<span>协议名称：</span>
					<Input v-model="fileName" style="width: 360px;" />
				</div>
				<div class="upload">
					<Upload style="margin-bottom: 10px;" 
						name="fileName"
			    		ref="upload"
				        type="select"
				       	:max-size="2048" 
				        :format="['pdf']"
				        :data="fileData"
				        :action="$store.state.fileUrl+'/uploadTemplate'" 
				        :before-upload = "beforeUpload"
				        :on-progress = "progress"
				        :on-success = "success"
				        :on-error = "error"
				        :on-preview = "preview"
				        :on-remove = "remove"
				        :on-format-error = "formatError"
				        :show-upload-list="false"
				        :on-exceeded-size = "exceededSize">
						<div>
							<img src="../../../assets/img/model/model-add.png" alt="">
						</div>
					</Upload>
					<span>上传文件</span>
				</div>
				<div v-if="file !== null" style="width: 100%;margin-top: 35px;padding-left: 173px;box-sizing: border-box;font-size: 16px;">
			    	文件名：{{file.name}}
			    </div>
			</div>
			<div>
				<div class="model_operation">
					<button @click="uploadFile" style="width: 98px;" class="model_operation_confirm">确定上传</button>
					<div v-if="fileUrl != null" @click="windowOpen" class="model_operation_btn cursor_pointer">
						<span>查看已上传协议</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			show:Boolean,
			userId:""
		},
		data() {
			return {
				file: null,
                fileName:"",
                loadingStatus: false,
                fileUrl:null,
                fileData:{
	                fileName:"fileName",
	                title:"",
	                userId:""
	            },
			};
		},
		created() {

		},
		mounted() {

		},
		methods: {
			offAward(){
				this.fileData.userId = '';
				this.fileName = '';
				this.fileData.title = '';
				this.fileUrl = null;
				this.file = null;
				this.$store.commit('offMolde');
			},
			fddQuerySignStatus(){
        	 	this.$axios.Objects.fddQuerySignStatus({
					data: {
						userId: this.fileData.userId / 1
					},
					version: '2.0'
				}).then(res => {
					if(res.code == "0000"){
						this.fileUrl = res.result;
					}else{
						this.fileUrl = null;
					}
				})
        	},
        	windowOpen(){
        		if(this.fileUrl == null){
        			this.$Message.error('该用户未上传协议')
        		}else{
        			window.open(this.fileUrl)
        		}
        	},
			//上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传
            beforeUpload (file) {
                this.file = file;
                return false;
            },
            //文件上传时的钩子，返回字段为 event, file, fileList
            progress(event,file,fileList){
            	
            },
            //文件上传成功时的钩子，返回字段为 response, file, fileList
            success(response, file, fileList){
            	if(response.code == "0000"){
            		//上传成功
            		this.file = null;
            		this.$Message.success('上传成功');
            		this.fddQuerySignStatus();
            	}else{
            		this.$Message.error(response.msg);
            	}
            },
            //文件上传失败时的钩子，返回字段为 error, file, fileList
            error(error, file, fileList){
            	
            },
            //点击已上传的文件链接时的钩子，返回字段为 file， 可以通过 file.response 拿到服务端返回数据
            preview(file){
            	
            },
            //文件列表移除文件时的钩子，返回字段为 file, fileList
            remove(file, fileList){
            	
            },
            //文件格式验证失败时的钩子，返回字段为 file, fileList
            formatError(file, fileList){
            	if(file){
            		this.$Message.error('只支持上传PDF文件')
            	}
            },
            //文件超出指定大小限制时的钩子，返回字段为 file, fileList
            exceededSize(file, fileList){
            	if(file){
            		this.$Message.error('文件大小超出限制，最大2M')
            	}
            },
            //点击上传
            uploadFile(){
				if(this.fileName == ""){
					this.$Message.error('请输入协议名称')
				}else if(this.file == null){
					this.$Message.error('请上传协议')
				}else{
					this.fileData.title = this.fileName;
					this.$refs.upload.post(this.file);
				}
            }
		},
		watch:{
			userId(newVal,oldVal){
				this.fileData.userId = newVal;
			},
			show(newVal,oldVal){
				if(newVal){
					this.fddQuerySignStatus();
				}
			}
		}
	}
</script>
