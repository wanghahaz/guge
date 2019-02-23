// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }

// const formatNumber = n => {
//   n = n.toString()
//   return n[1] ? n : '0' + n
// }

// module.exports = {
//   formatTime: formatTime
// }
// import req from "./wx_request";
const newData = date => {
        const year = date.getFullYear()
        const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
        const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
        return year + '-' + month + '-' + day
    }
    //本地存储
class loca {
    static _get(key) {
        let tmp = wx.getStorageSync(key)
        wx.removeStorageSync(key)
        return tmp
    }
    static get(key) {
        let tmp = wx.getStorageSync(key)
        return tmp
    }
    static set(key, value) {
        wx.setStorageSync(key, value)
    }
    static only({
        _u = 'tmp_',
        data = ""
    }) {
        let tmp = ""
        let time = new Date().getTime()
        tmp = _u + time
        loca.set(tmp, data)
        return tmp
    }
}
//全局变量获取
class globa {
    static get(key) {
        const app = getApp();
        key = app['globalData'][key];
        return key
    }
    static set(key, value) {
        const app = getApp();
        app['globalData'][key] = value
        return true
    }
}
//获取e函数数据
function gete(e, type) {
    let obj = {}
    obj = e.currentTarget.dataset
    if (type) {
        obj.value = e.detail.value
    }
    return obj
}
//判断是否用户是否登陆成功
function loadinit() {
    return new Promise((reolve, reject) => {
        const app = getApp();
        let time = 10 * 100 //默认最大等待10s
        let timeid = setInterval(() => {
            if (app.globalData.loginpd == 2) {
                clearInterval(timeid)
                reolve("登陆成功")
            } else if (app.globalData.loginpd == 3) {
                reject("登陆失败")
            }
            if (time > 0) {
                time -= 1
            } else {
                clearInterval(timeid)
                reject("登陆失败")
            }
        }, 10)
    })
}
// arrsort 数组排序
/*
  {
    arr:[] 排序数组，
    key:'id'排序键,
    sort:true  //false升序
  }
*/
function arrsort({
    arr = [],
    key = '',
    sort = true
}) {
    arr.sort(function(a, b) {
        let [tmp_a, tmp_b] = [a, b];
        if (key !== "") {
            [tmp_a, tmp_b] = [a[key], b[key]];
        }
        if (sort) {
            return tmp_b - tmp_a;
        } else {
            return tmp_a - tmp_b;
        }
    })
    return arr;
}
module.exports = {
    l: loca,
    g: globa,
    e: gete,
    arrsort: arrsort,
    loadinit: loadinit,
    newData: newData
        // logincode:logincode
}