<style scoped lang="less">
	@import url("../less/commonality.less");
	
</style>

<template>
	<div v-show="show" class="model">
		<div style="height: 518px;" class="addcompany">
			<div class="model_top">
				<div class="model_top_title">
					<img src="../../../assets/img/company/company-plan.png" alt="">
					<span>激励计划</span>
				</div>
				<img @click="$store.commit('offMolde');$store.commit('changeTexteDitorModel',false)" class="model_top_off" src="../../../assets/img/model/model_off.png" alt="">
			</div>
			<div class="model_content">
				<div>
					<texteditor></texteditor>
				</div>
			</div>
			<div class="model_operation">
				<button @click="updateCompanyAssess" class="model_operation_confirm">确定</button>
			</div>
		</div>
	</div>
</template>

<script>
	import texteditor from '@/components/text-editor/text-editor.vue'
	
	export default {
		computed: {
			texteDitorModel(){
				return this.$store.state.texteDitor.texteDitorModel
			}
		},
		components:{
			texteditor
		},
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
			updateCompanyAssess(){
	        	this.$axios.Company.updateCompanyAssess({
	                data: {
	                	companyId:this.$store.state.texteDitor.texteDitorId,
						assessName:"激励计划",
	                    assessContent: this.$store.state.texteDitor.texteDitorText
	                },
	                version: '2.0'
	          	}).then(res => {
					this.$Message.success('更新成功！');
					this.$store.commit('offMolde');
					this.$store.commit('changeTexteDitorModel',false)
	           	}).catch(res => {
	            	if(res.response.status == 500){
	            		this.$Message.error('文本过多，无法添加！');
	            	}
	            })
	       	},
			selectCompanyAssess(){
				this.$axios.Company.selectCompanyAssess({
					data:{
	        			companyId:this.$store.state.texteDitor.texteDitorId /1,
						assessName:"激励计划"
	        		},
	                version: '2.0'
				}).then(res=>{
					this.$store.commit('changeTexteDitorText', res.result==null?'':res.result.assessContent);
				})
			},
		},
		watch: {
			show(val){
				if(val == true){
					this.selectCompanyAssess();
				}
			}
		}
	}
</script>


