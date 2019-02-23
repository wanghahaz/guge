<style scoped lang="less">
@import url("./less/objects.less");
</style>

<template>
  <div>
    <div class="typeChange">
      <ul>
        <li class="cursor_pointer" @click="type=1" :class="type==1? 'active':'' ">激励对象</li>
        <li class="cursor_pointer" @click="type=2" :class="type==2? 'active':'' ">激励对象列表</li>
      </ul>
    </div>
    <div class="objects_header">
      <div class="objects_header_left">
        <div class="cursor_pointer" @click="changeModel('adduserShow',true)">
          <img src="../../assets/img/company/company-add.png" alt>
          <span>新增激励对象</span>
        </div>
        <span class="sum">当前总数：{{total}}</span>
      </div>
      <div class="objects_header_right">
        <Input clearable v-model="searchName" placeholder="请输入姓名" class="Input"/>
        <Input clearable v-model="searchTel" placeholder="请输入手机号" class="Input"/>
        <Select
          clearable
          v-model="companyId"
          placeholder="请选择公司"
          class="Select"
          style="width: 160px;"
        >
          <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.companyName }}</Option>
        </Select>
        <div @click="selectUserOverviewList(1)" class="company_header_search_btn cursor_pointer">
          <img src="@/assets/img/company/company-search.png" alt>
          <span>搜索</span>
        </div>
        <div
          @mouseleave="exporst = false"
          @mouseenter="exporst = true"
          @click="downLoad"
          class="objects_header_right_export cursor_pointer"
        >
          <img v-if="exporst" src="../../assets/img/company/company-export.png" alt>
          <img v-else src="../../assets/img/objects/objects-export.png" alt>
          <span>导出</span>
        </div>
      </div>
    </div>
    <div v-if="type==1" class="objects_content">
      <div v-for="item in userList" class="objects_content_obj">
        <img
          v-if="(item.headPortrait == null || item.headPortrait == '') && item.gender == '女'"
          class="objects_content_obj_userhead"
          src="../../assets/img/objects/objects-girl.png"
          alt
        >
        <img
          v-else-if="(item.headPortrait == null || item.headPortrait == '') && (item.gender == '男'|| item.gender == '' || item.gender == null)"
          class="objects_content_obj_userhead"
          src="../../assets/img/objects/objects-boy.png"
          alt
        >
        <img v-else class="objects_content_obj_userhead" :src="item.headPortrait" alt>
        <span class="objects_content_obj_userName">{{item.userName}}</span>
        <ul>
          <li class="cursor_pointer" @click="IncentiveUser(item.id)">
            <img src="../../assets/img/objects/objects-parameter.png" alt>
            <span>激励参数</span>
          </li>
          <li class="cursor_pointer" @click="router_push('exerciseDynamic',item.id)">
            <img src="../../assets/img/objects/objects-exercise.png" alt>
            <span>行权动态</span>
          </li>
          <li class="cursor_pointer" @click="awardUser(item.id)">
            <img src="../../assets/img/objects/object-award.png" alt>
            <span>授予协议</span>
          </li>
        </ul>
        <span class="partition"></span>
        <div class="objects_content_obj_buttom">
          <div>
            <img
              class="cursor_pointer"
              @click="changeUser(item.id)"
              src="../../assets/img/company/company-amend.png"
              alt
            >
            <a href="#"></a>
            <img
              class="cursor_pointer"
              @click="delUser(item.id)"
              src="../../assets/img/company/company-del.png"
              alt
            >
          </div>
          <span>{{item.createTime}} 创建</span>
        </div>
      </div>
      <div class="objects_content_obj_empty" style="visibility: hidden"></div>
      <div class="objects_content_obj_empty" style="visibility: hidden"></div>
      <div class="objects_content_obj_empty" style="visibility: hidden"></div>
      <div class="objects_content_obj_empty" style="visibility: hidden"></div>
    </div>
    <div v-else style="margin:20px 0 40px 0">
      <Table border stripe :columns="columns" :data="userList"></Table>
    </div>
    <Page
      class="page"
      :current="current"
      :total="total"
      :page-size="pageSize"
      @on-change="selectUserOverviewList"
    />
    <adduser :show="modelShow.adduserShow" @succeed="modelSucceed"></adduser>
    <changeuser :userId="changeUserId" :show="modelShow.changeuserShow" @succeed="modelSucceed"></changeuser>
    <deluser :show="modelShow.deluserShow" @succeed="modelSucceed" :userId="userId"></deluser>
    <Incentive :userId="changeUserId" @succeed="modelSucceed" :show="modelShow.IncentiveShow"></Incentive>
    <award :show="modelShow.awardShow" :userId="changeUserId"></award>
    <history :show="modelShow.historyShow"></history>
    <homeAdduser></homeAdduser>
  </div>
