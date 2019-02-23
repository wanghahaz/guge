<style scoped lang="less">
@import url("./less/exercise.less");
.pages {
  width: 100%;
  text-align: center;
  margin: 50px 0 30px;
}
</style>

<template>
  <div>
    <div class="exercise_header">
      <ul>
        <li
          class="cursor_pointer"
          @click="exerciseSort=0"
          :class="exerciseSort==0? 'exercise_true':'' "
        >等待处理</li>
        <li
          class="cursor_pointer"
          @click="exerciseSort=1"
          :class="exerciseSort==1? 'exercise_true':'' "
        >行权概览</li>
      </ul>
    </div>
    <div v-show="exerciseSort==0" class="exercise_search">
      <Input clearable v-model="searchName" style="width:200px" placeholder="请输入姓名" class="Input"/>
      <Input
        clearable
        style="width:200px;margin-left: 20px"
        v-model="searchTel"
        placeholder="请输入手机号"
        class="Input"
      />
      <Select v-model="companyIdd" placeholder="请选择公司" style="width:240px;margin-left: 20px;">
        <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.companyName }}</Option>
      </Select>
      <div class="company_search_btn cursor_pointer" @click="searchAll">
        <img src="@/assets/img/company/company-search.png" alt>
        <span>搜索</span>
      </div>
    </div>
    <div v-show="exerciseSort==0">
      <div v-if="exerciseSortType == '1'" id="exercise">
        <card class="cards">
          <span class="cards_title"></span>
          <p slot="title">行权申请</p>
          <Table border stripe :columns="exercise" :data="exerciseArr"></Table>
          <Page
            class="pages"
            :current="current_exercise"
            :total="total_exercise"
            :page-size="pageSize_exercise"
            @on-change="exercisePage"
          />
        </card>
      </div>
      <div v-if="exerciseSortType == '2'" id="makeOver">
        <card id="makeOver" class="cards">
          <span class="cards_title"></span>
          <p slot="title">转让申请</p>
          <Table border stripe :columns="makeOver" :data="makeOverlArr"></Table>
          <Page
            class="pages"
            :current="current_makeOver"
            :total="total_makeOver"
            :page-size="pageSize_makeOver"
            @on-change="makeOverPage"
          />
        </card>
      </div>
      <div v-if="exerciseSortType == '3'" id="withdrawal">
        <card class="cards">
          <span class="cards_title"></span>
          <p slot="title">回购申请</p>
          <Table border stripe :columns="withdrawal" :data="withdrawalArr"></Table>
          <Page
            class="pages"
            :current="current_withdrawal"
            :total="total_withdrawal"
            :page-size="pageSize_withdrawal"
            @on-change="withdrawalPage"
          />
        </card>
      </div>

      <div v-if="!(exerciseSortType == '1')" id="exercise">
        <card class="cards">
          <span class="cards_title"></span>
          <p slot="title">
            <span>行权申请</span>
          </p>
          <!-- <div slot="extra">
            <Input
              clearable
              v-model="searchName"
              style="width:200px"
              placeholder="请输入姓名"
              class="Input"
            />
            <Input
              clearable
              style="width:200px;margin-left: 20px"
              v-model="searchTel"
              placeholder="请输入手机号"
              class="Input"
            />
            <Select
              v-model="companyIdd"
              placeholder="请选择公司"
              style="width:240px;margin-left: 20px;"
            >
              <Option
                v-for="item in companyList"
                :value="item.id"
                :key="item.id"
              >{{ item.companyName }}</Option>
            </Select>
            <div
              class="company_search_btn cursor_pointer"
              @click="selectUserOverviewList(1)"
            >
              <img src="@/assets/img/company/company-search.png" alt>
              <span>搜索</span>
            </div>
          </div>-->
          <Table border stripe :columns="exercise" :data="exerciseArr"></Table>
          <Page
            class="pages"
            :current="current_exercise"
            :total="total_exercise"
            :page-size="pageSize_exercise"
            @on-change="exercisePage"
          />
        </card>
      </div>
      <div v-if="!(exerciseSortType == '2')" id="makeOver">
        <card id="makeOver" class="cards">
          <span class="cards_title"></span>
          <p slot="title">转让申请</p>
          <Table border stripe :columns="makeOver" :data="makeOverlArr"></Table>
          <Page
            class="pages"
            :current="current_makeOver"
            :total="total_makeOver"
            :page-size="pageSize_makeOver"
            @on-change="makeOverPage"
          />
        </card>
      </div>
      <div v-if="!(exerciseSortType == '3')" id="withdrawal">
        <card class="cards">
          <span class="cards_title"></span>
          <p slot="title">回购申请</p>
          <Table border stripe :columns="withdrawal" :data="withdrawalArr"></Table>
          <Page
            class="pages"
            :current="current_withdrawal"
            :total="total_withdrawal"
            :page-size="pageSize_withdrawal"
            @on-change="withdrawalPage"
          />
        </card>
      </div>
    </div>
    <div v-if="exerciseSort==1">
      <div>
        <card class="cards">
          <div class="title" slot="title">
            <div class="title_search">
              <Input v-model="userName" placeholder="真实姓名" style="width: 200px"/>
              <Select
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
              <div @click="selectUserOverviewList(1)" class="company_header_search_btn">
                <img src="../../assets/img/company/company-search.png" alt>
                <span>搜索</span>
              </div>
            </div>
            <div>
              <div @click="downLoad" class="objects_header_right_export">
                <img src="../../assets/img/objects/objects-export.png" alt>
                <span>导出</span>
              </div>
            </div>
          </div>
          <Table
            @on-selection-change="handleChange"
            border
            stripe
            :columns="columns1"
            :data="OverviewList"
          ></Table>
          <Page
            style="margin: 30px auto;"
            class="page"
            :total="total"
            :current="current"
            :page-size="pageSize"
            @on-change="selectUserOverviewList"
          ></Page>
        </card>
        <card class="cards">
          <span class="cards_title"></span>
          <p slot="title">期权池总数：{{Company.totalNumPool}}</p>
          <div
            style="height: 350px;width: 100%;display: flex;justify-content: center;align-items: center;"
          >
            <echarts :Company="Company"></echarts>
          </div>
        </card>
      </div>
    </div>
    <changeexercise
      :show="modelShow.changeExerciseShow"
      @succeed="modelSucceed"
      :chageExerciseObj="chage_exerciseObj"
    ></changeexercise>
    <delexercise
			:show="modelShow.delexerciseShow"
			@succeed="modelSucceed"
			:userId="RecordById">
		</delexercise>
  </div>
