<style scoped lang="less">
	@import url("./less/exerciseDynamic.less");
</style>

<template>
	<div>
		<div class="exerciseDynamic_header">
			<div class="cursor_pointer" @click="exerciseDynamicNum = 1" :class="exerciseDynamicNum==1?'exerciseDynamic_header_exercise':'exerciseDynamic_header_turn'">
				<img src="../../assets/img/objects/objects-exercisebai.png"/>
				<span>行权申请</span>
			</div>
			<div class="cursor_pointer" @click="exerciseDynamicNum = 3" :class="exerciseDynamicNum==3?'exerciseDynamic_header_exercise':'exerciseDynamic_header_turn'">
				<img src="../../assets/img/objects/objects-turn.png"/>
				<span>转让申请</span>
			</div>
			<div @mouseleave="mouse = false"  @mouseenter="mouse = true" class="cursor_pointer" @click="exerciseDynamicNum = 2" :class=" exerciseDynamicNum==2?'exerciseDynamic_header_quit_btn':'exerciseDynamic_header_quit'">
				<img v-if="exerciseDynamicNum==2" src="../../assets/img/objects/object-quit-btns.png"/>
				<img v-if="mouse && exerciseDynamicNum !=2" src="../../assets/img/objects/object-quit-btns.png"/>
				<img v-if="exerciseDynamicNum !=2 && !mouse" src="../../assets/img/objects/objects-quit.png"/>
				<span>回购申请</span>
			</div>
			<div class="cursor_getback">
				<getback></getback>
			</div>
		</div>
		<card class="cards">
			<div class="exerciseDynamic_title" slot="title">
				<div @mouseleave="mouse = 0"  @mouseenter="mouse = 1" @click="ercise(0)" v-if="exerciseDynamicNum==1" class="exerciseDynamic_title_add cursor_pointer">
					<img v-if="mouse == 0" src="../../assets/img/objects/objects-add.png"/>
					<img v-else src="../../assets/img/company/company-add.png" alt="">
					<span>行权申请</span>
				</div>
				<div @mouseleave="mouse = 0"  @mouseenter="mouse = 1" @click="ercise(0)" v-if="exerciseDynamicNum==3" class="exerciseDynamic_title_add cursor_pointer">
					<img v-if="mouse == 0" src="../../assets/img/objects/objects-add.png"/>
					<img v-else src="../../assets/img/company/company-add.png" alt="">
					<span>转让申请</span>
				</div>
				<div @mouseleave="mouse = 0"  @mouseenter="mouse = 1" @click="ercise(0)" v-if="exerciseDynamicNum==2" class="exerciseDynamic_title_add cursor_pointer">
					<img v-if="mouse == 0" src="../../assets/img/objects/objects-add.png"/>
					<img v-else src="../../assets/img/company/company-add.png" alt="">
					<span>回购申请</span>
				</div>
				<div @mouseleave="mouseexport = 0"  @mouseenter="mouseexport = 1" @click="downLoad" class="exerciseDynamic_title_export cursor_pointer">
					<img v-if="mouseexport == 0" src="../../assets/img/objects/objects-export.png"/>
					<img v-else src="../../assets/img/company/company-export.png"/>
					<span>导出</span>
				</div>
			</div>
			<Table border stripe  :columns="columns" :data="RecordList"></Table>
		</card>
		<Page 
			class="page" 
			:current="current"
			:total="total" 
			:page-size="pageSize"
			@on-change="selectRightRecordList"
			style="margin-top: 50px;"/>
		<addexercise
			:show="modelShow.addErciseShow"
			@succeed="modelSucceed"
			:addexercise = "addexerciseObj">
		</addexercise>
		<changeexercise
			:show="modelShow.changeExerciseShow"
			@succeed="modelSucceed"
			:chageExerciseObj="chage_exerciseObj">
		</changeexercise>
		<delexercise
			:show="modelShow.delexerciseShow"
			@succeed="modelSucceed"
			:userId="RecordById">
		</delexercise>
	</div>
</template>

