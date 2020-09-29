<template>
    <span class="categories" v-if=" categories.length > 0 " >
        <span class="category-breadcrumb-item">
            <router-link to="/category/">
                <i class="material-icons">home</i>
            </router-link>
        </span>
        <span class="category-breadcrumb-item" v-for="(c, index) in categories" :key="index">
            <router-link 
                :to="{
                    path:'/category/', 
                    query:{
                        category: categories.slice(0, index+1).join(',')
                    }
                }">
                {{c}}
            </router-link>
        </span>
    </span>
</template>

<script>
    export default {
        name: "Categories",
        props:{
            article:{
                required: true,
                type: Object,
            }
        },
        computed:{
            categories:{
                get(){
                    return this.article.category || []
                }
            }
        }

    }
</script>

<style lang="scss" scoped>

</style>
