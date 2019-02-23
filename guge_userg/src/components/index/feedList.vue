<template>
  <div class="feedList">
    <!-- <div style="height:1rem"></div> -->
    <div class="content" v-for="val in feedList">
      <div>
        <span>通知时间：</span>
        <span>{{val.createTime}}</span>
      </div>
      <div>
        <span style="display:block;flex:1">通知内容：</span>
        <span style="display:block;flex:3.6">{{val.noticeContent}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from "mint-ui";
export default {
  data() {
    return {
      feedList: []
    };
  },
  created() {
    Indicator.open();
    this.$http
      .post(
        "/selectNoticeByUserId",
        {
          data: {},
          version: "2.0"
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.token
          }
        }
      )
      .then(res => {
        Indicator.close();
        this.feedList = res.data.result;
      });
  }
};
</script>

<style scoped lang="less">
.content {
  width: 95%;
  margin: 0.8rem 0 0 2.5%;
  font-size: 0.9rem;
  border-bottom: 1px solid #dcdee2;
  padding-bottom: 0.8rem;
  && > div:nth-of-type(1) {
    margin-bottom: 0.2rem;
  }
  && > div:nth-of-type(2) {
    display: flex;
  }
}
</style>
