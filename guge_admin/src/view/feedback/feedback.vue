<style scoped lang="less">
@import url("./less/feedback.less");
</style>

<template>
  <div>
    <div class="typeChange">
      <ul>
        <li
          class="cursor_pointer"
          @click="type=1,name='',phone='',companyId=''"
          :class="type==1? 'active':'' "
        >商业收集</li>
        <li
          class="cursor_pointer"
          @click="type=2,name='',phone='',companyId=''"
          :class="type==2? 'active':'' "
        >员工意见</li>
        <li
          class="cursor_pointer"
          @click="type=3,name='',phone='',companyId=''"
          :class="type==3? 'active':'' "
        >公司通知</li>
      </ul>
    </div>
    <div>
      <div class="input" v-show="type==3">
        <div>
          <Input
            class="text"
            style="width:430px;height:100px;margin:10px 0 0 20px"
            v-model="feedContent"
            type="textarea"
            :rows="4"
            :maxlength="100"
            placeholder="请输入公告内容（不超过100字）"
          ></Input>
        </div>
        <Button @click="submit" style="margin:5px 10px 0 20px">发布公告</Button>
        <Button @click="toRouter" style="margin:5px 0 0 0">历史公告</Button>
      </div>
      <card class="cards" :class="type==3?'body_1':''">
        <div class="account_title" slot="title">
          <div class="feedback_title_right">
            <Input v-model="name" placeholder="请填写姓名" style="width: 200px"/>
            <Input v-model="phone" placeholder="请输入手机号" style="width: 200px;margin-left: 20px;"/>
            <Select
              v-show="type==1||type==2"
              clearable
              v-model="companyId"
              placeholder="请选择公司"
              style="width:300px;margin-left: 20px;"
            >
              <Option
                v-for="item in companyList"
                :value="item.id"
                :key="item.id"
              >{{ item.companyName }}</Option>
            </Select>
            <Select
              v-show="type==3"
              clearable
              multiple
              v-model="companyIdList"
              placeholder="请选择公司"
              style="width:300px;margin-left: 20px;"
            >
              <Option
                v-for="item in companyList"
                :value="item.id"
                :key="item.id"
              >{{ item.companyName }}</Option>
            </Select>
            <div @click="selectSearch()" class="company_header_search_btn cursor_pointer">
              <img src="../../assets/img/company/company-search.png" alt>
              <span>搜索</span>
            </div>
          </div>
        </div>
        <Table v-show="type==1" border stripe :columns="exerciseList" :data="exerciseArr"></Table>
        <Table v-show="type==2" border stripe :columns="feedColumns" :data="feedList"></Table>
        <el-checkbox
          style="margin:15px 0 15px 20px"
          v-show="type==3"
          v-model="check"
          @change="allChange"
        >全选</el-checkbox>
        <el-table
          ref="multipleTable"
          v-show="type==3"
          border
          :data="noticeList"
          style="width: 100%;margin: 0 0 10px 0;"
          :row-class-name="tableRowClassName"
          header-row-class-name="titleheader"
          @selection-change="handleSelectionChange"
          :row-key="getRowKeys"
        >>
          <el-table-column type="selection" :reserve-selection="true" width="60" align="center"></el-table-column>
          <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
          <el-table-column prop="nickName" label="昵称" align="center"></el-table-column>
          <el-table-column prop="userName" label="姓名" align="center"></el-table-column>
          <el-table-column prop="userPhone" label="手机号" align="center"></el-table-column>
          <el-table-column prop="stockStartTime" label="期权授予日" align="center"></el-table-column>
          <el-table-column prop="createTime" label="创建日期" align="center"></el-table-column>
        </el-table>
      </card>
    </div>

    <Page
      style="margin: 50px auto;"
      class="page"
      :total="total"
      :current="current"
      :page-size="pageSize"
      @on-change="selectData"
    ></Page>
  </div>
</template>

