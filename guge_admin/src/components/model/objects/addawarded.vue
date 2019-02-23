<style scoped lang="less">
	@import url("../less/commonality.less");

	.model_content {
		width: 90%;
		margin: 20px auto;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		color: #303133;
	}
</style>

<template>
	<div v-show="show" class="model">
		<div style="height: 38.6%;" class="addcompany">
			<div class="model_top">
				<div class="model_top_title">
					<img src="../../../assets/img/company/company-add.png" alt="">
					<span>添加</span>
				</div>
				<img @click="$store.commit('offMolde')" class="model_top_off" src="../../../assets/img/model/model_off.png" alt="">
			</div>
			<div class="model_content">
				<span>追授股数：</span>
				<Input v-model="name" style="width: 360px;margin-left: 10px;" />
			</div>
			<div>
				<Divider style="width: 90%;margin:auto;" />
				<div class="model_operation">
					<button class="model_operation_confirm cursor_pointer">确定</button>
					<button class="model_operation_cancel cursor_pointer">取消</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			show:Boolean
		},
		data() {
			return {
				name:"",
				newUserObj: {
					user: ""
				},
				exerciseList:[
					{
						title: 'Name',
						key: 'name'
					},
					{
						title: 'Age',
						key: 'age'
					}
				],
				exerciseArr:[
					{
						name: 'John Brown',
						age: 18,
						address: 'New York No. 1 Lake Park',
						date: '2016-10-03'
					},
					{
						name: 'Jim Green',
						age: 24,
						address: 'London No. 1 Lake Park',
						date: '2016-10-01'
					}
				]
			};
		},
		created() {

		},
		mounted() {

		},
		methods: {

		}
	}
</script>
