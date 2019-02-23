<template>
  <div class="login">
    <!--logo图-->
    <div class="image">
      <img src="../../../static/img/login/dalogo.png"/>
    </div>
    <div class="frame">
      <div class="frameone" style="padding-top: 2.344rem;">
        <img src="../../../static/img/login/shouji.png"/>
        <input class="shouji" type="tel" maxlength="11" placeholder="请输入本人的手机号" v-model="userPhone">
      </div>
      <div class="frameone" style="padding-top: 3.094rem;">
        <img src="../../../static/img/login/yanzheng.png"/>
        <input class="yanzheng" type="tel" placeholder="请输入验证码" v-model="userCode">
        <img class="huoqu" src="../../../static/img/login/huoqu.png" v-show="sendAuthCode" @click="findCode"/>
        <span v-show="!sendAuthCode" class="huoqu">{{auth_time}}s</span>
      </div>
      <div class="landing">
        <img src="../../../static/img/login/denglu.png" @click="loginUser"/>
      </div>
      <div class="skip" @click="onSkip">
        <span style="text-decoration: underline;">跳过</span><span> >></span>
      </div>
    </div>
    <div class="logo">
      <div class="shang">
        <img src="../../../static/img/login/shang.png"/>
        <p>律所孵化</p>
      </div>
      <div class="gu">
        <img src="../../../static/img/login/gu.png"/>
        <p>技术支持</p>
      </div>
      <div class="yun">
        <img src="../../../static/img/login/yun.png"/>
        <p>云计算支持</p>
      </div>
      <div class="fa">
        <img src="../../../static/img/login/fa.png"/>
        <p>电子签约支持</p>
      </div>
    </div>
    <div class="deal">
      <div class="top">
        <img src="../../../static/img/index/Group.png" @click="deal" v-show="dealBol"/>
        <img src="../../../static/img/index/oval.png" @click="deal" v-show="!dealBol"/>
      </div>
      <div class="font">
        <span>同意</span>
				<span @click="goAgreement" style="color: #004098">《用户协议》</span>
				<span>及</span>
				<span @click="goprivacy" style="color: #004098">《隐私政策》</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  import {Indicator} from 'mint-ui';

  export default {
    name: "login",
    data() {
      return {
        sendAuthCode: true,
        auth_time: 0,
        userPhone: "",
        userCode: "",
        dealBol: true,//协议切换
      }
    },
    mounted() {
      if (localStorage.token) {
        this.$router.push({
          path: "/index"
        })
      }
    },
    methods: {
      //跳过
      onSkip(){
        this.$router.push({
          path:"/indexone"
        })
      },
      //协议切换
      deal() {
        this.dealBol = !this.dealBol;
      },
      //获取验证码
      findCode() {
        var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (this.userPhone == "") {
          Toast('手机号不能为空');
        } else {
          if (reg.test(this.userPhone)) {
            this.sendAuthCode = false;
            this.auth_time = 60;
            var auth_timetimer = setInterval(() => {
              this.auth_time--;
              if (this.auth_time <= 0) {
                this.sendAuthCode = true;
                clearInterval(auth_timetimer);
              }
            }, 1000);
            this.$http.post("/findCode", {
              data: {
                userPhone: this.userPhone
              },
              version: "2.0"
            }).then(res => {
              console.log(res)
            })
          } else {
            Toast('手机号格式不正确');
          }
        }
      },
      //去看用户协议
      goAgreement(){
        this.$router.push({
          path:"/agreement"
        })
      }, //去看用户协议
      goprivacy(){
        this.$router.push({
          path:"/privacy"
        })
      },
      //登录
      loginUser() {
        var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (this.userPhone == "" || this.userCode == "") {
          Toast('手机号或验证码不能为空');
        } else {
          if (reg.test(this.userPhone)) {
            if (this.dealBol == false) {
              Toast('请同意用户协议及隐私政策');
            } else {
              Indicator.open();
              this.$http.post("/loginUser", {
                data: {
                  userPhone: this.userPhone,
                  randNum: this.userCode
                },
                version: "2.0"
              }).then(res => {
                Indicator.close();
                if (res.data.code == "0000") {
                  localStorage.token = res.data.result
                  Toast('登录成功');
                  this.$router.push({
                    path: "/index"
                  })
                } else {
                  Toast(res.data.msg);
                }
              })
            }
          } else {
            Toast('手机号格式不正确');
          }
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .login {
    width: 100%;
    input::-webkit-input-placeholder { /*WebKit browsers*/
      color: #dcdddd;
    }
    input::-moz-input-placeholder { /*Mozilla Firefox*/
      color: #dcdddd;
    }
    input::-ms-input-placeholder { /*Internet Explorer*/
      color: #dcdddd;
    }
    img {
      width: 100%;
    }
    .image {
      width: 8.906rem;
      margin: auto;
      margin-top: 2rem;
      img{
        width: 100%;
        height: auto%;
      }
    }
    .frame {
      width: 16.781rem;
      height: 19.281rem;
      background-color: #ffffff;
      box-shadow: 0rem 0.031rem 0.363rem 0.044rem rgba(0, 64, 152, 0.27);
      border-radius: 0.938rem;
      margin: auto;
      margin-top: 3rem;
      .skip {
        font-size: 0.9rem;
        text-align: center;
        color: #004098;
        padding: 1rem 0 0.2rem 0;
      }
      .frameone {
        height: 3.032rem;
        width: 13.906rem;
        border-bottom: 2px solid #d2cfcf;
        margin: auto;
        display: flex;
        justify-content: space-between;
        img {
          width: 1.375rem;
          height: 2.219rem;
        }
        .shouji {
          width: 11.75rem;
          font-size: 1rem;
          color: black;
          margin-bottom: 0.6rem;
        }
        .huoqu {
          width: 3.75rem;
          height: 2.031rem;
          text-align: center;
          line-height: 2.031rem;
        }
        .yanzheng {
          width: 7.219rem;
          font-size: 1rem;
          margin-bottom: 0.6rem;
          color: black;
        }
      }
      .landing {
        width: 12.844rem;
        height: 2.656rem;
        margin: auto;
        margin-top: 1.563rem;
      }
    }
    .deal {
      width: 55%;
      margin: auto;
      margin-top: 1rem;
      height: 2.5rem;
      display: flex;
      justify-content: space-around;
      .top {
        flex: 1;
        height: 100%;
        display: flex;
        img {
          width: 0.85rem;
          height: 0.85rem;
          margin: auto;
        }
      }
      .font {
        /*flex: 8;*/
        font-size: 0.7rem;
        color: #004098;
        line-height: 2.5rem;
        span{
          color: grey;
        }
        a{
          text-decoration: underline;
        }
      }
    }
    .logo{
      width: 36.563rem/2;
      height: 6.625rem/2;
      /*background: red;*/
      margin: auto;
      margin-top: 3rem;
      display: flex;
      justify-content: space-around;

      color: gray;
      text-align: center;
      div{
        display: flex;
        flex-direction: column;
        p{
          font-size: 0.5rem;
          margin-top: 0.5rem;
        }
      }
      .fa{
        img{
          width: 5.938rem/2;
          height: 3.938rem/2;
          margin: auto;
        }
      }
      .yun{
        img{
          width: 4.875rem/2;
          height: 3.938rem/2;
          margin: auto;
        }
      }
      .gu{
        img{
          width: 3.75rem/2;
          height: 3.938rem/2;
          margin: auto;
        }
      }
      .shang{
        img{
          width: 6rem/2;
          height: 3.938rem/2;
          margin: auto;
        }
      }
    }
  }

</style>
