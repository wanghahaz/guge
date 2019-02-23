<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}
.body_1 {
  .ivu-card-body {
    padding: 0 !important;
  }
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#app {
  width: 100%;
  height: 100%;
}

.cards {
  margin-top: 30px;
  padding: 0 20px;
  box-sizing: border-box;
  .cards_title {
    display: inline-block;
    width: 4px;
    height: 20px;
    background: #346ebc;
    position: absolute;
    top: 15px;
    left: 0;
  }
}

.ivu-table-header th {
  background: rgba(52, 110, 188, 0.2) !important;
  border-radius: 3px 3px 0px 0px !important;
}
.page {
  width: 98% !important;
  height: 1px !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  box-sizing: border-box !important;
}

.red_fromitem .ivu-form-item .ivu-form-item-label {
  color: #ff4545 !important;
}

.green_fromitem .ivu-form-item .ivu-form-item-label {
  color: #12a000 !important;
}

.login_frombox .ivu-input {
  width: 260px !important;
  height: 40px !important;
}

.ivu-page-item-active {
  background: #346ebc !important;
  a {
    color: white !important;
  }
}

.ivu-page-item-active:hover a {
  color: white !important;
}

td.ivu-table-expanded-cell {
  padding: 0 !important;
}

/*.padding .ivu-table-column-center,
	.ivu-table-cell-with-expand {
		background: white !important;
	}*/

/*.ivu-table-stripe .ivu-table-body tr:nth-child(2n) td,
	.ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
		background: white !important;
	}
	*/
.inputPass .ivu-input {
  height: 42px !important;
}

.cursor_pointer {
  cursor: pointer !important;
}
.titleheader th, .titleheader tr{
   background: rgba(52, 110, 188, 0.2) !important;
   font-size: 12px !important;
   font-weight: 700 !important;
   color: #515a6e !important;
}
.el-table .warning-row{
     background-color: #f8f8f9 !important; 
}
</style>