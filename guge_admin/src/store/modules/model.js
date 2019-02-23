const model = {
    state: {
//  	company中的组件bol值
		addcompanyShow:false,
		changecompanyShow:false,
		delcompanyShow:false,
		incentiveShow:false,
		supportiveShow:false,
		//objects 中的组件bol值
		adduserShow:false,
		changeuserShow:false,
		deluserShow:false,
		IncentiveShow:false,
		awardShow:false,
		historyShow:false,
		addErciseShow:false,
		changeExerciseShow:false,
		delexerciseShow:false,
		//account 中的组件bol值
		adminShow:false,
		changeadminShow:false,
	},
    mutations: {
		changeShow(state,obj){
			state[obj.str] = obj.bol;
		},
		offMolde(state){
			for(var k in state){
				state[k] = false;
			}
		}
    }
};

export default model;