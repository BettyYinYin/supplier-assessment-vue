<template>
  <div>
    <list-wrapper
      :requestData="getList.bind(this)"
      :onDataChange="updateList"
      :allowRefresh="true"
      :allowLoadmore="true"
      :pageSize="10"
      ref="listWrapper"
      class="list"
    >
      <template-list :list="list" slot="list" v-if="list.length !== 0"></template-list>
    </list-wrapper>
  </div>
</template> 

<script>
import TemplateList from "@/views/template/list.vue";
import { getList } from "@/api/supplierList.js";
import { setTitle } from "@/utils";
export default {
  components: {
    TemplateList
  },
  data() {
    return {
      list: [],
      loading: false,
      errorText: "",
      loadingError: false,
      pageNo: 1,
      pageSize: 10
    };
  },
  created() {
    // this.getList();
    setTitle("供应商评价");
  },
  methods: {
    getList({ current, pageSize }) {
      this.loading = true;
      this.loadingError = false;
      return getList({
        supplierName: this.supplierName,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      })
        .then(res => {
          // const data = res.data;
          // this.list = data.result;
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
          this.loading = false;
        });
    },
    updateList(list) {
      this.list = list;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>