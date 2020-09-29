<template>
    <a href="" class="sidebar-icon-circle"
        :class="{disactive: !is_show}"
        v-on:click.prevent="set_is_show({ target:set_target, value:!is_show })">
        <div class="sidebar-icon">
            <i class="material-icons datetime"
                v-if="set_target == 'datetime'"
                >
                schedule
            </i>
            <i class="material-icons update_datetime"
                v-if="set_target == 'update_datetime'"
                >
                update
            </i>
            <TagIcon 
                v-if="set_target == 'tag'"
                />
        </div>
    </a>
</template>

<script>
    import TagIcon from '@theme/components/common/icon/TagIcon.vue'
    import { mapMutations } from 'vuex'

    export default {
        name: "CategoryContentShowIcon",
        components:{
            TagIcon
        },
        props:{
            is_show:{
                required: true,
                type: Boolean,
            },
            set_target:{
                // one if following: datetime, update_datetime, tag
                type: String,
                required: true
            },
        },
        data: function(){
            return {

            }
        },
        computed:{

        },
        methods:{
            ...mapMutations('category',[ 
                'set_is_show',
            ]),
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
