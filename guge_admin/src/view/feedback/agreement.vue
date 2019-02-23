<style scoped>
	.box{
		padding: 30px;
	}
	.imgbox {
		width: 100%;
		padding: 30px;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	
	.imgbox img {
		width: 150px;
		height: 150px;
		margin: 0 20px;
		border: 1px solid white;
	}
	.setparameter_header{
		width: 100%;
		height:64px;
		background: white;
		display: flex;
		align-items: center;
		padding: 0 30px;
		box-sizing: border-box;
		margin-bottom: 30px;
	}
	.modelImgs{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: rgb(0,0,0,0.6);
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
<template>
	<div class="box">
		<div class="setparameter_header">
			<div class="setparameter_header_left">
				<getback></getback>
			</div>
		</div>
		<div class="imgbox">
			<viewer :images="urlsArr">
			   <img v-for="src in urlsArr" :src="src" :key="src">
			</viewer>
		</div>
	</div>
</template>

<script>
	export default {
		name:"agreement",//期权授予协议
		data() {
			return {
				urlsArr: [],
				imgurl:"",
				imgBol:false
			};
		},
		mounted() {
			this.selectOneKeyUrl();
		},
		methods: {
			selectOneKeyUrl() {
				this.$axios.Feedback.selectOneKeyUrl({
					data: {
						type: '1',
						id: this.$route.query.id/1
					},
					version: "2.0"
				}).then(res => {
					this.urlsArr = res.result;
				})
			},
			model(item){
				this.imgurl = item;
				this.imgBol = true;
			}
		}
	}
</script>