<template>
  <div>
    <div v-html="imagersText" class="textone" v-show="showTwo" @click="previewImage">

    </div>
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer"></previewer>
    </div>
    <div class="text" v-show="showOne">
      <img src="../../../static/img/index/cuowu.png"/>
      <p>暂无内容</p>
    </div>
  </div>
</template>

<script>
  //出售
  import {Indicator} from 'mint-ui';
  import {Previewer, TransferDom} from 'vux';

  export default {
    directives: {
      TransferDom
    },
    components: {
      Previewer
    },
    name: "five",
    data() {
      return {
        textImg: "",
        imagersText: "",
        token: '',
        showOne: false,
        showTwo: true,
        list:[]
      }
    },
    mounted() {
      this.token = localStorage.token
      this.textImg = this.$route.query.imgText
      this.selectAssess()
    },
    methods: {
      //图片点击放大
      previewImage(e) {
        if (e.target.nodeName == 'IMG') {
          let url = e.target.currentSrc;
          let item = {
            src: url
          };
          this.list.length = 0;
          this.list.push(item);
          this.$refs.previewer.show(0);
        } else {
          return;
        }
      },
      //绩效
      selectAssess() {
        Indicator.open();
        this.$http.post("/selectAssess", {
          data: {
            assessName: this.textImg
          },
          version: "2.0"
        }, {
          headers: {
            Authorization: "Bearer " + this.token
          }
        }).then(res => {
          Indicator.close();
          if (res.data.result == null) {
            this.showOne = true;
            this.showTwo = false;
          } else {
            this.imagersText = res.data.result.assessContent;
            this.showOne = false;
            this.showTwo = true;
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .textone {
    width: 90%;
    margin: auto;
    img {
      width: 100%;
      height: auto;
    }
    p{
      word-wrap: break-word;
    }
  }

  .text {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 8rem;
    img {
      width: 5rem;
      height: 5rem;
      margin: auto;
    }
    p {
      margin-top: 0.5rem;
      font-size: 1rem;
      color: #BABABA;
    }
  }
</style>
