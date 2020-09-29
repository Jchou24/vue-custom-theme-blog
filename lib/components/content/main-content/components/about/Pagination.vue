<template>
    <div class="Pagination fullpage-pagination">

        <div class="fullpage-pagination-bullet bullet-up" @click="HandleClickUp">
            <span class="material-icons">keyboard_arrow_up</span>
        </div>

        <div class="fullpage-pagination-bullet" 
            v-for="(i,index) in indexList"
            :key=i
            :class="{'fullpage-pagination-bullet__active':index==currentSlideIndex}"
            @click="EmitMoveto(index)"
            ></div>

        <div class="fullpage-pagination-bullet bullet-down" @click="HandleClickDown">
            <span class="material-icons">keyboard_arrow_down</span>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Pagination",
        components:{ 

        },
        props:{
            totalSlidesNumber:{
                type: Number,
                required: true,
            },
            currentSlideIndex:{
                type: Number,
                required: true,
            },
        },
        data(){
            let indexList = this.GetIndexList()
            return {
                indexList,
            }
        },
        watch:{
            totalSlidesNumber(){
                this.indexList = this.GetIndexList()
            }
        },
        methods:{
            EmitMoveto(slideIndex){
                this.$emit('Moveto', slideIndex)
            },
            GetIndexList(){
                return [...Array(this.totalSlidesNumber).keys()]
            },
            HandleClickUp(){
                this.$emit('MovePrev')
                // console.log("up")
            },
            HandleClickDown(){
                this.$emit('MoveNext')
                // console.log("down")
            },
        }
    }
</script>

<style lang="scss">
    $bullet-background-color: rgba(192, 192, 192, 0.6);

    .fullpage-pagination{
        background: radial-gradient(circle, #ffffff00 20%, #252525) rgba(100, 100, 100, 0.8);
        padding: 10px;
        padding-top: 20px;
        padding-bottom: 20px;
        border-radius: 20px;

        box-shadow: 0px 0px 30px rgba(226, 226, 226, 0.4), 0px 0px 10px rgba(226, 226, 226, 1.0);
    }

    .fullpage-pagination{
        position: fixed;
        right: 20px;
        top: 50%;        
        transform: translate(0%,-50%);
        display: flex;
        flex-flow: column;

        z-index: 25;

        @media (max-width: $mediaquery-width-sm) { 
            position: fixed;
            transform: rotate(270deg);
            top: unset;
            bottom: -75px;

            left: 0; 
            right: 0; 
            margin-left: auto; 
            margin-right: auto; 

            width: fit-content;
        }
    }

    .fullpage-pagination > .fullpage-pagination-bullet{
        margin:6px 0;
    }

    .fullpage-pagination > .fullpage-pagination-bullet__active{
        background: whitesmoke;
    }

    .fullpage-pagination-bullet{
        position: relative;
        margin:0 6px;
        cursor: pointer;
        width: 12px;
        height: 12px;
        border-radius: 100%;
        background: $bullet-background-color;
    }

    .fullpage-pagination-bullet__active{
        background: whitesmoke;
        opacity: 1;
    }

    .fullpage-pagination-bullet.bullet-up,
    .fullpage-pagination-bullet.bullet-down{
        background: unset;

        .material-icons{
            color: $bullet-background-color;
            font-weight: bold;
            position: relative;
            top: -5px;
            left: -6px
        }
    }
</style>
