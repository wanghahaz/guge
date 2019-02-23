import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import tabZoom from './modules/tab-zoom';
import model from './modules/model';
import admin from './modules/admin';
import texteDitor from './modules/texte-ditor';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        
//      fileUrl:'http://guge.user.yunpaas.cn/admin'
        fileUrl:'http://guge.user.iguge.com/admin'
    },
    mutations: {
        
    },
    actions: {

    },
    modules: {
        user,
		tabZoom,
		model,
		admin,
		texteDitor
    }
});

export default store;
