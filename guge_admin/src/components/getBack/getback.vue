<style scoped>
	.get_back{
		width: 78px;
		height: 34px;
		border: 1px solid #346EBC;
		border-radius: 3px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		color: #346EBC;
	}
	.get_back:hover{
		background: #346EBC;
		color: white;
	}
	img{
		width: 8px;
		height: 14px;
		margin-right: 5px;
	}
</style>

<template>
	<div>
		<div @mouseleave="back = false"  @mouseenter="back = true" @click="getBack" class="get_back cursor_pointer">
			<img v-if="back" src="../../assets/img/getback/get-backs.png" alt="">
			<img v-else src="../../assets/img/getback/get-back.png" alt="">
			<span>返回</span>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				back:false
			};
		},
		created() {
			
		},
		mounted() {
			
		},
		methods:{
			getBack(){
				this.$router.go(-1);
			}
		}
	}
</script>


