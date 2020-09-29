<template>
    <span v-b-tooltip.hover title="Create date" v-if="is_active">
        <i class="material-icons">schedule</i><span>{{ datetime }}</span>
    </span> 
</template>

<script>
    import vBTooltip from 'bootstrap-vue/es/directives/tooltip/tooltip'
    import { ToDateString } from '@theme/js/utility.js'

    export default {
        name: "CreateDate",
        directives:{
            'b-tooltip': vBTooltip
        },
        props:{
            article:{
                required: true,
                type: Object,
            }
        },
        computed:{
            datetime:{
                get(){
                    try {
                        return ToDateString(this.article.datetime_dt)
                    } catch (error) {
                        return ""
                    }
                }
            },
            is_active:{
                get(){
                    return this.datetime.length > 0
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
