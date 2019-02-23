<template>
  <!--选项C-->
  <div class="choiceD">
    <div class="mark_content">
      <span class="xinxi">请填写您的信息</span>
      <div class="marktop">
        <div class="markone">
          <div>
            <span class="word">姓名</span>
            <span style="color: red;vertical-align: middle;">*</span>
          </div>
          <input type="text" maxlength="5" v-model="nameD">
        </div>
        <div class="markone">
          <div>
            <span class="word">职务</span>
          </div>
          <input type="text" v-model="postD">
        </div>
        <div class="markone">
          <div>
            <span class="word">联系电话</span>
            <span style="color: red;vertical-align: middle;">*</span>
          </div>
          <input type="text" maxlength="11" v-model="phoneD">
        </div>
        <div class="markone">
          <div>
            <span class="word">微信</span>
          </div>
          <input type="text" v-model="wechatD">
        </div>
        <div class="markone" style="border-bottom: 1px solid #E7E7E7;">
          <div>
            <span class="word">工作单位</span>
            <span style="color: red;vertical-align: middle;">*</span>
          </div>
          <input type="text" v-model="companyNameD">
        </div>
      </div>
      <div class="consumer">
        <div class="consumerbottom" style="border-bottom: 1px solid #E7E7E7;height: 70%;flex-direction: column;">
          <div>
            <span class="word">需求描述/反馈/申诉：</span>
          </div>
          <textarea style="width: 100%;height: 60%;font-size: 1rem;" v-model="explainAndNeedD"></textarea>
        </div>
      </div>
      <!--提交按钮-->
      <div class="footer" style="margin-top: 3rem" @click="insertOneKeyGenerateD">
        <p>立即提交</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  import {Indicator} from 'mint-ui';

  export default {
    name: "choiceD",
    data() {
      return {
        token: "",
        //选项D
        nameD: "", //姓名
        postD: "", //职务
        phoneD: "", //电话
        wechatD: "", //微信
        companyNameD: "", //工作单位
        explainAndNeedD: "", //需求描述
        images: [],
      }
    },
    mounted() {
      this.token = localStorage.token
    },
    methods: {
      //选项D接口
      insertOneKeyGenerateD() {
        this.$http.post("/insertOneKeyGenerate", {
          data: {
            choice: "D",
            name: this.nameD,
            post: this.postD,
            phone: this.phoneD,
            wechat: this.wechatD,
            companyName: this.companyNameD,
            explainAndNeed: this.explainAndNeedD
          },
          version: "2.0"
        }, {
          headers: {
            Authorization:localStorage.token?"Bearer "+ this.token:''
          }
        }).then(res => {
          if (res.data.code == "0000") {
            this.$router.push({
              path: "/succeed"
            })
          } else {
            Toast(res.data.msg);
          }
        })
      },
    }
  }
</script>

