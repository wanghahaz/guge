<style scoped lang="less">
@import url("./less/estate.less");
.page {
  margin-top: 50px;
}
</style>

<template>
  <div>
    <div class="estate_alert">
      <span>!</span>
      <span>请仔细阅读使用指引，并在专业人士（执业律师/注册会计师/注册税务师）指导下使用本功能。</span>
    </div>
    <div class="estate_header">
      <div class="cursor_pointer" @click="present=1" :class="present==1?'present':''">权益类股份支付</div>
      <div class="cursor_pointer" @click="present=2" :class="present==2?'present':''">企业所得税扣除</div>
      <div class="cursor_pointer" @click="present=3" :class="present==3?'present':''">应纳个税所得额</div>
      <span v-if="present==1">权益类股份支付总数：{{estateNum}}</span>
      <span v-if="present==2">企业所得税扣除：{{estateNum}}</span>
      <span v-if="present==3">总应纳个税所得额：{{estateNum}}</span>
    </div>
    <card class="cards">
      <div class="title" slot="title">
        <div class="estate_title_left">
          <Input v-model="name" placeholder="请填写姓名" style="width: 150px"/>
          <div v-if="present==3">
            <DatePicker
              v-model="beginTime"
              @on-change="beginTimeChange"
              type="date"
              placeholder="请选择开始时间（年月日）"
              style="width: 200px;margin-left: 20px;"
            ></DatePicker>
            <span>——</span>
            <DatePicker
              v-model="endTime"
              @on-change="endTimeChange(3)"
              type="date"
              placeholder="请选择结束时间（年月日）"
              style="width: 200px;"
            ></DatePicker>
          </div>
          <DatePicker
            v-if="present==1"
            v-model="searchMonth"
            type="month"
            placeholder="日期选择期（到月）"
            style="width:150px;margin-left: 20px;"
          ></DatePicker>
          <DatePicker
            v-if="present==2"
            v-model="beginTimeMounth"
            type="month"
            placeholder="开始时间（到月）"
            style="width:150px;margin-left: 20px;"
          ></DatePicker>
          <DatePicker
            v-if="present==2"
            v-model="endTimeMounth"
            type="month"
            @on-change="endTimeChange(2)"
            placeholder="结束时间（到月）"
            style="width:150px;margin-left: 20px;"
          ></DatePicker>
        </div>
        <div class="estate_title_right">
          <Select v-model="companyId" placeholder="请选择公司" style="width:250px;margin-left: 20px;">
            <Option
              v-for="item in companyList"
              :value="item.id"
              :key="item.id"
            >{{ item.companyName }}</Option>
          </Select>
          <div @click="search" class="company_header_search_btn cursor_pointer">
            <img src="../../assets/img/company/company-search.png" alt>
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
      <Table
        @on-selection-change="handleChange"
        border
        stripe
        :columns="exerciseArr"
        :data="exerciseList"
      ></Table>
    </card>
    <Page
      class="page"
      :current="current"
      :total="total"
      :page-size="pageSize"
      @on-change="pageChange"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      endTimeMounth: "",
      beginTimeMounth: "",
      exporst: false,
      trueList: [],
      pageSize: 0, //每页显示条数
      total: 0, //总条数
      current: 1, //当前页数
      beginTime: "",
      endTime: "",
      estateNum: "",
      present: 1,
      name: "",
      companyName: "",
      companyList: [],
      companyId: "",
      companyExcetId: "",
      searchMonth: "",
      exerciseList: [],
      exerciseArr: [
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
          title: "获授总数",
          key: "totalAwarded",
          align: "center"
        },
        {
          title: "授予日",
          key: "stockStartTime",
          align: "center"
        },
        {
          title: "净资产（授予日每股）",
          key: "netAssetsPer",
          align: "center"
        },
        {
          title: "行权价（每股）",
          key: "eachAppraisement",
          align: "center"
        },
        {
          title: "股份支付",
          key: "sharePayment",
          align: "center"
        }
      ]
    };
  },
  created() {},
  mounted() {
    this.selectCompanyListByAdminId();
  },
  methods: {
    downLoad() {
      if (this.trueList.length == 0) {
        this.$Message.error("请选择需要下载的数据！");
      } else {
        var arr = [];
        this.$Spin.show();
        if (this.present == 1) {
          this.trueList.forEach(item => {
            arr.push(String(item.id));
          });
          this.$http({
            method: "post",
            responseType: "blob",
            url: "/downLoadExcelFirstWaitingPeriod",
            data: {
              data: {
                companyId: this.companyExcetId / 1,
                userId: arr
              },
              version: "2.0"
            }
          }).then(res => {
            this.downloadBlob(res.data, "权益类股份支付");
          });
        } else if (this.present == 2) {
          this.trueList.forEach(item => {
            arr.push(String(item.num));
          });
          this.$http({
            method: "post",
            responseType: "blob",
            url: "/downLoadExcelExercisePeriod",
            data: {
              data: {
                companyId: this.companyExcetId / 1,
                num: arr
              },
              version: "2.0"
            }
          }).then(res => {
            this.downloadBlob(res.data, "企业所得税扣除");
          });
        } else if (this.present == 3) {
          this.trueList.forEach(item => {
            arr.push(String(item.num));
          });
          this.$http({
            method: "post",
            responseType: "blob",
            url: "/downLoadExcelExerciseTaxPayable",
            data: {
              data: {
                companyId: this.companyExcetId / 1,
                num: arr
              },
              version: "2.0"
            }
          }).then(res => {
            this.downloadBlob(res.data, "应纳个税所得额");
          });
        }
      }
    },
    downloadBlob(data, filename) {
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", filename + ".xls");
      document.body.appendChild(link);
      link.click();
      this.$Spin.hide();
    },
    handleChange(currentRow) {
      this.trueList = currentRow;
    },
    pageChange(e) {
      if (this.present == 1) {
        this.selectFirstWaitingList(e);
      } else if (this.present == 2) {
        this.selectRightFinancialTaxList(e);
      } else {
        this.selectTaxPayableList(e);
      }
    },
    //搜索
    search() {
      if (this.present == 1) {
        this.selectFirstWaitingList(1);
        this.selectFirstWaitingListNum();
      } else if (this.present == 2) {
        this.selectRightFinancialTaxNum();
        this.selectRightFinancialTaxList(1);
      } else if (this.present == 3) {
        this.selectTaxPayableListNum();
        this.selectTaxPayableList(1);
      }
    },
    beginTimeChange() {
      if (this.beginTime == "") {
        return;
      } else {
        if (this.endTime == "") {
          return;
        } else {
          if (this.beginTime.getTime() > this.endTime.getTime()) {
            this.$Message.error("结束时间不能低于开始时间");
            this.endTime = "";
          }
        }
      }
    },
    endTimeChange(type) {
      if (type == 3) {
        if (this.endTime == "") {
          return;
        } else {
          if (this.beginTime == "") {
            return;
          } else {
            if (this.endTime.getTime() < this.beginTime.getTime()) {
              this.$Message.error("开始时间不能高于结束时间");
              this.endTime = "";
            }
          }
        }
      }else{
		  if (this.endTimeMounth == "") {
          return;
        } else {
          if (this.beginTimeMounth == "") {
            return;
          } else {
            if (this.endTimeMounth.getTime() < this.beginTimeMounth.getTime()) {
              this.$Message.error("开始时间不能高于结束时间");
              this.endTimeMounth = "";
            }
          }
        } 
	  }
    },

    // 应纳个税所得额列表
    selectTaxPayableList(e) {
      this.$axios.Estate.selectTaxPayableList({
        data: {
          pageNum: e,
          companyId: this.companyId / 1,
          name: this.name,
          beginTime:
            this.beginTime == ""
              ? ""
              : this.$util.formatDate(this.beginTime, "YYYY-MM-DD"),
          endTime:
            this.endTime == ""
              ? ""
              : this.$util.formatDate(this.endTime, "YYYY-MM-DD")
        },
        version: "2.0"
      }).then(res => {
        this.companyExcetId = this.companyId;
        this.exerciseList = res.result.list;
        this.trueList = [];
        this.total = res.result.total / 1;
        this.pageSize = res.result.pageSize / 1;
        if (res.result.pageNum == 0) {
          this.current = 1;
        } else {
          this.current = res.result.pageNum / 1;
        }
      });
    },
    // 查询企业所得税扣除列表
    selectRightFinancialTaxList(e) {
      this.$axios.Estate.selectRightFinancialTaxList({
        data: {
          pageNum: e,
          companyId: this.companyId / 1,
          name: this.name,
          beginTime:this.beginTimeMounth==""?"":this.$util.formatDate(this.beginTimeMounth, "YYYY-MM-DD"),
		  endTime:this.endTimeMounth==""?"":this.$util.formatDate(this.endTimeMounth, "YYYY-MM-DD")
        },
        version: "2.0"
      }).then(res => {
        this.companyExcetId = this.companyId;
        this.exerciseList = res.result.list;
        this.trueList = [];
        this.total = res.result.total / 1;
        this.pageSize = res.result.pageSize / 1;
        if (res.result.pageNum == 0) {
          this.current = 1;
        } else {
          this.current = res.result.pageNum / 1;
        }
      });
    },

    selectFirstWaitingListNum() {
      this.$axios.Estate.selectFirstWaitingListNum({
        data: {
          companyId: this.companyId / 1,
          name: this.name,
          month:
            this.searchMonth == ""
              ? ""
              : this.$util.formatDate(this.searchMonth, "YYYY-MM-DD")
        },
        version: "2.0"
      }).then(res => {
        this.estateNum = res.result;
      });
    },

    // 应纳个税所得额总和
    selectTaxPayableListNum() {
      this.$axios.Estate.selectTaxPayableListNum({
        data: {
          companyId: String(this.companyId),
          name: this.name,
          beginTime:
            this.beginTime == ""
              ? ""
              : this.$util.formatDate(this.beginTime, "YYYY-MM-DD"),
          endTime:
            this.endTime == ""
              ? ""
              : this.$util.formatDate(this.endTime, "YYYY-MM-DD")
        },
        version: "2.0"
      }).then(res => {
        this.estateNum = res.result;
      });
    },
    // 企业所得税扣除总数
    selectRightFinancialTaxNum() {
      this.$axios.Estate.selectRightFinancialTaxNum({
        data: {
          companyId: String(this.companyId),
		  name: this.name,
		  beginTime:this.beginTimeMounth==""?"":this.$util.formatDate(this.beginTimeMounth, "YYYY-MM-DD"),
		  endTime:this.endTimeMounth==""?"":this.$util.formatDate(this.endTimeMounth, "YYYY-MM-DD")
        },
        version: "2.0"
      }).then(res => {
        this.estateNum = res.result;
      });
    },
    //股份支付计提列表
    selectFirstWaitingList(e) {
      this.$axios.Estate.selectFirstWaitingList({
        data: {
          pageNum: e,
          companyId: this.companyId / 1,
          name: this.name,
          month:
            this.searchMonth == ""
              ? ""
              : this.$util.formatDate(this.searchMonth, "YYYY-MM-DD")
        },
        version: "2.0"
      }).then(res => {
        this.companyExcetId = this.companyId;
        this.exerciseList = res.result.list;
        this.trueList = [];
        this.total = res.result.total / 1;
        this.pageSize = res.result.pageSize / 1;
        if (res.result.pageNum == 0) {
          this.current = 1;
        } else {
          this.current = res.result.pageNum / 1;
        }
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
        this.companyId = res.result[0].id;
        this.companyExcetId = res.result[0].id;
        this.companyList = res.result;
        this.selectFirstWaitingList(1);
        this.selectFirstWaitingListNum();
      });
    }
  },
  watch: {
    present(newVal) {
      if (newVal == 1) {
        //权益类股份支付
        var arr = [
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
            title: "获授总数",
            key: "totalAwarded",
            align: "center"
          },
          {
            title: "授予日",
            key: "stockStartTime",
            align: "center"
          },
          {
            title: "净资产（授予日每股）",
            key: "netAssetsPer",
            align: "center"
          },
          {
            title: "行权价（每股）",
            key: "eachAppraisement",
            align: "center"
          },
          {
            title: "股份支付",
            key: "sharePayment",
            align: "center"
          }
        ];
        this.exerciseArr = arr;
        this.selectFirstWaitingList(1);
        this.selectFirstWaitingListNum();
      } else if (newVal == 2) {
        //企业所得税扣除
        var arr = [
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
            title: "行权价（每股）",
            key: "eachAppraisement",
            align: "center"
          },
          {
            title: "行权日",
            key: "approvalTime",
            align: "center"
          },
          {
            title: "净资产（行权日每股）",
            key: "netAssetsPer",
            align: "center"
          },
          {
            title: "批准行权股数",
            key: "approval",
            align: "center"
          },
          {
            title: "税前扣除",
            key: "preTaxDeduction",
            align: "center"
          }
        ];
        this.exerciseArr = arr;
        this.selectRightFinancialTaxNum();
        this.selectRightFinancialTaxList(1);
      } else if (newVal == 3) {
        //应纳个税所得额
        var arr = [
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
            title: "行权价（每股）",
            key: "eachAppraisement",
            align: "center"
          },
          {
            title: "行权日",
            key: "approvalTime",
            align: "center"
          },
          {
            title: "净资产（行权日每股）",
            key: "netAssetsPer",
            align: "center"
          },
          {
            title: "批准行权股数",
            key: "approval",
            align: "center"
          },
          {
            title: "应纳个税所得额",
            key: "preTaxDeduction",
            align: "center"
          }
        ];
        this.exerciseArr = arr;
        this.selectTaxPayableListNum();
        this.selectTaxPayableList(1);
      }
    }
  }
};
</script>


