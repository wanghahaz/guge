<template>
  <div class="activate">
    <!--头部文字-->
    <div class="text">
      <h1>欢迎使用"股格|期管云"在线期权管理软件。</h1>
      <h1>您希望通过哪种方式激活"期管云"?</h1>
    </div>
    <div class="main">
      <!--选项A-->
      <div class="mainone" @click="alertmark">
        <div class="top">
          <img src="../../../static/img/index/oval.png" v-if="bolA"/>
          <img src="../../../static/img/index/Group.png" v-if="!bolA"/>
        </div>
        <div class="bottom">
          <p>我是公司的期权激励对象，</p>
          <p>想通过"期管云"自助填写管理</p>
        </div>
      </div>
      <!--选项B-->
      <div class="mainone" @click="alertmarkB">
        <div class="top">
          <img src="../../../static/img/index/oval.png" v-if="bolB"/>
          <img src="../../../static/img/index/Group.png" v-if="!bolB"/>
        </div>
        <div class="bottom">
          <p>我是公司的创始人/负责人，</p>
          <p>想通过"期管云"管理公司期权</p>
        </div>
      </div>
      <!--选项C-->
      <div class="mainone">
        <div class="top">
          <img src="../../../static/img/index/oval.png" v-if="bolC"/>
          <img src="../../../static/img/index/Group.png" v-if="!bolC"/>
        </div>
        <div class="bottom" @click="alertmarkC">
          <p>我是律师/咨询顾问/投资机构，</p>
          <p>想通过"期管云"为我的客户管理期权</p>
        </div>
      </div>
      <!--选项D-->
      <div class="mainone" @click="alertmarkD">
        <div class="top">
          <img src="../../../static/img/index/oval.png" v-if="bolD"/>
          <img src="../../../static/img/index/Group.png" v-if="!bolD"/>
        </div>
        <div class="bottom">
          <p>其他，我有一些定制的需求</p>
        </div>
      </div>

      <!--退出登录-->
      <div class="mainone" style="border: none;background: #80C9CD;text-align: center;" @click="loginOut(0)">
        <div class="bottom" style="color: white">
          <p style="letter-spacing: 0.5rem">退出登录</p>
        </div>
      </div>
    </div>
    <!--退出登录-->
    <div class="mark" v-show="quitRegister">
      <div class="mark_content">
        <img class="close" src="../../../static/img/index/close.png" @click="loginOut(2)"/>
        <p class="clickDimissionP">您确定要退出吗？</p>
        <div class="dimissionfoot" style="margin-top: 5rem">
          <span style="background: #80C9CD;" @click="loginOut(1)">确定</span>
          <span style="color: #80C9CD;" @click="loginOut(2)">取消</span>
        </div>
      </div>
    </div>
    <!--未登录的弹框-->
    <div class="mark" v-show="alertRegister">
      <div class="mark_content">
        <img class="close" src="../../../static/img/index/close.png" @click="notLogin"/>
        <p class="fenhong">温馨提示：</p>
        <div class="markmain"
             style="font-size: 1.125rem;line-height: 1.69rem;padding-top: 0.905rem;margin-bottom: 3.5rem">
          <p>您需要首先注册，</p>
          <p>才可以继续使用“期管云”。</p>
        </div>
        <div class="base" style="letter-spacing: 2px;" @click="goLogin">
          好的，我现在就去注册
        </div>
      </div>
    </div>
    <div class="foot">
      <img src="../../../static/img/index/ma.png"/>
      <p>客服电话/微信：19920199920</p>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  import {Indicator} from 'mint-ui';

  export default {
    name: "activate",
    data() {
      return {
        alertRegister: false,//未登录的弹框
        bolA: true,//选择换图
        bolB: true,//选择换图
        bolC: true,//选择换图
        bolD: true,//选择换图
        quitRegister: false,//退出登录模态框
      }
    },
    mounted() {
      window.scroll(0, 0);
    },
    methods: {
      //退出登录
      loginOut(dome) {
        switch (dome) {
          case 0:
            if (!localStorage.token) {
              this.$router.push({
                path: "/"
              });
              return
            }
            this.quitRegister = true;
            break;
          case 1:
            this.quitRegister = false;
            localStorage.removeItem("token");
            Toast('退出成功');
            this.$router.push({
              path: "/"
            });
            break;
          case 2:
            this.quitRegister = false;
            break;
        }
      },
      //选项A
      alertmark() {
        // if (!localStorage.token) {
        //   this.alertRegister = true;
        //   return
        // }
        this.bolA = false;
        this.bolB = true;
        this.bolC = true;
        this.bolD = true;
        this.$router.push({
          path: "/choiceA"
        })
      },
      //选项B
      alertmarkB() {
        // if (!localStorage.token) {
        //   this.alertRegister = true;
        //   return
        // }
        this.bolA = true;
        this.bolB = false;
        this.bolC = true;
        this.bolD = true;
        this.$router.push({
          path: "/choiceB"
        })
      },
      //选项C
      alertmarkC() {
        // if (!localStorage.token) {
        //   this.alertRegister = true;
        //   return
        // }
        this.bolA = true;
        this.bolB = true;
        this.bolC = false;
        this.bolD = true;
        this.$router.push({
          path: "/choiceC"
        })
      },
      //选项D
      alertmarkD() {
        // if (!localStorage.token) {
        //   this.alertRegister = true;
        //   return
        // }
        this.bolA = true;
        this.bolB = true;
        this.bolC = true;
        this.bolD = false;
        this.$router.push({
          path: "/choiceD"
        })
      },
      //跳转到登录
      notLogin() {
        this.alertRegister = false;
      },
      goLogin() {
        this.$router.push({
          path: "/"
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .activate {
    width: 100%;
    /*头部文字*/
    .text {
      width: 100%;
      font-size: 2.25rem/2;
      color: #000;
      letter-spacing: 0;
      line-height: 3.38rem/2;
      text-align: center;
      margin-top: 3.375rem/2;
      h1 {
        font-size: 2.25rem/2;
        font-weight: inherit;
      }
    }
    /*中间选项*/
    .main {
      width: 39.88rem/2;
      height: 44.5rem/2;
      margin: auto;
      margin-top: 3.06rem/2;
      display: flex;
      flex-direction: column;
      .mainone {
        width: 100%;
        height: 7.5rem/2;
        border: 1px solid #C5C5C5;
        border-radius: 5px;
        display: flex;
        justify-content: space-around;
        .top {
          width: 2.5rem;
          height: 100%;
          display: flex;
          img {
            width: 1.88rem/2;
            height: 1.88rem/2;
            margin: auto;
          }
        }
        .bottom {
          flex: 3;
          margin: auto;
          font-size: 1rem;
          line-height: 2.81rem/2;
          color: #8E8E8E;
        }
      }
      .mainone:nth-child(2) {
        margin: 1.75rem/2 auto;
      }
      .mainone:nth-child(3) {
        margin-bottom: 1.75rem/2;
      }
      .mainone:nth-child(4) {
        margin-bottom: 1.75rem/2;
      }
    }
    /*底部二维码*/
    .foot {
      width: 39.88rem/2;
      margin: auto;
      margin-top: 3rem;
      text-align: center;
      img {
        width: 9.19rem/2;
        height: 9.19rem/2;
      }
      p {
        font-size: 1.5rem/2;
        color: #8E8E8E;
      }
    }
    .mark {
      overflow: hidden;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 999;
      display: flex;
      .mark_content {
        position: relative;
        width: 20.94rem;
        height: 17rem;
        background: #FFFFFF;
        border-radius: 0.63rem;
        margin: 12rem auto;
        text-align: center;
        .close {
          position: absolute;
          top: 0;
          right: 0;
          width: 0.845rem;
          height: 0.845rem;
          padding: 1rem;
        }
        .clickDimissionP {
          font-size: 1.125rem;
          color: #333333;
          padding-top: 6.28rem;
        }
        .dimissionfoot {
          width: 19.445rem;
          height: 2.815rem;
          margin: auto;
          margin-top: 2rem;
          display: flex;
          justify-content: space-between;
          span {
            width: 9rem;
            height: 100%;
            line-height: 2.815rem;
            border-radius: 0.315rem;
            border: 2px solid #80C9CD;
            font-size: 1.125rem;
            color: #FFFFFF;
            letter-spacing: 2px;
          }
        }
        .fenhong {
          font-size: 2.25rem/2;
          color: #333333;
          line-height: 3.38rem/2;
          padding-top: 1.94rem/2;
          margin-bottom: 5.06rem/2;
        }
        .base {
          width: 38.88rem/2;
          height: 5.63rem/2;
          border-radius: 0.63rem/2;
          background: #80C9CD;
          color: #fff;
          margin: auto;
          line-height: 5.63rem/2;
          margin-top: 5.75rem/2;
        }
      }
    }
  }
</style>
