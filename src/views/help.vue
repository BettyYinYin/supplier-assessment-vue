<template>
  <div class="help">
    <div class="title">
      应用说明
    </div>
    <div v-if="moduleFlag === 'group_select'" class="content">
      综合查询：公司员工组织架构、人员类型详细查看管理。
    </div>
    <div v-else class="content">
      日志查询：查看日报、周报、月报。
    </div>
  </div>
</template>
<script>
import { setTitle } from '@/utils'
export default {
  name: 'help',
  data() {
    return {
      moduleFlag: ''
    }
  },
  created() {
    this.setTitle()
    this.moduleFlag = sessionStorage.getItem('moduleFlag')
  },
  methods: {
    setTitle() {
      setTitle('帮助')
    }
  }
}
</script>
<style scoped>
  .help{
    margin-top: 1rem;
    padding: 1rem;
  }

  .title{
    margin-bottom: 1rem;
  }

  .content {
    color: #717171;
  }
</style>


