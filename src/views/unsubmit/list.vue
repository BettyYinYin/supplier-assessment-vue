<template>
  <div class="unsubmit-list">
    <!-- <router-link to="/unsubmit/edit"> -->
    <template-item v-for="item in list" :supplier="item" :key="item.id" to="/unsubmit/edit">
      <!-- <router-link to="/unsubmit/edit"/> -->
    </template-item>
    <!-- </router-link> -->
    
  </div>
</template>
<script>
import TemplateList from "@/views/template/list";
import TemplateItem from "@/views/template/item";
export default {
  name: "unSubmitList",
  components: {
    TemplateList,
    TemplateItem
  },
  data() {
    return {
      list: [
        {
          name: "名称商名称供应商商名称1",
          time: "2019-09-03",
          status: "未提交",
          score: "-5"
        },
        {
          name: "名称商名称供应商商名称2",
          time: "2019-09-03",
          status: "未提交",
          score: "-5"
        }
      ]
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.unsubmit-list {
  padding: 0.5rem;
  /deep/ .template-item {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid $grey-bg-2;
  }
}
</style>