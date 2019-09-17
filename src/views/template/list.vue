<template>
  <div class="template-list">
    <item v-for="item in list" :isSearch="isSearch" :supplier="item" :key="item.id" :to="{path: pathMap[item.evaluateState], query: {id: item.id, evaluateState: item.evaluateState && item.evaluateState.toString()}}"></item>
  </div>
</template>
<script>
import Item from "./item.vue";
export default {
  components: {
    Item
  },
  props: {
    list: {
      type: Array,
      required: true,
      default: []
    },
    isSearch: {
      type: String, // yes no
      required: true
    }
  },
  data() {
    return {
      pathMap: {
        0: '/unsubmit/edit',
        1: '/check',
        2: '/check',
        3: '/check'
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.template-list {
  padding: 0.5rem;
  /deep/ .template-item {
    padding: 0.5rem 0;
    border-bottom: 1px solid $grey-bg-2;
  }
}
</style>