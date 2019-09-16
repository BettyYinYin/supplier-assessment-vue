<template>
<!-- infinite-scroll-disabled="loading" -->
  <div
    class="list-wrapper"
    v-infinite-scroll="loadmore"
    infinite-scroll-distance="10"
    :infinite-scroll-immediate-check="true"
  >
    <slot name="list"></slot>
    <p v-show="status === 'success' && list.length ===0" class="no-data">暂无数据</p>
    <p v-show="status === 'loaded'" class="no-more">没有更多了</p>
    <p v-show="status === 'error'" class="error-text">{{errorText}}</p>
    <!-- <span v-show="showLoading">加载中...</span> -->
    <div class="load-more-status" v-if="showLoading">
      <loading :status="showLoading"/>
    </div>
  </div>
</template>
<script>
/*
  1.没法控制loadmore的内部topStatus状态，只能通过下拉来触发
  2.下拉来派发更新数据的行为
  3.下拉的loading 通过 数据加载状态和topstatus共同控制，但是slot="top" 只有在触发下拉的动作才会显示
  4.所以第一次获取数据时 显示自定义loading
  */
import { delHtmlTag, delBrTag } from "@/utils";
export default {
  props: [
    "requestData",
    "onDataChange",
    "className",
    "allowRefresh",
    "allowLoadmore",
    "pageSize"
  ],
  data() {
    return {
      list: [],
      status: "init", //loading success error loaded
      topStatus: "pull",
      current: 0,
      errorText: '查询失败'
    };
  },
  created() {
    this.getData(1);
  },
  watch: {
    status(nextStatus, prevStatus) {
      //如果数据状态由加载改变 则关闭下拉动画
      if (
        ["loading", "loaded"].includes(prevStatus) &&
        ["success", "error", "loaded"].includes(nextStatus)
      ) {
        this.closeAnmation();
      }
    }
  },
  computed: {
    showCustomLoading() {
      const { status, topStatus } = this;
      return status === "loading" && topStatus === "pull";
    },
    showLoading() {
      const { status, topStatus } = this;
      return status === "loading" || topStatus === "loading";
    }
  },
  methods: {
    closeAnmation() {
      // this.$refs.loadmore.onTopLoaded();
      // this.$refs.loadmore.onBottomLoaded();
    },
    getData(current, force = false) {
      if (["loading"].includes(this.status) && !force) {
        this.closeAnmation();
        return;
      }
      if (this.status === "loaded" && current !== 1) {
        return;
      }

      this.status = "loading";
      this.errorText = '查询失败'
      
      this.requestData({ current, pageSize: this.pageSize || 10 })
        .then(res => {

          if (res.length === 0) {
            if(current === 1 && this.list.length === 0){
              this.status = 'success'
            }else if (current === 1 && this.list.length) {
              this.status = "loaded";
              this.list = [];
              this.onDataChange(this.list);
            }else {
              this.status = 'loaded'
            }
            return;
          }
          if (current === 1) {
            this.list = res;
          } else {
            this.list = this.list.concat(res);
          }
          this.onDataChange(this.list);
          if (res.length < this.pageSize) {
            this.status = "loaded";
          } else {
            this.status = "success";
          }
          this.current += 1;
        })
        .catch(e => {
          this.status = "error";
          this.errorText = e
        })
    },
    refresh() {
      if (this.allowRefresh) {
        this.list = []
        this.status = 'init'
        this.getData(1);
      } else {
        this.$refs.loadmore.onTopLoaded();
      }
    },
    loadmore(...v) {
      this.allowLoadmore && this.getData(this.current + 1);
    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    onchange() {
      //  this.$router.push({ path:'/DemandDetails?id='+id.P})
    }
  },
  components: {}
};
</script>

<style lang="scss">
.list-wrapper {
  height: 100%;
  overflow: auto;
  .custom-loading {
    text-align: center;
  }
  .no-data,
  .error-text
   {
    width: 50vw;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  .no-more{
    // width: 50vw;
    // position: absolute;
    // left: 50%;
    // bottom: 1rem;
    // transform: translateX(-50%);
    text-align: center;
  }
  .load-more-status{
    height: 2rem;
  }
}
</style>