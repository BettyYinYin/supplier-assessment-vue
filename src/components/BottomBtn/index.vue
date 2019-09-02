<template>
    <div class="globalBtn bgWhite boxShadow">
        <span class="gloResetBtn" @touchstart.stop.prevent="reset">取消</span>
        <span class="gloYesBtn" @touchstart.stop.prevent="submit">确定</span>
    </div>
</template>
<script>
export default {
    methods: {
        reset(){
            this.$emit('reset')
        },
        submit() {
            this.$emit('submit')
        }
    }
}
</script>
<style scoped>
.gloResetBtn{
    text-align: center;
}

.globalBtn{
    transform: translateZ(0);
}
</style>

