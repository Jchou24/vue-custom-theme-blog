<template>
    <BNavbar  type="dark">
        <BContainer>
    
            <div class="left-items">
                <NavbarToggler />
                <LinkHome />
                <LinkAbout v-if="is_about_page_exists()" />
            </div>
            
            <div class="right-items d-flex justify-content-around" >
                <!-- {# display on small screen #} -->
                <LinkHome :is_sm_size="true" />
                <LinkAbout :is_sm_size="true" v-if="is_about_page_exists()"/>

                <!-- {# display on every screen #} -->
                <LinkCategory />
                <LinkTag />
                <LinkArchive />
                <LinkSearch />
            </div>

        </BContainer>
    </BNavbar>
</template>

<script>
    import BNavbar from 'bootstrap-vue/es/components/navbar/navbar'
    import BContainer from 'bootstrap-vue/es/components/layout/container'

    import NavbarToggler from '../elements/NavbarToggler.vue'
    import LinkHome from '../elements/LinkHome.vue'
    import LinkAbout from '../elements/LinkAbout.vue'
    import LinkCategory from '../elements/LinkCategory.vue'
    import LinkTag from '../elements/LinkTag.vue'
    import LinkArchive from '../elements/LinkArchive.vue'
    import LinkSearch from '../elements/LinkSearch.vue'

    export default {
        name: "NavBar",
        components:{
            BNavbar,
            BContainer,

            NavbarToggler,
            LinkHome,
            LinkAbout,
            LinkCategory,
            LinkTag,
            LinkArchive,
            LinkSearch,
        },
        props:{
            
        },
        data: function(){
            return {

            }
        },
        computed:{

        },
        methods:{
            is_about_page_exists(){
                const link = this.$router.resolve({
                        path: '/about/',
                    });
                // console.log(link)
                // if exists
                //     link.resolved.name will be component key
                // else
                //     undefined
                if (link.resolved.name) {
                    return true;
                }
                return false;
            },
        },
        mounted(){

        },
        updated(){

        },
        destroyed(){
            
        }
    }
</script>

<style lang="scss" scoped>

</style>
