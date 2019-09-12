<template>
  <div>
    <operate :supplier="supplier" :isAdd="true" :id="id" />
  </div>
</template>

<script>
import Operate from "@/views/template/operate.vue";
import { fetchInitial } from "@/api/add";
import { setTitle, showPreloader, hidePreloader } from "@/utils";
export default {
  components: {
    Operate
  },
  data() {
    return {
      supplier: {},
      id: ''
    };
  },
  created() {
    setTitle('新增')
    this.fetchInitial();
  },
  methods: {
    fetchInitial() {
      showPreloader()
      fetchInitial()
        .then(res => {
          const data = res.data;
          this.supplier = data.projectEvaluateTemp;
          this.id = data.id;
        })
        .catch(err => {}).finally(() => {
          hidePreloader()
        });
    }
  },
  beforeRouteLeave(to, from, next){
    if(to.path === '/quota'){
      from.meta.keepAlive = true
    }else {
      from.meta.keepAlive = false
    }
    hidePreloader()
    next()
  }
};
</script>  

<style lang="scss" scoped>
</style>