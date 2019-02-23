
const admin = {
    state: {
    	adminList:[],  // 列表数据
    	delAdminId:"", // 被删除管理员ID
    	delAdminBol:false, //删除模态框
    	changeAdminId:"", //被修改密码管理员ID
    	changeAdminBol:false, //修改模态框
    	changeId:"", //被修改信息管理员ID
    	changeBol:false, //修改信息模态框
    	addUserBol:false, // home页添加激励对象
    	addUserCompayId:"", //home 公司ID
    },
    mutations: {
        setadminList (state, list) {
            state.adminList = list;
        },
        setdelAdminId (state, id) {
            state.delAdminId = id;
        },
        setdelAdminBol (state, bol) {
            state.delAdminBol = bol;
        },
        setchangeAdminId (state, id) {
            state.changeAdminId = id;
        },
        setchangeAdminBol (state, bol) {
            state.changeAdminBol = bol;
        },
        setchangeId (state, id) {
            state.changeId = id;
        },
        setchangeBol (state, bol) {
            state.changeBol = bol;
        },
        setaddUserBol (state, bol) {
            state.addUserBol = bol;
        },
        setaddUserCompayId (state, id) {
            state.addUserCompayId = id;
        }
    },
    actions: {
		
    }
};

export default admin;
