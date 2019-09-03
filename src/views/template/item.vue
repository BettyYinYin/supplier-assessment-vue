<template>
  <div class="template-item">
    <div class="name-status">
      <div class="supplier-name">{{supplier.name}}</div>
      <div class="supplier-status">{{supplier.status}}</div>
    </div>
    <div class="template-item-right">
      <div class="time-score">
        <div class="supplier-time">{{supplier.time}}</div>
        <div class="supplier-score">{{supplier.score}}</div>
      </div>
      <svg-icon iconClass="arrow-right" ></svg-icon>
    </div>
  </div>
</template> 

<script>
export default {
  props: {
    supplier: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.template-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1.5rem;
  .name-status {
      margin-right: .5rem;
    .supplier-name {
      color: $grey-color-1;
      font-size: 0.9rem;
    }
    .supplier-status {
      font-size: 0.8rem;
      color: $grey-color-2;
    }
  }

  .template-item-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 0 0 7rem;
    color: $grey-color-2;
    .time-score {
      text-align: right;
      .supplier-time,
      .supplier-score {
        font-size: 0.8rem;
      }
    }
  }

  
}
</style>