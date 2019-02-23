//富文本编辑器
	// 弹框状态，id 类型，值
const texteDitor = {
    state: {
		texteDitorModel:false,
		texteDitorId:"",
		texteDitorType:"",
		texteDitorText:"",
	},
    mutations: {
		changeTexteDitorModel (state, type) {
			state.texteDitorModel = type;
		},
		changeTexteDitorId (state, type) {
			state.texteDitorId = type;
		},
		changeTexteDitorType (state, type) {
			state.texteDitorType = type;
		},
		changeTexteDitorText (state, type) {
			state.texteDitorText = type;
		}
    }
};

export default texteDitor;