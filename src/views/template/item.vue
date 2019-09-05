<template>
  <router-link :to="to">
    <div class="template-item">
      <div class="name-status">
        <div class="supplier-name">{{supplier.supplierName}}</div>
        <div class="supplier-status" v-if="isSearch === 'yes'">{{(supplier.evaluateState || supplier.evaluateState === 0) && supplierStatus[supplier.evaluateState]}}</div>
      </div>
      <div class="template-item-right">
        <div class="time-score">
          <div class="supplier-time">{{evaluateTime}}</div>
          <div class="supplier-score">{{`${supplier.quotaType===0 && supplier.quotaScore!== 0? '+' : supplier.quotaType===1 && supplier.quotaScore !==0 ? '-' : ''}${supplier.quotaScore}`}}</div>
        </div>
        <svg-icon iconClass="arrow-right"></svg-icon>
      </div>
    </div>
  </router-link>
</template> 

<script>
import {supplierStatus} from './data'
import moment from 'moment'
export default {
  props: {
    supplier: {
      type: Object,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    isSearch: {
      type: String, // yes no
      required: true
    }
  },
  computed: {
    evaluateTime() {
      return this.supplier.evaluateTime && moment(this.supplier.evaluateTime).format('YYYY-MM-DD')
    }
  }, 
  data() {
    return {
      supplierStatus: supplierStatus
    };
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
    margin-right: 0.5rem;
    .supplier-name {
      color: $grey-color-1;
      font-size: 0.9rem;
      word-break: break-all;
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
      flex: 0 0 5.2rem;
      .supplier-time,
      .supplier-score {
        font-size: 0.8rem;
      }
    }
  }
}
</style>