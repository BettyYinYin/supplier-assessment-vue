<template>
  <div>
    <operate :supplier="supplier" :isAdd="true" />
  </div>
</template>

<script>
import Operate from "@/views/template/operate.vue";
import { fetchInitial } from "@/api/add";
export default {
  components: {
    Operate
  },
  data() {
    return {
      supplier: {}
    };
  },
  created() {
    this.fetchInitial();
    setTimeout(() => {
      this.supplier = {
        supplierName: "12321"
      };
    }, 5000);
  },
  methods: {
    fetchInitial() {
      fetchInitial()
        .then(res => {
          this.supplier = res.data;
        })
        .catch(err => {});
    }
  }
};
</script>  

<style lang="scss" scoped>
</style>