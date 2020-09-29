<template>
    <div class="PageFlipper flex-container" v-if="is_show_flipper">
        <div class="flipper animated" 
            :class=cls
            v-for="(setting, idx) in settings"
            :key=idx
            :style=setting.style
            :ref=GetRef(idx)
            ></div>
    </div>
</template>

<script>
    import $ from 'jquery'

    export default {
        name: "PageFlipper",
        components:{ 
        },
        props:{
            flipperNumbers:{
                type: Number,
                default: 8
            },
            baseRunTime:{
                type: Number,
                default: 1300
            },
            duration:{
                type: Number,
                default: 100
            },
            animateStyleCandidate:{
                type: Array,
                default: () => [
                    "flipOutY",
                    "zoomOutDown",
                    "zoomOutLeft",
                    "zoomOutRight",
                    "zoomOutUp",
                    "rollOut",
                    "slideOutDown",
                    "slideOutLeft",
                    "slideOutRight",
                    "slideOutUp",
                    "rotateOut",
                    "rotateOutDownLeft",
                    "rotateOutDownRight",
                    "rotateOutUpLeft",
                    "rotateOutUpRight",
                ]
            }
        },
        data(){
            return {
                is_show_flipper: true,
                is_animated: false,
                is_animation_done: this.GetIsAnimationDone(),
                settings: this.GetSettings(),
                animateStyle: this.Sample(this.animateStyleCandidate),
            }
        },
        watch:{
            is_all_animation_done(){
                if( this.is_all_animation_done == true ){
                    this.is_show_flipper = false
                    this.$emit("AnimationDone")
                }
            }
        },
        methods:{
            ShuffleArray(array){
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            },
            Sample(array){
                let random = Math.floor(Math.random() * array.length);
                return array[random]
            },
            GetRef(idx){
                return `flipper-${idx}`
            },
            GetIsAnimationDone(){
                return new Array(this.flipperNumbers).fill(false)
            },
            GetSettings(){
                let settings = [...Array(this.flipperNumbers).keys()]
                    for (let index = 0; index < settings.length; index++) {
                        let delay = settings[index]*this.duration
                        settings[index] = {
                            style: `animation-delay: ${delay}ms;`,
                        }
                    }
                this.ShuffleArray(settings)
                return settings
            },
            Init(){
                let that = this

                that.is_show_flipper = true
                that.is_animated = false
                that.is_animation_done = that.GetIsAnimationDone()
                that.settings = that.GetSettings()

                that.BindAllTransitionEvent()                

                setTimeout(function(){
                    that.is_animated = true
                }, that.baseRunTime)
            },
            BindAllTransitionEvent(){
                // Function from David Walsh: http://davidwalsh.name/css-animation-callback
                // function whichTransitionEvent(){
                //     var t, el = document.createElement("fakeelement");

                //     var transitions = {
                //         "transition"      : "transitionend",
                //         "OTransition"     : "oTransitionEnd",
                //         "MozTransition"   : "transitionend",
                //         "WebkitTransition": "webkitTransitionEnd"
                //     }

                //     for (t in transitions){
                //         if (el.style[t] !== undefined){
                //             return transitions[t];
                //         }
                //     }
                // }
                
                // let transitionEvent = whichTransitionEvent()
                let transitionEvent = "animationend"

                for (let index = 0; index < this.flipperNumbers; index++){
                    this.BindTransitionEvent(index, transitionEvent)
                } 
            },
            BindTransitionEvent(idx, transitionEvent){     
                let that = this
                $(that.$refs[that.GetRef(idx)]).on(transitionEvent, function(){
                    that.$set(that.is_animation_done, idx, true)
                    // console.log(idx+"animated")
                })
            }

        },
        computed:{
            cls:{
                get(){
                    let cls = {}
                    cls[this.animateStyle] = this.is_animated
                    return cls
                }
            },
            is_all_animation_done(){
                for( let is_animation_done of this.is_animation_done ){
                    if( is_animation_done == false ){
                        return false
                    }
                }
                return true
            },
        },
        mounted(){
            this.Init()            
        }
    }
</script>

<style lang="scss" scoped>
    .flex-container{
        display: flex;
        flex-direction: row;
        // width: 150vw;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;

        z-index: 100;
    }

    .flex-container .flipper{
        flex: 1;
        // width: 250px;
        height: 150vh;
        margin-top: -150px;
        // margin-left: 10px;
        // margin-right: 10px;

        // background-color: #1c2f46;
        // background-image: map-get($imgs-heavy, grey_wash_wall);
        background-image: map-get($imgs-heavy, always_grey);
        // background-image: map-get($imgs-heavy, footer_lodyas);
        // background-image: map-get($imgs-heavy, dark_wood);

        -ms-transform: rotate(8deg); /* IE 9 */
        transform: rotate(8deg);

        // border: 5px solid #a1b7bd;

        &:first-child{
            margin-left: -120px;
        }

        &:last-child{
            margin-right: -80px;
        }

    }
</style>
