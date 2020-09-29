<template>
    <div class="CountDownNotification">
        <transition
            enter-active-class="animated fastest fadeIn"
            leave-active-class="animated fastest fadeOut"
        >
        <p v-if="is_show">{{message}}</p>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "CountDownNotification",
        components:{
            
        },
        props:{
            message:{
                type: String,
                default: () => ""
            },
            count_down_time:{
                type: Number,
                default: () => 1500
            },
        },
        data(){
            return {
                timer: null,
                is_show: false
            }
        },
        watch:{
            message(){
                let that = this
                that.is_show = true
                if (that.timer) {
                    clearTimeout(that.timer)
                }
                that.timer = setTimeout(function(){
                    that.is_show = false
                }, that.count_down_time)
            },
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

    .CountDownNotification{
        font-size: 18px;
        font-weight: 500;
        opacity: 0.5;
    }
    
</style>
