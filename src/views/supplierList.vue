<template>
  <div class="supplier-list">
    <div class="search-btn-wrap">
      <form action="#" class="search-form" onsubmit="return false;">
        <input
          type="search"
          ref="searchInput"
          autocomplete="off"
          v-model="keyword"
          @keydown="search($event)"
          class="input"
          placeholder="搜索供应商"
        />
        <svg-icon iconClass="clear2" v-if="!!keyword" @click="clearSearch" class="search-clear-btn"></svg-icon>
      </form>
      <div @click="goHome" class="close-select-btn" v-if="isSearch === 'yes'">取消</div>
    </div>
    <div>
      <list-wrapper
        :requestData="getList.bind(this)"
        :onDataChange="updateList"
        :allowRefresh="true"
        :allowLoadmore="true"
        :pageSize="20"
        ref="listWrapper"
        class="list-height"
      >
        <template-list :list="list" slot="list" :isSearch="isSearch" v-if="list.length !== 0"></template-list>
      </list-wrapper>
    </div>
  </div>
</template> 

<script>
import TemplateList from "@/views/template/list.vue";
import TemplateItem from "@/views/template/item.vue";
import { getList } from "@/api/supplierList.js";
import { setTitle, pullToRefreshEnable, pullToRefreshStop, pullToRefreshDisable } from "@/utils";
import { isString } from "util";
export default {
  components: {
    TemplateList,
    TemplateItem
  },
  data() {
    return {
      list: [],
      loading: false,
      errorText: "",
      loadingError: false,
      keyword: "",
      isSearch: "yes",
      evaluateState: "",
      titleMap: {
        0: "待提交",
        1: "待审核",
        2: "审核通过",
        3: "审核驳回"
      }
    };
  },
  created() {
    const { searchFlag, evaluateState } = this.$route.query;
    this.isSearch = searchFlag;
    this.evaluateState = evaluateState;
    if (this.isSearch === "yes") {
      setTitle("供应商评价");
    } else {
      setTitle(this.titleMap[this.evaluateState]);
    }
    pullToRefreshEnable(this);
  },
  methods: {
    getList({ current, pageSize }) {
      return getList({
        supplierName: this.keyword,
        evaluateState: this.evaluateState,
        pageNo: current,
        pageSize
      })
        .then(res => {
          const { success, data, errorMsg } = res;
          if (success) {
            return Promise.resolve((data && data.result) || []);
          } else {
            return Promise.reject(errorMsg);
          }
        })
        .catch(err => {
          this.loadingError = true;
          this.errorText = err.message || "";
          return Promise.reject(err.message || "获取供应商评价失败");
        })
        .finally(() => {
          pullToRefreshStop()
          this.loading = false;
        });
    },
    updateList(list) {
      this.list = list;
    },
    search(e) {
      if (e.keyCode == 13) {
        this.list = [];
        this.$refs.listWrapper.refresh();
      }
    },
    goHome() {
      this.$router.push("/home");
    },
    clearSearch() {
      this.keyword = ''
      this.$refs.searchInput.focus();
      this.list = []
      this.$refs.listWrapper.refresh();
    }
  },
  beforeRouteLeave(to, from ,next) {
    pullToRefreshDisable()
    next()
  }
};
</script>

<style lang="scss" scoped>
.supplier-list {
  padding: 0.5rem;
  .search-form {
    flex: 1;
    position: relative;
    .search-clear-btn{
      width: 1.3rem;
      height: 1.3rem;
      position: absolute;
      right: .5rem;
      top: 50%;
      transform: translateY(-50%)
    }
  }
  .list-height {
    height: calc(100vh - 4.2rem) !important;
  }
}
</style>