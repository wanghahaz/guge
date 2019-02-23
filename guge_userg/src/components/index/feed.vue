<template>
  <div class="feed">
    <textarea
      name
      id
      v-model="feedbackContent"
      cols="30"
      rows="7"
      maxlength="100"
      placeholder="请输入您对公司的申请/反馈/申诉等意见（不超过100字）"
    ></textarea>
    <div class="sub">
      <mt-button @click="sub" type="primary" style="width:5rem;height:2rem;font-size:1rem">发送</mt-button>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from "mint-ui";
export default {
  data() {
    return {
      feedbackContent: ""
    };
  },
  methods: {
    sub() {
       Indicator.open();
      this.$http
        .post(
          "/addFeedback",
          {
            data: {
                feedbackContent:this.feedbackContent
            },
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
            if(res.data.code=="0000"){
                 Toast('发布成功');
                 this.feedbackContent=""
            }else{
                 Toast('发布失败');
            }
        });
    }
  }
};
</script>

<style scoped lang="less">
.feed {
  .sub {
    width: 90%;
    margin: 0.5rem 0 0 5%;
    display: flex;
    justify-content: flex-end;
  }
  textarea {
    width: 90%;
    margin: 1rem 0 0 5%;
    border: 1px solid #dcdee2;
    border-radius: 5px;
  }
}
</style>