<style scoped lang="less">
  .choiceD {
    width: 100%;
    height: 100vh;
    ::-webkit-scrollbar {
      width: 0;
      /* 滚动条宽度为0 */
      height: 0;
      /* 滚动条高度为0 */
      display: none;
      /* 滚动条隐藏 */
    }
    .mark_content {
      width: 41.88rem/2;
      height: 100%;
      background: #ffffff;
      border-radius: 10px;
      overflow: auto;
      margin: auto;
      .dingwei {
        position: relative;
        height: 2.69rem;
        button {
          position: absolute;
          top: 0;
          right: 0;
          width: 70%;
          background: #fff;
        }
        .hhh {
          position: absolute;
          top: 0;
          right: 0;
          width: 71%;
          height: 2.67rem;
          z-index: 300;
          pointer-events: none;
          background: #fff;
          line-height: 2.67rem;
        }
      }
      .xinxi {
        display: block;
        width: 100%;
        font-weight: bold;
        font-size: 2.25rem/2;
        color: #333333;
        letter-spacing: 0;
        line-height: 3.38rem/2;
        text-align: center;
        padding: 1.94rem/2 0 1rem 0;
      }
      .marktop {
        width: 40.31rem/2;
        height: 26.9rem/2;
        margin: 0 0 0 1.5rem/2;
        display: flex;
        flex-direction: column;
        .markone {
          width: 100%;
          height: 5.38rem/2;
          border-bottom: 1px solid #E7E7E7;
          display: flex;
          justify-content: space-between;
          .word {
            font-size: 1rem;
            color: #333333;
            line-height: 2.69rem;
          }
          input {
            width: 75%;
            height: 100%;
            font-size: 1rem;
          }
        }
        .markone:last-child {
          border-bottom: none;
        }
      }
      .markcenter {
        width: 100%;
        height: 1.25rem/2;
        background: #F2F2F2;
      }
      .markbottomone {
        width: 40.31rem/2;
        height: 32.08rem/2;
        margin: 0 0 0 1.5rem/2;
        display: flex;
        flex-direction: column;
        .markone {
          width: 100%;
          height: 5.38rem/2;
          border-bottom: 1px solid #E7E7E7;
          display: flex;
          justify-content: space-between;
          .word {
            font-size: 1rem;
            color: #333333;
            line-height: 2.69rem;
          }
          input {
            width: 71%;
            height: 100%;
            font-size: 1rem;
          }
        }
        .markone:last-child {
          height: 10.56rem/2;
          border-bottom: none;
        }
      }
      .markbottomtwo {
        height: 8rem;
        width: 100%;
        p {
          font-size: 1rem;
          color: #333333;
          line-height: 1.5rem;
          margin-left: 1.5rem/2;
        }
        .bottommain {
          display: flex;
          span {
            position: relative;
            border: 1px solid #C5C5C5;
            border-radius: 10px;
            width: 15.75rem/2;
            height: 4.75rem/2;
            margin-left: 1.69rem/2;
            margin-top: 0.4rem;
            display: flex;
            justify-content: space-around;
            .paperone {
              opacity: 0;
              width: 7.875rem;
              height: 2.375rem;
              position: absolute;
              top: 0;
              right: 0;
            }
            .papertwo {
              opacity: 0;
              width: 7.875rem;
              height: 2.375rem;
              position: absolute;
              top: 0;
              right: 0;
            }
            .spantop {
              width: 3.75rem/2;
              height: 100%;
              display: flex;
              img {
                width: 1.75rem/2;
                height: 1.75rem/2;
                margin: auto;
              }
            }
            .spanbottom {
              flex: 2;
              font-size: 0.9rem;
              line-height: 4.75rem/2;
            }
          }
        }
      }
      .markbottomthree {
        width: 100%;
        height: 26.51rem/2;
        p {
          font-size: 1rem;
          color: #333333;
          line-height: 3rem/2;
          margin-left: 1.5rem/2;
        }
        .markone {
          width: 40.31rem/2;
          height: 5.38rem/2;
          border-bottom: 1px solid #E7E7E7;
          margin-left: 1.5rem/2;
          display: flex;
          justify-content: space-between;
          .word {
            font-size: 1rem;
            color: #333333;
            line-height: 2.69rem;
          }
          input {
            width: 63%;
            height: 100%;
            font-size: 1rem;
          }
        }
      }
      .footer {
        position: sticky;
        bottom: 0rem;
        width: 41.88rem/2;
        height: 9.63rem/2;
        text-align: center;
        background: #fff;
        border-radius: 10px;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        user-select:none;
        p {
          width: 36.88rem/2;
          height: 5.63rem/2;
          line-height: 5.63rem/2;
          letter-spacing: 2px;
          color: #fff;
          background: #80C9CD;
          border-radius: 10px;
          margin: auto;
          margin-top: 3rem/2;
        }
      }
      .consumer {
        width: 100%;
        height: 18.63rem/2;
        .consumertop {
          height: 7.94rem/2;
          width: 40.31rem/2;
          border-bottom: 1px solid #E7E7E7;
          margin-left: 1.5rem/2;
          display: flex;
          justify-content: space-between;
          div {
            font-size: 1rem;
            color: #333333;
            letter-spacing: 0;
            p:first-child {
              margin-top: 1.69rem/2;
            }
          }
          input {
            width: 46%;
            height: 100%;
            font-size: 1rem;
          }
        }
        .consumerbottom {
          width: 40.31rem/2;
          margin-left: 1.5rem/2;
          display: flex;
          justify-content: space-between;
          .word {
            font-size: 1rem;
            color: #333333;
            line-height: 2.69rem;
          }
        }
      }
      .markbottoma {
        width: 100%;
        p {
          font-size: 1rem;
          color: #333333;
          line-height: 3rem/2;
          margin-left: 1.5rem/2;
          margin-top: 1.69rem/2;
        }
      }
    }
  }
</style>
