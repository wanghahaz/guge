import Vue from 'vue'
import App from './App'
import {
    router
} from '@/router/index'
import store from './store'
import Vuex from 'vuex'
import Util from './libs/util'
import iView from 'iview';
import 'iview/dist/styles/iview.css'
import getBack from '@/components/getBack/getback.vue';
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

import Axios from 'axios';
import axios from './api/axios'

if (process.env.NODE_ENV == 'development') {
    Axios.defaults.baseURL = '/api';
} else {
    Axios.defaults.baseURL = 'http://guge.user.yunpaas.cn/admin';
    // Axios.defaults.baseURL = 'http://guge.user.iguge.com/admin';
}

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.prototype.$axios = axios;
Vue.prototype.$http = Axios;
Vue.prototype.$util = Util;

Vue.config.productionTip = false
Vue.use(Vuex);

Vue.use(iView);
Vue.use(Viewer, {
    defaultOptions: {
        zIndex: 9999
    }
})

Vue.component('getback', getBack)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})