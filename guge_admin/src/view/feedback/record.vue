<style scoped>
@import url("./less/feedback.less");
.box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.setparameter_header {
  width: 100%;
  height: 64px;
  background: white;
  display: flex;
  align-items: center;
  padding: 0 30px;
  box-sizing: border-box;
  margin-bottom: 30px;
}
</style>

<template>
  <div class="box">
    <div class="setparameter_header">
      <div class="setparameter_header_left">
        <getback></getback>
      </div>
    </div>
    <Table v-if="typeRouter==1" stripe class="table" border :columns="columns" :data="list"></Table>
    <Table v-if="typeRouter==2" stripe class="table" border :columns="feedColumns" :data="feedList"></Table>
    <card v-if="typeRouter==3" class="cards">
      <div class="account_title" slot="title">
        <div class="feedback_title_right">
          <Input v-model="name" placeholder="请填写发布人姓名" style="width: 200px"/>
          <Input v-model="phone" placeholder="请填写发布人姓名手机号" style="width: 200px;margin-left: 20px;"/>
          <Select
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
          <div @click="selectHistoryNotice(1)" class="company_header_search_btn cursor_pointer">
            <img src="../../assets/img/company/company-search.png" alt>
            <span>搜索</span>
          </div>
        </div>
      </div>
      <Table border stripe :columns="noticeColumns" :data="noticeList"></Table>
    </card>
    <delexercise :show="modelShow.delexerciseShow" @succeed="modelSucceed" :userId="RecordById"></delexercise>
    <Page
      style="margin: 50px auto;"
      class="page"
      :total="total"
      :current="current"
      :page-size="pageSize"
      @on-change="selectData($route.query.type)"
    ></Page>
  </div>
</template>

