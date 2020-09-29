<template>
    <button type="button" class="navbar-toggler"
        v-on:click="toggle_layout_is('is_sidebar_active')"
        >
        <span class="navbar-toggler-icon"></span>
    </button>
</template>

<script>
    import { mapMutations } from 'vuex'

    export default {
        name: "NavbarToggler",
        components:{
            
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
            ...mapMutations("layout",[
                "toggle_layout_is",
            ])
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
    button.navbar-toggler{
        display: inline-block;
    }
</style>
