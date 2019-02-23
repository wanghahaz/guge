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
					<img src="../../../assets/img/feedback/h5-Admin.png" alt="">
					<span>修改公司</span>
				</div>
				<img @click="$store.commit('offMolde')" class="model_top_off" src="../../../assets/img/model/model_off.png" alt="">
			</div>
			<div class="model_content">
				<Input v-model="companyname" placeholder="请输入公司名称" style="width: 620px;" />
			</div>
			<div>
				<Divider style="width: 90%;margin:auto;" />
				<div class="model_operation">
					<button @click="updateCompany" class="model_operation_confirm">确定</button>
					<button @click="$store.commit('offMolde')" class="model_operation_cancel">取消</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			show:Boolean,
			companyName:"",
			companyId:""
		},
		data() {
			return {
				companyname:"",
				companyid:""
			};
		},
		created() {
			
		},
		mounted() {
			
		},
		methods:{
			//修改公司名
			updateCompany(){
				this.$axios.Company.updateCompany({
					data:{
						id:this.companyid,
						companyName:this.companyname
					},
					version:"2.0"
				}).then( res => {
					if(res.code == "1000"){
						//此公司已存在
						this.$Message.error('此公司已存在！');
					}else{
						this.companyname = "";
						this.$Message.success('修改成功！');
						this.$emit('succeed',{id:this.companyid})
					}
					this.$store.commit('offMolde');
				})
			}
		},
		watch: {
			companyName(newVal,lodVal){
				this.companyname = newVal;
			},
			companyId(newVal,lodVal){
				this.companyid = newVal;
			},
		}
	}
</script>


