<template>
    <Calendar 
        v-model="value"  
        :disabled-days-of-week="[]" 
        format="yyyy-MM-dd" 
        :clear-button="true" 
        :placeholder="placeholder"                      
    />
</template>

<script>
    export default {
        name: "DateFilter",
        components:{
            
        },
        props:{
            mutation_function_name:{
                type: String
            },
            is_end:{
                type: Boolean
            },
        },
        data: function(){
            return {
                value: "",
                placeholder: this.is_end ? "End Date" : "Start Date",
            }
        },
        watch:{
            value(new_value){
                if( isNaN( new Date(new_value).getTime() ) ){
                    this.mutate( "" )
                }else{
                    this.mutate(this.value)
                }
            }
        },
        computed:{

        },
        methods:{
            mutate( val ){
                this.$store.commit( `search/${this.mutation_function_name}`, val )
            }
        },
        beforeMount(){
            this.$options.components.Calendar = () => import('vue2-slot-calendar/lib/calendar')
        },
        mounted(){
            
        },
        updated(){

        },
        destroyed(){
            
        }
    }
</script>

<style src='@theme/css/vue2-slot-calendar.min.css'></style>

<style lang="scss" scoped>

</style>
