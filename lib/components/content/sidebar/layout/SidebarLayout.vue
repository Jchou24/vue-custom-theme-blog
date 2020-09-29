<template>
    <ClientOnly>
        <div class="sidebar"
            v-bind:class="{'active-display': is_sidebar_active}"
            >
            <aside class="sidebar-icons"
                v-if="$slots.icons && is_display_sidebar_icons"
                >
                <slot name="icons"></slot>
            </aside>
            
            <!-- <aside class="sidebar-content ps ps--active-y"
                v-if="$slots.content"
                v-scroller
                ref="sidebar"
                >        
                <slot name="content"></slot> 
            </aside> -->

            <aside class="sidebar-content"
                v-if="$slots.content"
                ref="sidebar"
                >        
                <slot name="content"></slot> 
            </aside>
        </div>  
    </ClientOnly>  
</template>

<script>
    import Scrollbar from 'smooth-scrollbar';

    export default {
        name: "SidebarLayout",
        props:{
            is_display_sidebar_icons:{
                type: Boolean,
                default: true
            }
        },
        data: function(){
            return {
                scroller: null
            }
        },
        components:{
            
        },
        computed:{
            is_full_screen:{
                get(){
                    return this.$store.state.layout.is_full_screen
                }
            },
            is_sidebar_active:{
                get(){
                    if( this.is_full_screen ){
                        return false
                    }
                    return this.$store.state.layout.is_sidebar_active
                }
            }
        },
        watch:{
            "$route.path"(){
                // this.$refs.sidebar._ps_.top_all()
                let that = this
                if(that.scroller){
                    that.scroller.scrollTop = 0
                }
            }
        },
        mounted(){
            let that = this
            setTimeout(() => {
                that.scroller = Scrollbar.init(that.$refs.sidebar)
            }, 500);
        },
        beforeDestroy(){
            Scrollbar.destroy()
        }
    }
</script>


<style lang="scss">
    aside.sidebar-content{
        div.scrollbar-track{
            display: none !important;
        }
    }
</style>


<style lang="scss" scoped>
    div.sidebar-content{
        height: 100%;
    }

    aside.sidebar-content{
        -webkit-overflow-scrolling: touch;
    }
</style>
