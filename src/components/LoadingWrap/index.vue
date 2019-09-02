<template>
    <div class="loading-wrap" v-show="status">
    </div>
</template>

<script>
export default {
    props: {
        status: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            
        }
    }
}
    
</script>
<style <style scoped>
    .loading-wrap{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #fff;
        z-index: 2;
    }
</style>

