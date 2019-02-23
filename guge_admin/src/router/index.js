import Vue from 'vue';
import VueRouter from 'vue-router';
import routers from './router';
import iView from 'iview';

Vue.use(VueRouter);

const RouterConfig = {
    //  mode: 'history',
    routes: routers
};


export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();

    //判断是否为登录状态
    if (to.name == 'active' || to.name == 'succeed') { // 判断是否已经登录且前往的页面不是登录页
        next();
    } else if (!localStorage.gugeAdminUser && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
        next({
            name: 'login'
        });
    } else if (localStorage.gugeAdminUser && to.name === 'login') { // 判断是否已经登录且前往的是登录页
        next({
            name: "guge_home"
        });
    } else {
        next();
    }
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});