<template>
    <ClientOnly v-if="shortname">
        <Disqus :shortname="shortname" :url="url" />
    </ClientOnly>
</template>

<script>

    export default {
        name: "MessageBoard",
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
            url:{
                get(){
                    return this.$el ? this.$el.baseURI.split('#')[0] : ""
                }
            }
        },
        mounted(){
            
        }
    }
</script>

<style lang="scss">
    #disqus_thread{
        margin: 20px auto;
        width: 90%;
        max-width: 800px;
    }

</style>
