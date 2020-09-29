<template>
    <div class="footer-pagination">
        <nav aria-label="Page navigation">
            <ul class="pagination pagination-lg justify-content-center" 
                :class="size_class"
                ref="ul_pagination">
                <li class="page-item"
                    v-if="previous_id"
                    >
                    <router-link class="page-link" :to="$articles_hash[previous_id].regularPath">
                        <span class="arrow" aria-hidden="true">&laquo;</span>
                        <PaginationCard :article="$articles_hash[previous_id]"/>
                    </router-link>
                </li>
                <li class="page-item disabled"
                    v-else
                    >
                    <a class="page-link" href="">
                        <span class="arrow" aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                        Previous Article
                    </a>
                </li>

                <li class="page-item"
                    v-if="next_id"
                    >
                    <router-link class="page-link" :to="$articles_hash[next_id].regularPath"> 
                        <span class="arrow first" aria-hidden="true">&raquo;</span>
                        <PaginationCard :article="$articles_hash[next_id]"/>
                        
                        <span class="arrow last" aria-hidden="true">&raquo;</span>
                    </router-link>
                </li>
                <li class="page-item disabled"
                    v-else
                    >        
                    <a class="page-link" href="">
                        <span class="arrow first" aria-hidden="true">&raquo;</span>
                        Next Article
                        <span class="arrow last" aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    import PaginationCard from './PaginationCard.vue'
    import throttle from 'lodash.throttle'

    export default {
        name: "Pagination",
        components:{
            PaginationCard
        },
        props:{
            
        },
        data: function(){
            return {
                size_class: "",
            }
        },
        computed:{
            previous_id:{
                get(){
                    return this.$page.previous_id
                }
            },
            next_id:{
                get(){
                    return this.$page.next_id
                }
            },
        },
        methods:{
            init(){
                let that = this

                that.maintance_size_class()
                import('resize-sensor').then(ResizeSensor => {
                    ResizeSensor.default(document.querySelector("ul.pagination"), throttle(that.maintance_size_class, 300))
                })
            },
            maintance_size_class(){
                let width = this.$el.offsetWidth

                if( width >= 576 ){
                    this.size_class = "lg"
                }else{
                    this.size_class = "sm"
                }
                // console.log( "maintance_size_class", this.size_class )
            },
        },
        mounted(){
            this.init()
        },
        updated(){

        },
        beforeDestroy(){
            
        },
        destroyed(){
            
        }
    }
</script>

<style lang="scss" >
    // ul.pagination[max-width~="576px"]{
    ul.pagination.sm{
        flex-direction: column;

        span.arrow.first{
            display: table-cell;
        }
        span.arrow.last{
            display: none;
        }                
    }

    // ul.pagination[min-width~="576px"]{
    ul.pagination.lg{
        span.arrow.first{
            display: none;
        }
        span.arrow.last{
            display: table-cell;
        }                
    }

    ul.pagination{
        margin-top: 16px;

        li.page-item{
            flex: 1;  

            // & > a{
            //     color: #212529;
            // }

            & > a div{
                color: #212529;
            }

            a{
                height: 100%;
                width: 100%;
                display: table;
                text-align: center;

                span.arrow{
                    height: 100%;
                    display: table-cell;
                    vertical-align: middle;
                    text-align: center;                    
                }

                div{
                    display: table;
                    margin: 0 auto;
                    margin-top: 5px;
                    margin-bottom: 9px;

                    div{
                        display: table-cell;
                        font-size: 14px;
                        i{
                            position: relative;
                            top: 5px;
                            font-size: 22px;
                        }
                    }

                    &:last-child i{
                        margin-left: 8px;
                    }
                }

                svg-icon.tag{
                    position: relative;
                    top: -6px;
                }
            }
        }
    }
</style>
