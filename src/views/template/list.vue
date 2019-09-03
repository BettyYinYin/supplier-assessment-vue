<template>
    <div class="template-list">
        <item v-for="item in list" :supplier="item" :key="item.id"></item>
    </div>
</template>
<script>
import Item from './item.vue'
export default{
    components: {
        Item
    },  
    props: {
        list: {
            type: Array,
            required: true,
            default: []
        }
    },
    data() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.template-list{
    padding: .5rem;
    /deep/ .template-item{
        padding-bottom: .5rem;
        border-bottom: 1px solid $grey-bg-2;
    }
}
</style>