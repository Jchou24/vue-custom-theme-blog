<template>
    <transition
        mode="out-in"
        enter-active-class="animated fadeInRight fast"
        leave-active-class="animated fadeOutRight fast"
        >
        <div class="back-top-button" 
            @click="$emit('click')"
            v-if="is_active"
            >
            <i class="material-icons">expand_less</i>
        </div>
    </transition>
</template>

<script>

    export default {
        name: "BackTopButton",
        components:{
            
        },
        props:{
            is_active:{
                type: Boolean,
                default: false
            }
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
    i.material-icons{
        cursor: pointer;

        background-color: #7b98b963;
        border-color: $color-border-heavy;
        border-style: solid;
        border-radius: 100px;

        @media (max-width: $mediaquery-width-sm) { 
            font-size: 32px;            
            border-width: 1.5px;
        }

        // Small devices (landscape phones, 576px and up)
        @media (min-width: $mediaquery-width-sm) and (max-width: $mediaquery-width-md) { 
            font-size: 36px;            
            border-width: 1.5px;
        }

        // Medium devices (tablets, 768px and up)
        @media (min-width: $mediaquery-width-md) and (max-width: $mediaquery-width-l) { 
            font-size: 42px;            
            border-width: 2px;
        }

        // Large devices (desktops, 992px and up)
        @media (min-width: $mediaquery-width-l) and (max-width: $mediaquery-width-xl) { 
            font-size: 48px;            
            border-width: 3px;
        }

        // Extra large devices (large desktops, 1200px and up)
        @media (min-width: $mediaquery-width-xl) { 
            font-size: 48px;            
            border-width: 3px;
        }
    }

    div.back-top-button{
        position: fixed;
        right: 15px;
        bottom: 15px;
        cursor: pointer;
        z-index: 99999;

        @media (max-width: $mediaquery-width-sm) { 
            right: 10px;
            bottom: 5px;
        }
    }
</style>
