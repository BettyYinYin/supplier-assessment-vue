<template>
  <div>
      <operate :supplier="supplier" :isAdd="false" />
  </div>
</template>
<script>
import Operate from "@/views/template/operate.vue";
import {info} from '@/api/operate.js'
export default {
  name: 'unsubmit.edit',
  components: {
    Operate
  },
  data() {
    return {
        supplier: {
            name: '数公因数公因数公因数公因数公因数公因数公因数公因数公因'
        },
        id: ''
    };
  },
  created() {
    this.id = this.$route.query.id
    this.info()
  },
  methods: {
    info() {
      info({
        id: this.id
      }).then(res => {
        this.supplier = res.data
      }).catch(err => {

      })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>