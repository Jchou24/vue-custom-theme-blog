<template>
    <div class="tag-manager-meta-info">
        <div class="tag-count">
            <TagIcon/>: {{ $store.state.tag.value.length || $store.state.tag.options.length }}
            <FileIcon/>: {{ $store.state.tag.active_article_id.length }} 
        </div>
        
        <IEcharts
            class="pie-chart"
            :option="option"
            :loading="false"
            :styles="styles"
            
            ref="pie_chart"
            />
    </div>
</template>

<script>
    import IEcharts from 'vue-echarts-v3/dist/VueECharts.min.js'
    import TagIcon from '@theme/components/common/icon/TagIcon.vue'
    import FileIcon from '@theme/components/common/icon/FileIcon.vue'

    import throttle from 'lodash.throttle'
    import { screen_size } from '@theme/js/utility.js'

    export default {
        name: "TagManagerMetaInfo",
        components:{
            IEcharts,
            TagIcon,
            FileIcon,
        },
        props:{
            
        },
        data(){
            return {
                loading: true,
                option: {
                    visualMap: {
                        type: 'continuous',
                        min: 0,
                        max: 10,
                        inRange: {
                            color: ['#9acadd', '#1e4c5e', '#10303d']
                        },
                        show: false,
                    },
                    series: {
                        type: 'sunburst',
                        data: [],
                        radius: [0, '90%'],
                        label: {
                            // show: false
                        },
                        nodeClick: screen_size() == 'xs' ? false : "rootToNode",
                    },
                    tooltip: {
                        show: true
                    },
                },
                styles:{
                    width: "100%",
                    height: "100%",
                    "min-height": "180px",
                }
            }
        },
        watch:{
            "$store.state.category.active_category"(){
                this.update_data()
            },
            "$store.state.tag.active_article_id"(){
                this.update_data()
            },
            "$store.state.layout.app_resize": throttle(function(){
                let that = this

                that.option.series.nodeClick = screen_size() == 'xs' ? false : "rootToNode"
                if( that.$refs.pie_chart ){
                    that.$refs.pie_chart.resize()
                }
            }, 500)
        },
        computed:{

        },
        methods: {
            init(){
                let that = this

                let target = "div.tag-manager" 

                // let width = document.querySelector(target).offsetWidth
                // document.querySelector(target).style.width = (width - 1) + "px"                
                // setTimeout(function(){
                //     document.querySelector(target).style.width = ""
                // },1)

                that.update_data()

                import('resize-sensor').then(ResizeSensor => {
                    ResizeSensor.default(document.querySelector("div.tag-manager-meta-info"), throttle(function(){
                        if( that.$refs.pie_chart ){
                            that.$refs.pie_chart.resize()
                        }
                    }), 500)
                })
            },
            update_data(){
                let that = this
                let option_series_tree = that.to_option_series_tree( that.$store.state.category.article_category_tree )
                that.option.series.data = option_series_tree
                that.option.visualMap.max = option_series_tree[0].value
            },
            to_option_series_tree(article_category_tree){
                let option_series_tree = {}
                function dfs_tree(option_series_tree_root, article_category_tree_root, node_name, depth=0){
                    option_series_tree_root.name = node_name
                    option_series_tree_root.children = []
                    // Control label display rule here
                    // example ref: https://ecomfe.github.io/echarts-examples/public/editor.html?c=sunburst-drink
                    option_series_tree_root.label = { 
                        show: false,
                        // show: 0 < depth && depth < 2 ? true : false,
                        // position: 'outside',
                        // rotate: 'tangential'
                    }
                    let value = article_category_tree_root.id.length
                    for( let child in article_category_tree_root.children ){
                        
                        let option_series_tree_node = {}
                        option_series_tree_root.children.push(option_series_tree_node)


                        value += dfs_tree( option_series_tree_node, article_category_tree_root.children[child], child, depth+1 )
                    }

                    option_series_tree_root.value = value

                    return value
                }

                dfs_tree(option_series_tree, article_category_tree.Home, 'Home')
                option_series_tree = [option_series_tree]
                return option_series_tree
            },
        },
        mounted(){
            this.init()
        },
        updated(){

        },
        destroyed(){
            
        }
    }
</script>

<style lang="scss" scoped>
    div.tag-manager-meta-info{

        div.tag-count{
            display: flex;
            justify-content: center;
            svg.tag-icon,
            svg.file-icon{
                position: relative;
                fill: #556c86;
            }

            svg.tag-icon{
                left: -3px;
                width: 24px;
                height: 24px;
            }

            svg.file-icon{
                top: 2px;
                left: -2px;
                width: 20px;
                height: 20px;
                margin-left: 8px;
            }
        }
    }
</style>
