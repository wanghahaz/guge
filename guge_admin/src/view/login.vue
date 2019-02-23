<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  background-image: url("../assets/img/login/login_bg.png");
  background-size: cover;
  background-position: center;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  .login_from {
    margin-top: 7%;
    /*position: relative;*/
    display: flex;
    align-items: center;
    /*background: palegreen;*/
    flex-direction: column;
    img {
      z-index: 2;
    }
    .login_frombox {
      width: 370px;
      height: 400px;
      background: white;
      margin-top: -20px;
      /*position: absolute;*/
      /*top: 5px;*/
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .getcode {
        width: 50px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        background: #faa84f;
        border-radius: 3px;
        font-size: 14px;
        margin-top: 8px;
        position: absolute;
        right: 8px;
      }
      .getcode_forbidden {
        width: 50px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        background: gray;
        border-radius: 3px;
        font-size: 14px;
        margin-top: 8px;
        position: absolute;
        right: 8px;
      }
    }
    .login_from_btn {
      width: 260px;
      height: 40px;
      border-radius: 8px;
      background: #427dcc;
      color: white;
      font-size: 16px;
      justify-content: center;
      align-items: center;
      display: flex;
    }
    .try_out {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      span:nth-child(1) {
        color: #838383;
      }
      span:nth-child(2) {
        color: #22b1c9;
        margin-right: 56px;
      }
      a {
        color: #22b1c9;
        margin-right: 56px;
      }
    }
  }
  .login_bottom {
    position: fixed;
    bottom: 30px;
    left: 50%;
    margin-left: -125px;
    width: 250px;
    font-size: 14px;
    color: #ffffff;
    opacity: 0.3;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 18px;
      height: 18px;
      margin-right: 10px;
      background: white;
      border-radius: 3px;
    }
  }
}
</style>

<template>
  <div class="login">
    <div class="login_from">
      <img src="../assets/img/login/login_float.png">
      <Form ref="loginForm" class="login_frombox" :model="loginForm" :rules="ruleInline">
        <img
          style="width: 100px;height: auto;margin-bottom: 10px;"
          src="../assets/img/login/log.png"
          alt
        >
        <FormItem prop="userPhone">
          <Input v-model="loginForm.userPhone" placeholder="请输入手机号">
            <Icon size="20" style="margin-top: 5px;" type="md-person" slot="suffix"/>
          </Input>
        </FormItem>
        <FormItem prop="passWord">
          <Input v-model="loginForm.passWord" type="password" placeholder="请输入密码">
            <Icon size="20" style="margin-top: 5px;" type="md-lock" slot="suffix"/>
          </Input>
        </FormItem>
        <FormItem prop="randNum">
          <Input v-model="loginForm.randNum" placeholder="请输入验证码">
            <span
              v-if="getCodebol"
              @click="findCode"
              class="getcode cursor_pointer"
              slot="suffix"
            >获取</span>
            <span v-else class="getcode_forbidden" slot="suffix">{{getCodeNum}} S</span>
          </Input>
        </FormItem>
        <FormItem>
          <div @click="handleSubmit('loginForm')" class="login_from_btn cursor_pointer">登 录</div>
        </FormItem>
        <div @click="hrefPush" class="try_out cursor_pointer">
          <span>没有账号？</span>
          <span>申请试用>></span>
        </div>
      </Form>
    </div>
    <div class="login_bottom">
      <img
        class="cursor_pointer"
        v-show="consent"
        @click="consent = false"
        src="../assets/img/login/login_btn_selected.png"
        alt
      >
      <img
        class="cursor_pointer"
        v-show="!consent"
        @click="consent = true"
        src="../assets/img/login/login_btn_highlighted.png"
        alt
      >
      <span>同意
        <span class="cursor_pointer" @click="goAgreement">《用户协议》</span>及
        <span class="cursor_pointer" @click="goprivacy">《隐私政策》</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var judgeUserPhone = function(rule, value, callback) {
      if (value == "") {
        return callback(new Error("请输入手机号"));
      } else if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
        return callback(new Error("请输入正确手机号"));
      } else {
        callback();
      }
    };
    return {
      consent: true,
      getCodeNum: "60",
      getCodebol: true,
      loginForm: {
        userPhone: "",
        passWord: "",
        randNum: ""
      },
      ruleInline: {
        userPhone: [
          {
            required: true,
            trigger: "blur",
            validator: judgeUserPhone
          }
        ],
        passWord: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        randNum: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    goAgreement() {
      window.open("https://guge.web.iguge.com/web/#/agreement");
    },
    goprivacy() {
      window.open("https://guge.web.iguge.com/web/#/privacy");
    },
    //获取验证码
    findCode() {
      this.$refs.loginForm.validateField("userPhone", val => {
        if (val == "") {
          // 已输入 正确手机号
          this.$refs.loginForm.validateField("passWord", value => {
            if (value == "") {
              //已输入 密码
              this.$axios.Login.selectJudge({
                data: {
                  adminName: this.loginForm.userPhone,
                  password: this.loginForm.passWord
                },
                version: "2.0"
              }).then(res => {
                if (res.code == "1000") {
                  this.$Message.error(res.msg);
                } else {
                  this.$axios.Login.findCode({
                    data: {
                      userPhone: this.loginForm.userPhone
                    },
                    version: "2.0"
                  }).then(res => {
                    this.getCodeNum = 60;
                    this.getCodebol = false;
                    var auth_timetimer = setInterval(() => {
                      this.getCodeNum--;
                      if (this.getCodeNum <= 0) {
                        this.getCodebol = true;
                        clearInterval(auth_timetimer);
                      }
                    }, 1000);
                  });
                }
              });
            }
          });
        }
      });
    },
    //点击登录
    LoginOk() {
      //判断用户是否同意协议
      if (this.consent) {
        this.$axios.Login.LoginOk({
          data: {
            adminName: this.loginForm.userPhone,
            password: this.loginForm.passWord,
            randNum: this.loginForm.randNum
          },
          version: "2.0"
        }).then(res => {
          if (res.code == "0000") {
            localStorage.gugeAdminUser = JSON.stringify(res.result);
            this.$util.router_push(this, "home");
          } else if (res.code == "1000") {
            this.$Message.error(res.msg);
          }
        });
      } else {
        this.$Message.error("请勾选同意《用户协议》及《隐私政策》！");
      }
    },
    //提交from表单
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.LoginOk();
        } else {
          this.$Message.error("请检查是否输入正确！");
        }
      });
    },
    hrefPush() {
		console.log(111)
       this.$router.push({
		   path:'/active'
	   })
    }
  }
};
</script>