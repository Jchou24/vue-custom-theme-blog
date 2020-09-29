<template>
    <div class="sidebar-filter sidebar-article-block">
        <header><h3>
            <FilterIcon/>
            <span>Filter</span>
        </h3></header>

        <SidebarSearchFilterItem class="category-filter">
            <template #icon>
                <CategoryIcon/> Category
            </template>
            <template #filter>
                <CategoryFilter ref="category-filter" />
            </template>
        </SidebarSearchFilterItem>
        
        <SidebarSearchFilterItem class="tag-filter">
            <template #icon>
                <TagIcon/> Tag
            </template>
            <template #filter>
                <TagFilter ref="tag-filter" />
            </template>
        </SidebarSearchFilterItem>
        
        <SidebarSearchFilterItem class="date-filter">
            <template #icon>
                <i class="material-icons">schedule</i> Create Date
            </template>
            <template #filter>
                <div class="start-date">
                    <DateFilter ref="datetime-filter-start" :is_end="false" mutation_function_name="set_datetime_start_value"/>
                    <i class="material-icons">arrow_upward</i>
                </div>
                <div class="end-date">
                    <DateFilter ref="datetime-filter-end" :is_end="true" mutation_function_name="set_datetime_end_value"/>
                    <i class="material-icons">arrow_downward</i>
                </div>
            </template>
        </SidebarSearchFilterItem>

        <SidebarSearchFilterItem class="date-filter">
            <template #icon>
                <i class="material-icons">update</i> Update Date
            </template>
            <template #filter>
                <div class="start-date">
                    <DateFilter ref="update_datetime-filter-start" :is_end="false" mutation_function_name="set_update_datetime_start_value"/>
                    <i class="material-icons">arrow_upward</i>
                </div>
                <div class="end-date">
                    <DateFilter ref="update_datetime-filter-end" :is_end="true" mutation_function_name="set_update_datetime_end_value"/>
                    <i class="material-icons">arrow_downward</i>
                </div>
            </template>
        </SidebarSearchFilterItem>
    </div>
</template>

<script>
    import FilterIcon from "@theme/components/common/icon/FilterIcon.vue"
    import CategoryIcon from "@theme/components/common/icon/CategoryIcon.vue"
    import TagIcon from "@theme/components/common/icon/TagIcon.vue"
    import SidebarSearchFilterItem from './SidebarSearchFilterItem.vue'
    import CategoryFilter from './CategoryFilter.vue'
    import TagFilter from './TagFilter.vue'
    import DateFilter from './DateFilter.vue'

    export default {
        name: "SidebarSearchFilter",
        components:{
            FilterIcon,
            CategoryIcon,
            TagIcon,
            SidebarSearchFilterItem,
            CategoryFilter,
            TagFilter,
            DateFilter,
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
            
        },
        watch:{
            
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
