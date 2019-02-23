const tabZoom = {
    state: {
		tabZoomType:false
	},
    mutations: {
		changeTabZoomType (state, type) {
			state.tabZoomType = type;
		},
    }
};

export default tabZoom;