<template>
  <div>
    <form-item :trueVal="supplierName" @triggerSelect="isSelectSupplierName=true" :isSelect="isSelectSupplierName" label="供应商名称" @input="searchSupplierName"></form-item>
  </div>
</template>

<script>
import { chosen } from "@/utils";
export default {
  data() {
    return {
      supplierNames: [],
      projectNames: [],
      contractNames: [],
      supplierName: '',
      projectName: '',
      contractName: '',
      fakeSupplierName: '',
      isSelectSupplierName: false
    };
  },
  created() {
    this.getSupplierNames();
    this.getProjectNames();
    this.getContractNames();
  },
  methods: {
    getSupplierNames() {
      chosen([
        {
          key: "选项一",
          value: "1"
        },
        {
          key: "选项二",
          value: "2"
        }
      ], function(res) {
          this.supplierName = res.vlaue
            this.isSelectSupplierName = false
      });
    },
    getProjectNames() {},
    getContractNames() {},
    searchSupplierName(payload) {
        console.log('payload', payload)
        this.getSupplierNames(payload.val)
    }
  }
};
</script>  

<style lang="scss" scoped>


</style>