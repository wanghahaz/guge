<style scoped lang="less">
	.single-page-con {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		overflow: auto;
		background-color: #F4F8F9;
		z-index: 1;
		transition: left .3s;
		padding: 30px 20px 20px 20px;
		box-sizing: border-box;
		.single-page {
			margin: 10px;
		}
	}
</style>

<template>
	<div>
		<!--左侧菜单-->
		<tabpage></tabpage>
		<!--试图容器-->
		<div class="single-page-con" :style="{left: tabZoomType?'150px':'60px'}">
			<div class="single-page">
				<router-view />
			</div>
		</div>
	</div>
</template>
<script>
	import tabpage from '@/components/tab-page/tab-page.vue';
	export default {
		name: "home",
		components: {
			tabpage
		},
		computed: {
			tabZoomType(){
				return this.$store.state.tabZoom.tabZoomType
			}
		},
	}
</script>