<script>
import delImg from "@/assets/img/objects/objects-del.png";
import delexercise from '@/components/model/objects/delnotice.vue'
export default {
  name: "record", //调查问卷详情
  components: {
    delexercise
  },
  data() {
    return {
      pageNum: "",
      RecordById: "",
      name: "",
      phone: "",
      companyId: "",
      companyList: [], //搜索
      typeRouter: "",
      bol: true,
      total: 1,
      current: 1,
      pageSize: 1,
      noticeColumns: [
        {
          title: "序号",
          align: "center",
          type: "index",
          width: 80
        },
        {
          title: "发布人",
          key: "name",
          align: "center"
        },
        {
          title: "发布人手机号",
          key: "adminName",
          align: "center"
        },
        {
          title: "发布时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "发布内容",
          key: "noticeContent",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("img", {
              props: {
                type: "primary"
              },
              attrs: {
                src: delImg,
                style: "width:22px;height: 22px"
              },
              on: {
                click: () => {
                  this.delUser(params.row.id);
                }
              }
            });
          }
        }
      ],
      noticeList: [],
      feedList: [],
      feedColumns: [
        {
          title: "序号",
          align: "center",
          type: "index",
          width: 80
        },
        {
          title: "提交时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "提交内容",
          key: "feedbackContent",
          align: "center"
        }
      ],
      list: [
        {
          type: "提交时间",
          key: "createTime",
          ChoiceA: "",
          ChoiceB: "",
          ChoiceC: "",
          ChoiceD: "",
          ChoiceDEmail: ""
        },
        {
          type: "股权授予时间",
          key: "stockStartTime",
          ChoiceA: "",
          ChoiceB: "",
          ChoiceC: "",
          ChoiceD: "",
          ChoiceDEmail: ""
        },
        {
          type: "授予股数",
          key: "impowerSharesNum",
          ChoiceA: "",
          ChoiceB: "",
          ChoiceC: "",
          ChoiceD: "",
          ChoiceDEmail: ""
        },
        {
          type: "成熟期",
          key: "autumn",
          ChoiceA: "",
          ChoiceB: "",
          ChoiceC: "",
          ChoiceD: "",
          ChoiceDEmail: ""
        },
        {
          type: "用户数",
          key: "userNum",
          ChoiceA: "",
          ChoiceB: "",
          ChoiceC: "",
          ChoiceD: "",
          ChoiceDEmail: ""
        },
        {
          type: "行权价",
          key: "eachAppraisement",
          ChoiceA: "",
          ChoiceB: "",
          ChoiceC: "",
          ChoiceD: "",
          ChoiceDEmail: ""
        },
        {
          type: "姓名",
          key: "name",
          ChoiceA: "",
          ChoiceB: "",
          ChoiceC: "",
          ChoiceD: "",
          ChoiceDEmail: ""
        },
        {
          type: "职务",
          key: "post",
          ChoiceA: "",
          ChoiceB: "",
          ChoiceC: "",
          ChoiceD: "",
          ChoiceDEmail: ""
        },
        {
          type: "联系电话",
          key: "phone",
          ChoiceA: "",
          ChoiceB: "",
          ChoiceC: "",
          ChoiceD: "",
          ChoiceDEmail: ""
        },
        {
          type: "邮箱",
          key: "email",
          ChoiceA: "",
          ChoiceB: "",
          ChoiceC: "",
          ChoiceD: "",
          ChoiceDEmail: ""
        },
        {
          type: "微信",
          key: "wechat",
          ChoiceA: "",
          ChoiceB: "",
          ChoiceC: "",
          ChoiceD: "",
          ChoiceDEmail: ""
        },
        {
          type: "公司名称/工作单位",
          key: "companyName",
          ChoiceA: "",
          ChoiceB: "",
          ChoiceC: "",
          ChoiceD: "",
          ChoiceDEmail: ""
        },
        {
          type: "创始人/负责人",
          key: "chargePersonName",
          ChoiceA: "",
          ChoiceB: "",
          ChoiceC: "",
          ChoiceD: "",
          ChoiceDEmail: ""
        },
        {
          type: "（创始人/负责人）联系电话",
          key: "chargePersonPhone",
          ChoiceA: "",
          ChoiceB: "",
          ChoiceC: "",
          ChoiceD: "",
          ChoiceDEmail: ""
        },
        {
          type: "其他说明/需求描述",
          key: "explainAndNeed",
          ChoiceA: "",
          ChoiceB: "",
          ChoiceC: "",
          ChoiceD: "",
          ChoiceDEmail: ""
        },
        {
          type: "查看期权授予协议",
          key: "agreementUrl",
          ChoiceA: "",
          ChoiceB: "",
          ChoiceC: "",
          ChoiceD: "",
          ChoiceDEmail: ""
        },
        {
          type: "查看期权激励计划",
          key: "panUrl",
          ChoiceA: "",
          ChoiceB: "",
          ChoiceC: "",
          ChoiceD: "",
          ChoiceDEmail: ""
        }
      ],
      columns: [
        {
          title: "选项",
          align: "center",
          key: "type"
        },
        {
          title: "激励对象",
          align: "center",
          key: "ChoiceA",
          render: (h, params) => {
            if (params.index == 15) {
              if (params.row.ChoiceA == "" || params.row.ChoiceA == null) {
                return;
              } else {
                return h("div", [
                  h(
                    "span",
                    {
                      props: {
                        type: "primary",
                        size: "small"
                      },
                      style: {
                        marginRight: "5px",
                        color: "#346EBC"
                      },
                      on: {
                        click: () => {
                          this.$router.push({
                            path: "/agreement",
                            query: {
                              id: params.row.ChoiceA
                            }
                          });
                        }
                      }
                    },
                    "查看"
                  )
                ]);
              }
            } else if (params.index == 16) {
              if (params.row.ChoiceA == "" || params.row.ChoiceA == null) {
                return;
              } else {
                return h("div", [
                  h(
                    "span",
                    {
                      props: {
                        type: "primary",
                        size: "small"
                      },
                      style: {
                        marginRight: "5px",
                        color: "#346EBC"
                      },
                      on: {
                        click: () => {
                          this.$router.push({
                            path: "/pan",
                            query: {
                              id: params.row.ChoiceA
                            }
                          });
                        }
                      }
                    },
                    "查看"
                  )
                ]);
              }
            } else {
              return h("div", [h("span", {}, params.row.ChoiceA)]);
            }
          }
        },
        {
          title: "公司",
          align: "center",
          key: "ChoiceB",
          render: (h, params) => {
            if (params.index == 15) {
              if (params.row.ChoiceB == "" || params.row.ChoiceB == null) {
                return;
              } else {
                return h("div", [
                  h(
                    "span",
                    {
                      props: {
                        type: "primary",
                        size: "small"
                      },
                      style: {
                        marginRight: "5px",
                        color: "#346EBC"
                      },
                      on: {
                        click: () => {
                          this.$router.push({
                            path: "/agreement",
                            query: {
                              id: params.row.ChoiceB
                            }
                          });
                        }
                      }
                    },
                    "查看"
                  )
                ]);
              }
            } else if (params.index == 16) {
              if (params.row.ChoiceB == "" || params.row.ChoiceB == null) {
                return;
              } else {
                return h("div", [
                  h(
                    "span",
                    {
                      props: {
                        type: "primary",
                        size: "small"
                      },
                      style: {
                        marginRight: "5px",
                        color: "#346EBC"
                      },
                      on: {
                        click: () => {
                          this.$router.push({
                            path: "/pan",
                            query: {
                              id: params.row.ChoiceB
                            }
                          });
                        }
                      }
                    },
                    "查看"
                  )
                ]);
              }
            } else {
              return h("div", [h("span", {}, params.row.ChoiceB)]);
            }
          }
        },
        {
          title: "律师",
          align: "center",
          key: "ChoiceC",
          render: (h, params) => {
            if (params.index == 15) {
              if (params.row.ChoiceC == "" || params.row.ChoiceC == null) {
                return;
              } else {
                return h("div", [
                  h(
                    "span",
                    {
                      props: {
                        type: "primary",
                        size: "small"
                      },
                      style: {
                        marginRight: "5px",
                        color: "#346EBC"
                      },
                      on: {
                        click: () => {
                          this.$router.push({
                            path: "/agreement",
                            query: {
                              id: params.row.ChoiceC
                            }
                          });
                        }
                      }
                    },
                    "查看"
                  )
                ]);
              }
            } else if (params.index == 16) {
              if (params.row.ChoiceC == "" || params.row.ChoiceC == null) {
                return;
              } else {
                return h("div", [
                  h(
                    "span",
                    {
                      props: {
                        type: "primary",
                        size: "small"
                      },
                      style: {
                        marginRight: "5px",
                        color: "#346EBC"
                      },
                      on: {
                        click: () => {
                          this.$router.push({
                            path: "/pan",
                            query: {
                              id: params.row.ChoiceC
                            }
                          });
                        }
                      }
                    },
                    "查看"
                  )
                ]);
              }
            } else {
              return h("div", [h("span", {}, params.row.ChoiceC)]);
            }
          }
        },
        {
          title: "其他",
          align: "center",
          key: "ChoiceD",
          render: (h, params) => {
            if (params.index == 15) {
              if (params.row.ChoiceD == "" || params.row.ChoiceD == null) {
                return;
              } else {
                return h("div", [
                  h(
                    "span",
                    {
                      props: {
                        type: "primary",
                        size: "small"
                      },
                      style: {
                        marginRight: "5px",
                        color: "#346EBC"
                      },
                      on: {
                        click: () => {
                          this.$router.push({
                            path: "/agreement",
                            query: {
                              id: params.row.ChoiceD
                            }
                          });
                        }
                      }
                    },
                    "查看"
                  )
                ]);
              }
            } else if (params.index == 16) {
              if (params.row.ChoiceD == "" || params.row.ChoiceD == null) {
                return;
              } else {
                return h("div", [
                  h(
                    "span",
                    {
                      props: {
                        type: "primary",
                        size: "small"
                      },
                      style: {
                        marginRight: "5px",
                        color: "#346EBC"
                      },
                      on: {
                        click: () => {
                          this.$router.push({
                            path: "/pan",
                            query: {
                              id: params.row.ChoiceD
                            }
                          });
                        }
                      }
                    },
                    "查看"
                  )
                ]);
              }
            } else {
              return h("div", [h("span", {}, params.row.ChoiceD)]);
            }
          }
        },
        {
          title: "模板",
          align: "center",
          key: "ChoiceDEmail",
          render: (h, params) => {
            if (params.index == 15) {
              if (
                params.row.ChoiceDEmail == "" ||
                params.row.ChoiceDEmail == null
              ) {
                return;
              } else {
                return h("div", [
                  h(
                    "span",
                    {
                      props: {
                        type: "primary",
                        size: "small"
                      },
                      style: {
                        marginRight: "5px",
                        color: "#346EBC"
                      },
                      on: {
                        click: () => {
                          this.$router.push({
                            path: "/agreement",
                            query: {
                              id: params.row.ChoiceDEmail
                            }
                          });
                        }
                      }
                    },
                    "查看"
                  )
                ]);
              }
            } else if (params.index == 16) {
              if (
                params.row.ChoiceDEmail == "" ||
                params.row.ChoiceDEmail == null
              ) {
                return;
              } else {
                return h("div", [
                  h(
                    "span",
                    {
                      props: {
                        type: "primary",
                        size: "small"
                      },
                      style: {
                        marginRight: "5px",
                        color: "#346EBC"
                      },
                      on: {
                        click: () => {
                          this.$router.push({
                            path: "/pan",
                            query: {
                              id: params.row.ChoiceDEmail
                            }
                          });
                        }
                      }
                    },
                    "查看"
                  )
                ]);
              }
            } else {
              return h("div", [h("span", {}, params.row.ChoiceDEmail)]);
            }
          }
        }
      ]
    };
  },
  //		beforeRouteLeave(to,from,next){
  //	        if(to.name==='agreement'||to.name==='pan'){
  //	            if(!from.meta.keepAlive){
  //	                from.meta.keepAlive=true;//当我们进入到C时开启B的缓存
  //	            }
  //	            next()
  //	        }else{
  //	            from.meta.keepAlive=false;
  //	            this.$destroy();//销毁B的实例
  //	            next();//当我们回退的不是C时我们让B页面刷新
  //	        }
  //	    },
  mounted() {
    this.typeRouter = this.$route.query.type;
    this.typeSelect(this.$route.query.type, 1);
  },
  computed: {
    modelShow() {
      return this.$store.state.model;
    }
  },
  methods: {
    modelSucceed(res) {
      this.RecordById = "";
      this.selectHistoryNotice(1);
    },
    //删除会员唤起模态框
    delUser(id) {
	  this.RecordById = id;
	  	this.$store.commit('changeShow', {str:"delexerciseShow",bol:true});
    },
  
    //   type区分
    typeSelect(type, page) {
      if (type == 1) {
        this.selectOneKeyGenerateList(page);
      } else if (type == 2) {
        this.selectFeedbackDetails(page);
      } else {
        this.selectCompanyListByAdminId();
        this.selectHistoryNotice(page);
      }
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
    },
    //分页
    selectData(page) {
      this.pageNum = page;
      this.typeSelect(this.$route.query.type, page);
    },
    //  查询公告
    selectHistoryNotice(e) {
      this.$axios.Feedback.selectHistoryNotice({
        data: {
          adminId: JSON.parse(localStorage.gugeAdminUser).id / 1,
          pageNum: e,
          name: this.name,
          phone: this.phone,
          companyId: this.companyId
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
        this.noticeList = res.result.list;
      });
    },
    //  查询员工意见
    selectFeedbackDetails(e) {
      this.$axios.Feedback.selectFeedbackDetails({
        data: {
          pageNum: e,
          userId: Number(this.$route.query.id)
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
    selectOneKeyGenerateList(e) {
      this.$axios.Feedback.selectOneKeyGenerateList({
        data: {
          userId: this.$route.query.id / 1,
          pageNum: e / 1
        },
        version: "2.0"
      }).then(res => {
        //数据处理
        //循环遍历
        res.result.list.forEach(item => {
          if (item.choice == "A") {
            //选项A
            this.list.forEach(result => {
              result.ChoiceA = this.arrFiltration(result.key, item);
            });
          } else if (item.choice == "B") {
            //选项B
            this.list.forEach(result => {
              result.ChoiceB = this.arrFiltration(result.key, item);
            });
          } else if (item.choice == "C") {
            //选项C
            this.list.forEach(result => {
              result.ChoiceC = this.arrFiltration(result.key, item);
            });
          } else if (item.choice == "D") {
            //选项D
            this.list.forEach(result => {
              result.ChoiceD = this.arrFiltration(result.key, item);
            });
          } else {
            //选项D-邮箱
            this.list.forEach(result => {
              result.ChoiceDEmail = this.arrFiltration(result.key, item);
            });
          }
        });
      });
    },
    trueModel(urls) {
      this.$store.state.app.modelBol = true;
      this.$store.state.app.modelImg = urls;
    },
    arrFiltration(str, arr) {
      if (arr[str] == arr.agreementUrl) {
        if (arr[str] == null || arr[str] == "") {
          //不存在
          return;
        } else {
          return arr.id;
        }
      } else if (arr[str] == arr.panUrl) {
        if (arr[str] == null || arr[str] == "") {
          //不存在
          return;
        } else {
          return arr.id;
        }
      } else {
        return arr[str];
      }
    }
  }
};
</script>