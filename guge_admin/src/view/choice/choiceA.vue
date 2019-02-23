<template>
  <!--选项A-->
  <div class="choiceA" @click.stop="">
    <div class="mark_content">
      <span class="xinxi">请填写您的信息<span @click="close" class='close cursor_pointer'>X</span></span>
      <div class="marktop">
        <div class="markone">
          <div>
            <span class="word">姓名</span>
            <span style="color: red;vertical-align: middle;">*</span>
          </div>
          <input type="text" maxlength="5" v-model="nameA">
        </div>
        <div class="markone">
          <div>
            <span class="word">职务</span>
          </div>
          <input type="text" v-model="postA">
        </div>
        <div class="markone">
          <div>
            <span class="word">联系电话</span>
            <span style="color: red;vertical-align: middle;">*</span>
          </div>
          <input type="text" maxlength="11" v-model="phoneA">
        </div>
        <div class="markone">
          <div>
            <span class="word">微信</span>
          </div>
          <input type="text" v-model="wechatA">
        </div>
        <div class="markone">
          <div>
            <span class="word">公司名称</span>
            <span style="color: red;vertical-align: middle;">*</span>
          </div>
          <input type="text" v-model="companyNameA">
        </div>
      </div>
      <div class="markcenter">

      </div>
      <div class="markbottomone dingwei">
        <div class="markone" >
          <div>
            <span class="word">期权授予日</span>
          </div>
        </div>
        <div class="markone">
          <div>
            <span class="word">获授股数</span>
          </div>
          <input type="text" v-model="impowerSharesNumA">
        </div>
        <div class="markone">
          <div>
            <span class="word">成熟期</span>
          </div>
          <input type="text" v-model="autumnA">
        </div>
        <div class="markone">
          <div>
            <span class="word">行权价</span>
          </div>
          <input type="text" v-model="eachAppraisementA">
        </div>
        <div class="markone">
        	<div class="qitashuoming">
        		<span>其他说明</span>
        		<span>
        			<textarea style="width:100%;height: auto;font-size: 1rem;" v-model="explainAndNeedA"></textarea>
        		</span>
        	</div>
        </div>
      </div>
      <div class="markcenter">

      </div>
      <div class="markbottomtwo">
        <p>如您需要自动识别，请上传您的期权授予协议，以及公司的期权激励计划（如有，请拍摄照片或扫描为图片上传）</p>
        <div class="bottommain">
						<span>
            <div class="spantop">
                   <img src="../../assets/img/active/add.png"/>
              </div>
            <div class="spanbottom">
              期权授予协议
            </div>
              <!--image/png,image/gif,image/jpeg,image/jpg,image/x-ms-bmp-->
              <input type="file" multiple="multiple" class="paperone"
                     accept="image/*"
                     @change="update">
          </span>
          <span>
              <div class="spantop">
                   <img src="../../assets/img/active/add.png"/>
              </div>
            <div class="spanbottom">
              期权激励计划
            </div>
              <input type="file" multiple="multiple" class="papertwo"
                     accept="image/*"
                     @change="uploadFile">
          </span>
        </div>
      </div>
      <div class="markcenter">

      </div>
      <div class="markbottomthree">
        <p>
          如您希望所在公司的期权激励计划正式获得“期权云”的认证和托管，请提供公司创始人/负责人的下列信息：
        </p>
        <p style="color: #A1A1A1;">
          (我们将为您个人信息严格保密，并尽快督促公司完成期权授予认证）
        </p>
        <div class="markone">
          <div>
            <span class="word">创始人/负责人</span>
          </div>
          <input type="text" maxlength="5" v-model="chargePersonNameA">
        </div>
        <div class="markone">
          <div>
            <span class="word">联系电话</span>
          </div>
          <input type="text" maxlength="11" v-model="chargePersonPhoneA">
        </div>
      </div>
      <!--提交按钮-->
      <div class="footer" @click="insertOneKeyGenerateA">
        <p>立即提交</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "choiceA",
    data() {
      return {
        pickerValue: null, //日期
        token: "",
        updateSrc: "",//期权授予协议url
        uploadFileSrc: "",//期权激励计划url
        yearone: "", //日期   股权授予日期
        //选项A
        nameA: "", //姓名
        postA: "", //职务
        phoneA: "", //电话
        wechatA: "", //微信
        companyNameA: "", //公司名称
        impowerSharesNumA: "", //授予股数
        autumnA: "", //成熟期
        eachAppraisementA: "", //行权价
        explainAndNeedA: "", //其他说明
        chargePersonNameA: "",//负责人姓名
        chargePersonPhoneA: "",//负责人电话
      }
    },
    mounted() {
      this.token = localStorage.token;
    },
    methods: {
      close(){
        this.$emit('succeed', false);
      },
      //选项A接口
      insertOneKeyGenerateA() {
        var regNum = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
        if (this.impowerSharesNumA.length > 0) {
          if (!regNum.test(this.impowerSharesNumA)) {
            this.$Message.info("授予股数只能输入数字")
            return
          }
        }
        if (this.autumnA.length > 0) {
          if (!regNum.test(this.autumnA)) {
            this.$Message.info("成熟期只能输入数字")
            return
          }
        }
        if (this.eachAppraisementA.length > 0) {
          if (!regNum.test(this.eachAppraisementA)) {
            this.$Message.info("行权价只能输入数字")
            return
          }
        }
        this.$axios.Account.insertOneKeyGenerate({
					data: {
					 adminId: localStorage.gugeAdminUser?JSON.parse(localStorage.gugeAdminUser).id / 1:'',
            choice: "A",
            name: this.nameA,
            post: this.postA,
            phone: this.phoneA,
            wechat: this.wechatA,
            companyName: this.companyNameA,
            stockStartTime: this.yearone,
            impowerSharesNum: this.impowerSharesNumA,
            autumn: this.autumnA,
            eachAppraisement: this.eachAppraisementA,
            explainAndNeed: this.explainAndNeedA,
            agreementUrl: this.updateSrc,
            panUrl: this.uploadFileSrc,
            chargePersonName: this.chargePersonNameA,
            chargePersonPhone: this.chargePersonPhoneA
					},
					version: '2.0'
				}).then(res => {
						console.log(res)
          if (res.code == "0000") {
            this.$Message.success(res.msg);
            this.$emit('succeed', false);
          } else {
            this.$Message.info(res.msg);
          }
				});
      },
      //上传文件
      update(e) {
        let file = e.target.files;
        let param = new FormData(); //创建form对象
        for (var i = 0; i < file.length; i++) {
          param.append('fileName', file[i]);//通过append向form对象添加数据
        }
        // let config = {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //     Authorization: "Bearer " + this.token
        //   }
        // }; //添加请求头
   
        this.$http.post('/uploadFile', param)//, config
          .then(res => {
            this.$Message.success('上传成功');
            this.uploadFileSrc = res.data.result
          })
      },
      uploadFile(e) {
        let file = e.target.files;
        let param = new FormData(); //创建form对象
        for (var i = 0; i < file.length; i++) {
          param.append('fileName', file[i]);//通过append向form对象添加数据
        }
        this.$http.post('/uploadFile', param)//, config
          .then(res => {
            this.$Message.success('上传成功');
            this.uploadFileSrc = res.data.result
          })
      }
    }
  }
</script>

<style scoped lang="less">
  .close{
    display:inline-block;
    position:absolute;
    right:20px;
  }
  .choiceA {
    input{
      border: none;
      outline: none
    }
     z-index:101;
    position: fixed;
    width:35rem/2 ;
    height: 86%;
    top:7%;
    left:32rem;
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
        position: relative;
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
        z-index: 999;
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
