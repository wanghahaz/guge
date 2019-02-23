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
	<div v-show="delAdminBol" class="model">
		<div class="addcompany">
			<div class="model_top">
				<div class="model_top_title">
					<img src="../../../assets/img/model/model-del.png" alt="">
					<span>删除账户</span>
				</div>
				<img @click="cancelDel" class="model_top_off" src="../../../assets/img/model/model_off.png" alt="">
			</div>
			
			<div class="model_content">
				<span style="font-size: 16px;color: #FF4545;">您确定删除该账户吗？</span>
			</div>
			
			<div>
				<Divider style="width: 90%;margin:auto;" />
				<div class="model_operation">
					<button @click="deleteAdminUser" class="model_operation_confirm">确定</button>
					<button @click="cancelDel"  class="model_operation_cancel">取消</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		computed:{
        	adminList(){
        		return this.$store.state.admin.adminList
        	}, // 列表数据
	    	delAdminId(){
	    		return this.$store.state.admin.delAdminId
	    	}, // 被删除管理员ID
	    	delAdminBol(){
	    		return this.$store.state.admin.delAdminBol
	    	}, //删除模态框
	    	changeAdminId(){
	    		return this.$store.state.admin.changeAdminId
	    	}, //被修改密码管理员ID
	    	changeAdminBol(){
	    		return this.$store.state.admin.changeAdminBol
	    	}, //修改模态框
       	},
		data() {
			return {
				
			};
		},
		created() {
			
		},
		mounted() {
			
		},
		methods:{
			cancelDel(){
				this.$store.commit('setdelAdminId', "");
				this.$store.commit('setdelAdminBol',false);
			},
			//删除会员
			deleteAdminUser(){
				this.$axios.Account.deleteAdminUser({
					data: {
						id:this.$store.state.admin.delAdminId / 1
					},
					version: '2.0'
				}).then(res => {
					this.$store.commit('setdelAdminId', "");
					this.$store.commit('setdelAdminBol',false);
					if(res.code == '1000') {	
						this.$Message.error('删除失败！');
					} else {
						this.$Message.success('删除成功！');
						this.$axios.Account.selectAdminUserList({
							data: {
								adminName:"",
								name:"",
								companyId:"",
								adminId:JSON.parse(localStorage.gugeAdminUser).id
							},
							version: '2.0'
						}).then(res => {
							res.result.forEach(item=>{
								if(item.id == 1){
									item.companyName = "全部"
								}
							})
							this.$store.commit('setadminList', res.result);
						})
					}
				})
			}
		},
		watch:{
			
		}
	}
</script>