</template>

<script>
import changeImg from "@/assets/img/feedback/h5-changeAdmin.png";
import changeexercise from "@/components/model/objects/changeexercise.vue";
import echarts from "@/components/echarts/echarts.vue";
import delImg from '@/assets/img/objects/objects-del.png';
import delexercise from '@/components/model/objects/delexercise.vue'
export default {
  components: {
    changeexercise,
    echarts,
    delexercise
  },
  computed: {
    modelShow() {
      return this.$store.state.model;
    }
  },
  data() {
    return {
      RecordById:'',
      searchName: "",
      searchTel: "",
      companyIdd: "", //等待处理搜索
      pageSize_exercise: 0, //每页显示条数
      total_exercise: 0, //总条数
      current_exercise: 1, //当前页数

      pageSize_makeOver: 0, //每页显示条数
      total_makeOver: 0, //总条数
      current_makeOver: 1, //当前页数

      pageSize_withdrawal: 0, //每页显示条数
      total_withdrawal: 0, //总条数
      current_withdrawal: 1, //当前页数

      trueList: [],
      total: 0,
      pageSize: 0,
      current: 1,
      chage_exerciseObj: "",
      companyId: "",
      companyExcetId: "",
      companyList: [],
      userName: "",
      exerciseSort: 0,
      exerciseSortType: "",
      exerciseArr: [],
      makeOverlArr: [],
      withdrawalArr: [],
      Company: {},
      exercise: [
        {
          title: "序号",
          type: "index",
          align: "center",
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
          title: "申请时间",
          key: "applicationTime",
          align: "center"
        },
        {
          title: "申请行权股数",
          key: "rigthNumber",
          align: "center"
        },
        {
          title: "批准行权股数",
          key: "approval",
          align: "center"
        },
        {
          title: "批准日期",
          key: "approvalTime",
          align: "center"
        },
        {
          title: "已收款",
          key: "receivables",
          align: "center"
        },
        {
          title: "批准",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("img", {
                props: {
                  type: "primary"
                },
                attrs: {
                  src: changeImg,
                  style: "width:22px;height: 22px;"
                },
                on: {
                  click: () => {
                    var obj = {
                      type: "1",
                      userId: params.row.id
                    };
                    this.chage_exerciseObj = obj;
                    this.$store.commit("changeShow", {
                      str: "changeExerciseShow",
                      bol: true
                    });
                  }
                }
              }),
              h('img', {
									props: {
										type: 'primary'
									},
									attrs: {
										src: delImg,
										style: 'width: 22px;height: 22px;'
									},
									style: {
										marginLeft: '20px',
										// display:type,
										cursor:'pointer'
									},
									on: {
										click: () => {
											this.RecordById = params.row.id;
											this.$store.commit('changeShow', {str:"delexerciseShow",bol:true});
										}
									}
								})
            ]);
          }
        }
      ],
      makeOver: [
        {
          title: "序号",
          type: "index",
          align: "center",
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
          title: "申请时间",
          key: "applicationTime",
          align: "center"
        },
        {
          title: "申请转让股数",
          key: "rigthNumber",
          align: "center"
        },
        {
          title: "批准转让股数",
          key: "approval",
          align: "center"
        },
        {
          title: "批准日期",
          key: "approvalTime",
          align: "center"
        },
        {
          title: "已补款",
          key: "receivables",
          align: "center"
        },
        {
          title: "批准",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("img", {
                props: {
                  type: "primary"
                },
                attrs: {
                  src: changeImg,
                  style: "width:22px;height: 22px;"
                },
                on: {
                  click: () => {
                    var obj = {
                      type: "3",
                      userId: params.row.id
                    };
                    this.chage_exerciseObj = obj;
                    this.$store.commit("changeShow", {
                      str: "changeExerciseShow",
                      bol: true
                    });
                  }
                }
              }),
               h('img', {
									props: {
										type: 'primary'
									},
									attrs: {
										src: delImg,
										style: 'width: 22px;height: 22px;'
									},
									style: {
										marginLeft: '20px',
										// display:type,
										cursor:'pointer'
									},
									on: {
										click: () => {
											this.RecordById = params.row.id;
											this.$store.commit('changeShow', {str:"delexerciseShow",bol:true});
										}
									}
								}),
            ]);
          }
        }
      ],
      withdrawal: [
        {
          title: "序号",
          type: "index",
          align: "center",
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
          title: "申请时间",
          key: "applicationTime",
          align: "center"
        },
        {
          title: "申请退还股数",
          key: "rigthNumber",
          align: "center"
        },
        {
          title: "批准退还股数",
          key: "approval",
          align: "center"
        },
        {
          title: "批准日期",
          key: "approvalTime",
          align: "center"
        },
        {
          title: "已付款",
          key: "receivables",
          align: "center"
        },
        {
          title: "批准",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("img", {
                props: {
                  type: "primary"
                },
                attrs: {
                  src: changeImg,
                  style: "width:22px;height: 22px;"
                },
                on: {
                  click: () => {
                    var obj = {
                      type: "2",
                      userId: params.row.id
                    };
                    this.chage_exerciseObj = obj;
                    this.$store.commit("changeShow", {
                      str: "changeExerciseShow",
                      bol: true
                    });
                  }
                }
              }),
               h('img', {
									props: {
										type: 'primary'
									},
									attrs: {
										src: delImg,
										style: 'width: 22px;height: 22px;'
									},
									style: {
										marginLeft: '20px',
										// display:type,
										cursor:'pointer'
									},
									on: {
										click: () => {
											this.RecordById = params.row.id;
											this.$store.commit('changeShow', {str:"delexerciseShow",bol:true});
										}
									}
								}),
            ]);
          }
        }
      ],
      OverviewList: [],
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 80
        },
        {
          title: "姓名",
          key: "userName",
          align: "center"
        },
        {
          title: "期权授予日",
          key: "stockStartTime",
          align: "center"
        },
        {
          title: "获授总数",
          key: "impowerSharesNum",
          align: "center"
        },
        {
          title: "成熟期（月）",
          key: "autumn",
          align: "center"
        },
        {
          title: "行权价（元/股）",
          key: "eachAppraisement",
          align: "center"
        },
        {
          title: "已行权股数",
          key: "exerciseEarnings",
          align: "center"
        },
        {
          title: "待行权股数",
          key: "accruedBenefits",
          align: "center"
        }
      ]
    };
  },
  created() {},
  mounted() {
    this.selectRightRecordUnapproved("1", 1);
    this.selectRightRecordUnapproved("2", 1);
    this.selectRightRecordUnapproved("3", 1);
    this.selectCompanyListByAdminId();
    this.goAnchor();
  },
  methods: {
    searchAll(){
       this.selectRightRecordUnapproved("1", 1);
        this.selectRightRecordUnapproved("2", 1);
        this.selectRightRecordUnapproved("3", 1);
    },
    goAnchor() {
      if (this.$route.query.data == undefined) {
        this.exerciseSortType = "0";
      } else if (this.$route.query.data == "exercise") {
        this.exerciseSortType = "1";
      } else if (this.$route.query.data == "makeOver") {
        this.exerciseSortType = "2";
      } else if (this.$route.query.data == "withdrawal") {
        this.exerciseSortType = "3";
      }
    },
    downLoad() {
      if (this.trueList.length == 0) {
        this.$Message.error("请选择需要下载的数据！");
      } else {
        this.$Spin.show();
        var arr = [];
        this.trueList.forEach(item => {
          arr.push(String(item.id));
        });
        this.$http({
          method: "post",
          responseType: "blob",
          url: "/downLoadExcelExerciseOverview",
          data: {
            data: {
              companyId: this.companyExcetId / 1,
              userId: arr
            },
            version: "2.0"
          }
        }).then(res => {
          this.downloadBlob(res.data);
        });
      }
    },
    downloadBlob(data) {
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", "行权概览表.xls");
      document.body.appendChild(link);
      link.click();
      this.$Spin.hide();
    },
    handleChange(currentRow) {
      this.trueList = currentRow;
    },
    getUserByCompanyId() {
      this.$axios.Exercise.getUserByCompanyId({
        data: {
          companyId: this.companyId / 1
        },
        version: "2.0"
      }).then(res => {
        this.Company = res.result;
      });
    },
    selectUserOverviewList(e) {
      this.$axios.Exercise.selectUserOverviewList({
        data: {
          adminUserId: JSON.parse(localStorage.gugeAdminUser).id / 1,
          name: this.userName,
          companyId: String(this.companyId),
          pageNum: e
        },
        version: "2.0"
      }).then(res => {
        this.companyExcetId = this.companyId;
        this.OverviewList = res.result.list;
        this.trueList = [];
        this.total = res.result.total / 1;
        this.pageSize = res.result.pageSize / 1;
        if (res.result.pageNum == 0) {
          this.current = 1;
        } else {
          this.current = res.result.pageNum / 1;
        }
        this.getUserByCompanyId();
      });
    },
    modelSucceed(res) {
      this.selectRightRecordUnapproved("1", 1);
      this.selectRightRecordUnapproved("2", 1);
      this.selectRightRecordUnapproved("3", 1);
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
        this.companyExcetId = res.result[0].id;
        this.companyId = res.result[0].id;
        this.companyList = res.result;
        this.selectUserOverviewList(1);
      });
    },
    // 行权申请分页
    exercisePage(e) {
      console.log(e);
      this.selectRightRecordUnapproved("1", e);
    },
    //转让申请分页
    makeOverPage(e) {
      this.selectRightRecordUnapproved("3", e);
    },
    //回购申请分页
    withdrawalPage(e) {
      this.selectRightRecordUnapproved("2", e);
    },
    //等待处理
    selectRightRecordUnapproved(type, e) {
      this.$axios.Exercise.selectRightRecordUnapproved({
        data: {
          adminId: JSON.parse(localStorage.gugeAdminUser).id / 1,
          type: type,
          pageNum: e / 1,
          userName:this.searchName,
          companyId:String(this.companyIdd) ,
          userPhone:this.searchTel
        },
        version: "2.0"
      }).then(res => {
        if (type == "1") {
          this.total_exercise = res.result.total / 1;
          this.pageSize_exercise = res.result.pageSize / 1;
          if (res.result.pageNum == 0) {
            this.current_exercise = 1;
          } else {
            this.current_exercise = res.result.pageNum / 1;
          }
          this.exerciseArr = res.result.list;
        } else if (type == "2") {
          this.total_withdrawal = res.result.total / 1;
          this.pageSize_withdrawal = res.result.pageSize / 1;
          if (res.result.pageNum == 0) {
            this.current_withdrawal = 1;
          } else {
            this.current_withdrawal = res.result.pageNum / 1;
          }
          this.withdrawalArr = res.result.list;
        } else if (type == "3") {
          this.total_makeOver = res.result.total / 1;
          this.pageSize_makeOver = res.result.pageSize / 1;
          if (res.result.pageNum == 0) {
            this.current_makeOver = 1;
          } else {
            this.current_makeOver = res.result.pageNum / 1;
          }
          this.makeOverlArr = res.result.list;
        }
      });
    }
  },
  watch: {
    exerciseSort(val) {
      if (val == 1) {
        this.getUserByCompanyId();
      }
    }
  }
};
</script>