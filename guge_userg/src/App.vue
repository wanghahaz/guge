<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
		list-style: none;
		text-decoration: none;
		font-family: MicrosoftYaHei;
		border: none;
		outline: none;
	}
	/*body.dialog-open {*/
	/*position: fixed;*/
	/*width: 100%;*/
	/*height: 100%;*/
	/*}*/
	/*html{*/
	/*height: 100%;*/
	/*}*/
	/*body{*/
	/*height: 100%;*/
	/*}*/
	/*#app{*/
	/*height: 100%;*/
	/*}*/
	/*.picker-items>div:nth-child(3){*/
	/*display: none;*/
	/*}*/
	
	.mint-button {
		border: none;
	}
	
	a {
		color: black;
	}
	
	.swiperRight_top .yourClassName>div {
		width: 100%!important;
		padding-top: 0.844rem!important;
		height: 5.7rem!important;
	}
	
	.swiperRight_top .yourClassName>div>canvas {
		width: 105%!important;
		height: 5.7rem!important;
		margin: auto!important;
		margin-top: 0.844rem!important;
	}
	
	.mint-indicator-wrapper {
		z-index: 1111;
	}
	
	.lebars {
		width: 100%;
		display: flex;
	}
	
	.lebars>span {
		flex: 1;
	}
	
	.lebars>span:nth-child(1) {
		text-align: right;
	}
	
	.lebars>span:nth-child(2) {
		text-align: left;
	}
</style>