</template>

<script>
import adduser from "@/components/model/objects/adduser.vue";
import homeAdduser from "@/components/model/objects/home-adduser.vue";
import changeuser from "@/components/model/objects/changeuser.vue";
import deluser from "@/components/model/objects/deluser.vue";
import Incentive from "@/components/model/objects/Incentive.vue";
import award from "@/components/model/objects/award.vue";
import history from "@/components/model/objects/history.vue";
import changeImg from "@/assets/img/feedback/h5-changeAdmin.png";
import delImg from "@/assets/img/objects/objects-del.png";
import jili from "@/assets/img/objects/objects-parameter.png";
import xingquan from "@/assets/img/objects/objects-exercise.png";
import shouyu from "@/assets/img/objects/object-award.png";
import boy from '@/assets/img/objects/objects-boy.png';
import girl from '@/assets/img/objects/objects-girl.png';
export default {
  components: {
    adduser,
    changeuser,
    deluser,
    Incentive,
    award,
    history,
    homeAdduser
  },
  computed: {
    modelShow() {
      return this.$store.state.model;
    }
  },
  data() {
    return {
      type: 1,
      exporst: false,
      userId: "",
      changeUserId: "",
      companyId: "",
      searchName: "",
      searchTel: "",
      companyList: [],
      userList: [],
      //分页数据
      current: 1,
      total: 0,
      pageSize: 0,
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 60
        },
        {
          title: "头像",
          key: "headPortrait",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("div", [
              h("img", {
                props: {
                  type: "primary"
                },
                attrs: {
                  src:params.row.headPortrait?params.row.headPortrait:(params.row.gender=='男'?boy:girl) ,
                  style: "width:30px;height: 30px;"
                }
              })
            ]);
          }
        },
        {
          title: "昵称",
          key: "nickName",
          align: "center",
          width: 100
        },
        {
          title: "姓名",
          key: "userName",
          align: "center",
          width: 120
        },
        {
          title: "手机号",
          key: "userPhone",
          align: "center",
          width: 120
        },
        {
          title: "期权授予日",
          key: "stockStartTime",
          align: "center",
          width: 120
        },
        {
          title: "获授总数",
          key: "totalAwarded",
          align: "center",
          width: 90
        },
        {
          title: "已归属股数",
          key: "exerciseEarnings",
          align: "center",
          width: 100
        },
        {
          title: "待行权股数",
          key: "accruedBenefits",
          align: "center",
          width: 100
        },
        {
          title: "创建日期",
          key: "createTime",
          align: "center",
          width: 160
        },
        {
          title: "操作",
          key: "",
          fixed: "right",
          width: 260,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("img", {
                props: {
                  type: "primary"
                },
                attrs: {
                  src: jili,
                  style: "width:22px;height: 22px;"
                },
                style: {
                  marginLeft: "20px",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.IncentiveUser(params.row.id);
                  }
                }
              }),
              h("img", {
                props: {
                  type: "primary"
                },
                attrs: {
                  src: xingquan,
                  style: "width: 22px;height: 22px;"
                },
                style: {
                  marginLeft: "20px",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.router_push("exerciseDynamic", params.row.id);
                  }
                }
              }),
              h("img", {
                props: {
                  type: "primary"
                },
                attrs: {
                  src: shouyu,
                  style: "width: 22px;height: 22px;"
                },
                style: {
                  marginLeft: "20px",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.awardUser(params.row.id);
                  }
                }
              }),
              h("img", {
                props: {
                  type: "primary"
                },
                attrs: {
                  src: changeImg,
                  style: "width:22px;height: 22px;"
                },
                style: {
                  marginLeft: "20px",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.IncentiveUser(params.row.id);
                  }
                }
              }),
              h("img", {
                props: {
                  type: "primary"
                },
                attrs: {
                  src: delImg,
                  style: "width: 22px;height: 22px;"
                },
                style: {
                  marginLeft: "20px",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.delUser(params.row.id);
                  }
                }
              })
            ]);
          }
        }
      ]
    };
  },
  created() {},
  mounted() {
    this.selectUserOverviewList(1);
    this.selectCompanyListByAdminId();
  },
  methods: {
    downLoad() {
      var str =
        this.$store.state.fileUrl +
        "/downLoadExcelAll?adminId=" +
        JSON.parse(localStorage.gugeAdminUser).id;
      window.location.href = str;
    },
    awardUser(id) {
      this.changeUserId = id;
      this.changeModel("awardShow", true);
    },
    //激励参数唤起模态框
    IncentiveUser(id) {
      this.changeUserId = id;
      this.changeModel("IncentiveShow", true);
    },
    //修改会员唤起模态框
    changeUser(id) {
      this.changeUserId = id;
      this.changeModel("changeuserShow", true);
    },
    //删除会员唤起模态框
    delUser(id) {
      this.userId = id;
      this.changeModel("deluserShow", true);
    },
    modelSucceed(res) {
      if (res) {
        this.changeUserId = "";
        this.selectUserOverviewList(1);
      }
    },
    //选择公司下拉框列表
    selectCompanyListByAdminId() {
      this.$axios.Company.selectCompanyListByAdminId({
        data: {
          adminId: JSON.parse(localStorage.gugeAdminUser).id / 1,
          companyName: ""
        },
        version: "2.0"
      }).then(res => {
        this.companyList = res.result;
      });
    },
    //查询所有用户
    selectUserOverviewList(e) {
      this.$axios.Objects.selectUserOverviewList({
        data: {
          adminUserId: JSON.parse(localStorage.gugeAdminUser).id,
          name: this.searchName,
          phone: this.searchTel,
          companyId: String(this.companyId),
          pageNum: e
        },
        version: "2.0"
      }).then(res => {
        this.userList = res.result.list;
        // console.log(this.userList);
        this.total = res.result.total / 1;
        this.pageSize = res.result.pageSize / 1;
        if (res.result.pageNum == 0) {
          this.current = 1;
        } else {
          this.current = res.result.pageNum / 1;
        }
      });
    },
    //路由跳转
    router_push(path, id) {
      this.$util.router_push(this, path, id);
    },
    //打开弹窗
    changeModel(str, bol) {
      var obj = { str, bol };
      this.$store.commit("changeShow", obj);
    }
  },
  watch: {
    searchName(news, old) {
      if (news.length <= 0) {
        this.selectUserOverviewList(1);
      }
    },
    companyId(news, old) {
      if (news == undefined) {
        this.companyId = "";
        this.selectUserOverviewList(1);
      }
    },
    searchTel(news, old) {
      if (news.length <= 0) {
        this.phone = "";
        this.selectUserOverviewList(1);
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "exerciseDynamic" || to.name == "stimulate") {
      from.meta.keepAlive = true;
    } else {
      from.meta.keepAlive = false;
    }
    next();
  }
};
</script>
