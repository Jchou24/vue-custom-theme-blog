<template>
    <BaseLink :to="link" :isDisabled="is_at_search_page" :class="{ active: current_path == search_path }" >
        <template #icon>
            <i class="material-icons">search</i>
        </template>
    </BaseLink>
</template>

<script>
    import BaseLink from './BaseLink.vue'

    export default {
        name: "LinkSearch",
        components:{
            BaseLink,
        },
        props:{
            search_path:{
                type: String,
                default: "/search/"
            }
        },
        data(){
            return {
                current_path: this.$route.path,
                previous_path: this.$route.path
            }
        },
        watch:{
            "$route.path"(new_path, old_path){
                this.current_path = new_path
                this.previous_path = old_path
            },
        },
        computed:{
            is_at_search_page:{
                get(){
                    return this.current_path == this.search_path
                }
            },
            link:{
                get(){
                    return this.is_at_search_page ? this.previous_path : this.search_path
                }
            }
        },
        methods:{

        }
    }
</script>


<style lang="scss" scoped>
    
</style>
