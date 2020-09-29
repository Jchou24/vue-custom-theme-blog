<template>
    <SidebarLiItem class="category-filter">
        <h6 class="subtitle">
            <slot name="icon"></slot>
        </h6>
        <hr class="style-3"/>
            <slot name="filter"></slot>
    </SidebarLiItem>
</template>

<script>
    import SidebarLiItem from '../../elements/SidebarLiItem.vue'

    export default {
        name: "SidebarSearchFilterItem",
        components:{
            SidebarLiItem
        },
        props:{
            
        },
        data: function(){
            return {

            }
        },
        computed:{

        },
        methods:{

        },
        mounted(){

        },
        updated(){

        },
        destroyed(){
            
        }
    }
</script>

<style lang="scss" scoped>

</style>