<script>
import details from "@/assets/img/feedback/h5.png";
let taStyle = {
  width: "16px",
  height: "16px",
  color: "white",
  "text-align": "center",
  "line-height": "16px",
  display: "inline-block",
  "border-radius": "50%",
  "font-size": "10px",
  position: "absolute",
  left: "131px",
  background: "red"
};
export default {
  data() {
    return {
      check: false,
      getRowKeys(row) {
        return row.id;
      },
      multipleSelection: [],
      feedContent: "",
      type: 1,
      total: 0,
      pageSize: 0,
      current: 1,
      name: "",
      phone: "",
      companyId: "",
      companyIdList: [],
      companyList: [],
      exerciseArr: [],
      exerciseList: [
        {
          title: "序号",
          align: "center",
          type: "index",
          width: 80
        },
        {
          title: "姓名",
          key: "userName",
          align: "center"
        },
        {
          title: "手机号",
          key: "userPhone",
          align: "center"
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 265,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  style: " position: relative;height:28px"
                }
              },
              [
                h("img", {
                  props: {
                    type: "primary"
                  },
                  attrs: {
                    src: details,
                    style:
                      "width:22px;height: 22px;position: absolute;bottom:0px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/record",
                        query: {
                          id: params.row.id,
                          type: 1
                        }
                      });
                    }
                  }
                }),
                h(
                  "span",
                  {
                    style: taStyle
                  },
                  params.row.unread
                )
              ]
            );
          }
        }
      ],
      feedColumns: [
        {
          title: "序号",
          align: "center",
          type: "index",
          width: 80
        },
        {
          title: "公司",
          key: "companyName",
          align: "center"
        },
        {
          title: "姓名",
          key: "userName",
          align: "center"
        },
        {
          title: "手机号",
          key: "userPhone",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
           width: 265,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  style: " position: relative;height:28px"
                }
              },
              [
                h("img", {
                  props: {
                    type: "primary"
                  },
                  attrs: {
                    src: details,
                    style:
                      "width:22px;height: 22px;position: absolute;bottom:0px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/record",
                        query: {
                          id: params.row.id,
                          type: 2
                        }
                      });
                    }
                  }
                }),
                h(
                  "span",
                  {
                    style: taStyle
                  },
                  params.row.unread
                )
              ]
            );
          }
        }
      ],
      feedList: [],
      noticeList: [],
      userList: [],
      subArr: []
    };
  },
  created() {},
  mounted() {
    this.selectCompanyListByAdminId();
    this.typeMethod(this.type, 1);
  },
  methods: {
    // 发布公告
    submit() {
      if (this.feedContent == "") {
        this.$Message.warning("公告内容不能为空");
        return;
      }
      if (this.multipleSelection.length == 0) {
        this.$Message.warning("发送人员不能为空");
        return;
      }
      let arr = [];
      this.multipleSelection.forEach(val => {
        arr.push(val.id);
      });
      arr = Array.from(new Set(arr));
      this.$axios.Feedback.addNotice({
        data: {
          adminId: JSON.parse(localStorage.gugeAdminUser).id,
          noticeContent: this.feedContent,
          userId: arr
        },
        version: "2.0"
      }).then(res => {
        this.$Message.success("发送成功");
        this.feedContent = "";
      });
    },
    // 全选反选
    allChange() {
      if (this.check) {
        this.$refs.multipleTable.clearSelection();
        this.noticeList.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
        // this.multipleSelection = Array.from(new Set(this.multipleSelection))
        this.userList.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
        // this.multipleSelection.forEach(val => {
        //   this.subArr.push(val.id);
        // });
        // this.subArr = Array.from(new Set(this.subArr));
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    toRouter() {
      this.$router.push({
        path: "/record",
        query: {
          type: 3
        }
      });
    },
    //搜索
    selectSearch() {
      this.typeMethod(this.type, 1);
    },
    // 全选
    handleSelectionChange(e) {
      //  this.multipleSelection = Array.from(new Set(this.multipleSelection));
      this.multipleSelection = e;
      // var arr=[]
      // e.forEach(val => {
      //   arr.push(val.id);
      // });
      // this.multipleSelection = arr;
    },
    //换色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return "warning-row";
      } else if (rowIndex % 2 == 0) {
        return "success-row";
      }
      return "";
    },
    // 分页
    selectData(e) {
      this.typeMethod(this.type, e);
    },
    //type切换
    typeMethod(type, page) {
      if (type == 1) {
        this.selectQuestionnaireList(page);
      } else if (type == 2) {
        this.selectFeedbackList(page);
      } else if (type == 3) {
        this.selectUserOverviewList2(page);
        this.selectUserOverviewList(page);
      }
    },
    //查询全部所有用户
    selectUserOverviewList2(e) {
      let id = this.companyIdList.join(",");
      this.$axios.Objects.selectUserOverviewList2({
        data: {
          adminUserId: JSON.parse(localStorage.gugeAdminUser).id,
          name: this.name,
          phone: this.phone,
          companyId: id,
          pageNum: e
        },
        version: "2.0"
      }).then(res => {
        this.userList = res.result;
      });
    },
    //查询所有用户
    selectUserOverviewList(e) {
      let id = this.companyIdList.join(",");
      this.$axios.Objects.selectUserOverviewList({
        data: {
          adminUserId: JSON.parse(localStorage.gugeAdminUser).id,
          name: this.name,
          phone: this.phone,
          companyId: id,
          pageNum: e
        },
        version: "2.0"
      }).then(res => {
        this.noticeList = res.result.list;
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
    // 查询员工意见
    selectFeedbackList(e) {
      this.$axios.Feedback.selectFeedbackList({
        data: {
          adminId: JSON.parse(localStorage.gugeAdminUser).id / 1,
          companyId: String(this.companyId),
          pageNum: e,
          phone: this.phone,
          name: this.name
        },
        version: "2.0"
      }).then(res => {
        this.total = res.result.total / 1;
        this.pageSize = res.result.pageSize / 1;
        if (res.result.pageNum == 0) {
          this.current = 1;
        } else {
          this.current = res.result.pageNum / 1;
        }
        this.feedList = res.result.list;
      });
    },
    //查询商业收集
    selectQuestionnaireList(e) {
      if (this.companyId == undefined) {
        this.companyId = "";
      }
      this.$axios.Feedback.selectQuestionnaireList({
        data: {
          companyId: String(this.companyId),
          pageNum: e,
          phone: this.phone,
          name: this.name
        },
        version: "2.0"
      }).then(res => {
        this.total = res.result.total / 1;
        this.pageSize = res.result.pageSize / 1;
        if (res.result.pageNum == 0) {
          this.current = 1;
        } else {
          this.current = res.result.pageNum / 1;
        }
        this.exerciseArr = res.result.list;
      });
    },
    //获取公司列表下拉框
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
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.typeMethod(this.type, 1);
      },
      // 深度观察监听
      deep: true
    },
    multipleSelection(val) {
      // console.log(val);
    },
    companyId(val) {
      if (val == undefined) {
        this.selectQuestionnaireList(1);
      }
    },
    type(val) {
      this.typeMethod(val, 1);
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "record") {
      from.meta.keepAlive = true;
    } else {
      from.meta.keepAlive = false;
    }
    next();
  }
};
</script>