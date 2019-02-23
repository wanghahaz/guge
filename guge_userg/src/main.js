// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "../static/js/adaptive.js"
import ModalHelper from '../static/js/ModalHelper.js';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import axios from 'axios'

Vue.prototype.$http = axios;
Vue.prototype.$ModalHelper = ModalHelper;
Vue.config.productionTip = false;
if(process.env.NODE_ENV == 'development'){
  axios.defaults.baseURL = '/api';
}else{
//axios.defaults.baseURL = 'http://guge.web.yunpaas.cn/user';
  axios.defaults.baseURL = 'https://guge.web.iguge.com/user';
}
//数字过滤器
Vue.filter('NumFormat', function (value) {
  if (!value) return '0.00';
  var intPart = parseInt(value); //获取整数部分
  var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
  var floatPart = ".00"; //预定义小数部分
  var value2Array = String(value).split(".");
  //=2表示数据有小数位=
  if (value2Array.length == 2) {
    floatPart = value2Array[1].toString(); //拿到小数部分
    if (floatPart.length == 1) { //补0,实际上用不着
      return intPartFormat + "." + floatPart + '0';
    } else {
      return intPartFormat + "." + floatPart;
    }
  } else {
    return intPartFormat + floatPart;
  }
});
//引入swiper
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
//引入mintui
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
//引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts;

Vue.use(Mint);
import {DatetimePicker} from 'mint-ui';

Vue.component(DatetimePicker.name, DatetimePicker);
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
