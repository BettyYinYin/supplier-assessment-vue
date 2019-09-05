<template>
    <div class="loading-data">
        <transition name="fade">
            <mt-spinner v-show="status" type="fading-circle"></mt-spinner>
        </transition>
    </div>
</template>
<script>
export default {
    props: {
        status: {
            type: Boolean,
            default: false,
        }
    }
}
</script>
<style scoped>
.loading-data {
  width: 50vw;
  height: 2rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>


