<template>
  <!--选项C-->
  <div class="choiceC">
    <div class="mark_content">
      <span class="xinxi">请填写您的信息</span>
      <div class="marktop">
        <div class="markone">
          <div>
            <span class="word">姓名</span>
            <span style="color: red;vertical-align: middle;">*</span>
          </div>
          <input type="text" maxlength="5" v-model="nameC">
        </div>
        <div class="markone">
          <div>
            <span class="word">职务</span>
          </div>
          <input type="text" v-model="postC">
        </div>
        <div class="markone">
          <div>
            <span class="word">联系电话</span>
            <span style="color: red;vertical-align: middle;">*</span>
          </div>
          <input type="text" maxlength="11" v-model="phoneC">
        </div>
        <div class="markone">
          <div>
            <span class="word">微信</span>
          </div>
          <input type="text" v-model="wechatC">
        </div>
        <div class="markone" style="border-bottom: 1px solid #E7E7E7;">
          <div>
            <span class="word">工作单位</span>
            <span style="color: red;vertical-align: middle;">*</span>
          </div>
          <input type="text" v-model="companyNameC">
        </div>
      </div>
      <div class="consumer">
        <div class="consumertop">
          <div>
            <p>需要开通的用户数</p>
            <p style="color: #999999">(公司已激励对象人数)</p>
          </div>
          <input type="text" v-model="userNumC">
        </div>
        <div class="consumerbottom" style="border-bottom: 1px solid #E7E7E7;height: 70%">
        	<div class="qitashuoming">
        		<span>其他说明</span>
        		<span>
        			<textarea style="width:100%;height: auto;font-size: 1rem;" v-model="explainAndNeedC"></textarea>
        		</span>
        	</div>
          <!--<div>
            <span class="word">其他说明</span>
          </div>
          <textarea style="width: 71%;height: 100%;font-size: 1rem" v-model="explainAndNeedC"></textarea>-->
        </div>
      </div>
      <!--提交按钮-->
      <div class="footer" style="margin-top: 3rem" @click="insertOneKeyGenerateC">
        <p>立即提交</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  import {Indicator} from 'mint-ui';

  export default {
    name: "choiceC",
    data() {
      return {
        token: "",
        //选项C
        nameC: "", //姓名
        postC: "", //职务
        phoneC: "", //电话
        wechatC: "", //微信
        companyNameC: "", //工作单位
        explainAndNeedC: "", //其他说明
        userNumC: "",//用户数
      }
    },
    mounted() {
      this.token = localStorage.token
    },
    methods: {
      //选项C接口
      insertOneKeyGenerateC() {
        var regNum = /^[0-9]*[1-9][0-9]*$/;
        if (this.userNumC.length > 0) {
          if (!regNum.test(this.userNumC)) {
            Toast("需要开通的用户数只可输入正整数");
            return
          }
        }
        this.$http.post("/insertOneKeyGenerate", {
          data: {
            choice: "C",
            name: this.nameC,
            post: this.postC,
            phone: this.phoneC,
            wechat: this.wechatC,
            companyName: this.companyNameC,
            userNum: this.userNumC,
            explainAndNeed: this.explainAndNeedC
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
  .choiceC {
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
  .qitashuoming{
  	width: 100%;
  	display: flex;
  	flex-direction: column;
  	span{
  		width: 100%;
  	}
  	span:nth-child(1){
  		margin: 0.4rem 0;
  	}
  }
</style>
