<template>
  <div class="succeed">
    <div class="main">
      <div class="miantop">
        <img src="../../../static/img/index/duigou.png"/>
      </div>
      <div class="miancenter">
        <p>我们已收到您的激活申请，</p>
        <p>并将及时为您开通"期管云"管理账户</p>
      </div>
    </div>
    <div class="footer" @click="succeed">
      我知道了
    </div>
    <div class="logo">
      <img src="../../../static/img/index/ma.png"/>
      <p>客服电话/微信：19920199920</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "succeed",
    data() {
      return {}
    },
    methods: {
      succeed() {
        if(localStorage.token){
          this.$router.push({
            path: "/index"
          })
        }else{
           this.$router.push({
            path: "/indexone"
          })
        }
        
      }
    }
  }
</script>

<style scoped lang="less">
  .succeed {
    width: 100%;
    .main {
      width: 100%;
      .miantop {
        width: 100%;
        height: 8.75rem/2;
        display: flex;
        margin-top: 11.94rem/2;
        img {
          width: 8.75rem/2;
          height: 8.75rem/2;
          margin: auto;
        }
      }
      .miancenter {
        font-size: 2.25rem/2;
        color: #333333;
        letter-spacing: 0;
        line-height: 3.38rem/2;
        text-align: center;
        margin-top: 3.63rem/2;
      }
    }
    .footer {
      width: 36.88rem/2;
      height: 5.63rem/2;
      background: #81CACE;
      border-radius: 10px;
      margin: auto;
      margin-top: 4.69rem/2;
      font-size: 2.25rem/2;
      color: #FFFFFF;
      letter-spacing: 2px;
      line-height: 5.63rem/2;
      text-align: center;
    }
    .logo {
      width: 39.88rem/2;
      margin: auto;
      margin-top: 16.81rem/2;
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
  }
</style>
