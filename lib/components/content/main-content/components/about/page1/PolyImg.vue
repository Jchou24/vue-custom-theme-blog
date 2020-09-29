<template>
    <div class="PolyImg">
        <div :style="style">
            <div class="hexagon" :class=cls>
                <div class="hexagon-in1">
                    <div class="hexagon-in2" :class="imgClass">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PolyImg",
        components:{
            
        },
        props:{
            polyStyle:{
                type: Number,
                default: 0
            },
            imgClass:{
                type: String,
                default: ""
            },
            scale:{
                type: Number,
                default: 1.0
            },
        },
        data(){
            return {

            }
        },
        computed:{
            cls:{
                get(){
                    switch (this.polyStyle) {
                        case 0:
                            return "hexagon1"
                            break;
                        case 1:
                            return "hexagon2"
                            break;
                        case 2:
                            return "dodecagon"
                            break;                    
                        default:
                            return "hexagon1"
                            break;
                    }
                }
            },
            style:{
                get(){
                    return `transform: scale( ${this.scale} )`
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .hexagon {
        overflow: hidden;
        visibility: hidden;
        -webkit-transform: rotate(120deg);
        -moz-transform: rotate(120deg);
            -ms-transform: rotate(120deg);
            -o-transform: rotate(120deg);
                transform: rotate(120deg);
    }

    .hexagon-in1 {
        overflow: hidden;
        width: 100%;
        height: 100%;
        -webkit-transform: rotate(-60deg);
        -moz-transform: rotate(-60deg);
            -ms-transform: rotate(-60deg);
            -o-transform: rotate(-60deg);
                transform: rotate(-60deg);
    }

    .hexagon-in2 {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: 50%;
        visibility: visible;
        -webkit-transform: rotate(-60deg);
        -moz-transform: rotate(-60deg);
            -ms-transform: rotate(-60deg);
            -o-transform: rotate(-60deg);
                transform: rotate(-60deg);
        
    }

    .hexagon1 {
        width: 400px;
        height: 200px;
        margin: 0 0 0 -80px;
    }

    .hexagon2 {
        width: 200px;
        height: 400px;
        margin: -80px 0 0 20px;
    }

    .dodecagon {
        width: 200px;
        height: 200px;
        margin: -80px 0 0 20px;
    }

</style>
