<template>
    <span class="ArticleViewsCount" v-b-tooltip.hover title="Article Views Count" v-if="is_active_views_count"> 
        <i class="material-icons">remove_red_eye</i>
        <span class="views"> {{ views }} </span>
    </span>
</template>

<script>
    import vBTooltip from 'bootstrap-vue/es/directives/tooltip/tooltip'
    import { mapGetters } from 'vuex'

    export default {
        name: "ArticleViewsCount",
        directives:{
            'b-tooltip': vBTooltip
        },
        components:{
            
        },
        props:{
            article:{
                type: Object,
                default: null,
            }
        },
        data: function(){
            return {
                url: null
            }
        },
        computed:{
            views:{
                get(){
                    let views = this.get_views(this.url)
                    return views ? views : 0
                }
            },
            ...mapGetters('firebase',[
                'is_active_views_count',
                'get_views'
            ])
        },
        methods:{
            init(){
                this.url = this.article ? window.location.origin + this.article.path : this.$el.baseURI
            },
        },
        mounted(){
            let that = this
            that.$nextTick(()=>{
                that.init()
            })
        },
        updated(){

        },
        destroyed(){
            
        }
    }
</script>

<style lang="scss" scoped>
    span.ArticleViewsCount{
        line-height: 25px;
    }

    i{
        position: relative;
        top: 2px;
        margin-right: -2px;
    }

    span.views{
        position: relative;
        top: -3px;
    }
</style>
