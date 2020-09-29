<template>
    <span>
        {{ article.title }}
        <div>
            <div v-if="article.datetime_dt">
                <i class="material-icons">update</i><span>{{ ToDateString(article.datetime_dt) }}</span>
            </div>
            <div v-if="article.update_datetime_dt">
                <i class="material-icons" >refresh</i><span>{{ ToDateString(article.update_datetime_dt) }}</span>
            </div>
        </div>
        <Tags :article="article" />
    </span>
</template>

<script>
    import Tags from "@theme/components/common/Tags.vue"
    import { ToDateString } from "@theme/js/utility.js"

    export default {
        name: "PaginationCard",
        components:{
            Tags
        },
        props:{
            article:{
                required: true,
                type: Object
            }
        },
        computed:{
            categories:{
                get(){
                    return this.article.category || []
                }
            },
            tags:{
                get(){
                    return this.article.tag || []
                }
            }
        },
        methods:{
            ToDateString(d){
                return ToDateString(d)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
