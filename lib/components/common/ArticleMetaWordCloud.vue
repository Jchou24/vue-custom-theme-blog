<template>
    <div class="article-meta-wordcloud" 
        :class="{ 
            'active': words.length > min_words 
            }"
        >
        <vue-word-cloud 
            :words="words" 
            :color="colors"
            :animation-duration="1"
            font-family="Georgia, 'Times New Roman', Times, serif"

            />
    </div>
</template>

<script>
    // currently not in use
    import VueWordCloud from 'vuewordcloud'
    import throttle from 'lodash.throttle'

    export default {
        name: "ArticleMetaWordCloud.",
        components:{
            [VueWordCloud.name]: VueWordCloud,
        },
        props:{
            article:{
                required: true,
                type: Object
            },
            // max_words:{
            //     type: Number,
            //     default: 15,
            // },
            min_words:{
                type: Number,
                default: 5,
            },
            colors_candidate:{
                type: Array,
                // default: ['#403030', '#f97a7a'],
                default: () => ['#88a1e8', '#598cc1', '#336496', '#1a6abb',    '#a1b7bd', '#6994a0', '#4e7884'],
            }
        },
        data: function(){
            return {
                max_words: 20
            }
        },
        computed:{
            words:{
                get(){
                    let that = this
                    let words = []
                    that.article.key_words.forEach( word => {
                        if( words.length < that.max_words ){
                            words.push([ word.word, word.weight ]) 
                        }
                    })

                    return words.length > that.min_words ? words : []
                }
            },
            colors:{
                get(){
                    let that = this
                    return function(){
                        return that.select(that.colors_candidate)
                    }                    
                }
            }
        },
        methods:{
            init(){
                let that = this
                that.set_max_words()
                import('resize-sensor').then(ResizeSensor => {
                    ResizeSensor.default(that.$el, throttle(that.set_max_words, 300))
                })   
            },
            select(items){
                return items[Math.floor(Math.random() * items.length)]
            },
            set_max_words(){
                let width = this.$el.clientWidth
                if( 576 < width ){
                    this.max_words = 20
                }else if( 420 < width && width <= 576 ){
                    this.max_words = 15
                }else{
                    this.max_words = 10
                }
            }
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
    div.article-meta-wordcloud{
        height: 0px;

        &.active{
            width: 100%;
            margin: 20px auto;
            margin-bottom: 5px;
            height: 100px;

            // font-family: fantasy
            // font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
            // font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif
            // font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif
            // font-family: Georgia, 'Times New Roman', Times, serif
        }
    }
</style>
