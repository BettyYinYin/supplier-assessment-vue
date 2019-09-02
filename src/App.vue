<template>
  <div id="app" class="content">
    <keep-alive :exclude="exludeRouterName">
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import Config from './config'
export default {
  name: 'App',
  data() {
    return {
      exludeRouterName: []
    }
  },
  watch: {
    '$route'(to, from) {
      if(to.meta.keepAlive && to.meta.keepAliveChange) {
        this.exludeRouterName.push(to.name)
        this.$nextTick(() => {
          this.exludeRouterName.pop()
        })
      }
    }
  }
}
</script>

<style scoped>
.content{
  position: relative;
  min-width: 100vw;
  min-height: calc(100vh);
}
</style>
