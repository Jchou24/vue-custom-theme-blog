<template>
    <span class="DisqusCount" v-if="shortname">
        <ChatIcon class="chat-icon" v-b-tooltip.hover title="Comment Count" />
        <span 
            :data-disqus-identifier="identifier_" 
            :data-disqus-url="comment_url" 
            class="disqus-comment-count" >{{ comment }}</span>
    </span>
</template>

<script>
    import vBTooltip from 'bootstrap-vue/es/directives/tooltip/tooltip'
    import ChatIcon from '@theme/components/common/icon/ChatIcon.vue'
    import { mapMutations } from 'vuex'

    export default {
        name: "DisqusCount",    
        directives:{
            'b-tooltip': vBTooltip
        },
        components:{
            ChatIcon
        },
        props:{
            identifier: {
                type: String,
                default: undefined,
            },
            script_id:{
                type: String,
                default: "dsq-count-scr"
            },
            cache_sec:{
                type: Number,
                default: 60 * 10 // 10 mins
            },
        },
        data(){
            return {
                
            }
        },
        computed:{
            shortname:{
                get(){
                    try {
                        return this.$site.themeConfig.disqus.shortname
                    } catch (error) {
                        return ""
                    }
                }
            },
            comment_url:{
                get(){
                    return this.identifier ? window.location.origin + this.identifier_ : document.baseURI.split('#')[0]
                }
            },
            identifier_:{
                get(){
                    return this.identifier || this.$route.path || window.location.pathname
                }
            },
            disqus:{
                get(){
                    return this.$store.state.disqus.disqus
                }
            },
            is_init_disqus:{
                get(){
                    return this.$store.state.disqus.is_init
                }
            },
            cache:{
                get(){
                    return this.$store.state.disqus.cache
                }
            },
            comment_cache:{
                get(){
                    return this.$store.state.disqus.cache[ this.comment_url ]
                }
            },
            comment:{
                get(){
                    return this.comment_cache ? this.comment_cache.comment || "0" : "0"
                }
            }
        },
        watch:{
            identifier(){
                this.init()
            },
            shortname(){
                this.init()
            },
        },
        methods:{
            init(){
                let that = this

                if (that.shortname.length == 0) {
                    return
                }

                if( that.disqus ){
                    // console.log("get disqus")

                    if( that.is_need_refresh() ){
                        // console.log(that.comment_cache)
                        // console.log("refresh disqus")

                        that.disqus.getCount({ reset: true })
    
                        setTimeout(function(){
                            that.setting_cache()
                        },1500)
                    }

                } else {
                    if (!that.is_init_disqus) {
                        that.init_disqus()
                        that.get_disqus_src()
                    }
                }       
            },

            is_need_refresh(){                
                // no comment cache found
                if( !this.comment_cache ) return true

                // no comment found
                if( this.comment.length == 0 ) return true

                let time_delta = (new Date() - this.comment_cache.datetime)/1000
                // if cache data too old
                if( time_delta > this.cache_sec ) return true

                return false
            },
            get_disqus_src(){
                let that = this
                // console.log("create script")
                const script = window.document.createElement('script')
                script.async = true
                script.src = `https://${this.shortname}.disqus.com/count.js`
                script.id = that.script_id
                window.document.body.appendChild(script)
                setTimeout(function(){
                    that.set_disqus( window.DISQUSWIDGETS )
                    that.setting_cache()
                },1500)
            },
            setting_cache(){
                // console.log("setting_cache")
                let that = this
                document.querySelectorAll("span.disqus-comment-count").forEach( el =>{
                    let url = el.getAttribute('data-disqus-url')

                    that.set_cache({
                        key: url,
                        val: {
                            comment: el.innerText,
                            datetime: new Date()
                        }
                    })

                    // console.log("key", url)
                    // console.log("val", {
                    //         comment: el.innerText,
                    //         datetime: new Date()
                    //     })
                    // console.log("========================")
                })
            },
            ...mapMutations('disqus',[
                'set_cache',
                'set_disqus',
                'init_disqus',
            ])
        },
        mounted(){
            let that = this
            this.init()

            setTimeout(function(){
                if( window.DISQUSWIDGETS ){
                    window.DISQUSWIDGETS.getCount({ reset: false })
                }
            },1500)
        },
    }
</script>

<style lang="scss">
    disquscount{
        margin-right: 5px;
    }
</style>


<style lang="scss" scoped>
    span.DisqusCount{
        margin-right: 5px;
    }

    .chat-icon{
        width: 18px;
    }

    span.disqus-comment-count{
        position: relative;
        top: 3px;
        font-size: 16px;
    }
</style>
