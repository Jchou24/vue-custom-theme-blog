<template>
    <div class="MinusButton" @click="clicked">
        <i class="material-icons">remove_circle_outline</i>
    </div>
</template>

<script>
    export default {
        name: "MinusButton",
        components:{
            
        },
        props:{
            
        },
        data(){
            return {

            }
        },
        watch:{
            
        },
        computed:{

        },
        methods:{
            init(){
                let that = this
                
                that.recycle()
            },
            recycle(){
                let that = this
            },
            clicked(){
                this.$emit("clicked")
            },
        },
        mounted(){

        },
        updated(){

        },
        beforeDestroy(){
            this.recycle()
        }
    }
</script>

<style lang="scss" scoped>

    .MinusButton{
        height: 64px;

        i.material-icons{
            margin-top: 5px;
            font-size: 54px;
            opacity: 0.5;
            @include transition(all, 0.1s, ease-in-out);
        }

        &:hover{
            i.material-icons{
                font-weight: 900;
                opacity: 1;
            }

            cursor: pointer;
        }
    }
    
</style>
