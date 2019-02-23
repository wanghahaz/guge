<style scoped lang="less">
	@import url("../less/commonality.less");
	.model_content{
		padding: 30px 50px;
		box-sizing: border-box;
		ul{
			width: 100%;
			display: flex;
			align-items: center;
			li{
				width:90px;
				height: 36px;
				border-radius: 3px;
				background: #F7F7F7;
				text-align: center;
				line-height: 36px;
				font-size: 16px;
				color: #999999;
			}
		}
	}
</style>

<template>
	<div v-show="show" class="model">
		<div style="height: 518px;" class="addcompany">
			<div class="model_top">
				<div class="model_top_title">
					<img src="../../../assets/img/company/company-mating.png" alt="">
					<span>配套文件</span>
				</div>
				<img @click="$store.commit('offMolde')" class="model_top_off" src="../../../assets/img/model/model_off.png" alt="">
			</div>
			<div class="model_content">
				<ul>
					<li>分红</li>
					<li>绩效</li>
				</ul>
			</div>
			<div class="model_operation">
				<button class="model_operation_confirm">确定</button>
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
				name:""
			};
		},
		created() {
			
		},
		mounted() {
			
		},
		methods:{
			
		}
	}
</script>


