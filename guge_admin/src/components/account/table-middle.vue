<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
    .padding{
    	margin: 0;
    	padding: 0;
    }
</style>
<template>
    <div>
        <Table class="padding" :show-header="bol" :columns="columns" :data="row.children"></Table>
    </div>
</template>
<script>
	import tableBottom from './table-bottom.vue';
	import changeImg from '@/assets/img/feedback/h5-changeAdmin.png'
	import delImg from '@/assets/img/objects/objects-del.png'
	import changePas from '@/assets/img/account/changePass.png'
    export default {
        props: {
            row: Object
        },
        components:{
        	tableBottom,
        },
        data () {
            return {
            	bol:false,
            	columns: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(tableBottom, {
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
							var state = 'inline-block';
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
										src: delImg,
										style: 'width: 22px;height: 22px;'
									},
									style: {
										marginLeft: '20px'
									},
									on: {
										click: () => {
											if(params.row.id == 1){
												this.$Message.error('超级管理员不可删除！');
												return;
											}
											this.$store.commit('setdelAdminId', params.row.id);
											this.$store.commit('setdelAdminBol',true);
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
//												path: '/changeAccount',
//												query: {
//													id: params.row.id
//												}
//											});
//										}
//									}
//								}, '修改'),
//								h('Button', {
//									props: {
//										type: 'error',
//										size: 'small'
//									},
//									style: {
//										marginRight: '5px',
//									},
//									on: {
//										click: () => {
//											if(params.row.id == 1){
//												this.$axiosRes.warning('超级管理员不可删除', this);
//												return;
//											}
//											this.$store.commit('setdelAdminId', params.row.id);
//											this.$store.commit('setdelAdminBol',true);
//										}
//									}
//								}, '删除'),
//								h('Button', {
//									props: {
//										type: 'error',
//										size: 'small'
//									},
//									style: {
//										marginRight: '5px',
//									},
//									on: {
//										click: () => {
//											this.$store.commit('setchangeAdminId', params.row.id);
//											this.$store.commit('setchangeAdminBol',true);
//										}
//									}
//								}, '修改密码')
							]);
						}
					}
                ]
            }
        },
        methods:{
        	changeDelAdmin(res){
        		if(res){
        			//true  确定删除
        			
        		}else{
        			//false 取消删除
        			this.adminId = "";
        			this.delAdminBol = false;
        		}
        	}
        },
    };
</script>