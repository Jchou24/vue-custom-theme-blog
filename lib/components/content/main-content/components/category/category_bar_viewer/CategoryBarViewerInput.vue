<template>
    <div class="category-bar-viewer-input"
        :style="{ 'display': is_display_table? 'table': 'block' }">
        {{ current_categories_value }}
    </div>
</template>

<script>
    import $ from 'jquery'
    import { mapMutations } from 'vuex'
    
    export default {
        name: "CategoryBarViewerInput",
        components:{
            
        },
        props:{
            
        },
        data() {
            return {
                current_categories_value: "",
                current_category_path: [],
                is_display_table: false,
                is_white_space: false,
            }
        },
        computed:{

        },
        methods:{
            init(){
                let that = this
                that.recycle()

                that.current_category_path = that.$store.state.category.active_category_path
                that.is_white_space = false
                that.join_path_value()
                window.addEventListener('click', that.on_click)
            },
            on_click(e){
                if(e.target != this.$el){
                    this.is_white_space = false
                }else{
                    this.is_white_space = !this.is_white_space
                }
                this.join_path_value()
            },
            join_path_value(){
                let that = this
                if( that.is_white_space ){
                    that.is_display_table = true
                    that.current_categories_value = "/"+that.current_category_path.join(" / ")
                }else{
                    that.is_display_table = false
                    that.current_categories_value = "/"+that.current_category_path.join("/")
                }            
            },
            recycle(){
                window.removeEventListener('click', this.on_click)
            },
        },
        watch:{
            "$store.state.category.active_category_path":function(new_val){
                this.current_category_path = new_val
                this.is_white_space = false
                this.join_path_value()
            },
        },
        mounted(){
 
        },
        updated(){

        },
        beforeDestroy(){
            this.recycle()
        }
    }
</script>

<style lang="scss" scoped>

</style>
