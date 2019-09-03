<template>
  <div>
      <operate :supplier="supplier" :isAdd="false" />
  </div>
</template>
<script>
import Operate from "@/views/template/operate.vue";
export default {
  components: {
    Operate
  },
  data() {
    return {
        supplier: {
            name: '数公因数公因数公因数公因数公因数公因数公因数公因数公因'
        }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>