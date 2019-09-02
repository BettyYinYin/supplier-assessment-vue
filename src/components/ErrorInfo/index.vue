<template>
  <div class="err-info" :text="text">{{text}}</div>
</template>

<script>
export default {
  name: "errInfo",
  props: {
    text: {
      type: String,
      default: "请求错误"
    }
  }
};
</script>

<style scoped>
.err-info {
  width: 90vw;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: rgba(25,31,37,.4);
}
</style>


