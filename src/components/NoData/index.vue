<template>
    <div class="no-data" :text="text">{{text}}</div>
</template>

<script>
export default {
    name: 'noData',
    props: {
        text: {
            type: String,
            default: '暂无数据'
        }
    }
}
</script>

<style scoped>
.no-data {
  width: 50vw;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: rgba(25,31,37,.4);
}
</style>


