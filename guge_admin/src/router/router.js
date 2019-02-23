const routers = [{
        path: '/login',
        name: 'login',
        meta: {
            title: ''
        },
        component: (resolve) => require(['@/view/login.vue'], resolve),
    }, {
        path: '/active',
        name: 'active',
        meta: {
            title: ''
        },
        component: (resolve) => require(['@/view/active.vue'], resolve),
    },
    {
        path: '/choiceA',
        name: 'choiceA',
        meta: {
            title: ''
        },
        component: (resolve) => require(['@/view/choice/choiceA.vue'], resolve),
    },
    {
        path: '/choiceB',
        name: 'choiceB',
        meta: {
            title: ''
        },
        component: (resolve) => require(['@/view/choice/choiceB.vue'], resolve),
    },
    {
        path: '/choiceC',
        name: 'choiceC',
        meta: {
            title: ''
        },
        component: (resolve) => require(['@/view/choice/choiceC.vue'], resolve),
    },
    {
        path: '/choiceD',
        name: 'choiceD',
        meta: {
            title: ''
        },
        component: (resolve) => require(['@/view/choice/choiceD.vue'], resolve),
    },
    {
        path: '/succeed',
        name: 'succeed',
        meta: {
            title: ''
        },
        component: (resolve) => require(['@/view/choice/succeed.vue'], resolve),
    },
    {
        //首页
        path: '/',
        redirect: "/home",
        name: "guge_home",
        meta: {
            title: ''
        },
        component: (resolve) => require(['@/view/main.vue'], resolve),
        children: [{
            path: '/home',
            title: '首页',
            name: 'home',
            component: (resolve) => require(['@/view/home/home.vue'], resolve)
        }, {
            path: '/company',
            title: '我的公司',
            name: 'company',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/view/company/company.vue'], resolve)
        }, {
            path: '/setparameter',
            title: '参数设置',
            name: 'setparameter',
            component: (resolve) => require(['@/view/company/setparameter.vue'], resolve)
        }, {
            path: '/awarded',
            title: '历史记录',
            name: 'awarded',
            component: (resolve) => require(['@/view/company/awarded.vue'], resolve)
        }, {
            path: '/objects',
            title: '激励对象',
            name: 'objects',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/view/objects/objects.vue'], resolve)
        }, {
            path: '/stimulate',
            title: '激励参数',
            name: 'stimulate',
            component: (resolve) => require(['@/view/objects/stimulate.vue'], resolve)
        }, {
            path: '/exerciseDynamic',
            title: '行权动态',
            name: 'exerciseDynamic',
            component: (resolve) => require(['@/view/objects/exerciseDynamic.vue'], resolve)
        }, {
            path: '/awardeds',
            title: '追授股数',
            name: 'awardeds',
            component: (resolve) => require(['@/view/objects/awarded.vue'], resolve)
        }, {
            path: '/exercise',
            title: '行权处理',
            name: 'exercise',
            component: (resolve) => require(['@/view/exercise/exercise.vue'], resolve)
        }, {
            path: '/estate',
            title: '财税核算',
            name: 'estate',
            component: (resolve) => require(['@/view/estate/estate.vue'], resolve)
        }, {
            path: '/account',
            title: '账户设置',
            name: 'account',
            component: (resolve) => require(['@/view/account/account.vue'], resolve)
        }, {
            path: '/feedback',
            title: '前端反馈',
            name: 'feedback',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/view/feedback/feedback.vue'], resolve)
        }, {
            path: '/record',
            title: '调查问卷详情',
            name: 'record',
            component: (resolve) => require(['@/view/feedback/record.vue'], resolve)
        }, {
            path: '/agreement',
            title: '期权授予协议',
            name: 'agreement',
            component: (resolve) => require(['@/view/feedback/agreement.vue'], resolve)
        }, {
            path: '/pan',
            title: '期权激励计划',
            name: 'pan',
            component: (resolve) => require(['@/view/feedback/pan.vue'], resolve)
        }]
    }
];
export default routers;