<template>
    <span v-b-tooltip.hover title="Update date" v-if="is_active">
        <i class="material-icons">update</i><span>{{ lastUpdate }}</span>
    </span>
</template>

<script>
    import vBTooltip from 'bootstrap-vue/es/directives/tooltip/tooltip'
    import { ToDateString } from '@theme/js/utility.js'

    export default {
        name: "LastUpdateDate",
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
            lastUpdate:{
                get(){
                    try {
                        return ToDateString(this.article.update_datetime_dt)
                    } catch (error) {
                        return ""
                    }
                }
            },
            is_active:{
                get(){
                    return this.article.update_datetime_dt && this.article.datetime_dt && this.article.update_datetime_dt > this.article.datetime_dt
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