<script>
	import changeImg from '@/assets/img/feedback/h5-changeAdmin.png'
	import delImg from '@/assets/img/objects/objects-del.png'
	import addexercise from '@/components/model/objects/addexercise.vue'
	import changeexercise from '@/components/model/objects/changeexercise.vue'
	import delexercise from '@/components/model/objects/delexercise.vue'
	export default {
		components:{
			addexercise,
			changeexercise,
			delexercise
		},
		computed: {
			modelShow(){
				return this.$store.state.model
			}
		},
		data() {
			return {
				addexerciseObj:{},
				chage_exerciseObj:{},
				exerciseDynamicNum:1,
				pageSize:0, //每页显示条数
				total:0, //总条数
				current:1,//当前页数
				mouse:0,
				mouseexport:0,
				RecordList:[],
				RecordById:"",
				mouse:false,
				columns: [{
						type: 'index',
						title: '序号',
						width: 60,
						align: 'center'
					}, {
						title: '申请时间',
						key: 'applicationTime',
						align: 'center'
					}, {
						title: '申请行权股数',
						key: 'rightNumber',
						align: 'center'
					}, {
						title: '批准行权股数',
						align: 'center',
						key: 'approval'
					}, {
						title: '批准日期',
						align: 'center',
						key: 'approvalTime'
					}, {
						title: '已收款',
						align: 'center',
						key: 'receivables'
					}, {
						title: '操作',
						key: 'action',
						align: 'center',
						render: (h, params) => {
							var type = 'inline-block';
							if(params.row.flag != 1){
								type = 'none'
							}
							return h('div', [
								h('img', {
									props: {
										type: 'primary',
									},
									attrs: {
										src: changeImg,
										style: 'width:22px;height: 22px;'
									},
									style: {
										cursor:'pointer'
									},
									on: {
										click: () => {
											var obj = {
												type:this.exerciseDynamicNum,
												userId:params.row.id
											};
											this.chage_exerciseObj = obj;
											this.$store.commit('changeShow', {str:"changeExerciseShow",bol:true});
										}
									}
								}),
								h('img', {
									props: {
										type: 'primary'
									},
									attrs: {
										src: delImg,
										style: 'width: 22px;height: 22px;'
									},
									style: {
										marginLeft: '20px',
										display:type,
										cursor:'pointer'
									},
									on: {
										click: () => {
											this.RecordById = params.row.id;
											this.$store.commit('changeShow', {str:"delexerciseShow",bol:true});
										}
									}
								}),
//								h('Button', {
//									props: {
//										type: 'primary',
//										size: 'small'
//									},
//									style: {
//										marginRight: '5px'
//									},
//									on: {
//										click: () => {
//											this.$router.push({
//												path: '/setExerciseRecord',
//												query: {
//													id: params.row.id
//												}
//											});
//										}
//									}
//								}, '设置'),
//								h('Button', {
//									props: {
//										type: 'error',
//										size: 'small'
//									},
//									style: {
//										marginRight: '5px',
//										display:type
//									},
//									on: {
//										click: () => {
//											this.Modal = true;
//											this.RecordById = params.row.id;
//										}
//									}
//								}, '删除')
							]);
						}
					}
				]
			};
		},
		created() {
			
		},
		mounted() {
			this.selectRightRecordList(1);
		},
		methods:{
			downLoad(){
				if(this.RecordList.length == 0){
					this.$Message.error('暂无数据');
				}else{
					var str = this.$store.state.fileUrl+"/downLoadExcelRightRecord?userId="+this.$route.query.data+"&type="+this.exerciseDynamicNum+"&pageNum="+this.current
					window.location.href = str;
				}
			},
			//ercise模态框
			ercise(){
				var obj = {
					type:this.exerciseDynamicNum,
					userId:this.$route.query.data
				}
				this.addexerciseObj = obj;
				this.$store.commit('changeShow', {str:"addErciseShow",bol:true});
			},
			//模态框确定
			modelSucceed(res){
				this.selectRightRecordList(1);
			},
			//查询申请
			selectRightRecordList(e){
				this.$axios.Objects.selectRightRecordList({
					data: {
						userId:this.$route.query.data/1,
						pageNum:e/1,
						type:String(this.exerciseDynamicNum)
					},
					version: '2.0'
				}).then(res => {
					this.RecordList = res.result.list;
					this.total = res.result.total/1;
					this.pageSize = res.result.pageSize/1;
					if(res.result.pageNum == 0){
						this.current = 1
					}else{
						this.current = res.result.pageNum/1;
					}
				})
			}
		},
		watch:{
			exerciseDynamicNum(news, old){
				if(news == 1){
					this.columns[2].title = "申请行权股数";
					this.columns[3].title = "批准行权股数";
					this.columns[5].title = "已收款";
					this.selectRightRecordList(1);
				}else if(news == 2){
					this.columns[2].title = "申请退还股数";
					this.columns[3].title = "批准退还股数";
					this.columns[5].title = "已付款";
					this.selectRightRecordList(1);
				}else if(news == 3){
					this.columns[2].title = "申请转让股数";
					this.columns[3].title = "批准转让股数";
					this.columns[5].title = "已补款";
					this.selectRightRecordList(1);
				}
			}
		}
	}
</script>


