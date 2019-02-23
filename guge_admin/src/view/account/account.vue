<style scoped lang="less">
	@import url("./less/account.less");
</style>

<template>
	<div>
		<card class="cards">
			<div class="account_title" slot="title">
				<div v-if="level!=3" @click="changeModel('adminShow',true)" class="company_header_add cursor_pointer">
					<img src="@/assets/img/company/company-add.png" alt="">
					<span>添加账户</span>
				</div>
				<div v-else></div>
				<div class="account_title_right">
					<Input v-model="name" placeholder="请填写姓名" style="width: 200px" />
					<DatePicker v-model="dateMonth" type="month" placeholder="日期选择期（到月）" style="width: 200px;margin-left: 20px;"></DatePicker>
					<Select v-model="companyId" placeholder="请选择公司" style="width:300px;margin-left: 20px;">
						<Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.companyName }}</Option>
					</Select>
					<div @click="selectAdminUserList" class="company_header_search_btn cursor_pointer">
						<img src="../../assets/img/company/company-search.png" alt="">
						<span>搜索</span>
					</div>
				</div>
			</div>
			<Table border :columns="account" :data="adminList"></Table>
		</card>
		<admin 
			:show="modelShow.adminShow"
			:companyList="companyList"
			:succeed="succeed">
		</admin>
		<changeadmin :show="modelShow.changeadminShow"></changeadmin>
		<delAdmin></delAdmin>
		<amendAdmin :companyList = "companyList"></amendAdmin>
	</div>
</template>

<script>
	import changeImg from '@/assets/img/feedback/h5-changeAdmin.png'
	import delImg from '@/assets/img/objects/objects-del.png'
	import changePas from '@/assets/img/account/changePass.png'
	import admin from '@/components/model/account/admin.vue'
	import changeadmin from '@/components/model/account/changeadmin.vue'
	import tableMiddle from '@/components/account/table-middle.vue'
	import delAdmin from '@/components/model/account/deladmin.vue'
	import amendAdmin from '@/components/model/account/amendAdmin.vue'
	
	export default {
		components: {
			admin,
			changeadmin,
			tableMiddle,
			delAdmin,
			amendAdmin
		},
		computed: {
			modelShow(){
				return this.$store.state.model
			},
        	adminList(){
        		return this.$store.state.admin.adminList
        	},
        	changeAdminBol(){
	    		return this.$store.state.admin.changeAdminBol
	    	},
        	level(){
        		return JSON.parse(localStorage.gugeAdminUser).level
        	}
		},
		data() {
			return {
				name:"",
				companyId:"",
				dateMonth:"",
				companyList: [],
				account:[
					{
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                    		return h(tableMiddle, {
                                props: {
                                    row: params.row
                                }
                           })
                        }
                   },{
						type: 'index',
						title: '序号',
						width: 80,
						align: 'center'
					}, {
						title: '账号',
						key: 'adminName',
						align: 'center'
					}, {
						title: '真实姓名',
						align: 'center',
						key: 'name'
					}, {
						title: '公司',
						align: 'center',
						key: 'companyName'
					}, {
						title: '创建时间',
						align: 'center',
						key: 'createTime'
					}, {
						title: '操作',
						key: 'action',
						width: 200,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('img', {
									props: {
										type: 'primary',
									},
									attrs: {
										src: changeImg,
										style: 'width:22px;height: 22px;'
									},
									on: {
										click: () => {
											this.$store.commit('setchangeId', params.row.id);
											this.$store.commit('setchangeBol',true);
										}
									}
								}),
								h('img', {
									props: {
										type: 'primary'
									},
									attrs: {
										src: changePas,
										style: 'width: 22px;height: 22px;'
									},
									style: {
										marginLeft: '20px'
									},
									on: {
										click: () => {
											this.$store.commit('setchangeAdminId', params.row.id);
											this.$store.commit('setchangeAdminBol',true);
										}
									}
								})
							]);
						}
					}
				]
			};
		},
		created() {
			
		},
		mounted() {
			this.selectCompanyListByAdminId();
			this.selectAdminUserList();
		},
		methods:{
			succeed(res){
//				this.selectAdminUserList();
			},
			//获取账号列表
			selectAdminUserList(){
				if(this.companyId == undefined){
					this.companyId = '';
				}
				this.$axios.Account.selectAdminUserList({
					data: {
						adminName:"",
						name:this.name,
						companyId:String(this.companyId),
						adminId:JSON.parse(localStorage.gugeAdminUser).id,
						date: this.dateMonth == ""?'':this.$util.formatDate(this.dateMonth,'YYYY-MM-DD')
					},
					version: '2.0'
				}).then(res => {
					if(res.result.length == 0){
						this.$Message.error('未查到该管理员！');
					}else{
						if(res.result[0].id == 1){
							res.result[0].companyName = "全部"; 
						}
						this.$store.commit('setadminList', res.result);
					}
				})
			},
			//获取公司列表下拉框
			selectCompanyListByAdminId(){
				this.$axios.Company.selectCompanyListByAdminId({
					data:{
						adminId:JSON.parse(localStorage.gugeAdminUser).id / 1,
						companyName:""
					},
					version:"2.0"
				}).then( res => {
					this.companyList = res.result;
				})
			},
			changeModel(str,bol){
				var obj = {str,bol}
				this.$store.commit('changeShow', obj);
			}
		},
		watch:{
			dateMonth(val){
				if(val == ''){
					this.selectAdminUserList();
				}
			}
		}
	}
</script>


