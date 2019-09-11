<template>
  <div class="quota">
    <div class="" v-for="quotaOne in quotaList" :key="quotaOne.id">
      <div class="quota-one-title">{{quotaOne.name}}</div>
      <div class="quota-two-title" v-for="quotaTwo in quotaOne.twoList" :key="quotaTwo.id">{{quotaTwo.name}}</div>
    </div>
  </div>
</template>

<script>
import { setTitle, showPreloader, hidePreloader } from "@/utils";
import * as quotaApi from '@/api/quota.js'
export default {
  name: 'quota',
  data() {
    return{
      quotaList: []
    }
  },
  created() {
    setTitle('指标详情')
    this.getAllQuotaList()
  },
  methods: {
    getAllQuotaList() {
      quotaApi.getAllQuotaList().then(res => {
        this.quotaList = res.data
      }).catch(err => {
        this.$toast({
          message: err.message || '获取指标详情失败',
          duration: 2000
        })
      })
    }
    
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.quota{
  .quota-one-title{
    padding: 0 1rem;
    word-break: break-all;
    background: $color-primary;
    color: #fff;
    line-height: 2rem;
  }
  .quota-two-title{
    padding: 0 1rem;
    word-break: break-all;
    line-height: 1.6rem;
  }
}
</style>