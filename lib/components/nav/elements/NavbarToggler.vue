<template>
    <button type="button" class="navbar-toggler" :class="cls"
        @click="HandleClick"
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
            is_disabled:{
                type: Boolean,
                default: false
            }
        },
        data: function(){
            return {

            }
        },
        computed:{
            cls:{
                get(){
                    return {
                        disabled: this.is_disabled,
                    }
                }
            }
        },
        methods:{
            HandleClick(){
                if(this.is_disabled){
                    return
                }
                this.toggle_layout_is('is_sidebar_active')
            },
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

        &.disabled{
            cursor: not-allowed;
            opacity: 0.5;
        }
    }
</style>
