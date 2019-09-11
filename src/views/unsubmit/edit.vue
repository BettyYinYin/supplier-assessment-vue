<template>
  <div>
    <operate :supplier="supplier" :isAdd="false" :id="id" />
  </div>
</template>
<script>
import Operate from "@/views/template/operate.vue";
import { info } from "@/api/operate.js";
import { setTitle, showPreloader, hidePreloader } from "@/utils";
export default {
  name: "unsubmit.edit",
  components: {
    Operate
  },
  data() {
    return {
      supplier: {},
      id: ""
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.info();
    setTitle("编辑");
  },
  methods: {
    info() {
      showPreloader();
      info({
        id: this.id
      })
        .then(res => {
          this.supplier = res.data;
          console.log('supplier', this.supplier)
        })
        .catch(err => {})
        .finally(() => {
          hidePreloader();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>