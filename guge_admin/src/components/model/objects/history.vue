<style scoped lang="less">
	@import url("../less/commonality.less");

	.model_content {
		width: 90%;
		margin: 30px auto;
		display: flex;
		justify-content: center;
		align-items: center;
		Table{
			width: 100%;
		}
	}
</style>

<template>
	<div v-show="show" class="model">
		<div style="height: 38.6%;" class="addcompany">
			<div class="model_top">
				<div class="model_top_title">
					<img src="../../../assets/img/company/company-historys.png" alt="">
					<span>历史记录</span>
				</div>
				<img @click="$store.commit('offMolde')" class="model_top_off" src="../../../assets/img/model/model_off.png" alt="">
			</div>
			<div class="model_content">
				<Table border stripe  :columns="exerciseList" :data="exerciseArr"></Table>
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
