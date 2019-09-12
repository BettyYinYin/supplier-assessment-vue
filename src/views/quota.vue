<template>
  <div class="quota">
    <svg-icon iconClass="clear3"></svg-icon>
    <div class v-for="quotaOne in quotaList" :key="quotaOne.id">
      <div class="quota-one-title">{{quotaOne.name}}</div>
      <div
        class="quota-two-title"
        v-for="(quotaTwo, index) in quotaOne.twoList"
        :key="quotaTwo.id"
        @click="goBack(quotaOne, quotaTwo)"
      >
        <span>{{`${index+1}. ${quotaTwo.name}`}}</span>
        <svg-icon iconClass="arrow-right"></svg-icon>
      </div>
    </div>
    <no-data v-show="!loading && quotaList.length === 0"></no-data>
  </div>
</template>

<script>
import { setTitle, showPreloader, hidePreloader } from "@/utils";
import * as quotaApi from "@/api/quota.js";
export default {
  name: "quota",
  data() {
    return {
      quotaList: [],
      loading: false
    };
  },
  created() {
    setTitle("指标详情");
    this.getAllQuotaList();
  },
  methods: {
    getAllQuotaList() {
      if (this.quotaList.length !== 0) {
        return;
      }
      showPreloader();
      this.loading = true;
      quotaApi
        .getAllQuotaList()
        .then(res => {
          this.quotaList = res.data;
        })
        .catch(err => {
          this.$toast({
            message: err.message || "获取指标详情失败",
            duration: 2000
          });
        })
        .finally(() => {
          this.loading = false;
          hidePreloader();
        });
    },
    goBack(quotaOne, quotaTwo, quotaTwoList) {
      // this.$emit("selectQuota", {
      //   quotaOne,
      //   quotaTwo
      // });
      this.$store.commit('quota/SELECT_QUOTA', {
        quotaOne,
        quotaTwo
      })
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.quota {
  .quota-one-title {
    padding: 0 1rem;
    word-break: break-all;
    background: $color-primary;
    // color: #fff;
    color: $grey-color-1;
    line-height: 2rem;
    margin-bottom: 0.5rem;
  }
  .quota-two-title {
    padding: 0 1rem 0.5rem;
    // word-break: break-all;
    line-height: 1.6rem;
    color: $grey-color-2;

    display: flex;
    // flex: 1;
    justify-content: space-between;
    align-items: center;
    word-break: break-all;
    font-size: .9rem;
    .svg-icon {
      flex: 0 0 1rem;
    }
  }
}
</style>