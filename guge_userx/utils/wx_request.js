import config from "./config"
import util from "./util"
// login()
class request {
    static post(data) {
        data.method = "POST";
        return this.req(data);
    }
    static get(data) {
        data.method = "GET";
        return this.req(data);
    }
    static put(data) {
        data.method = "PUT";
        return this.req(data);
    }
    static delete(data) {
            data.method = "DELETE";
            return this.req(data);
        }
        /**
         * wx.request 接口封装
         * @static
         * @param {*} {url,_url=false,data={},cb,show={suss:"操作成功",error:"操作失败"},method,token=true,loding=true,header={"content-type":"application/x-www-form-urlencoded"}}
         * @memberof req
         */
    static req({
        url,
        _url = false,
        data = {},
        show_state = false,
        show = {
            suss: "操作成功",
            error: "操作失败"
        },
        method,
        token = true,
        loding = false,
        header = {
            "content-type": "application/x-www-form-urlencoded"
                // post 'Accept': 'application/json',
                // get 'Content-Type': 'application/json'
        }
    }) {
        if (loding) {
            wx.showLoading({
                title: "正在加载"
            })
        }
        if (url == null) {
            console.error("url不能为空")
            return
        }
        if (_url) {
            url = _url + url
        } else {
            url = config.req_url + url
        }
        if (token) {
            header['Authorization'] = `Bearer ${util.l.get("token")}`
        }
        // console.log()
        return new Promise(function(resolve, reject) {
            wx.request({
                url: url,
                method: method,
                data: data,
                header: header,
                success: (res) => {
                    resolve(res)
                    if (show_state) wx.showToast({
                        title: show.suss,
                        icon: 'none',
                        duration: 2000
                    })
                },
                fail: (error) => {
                    reject(error)
                    if (show_state) wx.showToast({
                        title: show.error,
                        icon: 'none',
                        duration: 2000
                    })
                },
                complete: () => {
                    wx.hideLoading()
                }
            });
        })
    }
}
export default request;