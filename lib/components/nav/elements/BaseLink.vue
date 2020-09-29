<template>
    <a href="" class="BaseLink navbar-brand" 
        :class="{disabled: isDisabled}" 
        @click.prevent="on_click($event)"
        >
        <slot name="icon"></slot>
        <i class="material-icons" v-if="icon">{{ icon }}</i>
        <div class="d-none d-sm-none d-md-block navbar-item" v-if="title">{{ title }}</div>
    </a>
</template>

<script>
    export default {
        name: "BaseLink",
        props:{
            to:{
                type: String,
                required: true,
            },
            replace:{
                type: Boolean,
                default: () => false,
            },
            title:{
                type: String,
                default: () => ""
            },
            icon:{
                type: String,
                default: () => ""
            },
            isGoBack:{
                type: Boolean,
                default: () => false
            },
            isDisabled:{
                type: Boolean,
                default: () => false
            },
        },
        methods:{
            on_click(event){
                if(this.isGoBack){
                    this.$router.go(-1)
                }

                if(this.isDisabled){
                    return
                }

                if(this.replace){
                    this.$router.replace(this.to)
                }else{
                    this.$router.push(this.to)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .BaseLink{
        &.disabled{
            cursor: not-allowed;
        }
    }
</style>
