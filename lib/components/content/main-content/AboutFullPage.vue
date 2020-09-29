<template>
    <MainContentLayout class="full-page" :is_use_hidden_nav_header="false">
        <article class="article-content">
            <ScrollOut>
                <AboutPageOne v-observe-visibility="GetObserverSetting(0)" ref="page0" />
                <AboutPageTwo v-observe-visibility="GetObserverSetting(1)" ref="page1" />
                <AboutPageThree v-observe-visibility="GetObserverSetting(2)" ref="page2" />
                <AboutPageFour v-observe-visibility="GetObserverSetting(3)" ref="page3" />
                <AboutPageLast v-observe-visibility="GetObserverSetting(4)" ref="page4" />
            </ScrollOut>
        </article>
        <Pagination 
            :totalSlidesNumber="totalSlidesNumber" 
            :currentSlideIndex="currentPageNumber" 
            @Moveto="HandleMoveto"
            @MovePrev="HandleMovePrev"
            @MoveNext="HandleMoveNext"
            />
    </MainContentLayout>
</template>

<script>
    import $ from 'jquery'

    import Vue from 'vue'
    import { mapMutations } from 'vuex'
    import { ObserveVisibility } from 'vue-observe-visibility'

    Vue.directive('observe-visibility', ObserveVisibility)

    import MainContentLayout from './layout/MainContentLayout.vue'

    import ScrollOut from '@theme/components/common/scroll/ScrollOut.vue'

    import Pagination from './components/about/Pagination.vue'
    import AboutPageOne from './components/about/AboutPageOne.vue'
    import AboutPageTwo from './components/about/AboutPageTwo.vue'
    import AboutPageThree from './components/about/AboutPageThree.vue'
    import AboutPageFour from './components/about/AboutPageFour.vue'
    import AboutPageLast from './components/about/AboutPageLast.vue'

    import { scroll_article } from '@theme/js/scroller.js'
    

    export default {
        name: "AboutFullPage",
        components:{
            MainContentLayout,

            ScrollOut,
            
            Pagination,
            AboutPageOne,
            AboutPageTwo,
            AboutPageThree,
            AboutPageFour,
            AboutPageLast,            
        },
        data(){
            let totalSlidesNumber = 5
            return {
                totalSlidesNumber,
                visibles: this.GetVisibles(totalSlidesNumber, true),
            }
        },
        computed:{
            currentPageNumber:{
                get(){
                    let that = this
                    let target = 0
                    for ( let i = 0; i < this.visibles.length; i++ ) {
                        if( this.visibles[i] == true ){
                            target = i
                        }
                    }

                    function IsFistTwoPageVisible(){
                        return that.visibles.length > 1 && that.visibles[0] && that.visibles[1]
                    }
                    if( IsFistTwoPageVisible() ){
                        return 0
                    }

                    return target
                }
            }
        },
        
        methods:{
            Init(){
                this.add_views({ url: this.$el.baseURI })
            },
            GetVisibles(totalSlidesNumber, isSetDefault){
                let visibles = new Array(totalSlidesNumber).fill(false)
                if (isSetDefault && totalSlidesNumber > 0) {
                    visibles[0] = true
                } 
                return visibles;
            },
            GetObserverSetting(pageNumber){
                let that = this
                return {
                    callback: (isVisible, entry) => that.VisibilityChanged(isVisible, entry, pageNumber),
                    // throttle: 300,
                }
            },
            GetPageRef(idx){
                return this.$refs[`page${idx}`]
            },
            VisibilityChanged(isVisible, entry, pageNumber){
                this.$set(this.visibles, pageNumber, isVisible)
            },
            HandleMoveto(idx){
                // console.log("HandleMoveto", idx)

                let current_top = $("html, body").scrollTop()
                let offset = idx == 0 ? 0 : 5
                let new_top = $(this.GetPageRef(idx).$el).position().top + offset
                scroll_article(new_top, current_top, false)
            },
            HandleMovePrev(){
                let currentPageNumber = this.currentPageNumber - 1
                currentPageNumber = currentPageNumber < 0 ? 0 : currentPageNumber
                this.HandleMoveto(currentPageNumber)
            },
            HandleMoveNext(){
                let currentPageNumber = this.currentPageNumber + 1
                currentPageNumber = currentPageNumber >= this.totalSlidesNumber ? this.totalSlidesNumber - 1 : currentPageNumber
                this.HandleMoveto(currentPageNumber)
            },
            ...mapMutations('firebase',[
                "add_views",
            ])
        },
        mounted(){
            let that = this
            that.$nextTick(()=>{
                that.Init()
            })            
        },
    }
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">
    .full-page div.main-content div.article article.article-content{
        margin-left: 0px;
        margin-right: 0px;
    }
</style>