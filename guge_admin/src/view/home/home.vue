<style scoped lang="less">
@import url("./less/home.less");
</style>
<template>
  <div class="home">
    <!--header-->
    <div class="header">
      <div class="header_left">
        <img
          v-if="userImageBol"
          style="border-radius: 50%;"
          src="../../assets/img/home/home-user.png"
        >
        <img v-else style="border-radius: 50%;" :src="userImage">
        <div>
          <span>欢迎 !</span>
          <span>{{companyName}}</span>
        </div>
      </div>
      <div class="header_right">
        <div
          @mouseleave="exerciseDynamicNum = 0"
          @mouseenter="exerciseDynamicNum = 1"
          :class="exerciseDynamicNum==1?'cursor_pointer':' '"
          @click="router_push('exercise','exercise')"
        >
          <img src="@/assets/img/home/home-exercise.png">
          <span>行权申请</span>
          <span class="num">{{unreadObj.type_1}}</span>
        </div>
        <div
          @mouseleave="exerciseDynamicNum = 0"
          @mouseenter="exerciseDynamicNum = 2"
          :class="exerciseDynamicNum==2?'cursor_pointer':' '"
          @click="router_push('exercise','makeOver')"
        >
          <img src="@/assets/img/home/home-make.png">
          <span>转让申请</span>
          <span class="num">{{unreadObj.type_3}}</span>
        </div>
        <div
          @mouseleave="exerciseDynamicNum = 0"
          @mouseenter="exerciseDynamicNum = 3"
          :class="exerciseDynamicNum==3?'cursor_pointers':' '"
          @click="router_push('exercise','withdrawal')"
        >
          <img v-if="exerciseDynamicNum==3" src="../../assets/img/objects/object-quit-btns.png">
          <img v-else src="../../assets/img/objects/objects-quit.png">
          <span>回购申请</span>
          <span class="num">{{unreadObj.type_2}}</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content_left">
        <div class="content_left_type">
          <div @click="router_push('company')" class="title cursor_pointer">
            <img src="../../assets/img/tab-page/tab-company-ons.png">
            <span>我的公司</span>
            <span class="triangle"></span>
          </div>
          <div @click="router_push('setparameter',companyId)" class="main cursor_pointer">
            <img src="../../assets/img/home/home-update.png">
            <span>更新公司参数</span>
          </div>
          <div @click="router_push('company')" class="more cursor_pointer">
            <img src="../../assets/img/home/home-more.png">
          </div>
        </div>
        <div class="content_left_type">
          <div @click="router_push('objects')" class="title cursor_pointer">
            <img src="../../assets/img/tab-page/tab-object-on.png">
            <span>激励对象</span>
            <span class="triangle"></span>
          </div>
          <!--<div @click="router_push('objects',companyId);$store.commit('changeShow', {str:'adduserShow',bol:true})" class="main cursor_pointer">-->
          <div @click="addUser" class="main cursor_pointer">
            <img src="../../assets/img/home/home-adduser.png">
            <span>新增激励对象</span>
          </div>
          <div @click="router_push('objects')" class="more cursor_pointer">
            <img src="../../assets/img/home/home-more.png">
          </div>
        </div>
        <div class="content_left_type">
          <div @click="router_push('estate')" class="title cursor_pointer">
            <img src="../../assets/img/tab-page/tab-estate-on.png">
            <span>财税核算</span>
            <span class="triangle"></span>
          </div>
          <div class="main">
            <span class="money">￥{{currentManagementCosts}}</span>
            <span>本期管理费用</span>
          </div>
          <div @click="router_push('estate')" class="more cursor_pointer">
            <img src="../../assets/img/home/home-more.png">
          </div>
        </div>
      </div>
      <div class="content_right">
        <div class="title">
          <img src="../../assets/img/tab-page/tab-exercise-ons.png">
          <span>行权概览</span>
        </div>
        <div class="echarts_box">
          <echarts :Company="Company"></echarts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "@/components/echarts/echarts.vue";
export default {
  components: {
    echarts
  },
  data() {
    return {
      userImageBol: false,
      userImage: "",
      totalNumberRights: "",
      totalNumPool: "",
      exerciseEarnings: "",
      companyId: "",
      companyName: "",
      num: "",
      totalNumberOptions: "",
      impowerSharesNum: "",
      currentManagementCosts: "",
      exerciseDynamicNum: 0,
      Company: {
        exerciseEarnings: "",
        impowerSharesNum: "",
        totalNumPool: "",
        totalNumberOptions: "",
        totalNumberRights: ""
      },
      unreadObj: {
        type_1: "",
        type_2: "",
        type_3: ""
      } //未读
    };
  },
  created() {},
  mounted() {
    if (
      JSON.parse(localStorage.gugeAdminUser).userImage == "" ||
      JSON.parse(localStorage.gugeAdminUser).userImage == null
    ) {
      this.userImageBol = true;
    } else {
      this.userImageBol = false;
    }
    this.getNum("1");
    this.getNum("2");
    this.getNum("3");
    this.userImage = JSON.parse(localStorage.gugeAdminUser).userImage;
    this.selectHomePageData();
  },
  methods: {
    //获取   首页行权申请、转让申请、退股申请显示未读数字。
    getNum(type) {
      this.$axios.Home.selectRightRecordUnapprovedCount({
        data: {
          adminId: JSON.parse(localStorage.gugeAdminUser).id / 1,
          type: type
        },
        version: "2.0"
      }).then(r => {
        if (type == 1) {
          this.unreadObj.type_1 = r.result;
        }
        if (type == 2) {
          this.unreadObj.type_2 = r.result;
        }
        this.unreadObj.type_3 = r.result;
      });
    },
    addUser() {
      //跳转到 激励对象页
      this.router_push("objects");
      // vuex 模态框状态改变
      this.$store.commit("setaddUserCompayId", this.companyId);
      this.$store.commit("setaddUserBol", true);
    },
    router_push(path, id) {
      if (id) {
        this.$util.router_push(this, path, id);
      } else {
        this.$util.router_push(this, path);
      }
    },
    selectHomePageData() {
      this.$axios.Home.selectHomePageData({
        data: {
          adminId: JSON.parse(localStorage.gugeAdminUser).id / 1
        },
        version: "2.0"
      }).then(res => {
        this.companyId = res.result.companyId;
        this.companyName = res.result.companyName;
        this.num = res.result.num;
        this.currentManagementCosts = res.result.currentManagementCosts;
        var obj = {
          exerciseEarnings: res.result.exerciseEarnings,
          impowerSharesNum: res.result.impowerSharesNum,
          totalNumPool: res.result.totalNumPool,
          totalNumberOptions: res.result.totalNumberOptions,
          totalNumberRights: res.result.totalNumberRights
        };
        this.Company = obj;
      });
    }
  }
};
</script>

