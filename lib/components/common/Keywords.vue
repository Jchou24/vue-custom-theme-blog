<template>
    <span class="Keywords" v-if="words.length > 0">
        <i class="material-icons" v-b-tooltip.hover title="Key Words">vpn_key</i>
        <span class="Keywords-word"
            v-for="( word, idx ) in words"
            :key="idx"
            >
            {{ word }}
        </span>
    </span>
</template>

<script>
    import vBTooltip from 'bootstrap-vue/es/directives/tooltip/tooltip'

    export default {
        name: "Keywords",
        directives:{
            'b-tooltip': vBTooltip
        },
        props:{
            article:{
                required: true,
                type: Object,
            },
            max_words:{
                type: Number,
                default: 10,
            },
            min_words:{
                type: Number,
                default: 3,
            },
        },
        computed:{
            categories:{
                get(){
                    return this.article.category || []
                }
            },
            words:{
                get(){
                    let that = this
                    let words = []
                    that.article.key_words.forEach( word => {
                        if( words.length < that.max_words ){
                            words.push( word.word ) 
                        }
                    })

                    return words.length > that.min_words ? words : []
                }
            },
        }

    }
</script>

<style lang="scss" scoped>
    $font-size: 16px;
    $line-height: 22px;
    $lines-to-show: 2;

    span.Keywords{
        // display: flex;
        // justify-content: center;
        // flex-wrap: wrap;

        display: block; /* Fallback for non-webkit */
        display: -webkit-box;
        max-width: 80%;
        max-height: calc( #{$font-size} * #{$line-height} * #{$lines-to-show} ); /* Fallback for non-webkit */
        margin: 0 auto;
        margin-top: -5px;
        font-size: $font-size;
        line-height: $line-height;
        -webkit-line-clamp: $lines-to-show;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;

        i.material-icons{
            position: relative;
            top: 7px;
        }

        span.Keywords-word{
            text-decoration: underline;
            margin-left: 5px;
            margin-right: 5px;
            display: inline-flex;
            font-weight: 500;
        }
    }
</style>
