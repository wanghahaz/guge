<style scoped lang="less">
	@import url("../less/commonality.less");
	.model_content{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.ivu-input{
		height: 42px;
	}
</style>

<template>
	<div v-show="show" class="model">
		<div class="addcompany">
			<div class="model_top">
				<div class="model_top_title">
					<img src="../../../assets/img/model/model-del.png" alt="">
					<span>删除公告</span>
				</div>
				<img @click="$store.commit('offMolde')" class="model_top_off" src="../../../assets/img/model/model_off.png" alt="">
			</div>
			
			<div class="model_content">
				<span style="font-size: 16px;color: #FF4545;">您确定删除该条公告吗？</span>
			</div>
			
			<div>
				<Divider style="width: 90%;margin:auto;" />
				<div class="model_operation">
					<button @click="deluserId" class="model_operation_confirm">确定</button>
					<button @click="$store.commit('offMolde')"  class="model_operation_cancel cursor_pointer">取消</button>
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
				userid:""
			};
		},
		created() {
			
		},
		mounted() {
			
		},
		methods:{
			//删除会员
			deluserId(){
				this.$axios.Objects.deleteNoticeById({
					data: {
						noticeId:this.userid /1
					},
					version: '2.0'
				}).then( res => {
					this.$store.commit('offMolde');
					this.$Message.success('删除成功！');
					this.$emit('succeed',true);
				})
			}
		},
		watch:{
			userId(newVal,oldVal){
				this.userid = newVal;
			}
		}
	}
</script>


