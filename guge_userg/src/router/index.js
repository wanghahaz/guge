import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import agreement from '@/components/login/agreement'
import privacy from '@/components/login/privacy'
import index from '@/components/index/index'
import indexone from '@/components/index/indexone'
import one from '@/components/index/one'
import two from '@/components/index/two'
import three from '@/components/index/three'
import four from '@/components/index/four'
import five from '@/components/index/five'
import six from '@/components/index/six'
import activate from '@/components/index/activate'
import file from '@/components/index/file'
import succeed from '@/components/index/succeed'
import feed from '@/components/index/feed'
import feedList from '@/components/index/feedList'
import fileSucceed from '@/components/index/fileSucceed'
import choiceA from '@/components/choice/choiceA'
import choiceB from '@/components/choice/choiceB'
import choiceC from '@/components/choice/choiceC'
import choiceD from '@/components/choice/choiceD'
import choiceMailbox from '@/components/choice/choiceMailbox'
import stimulateImg from '@/components/imageText/stimulateImg'
import awardImg from '@/components/imageText/awardImg'
import contractImg from '@/components/imageText/contractImg'
import equityImg from '@/components/imageText/equityImg'

Vue.use(Router);

var router = new Router({
    routes: [{
        path: '/',
        name: 'login',
        component: login,
        meta: {
            title: "登录"
        }
    }, {
        path: '/index',
        name: 'index',
        component: index,
        meta: {
            title: "期管云CSP|云端持股平台"
        }
    }, {
        path: '/feed',
        name: 'feed',
        component: feed,
        meta: {
            title: "与公司沟通"
        }
    }, {
        path: '/feedList',
        name: 'feedList',
        component: feedList,
        meta: {
            title: "公司通知"
        }
    }, {
        path: '/indexone',
        name: 'indexone',
        component: indexone,
        meta: {
            title: "期管云CSP|云端持股平台"
        }
    }, {
        path: '/one',
        name: 'one',
        component: one,
        meta: {
            title: "使用指引"
        }
    }, {
        path: '/two',
        name: 'two',
        component: two,
        meta: {
            title: "绩效制度"
        }
    }, {
        path: '/three',
        name: 'three',
        component: three,
        meta: {
            title: "出售制度"
        }
    }, {
        path: '/four',
        name: 'four',
        component: four,
        meta: {
            title: "激励计划"
        }
    }, {
        path: '/five',
        name: 'five',
        component: five,
        meta: {
            title: "授予协议"
        }
    }, {
        path: '/six',
        name: 'six',
        component: six,
        meta: {
            title: "分红制度"
        }
    }, {
        path: '/activate',
        name: 'activate',
        component: activate,
        meta: {
            title: "激活期管云"
        }
    }, {
        path: '/file',
        name: 'file',
        component: file,
        meta: {
            title: "配套文件"
        }
    }, {
        path: '/succeed',
        name: 'succeed',
        component: succeed,
        meta: {
            title: "激活期管云"
        }
    }, {
        path: '/fileSucceed',
        name: 'fileSucceed',
        component: fileSucceed,
        meta: {
            title: "配套文件"
        }
    }, {
        path: '/agreement',
        name: 'agreement',
        component: agreement,
        meta: {
            title: "用户协议"
        }
    }, {
        path: '/privacy',
        name: 'privacy',
        component: privacy,
        meta: {
            title: "隐私政策"
        }
    }, {
        path: '/stimulateImg',
        name: 'stimulateImg',
        component: stimulateImg,
        meta: {
            title: "激励计划"
        }
    }, {
        path: '/awardImg',
        name: 'awardImg',
        component: awardImg,
        meta: {
            title: "授予协议"
        }
    }, {
        path: '/contractImg',
        name: 'contractImg',
        component: contractImg,
        meta: {
            title: "劳动合同"
        }
    }, {
        path: '/equityImg',
        name: 'equityImg',
        component: equityImg,
        meta: {
            title: "知产竞业 "
        }
    }, {
        path: '/choiceA',
        name: 'choiceA',
        component: choiceA
    }, {
        path: '/choiceB',
        name: 'choiceB',
        component: choiceB
    }, {
        path: '/choiceC',
        name: 'choiceC',
        component: choiceC
    }, {
        path: '/choiceD',
        name: 'choiceD',
        component: choiceD
    }, {
        path: '/choiceMailbox',
        name: 'choiceMailbox',
        component: choiceMailbox
    }]
});
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next(() => {
        window.location.reload()
    })
});
export default router