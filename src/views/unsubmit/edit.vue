<template>
  <div>
    <operate :supplier="supplier" :isAdd="false" :id="id" />
    <loading-wrap :status="loading"></loading-wrap>
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
      id: "",
      loading: false
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.loading = true
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
        })
        .catch(err => {})
        .finally(() => {
          hidePreloader();
          this.loading = false
        });
    }
  },
  // beforeRouteEnter(to, from, next){
  //   // if(from.path === '/quota'){
  //   //   to.meta.keepAlive = true
  //   // }else {
  //   //   to.meta.keepAlive = false
  //   // }
  //   next()
  // },
  beforeRouteLeave(to, from, next){
    if(to.path === '/quota'){
      from.meta.keepAlive = true
    }else {
      from.meta.keepAlive = false
    }
    next()
  }
};
</script>

<style lang="scss" scoped>
</style>