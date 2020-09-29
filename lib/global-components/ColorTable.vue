<template>
    <div>
        <div class="ColorTable"
            v-for="(item, index) in colorData" 
            v-bind:index="index"
            v-bind:key="index">

            <div class="row title">
                {{item.group}}
            </div>
            
            <div class="row content"
                v-for="(color, idx) in item.colors" 
                v-bind:index="idx"
                v-bind:key="idx"
                >
                
                <div class="display-color" :style="{ background: color }" v-tooltip="'click to pick a color'"
                    @click="ShowColorPicker(index, idx)" />

                <div class="color-name" 
                    v-tooltip="{
                        content: IsShowCopied(index, idx) ? 'Color Copied!' : 'click to copy',
                        show: IsShowCopied(index, idx),
                        trigger: IsShowCopied(index, idx) ? 'manual' : 'hover',
                    }"
                    @click="CopyColorToClickboard(index, idx)">
                    {{color}}
                </div>

                <div class="color-picker" v-on-clickaway="InitIsShowColorPicker"
                    v-if="IsShowColorPicker(index, idx)">
                    <ChromePicker class="ChromePicker" 
                        :value="color" 
                        @input="UpdateColorData(index, idx, $event)"                        
                        />

                    <div class="color-picker-head">
                        <button @click="RecoverColorData(index, idx)">Recover</button>
                        <button @click="InitIsShowColorPicker" >Close</button>
                    </div>                    
                </div>
            </div>
        </div>

        <!-- <table class="ColorTable"
            v-for="(item, index) in colorData" 
            v-bind:index="index"
            v-bind:key="index">
            <thead>
                <tr>
                    <th colspan="2">
                        {{item.group}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(color, idx) in item.colors" 
                    v-bind:index="idx"
                    v-bind:key="idx">
                    <td :style="{ background: color }">
                    </td>
                    <td>
                        {{color}}
                    </td>
                </tr>
            </tbody>
        </table> -->
    </div>
</template>

<script>
    import Vue from 'vue'
    import { directive as onClickaway } from 'vue-clickaway'
    import VTooltip from 'v-tooltip'
    import VueClipboard from 'vue-clipboard2'
    import ChromePicker from 'vue-color/src/components/Chrome.vue'

    Vue.use(VTooltip)
    Vue.use(VueClipboard)

    export default {
        name: "ColorTable",
        directives: {
            onClickaway: onClickaway,
        },
        components:{
            ChromePicker,
        },
        props:{
            data:{
                required: true,
                type: Array,
            }
        },
        data(){
            return {
                originColorData: JSON.parse(JSON.stringify(this.data)),
                colorData: JSON.parse(JSON.stringify(this.data)),
                isShowColorPicker: this.GetIsShowColorPicker(),
                isShowCopied: this.GetIsShowCopied(),
            }
        },
        watch:{
            
        },
        computed:{

        },
        methods:{
            init(){
                let that = this
                
                that.recycle()
            },
            recycle(){
                let that = this
            },
            CopyColorToClickboard(numberOfGroup, numberOfColor){
                this.$clipboardConfig.appendToBody = false
                this.$copyText( this.colorData[numberOfGroup].colors[numberOfColor] )
                this.ShowCopied(numberOfGroup, numberOfColor)
                this.DelayHideCopied(numberOfGroup, numberOfColor)
            },
            // ============================================================
            // colorData
            RecoverColorData(numberOfGroup, numberOfColor){
                this.colorData[numberOfGroup].colors[numberOfColor] = this.originColorData[numberOfGroup].colors[numberOfColor]
                this.colorData = Object.assign([], this.colorData, this.colorData)
            },
            UpdateColorData(numberOfGroup, numberOfColor, event){
                this.colorData[numberOfGroup].colors[numberOfColor] = event.hex
                this.colorData = Object.assign([], this.colorData, this.colorData)
                // console.log(event)
            },
            // ============================================================
            // ColorPicker
            ShowColorPicker(numberOfGroup, numberOfColor){
                // console.log( "ShowColorPicker" )
                if( this.isShowColorPicker && this.isShowColorPicker[numberOfGroup] ){
                    this.isShowColorPicker[numberOfGroup][numberOfColor] = true
                    this.isShowColorPicker = Object.assign([], this.isShowColorPicker, this.isShowColorPicker)
                }
            },
            IsShowColorPicker(numberOfGroup, numberOfColor){
                if( this.isShowColorPicker && this.isShowColorPicker[numberOfGroup] ){
                    return this.isShowColorPicker[numberOfGroup][numberOfColor]
                }

                return false
            },
            InitIsShowColorPicker(){
                this.isShowColorPicker = this.GetIsShowColorPicker()
                this.isShowColorPicker = Object.assign([], this.isShowColorPicker, this.isShowColorPicker)
            },
            GetIsShowColorPicker(){
                let isShowColorPicker = []
                for( let i=0; i<this.data.length; i++ ){
                    isShowColorPicker.push( Array(this.data[i].colors.length).fill(false) )
                }

                return isShowColorPicker
            },
            // ============================================================
            // isShowCopied
            InitIsShowCopied(){
                this.isShowCopied = this.GetIsShowCopied()
                this.isShowCopied = Object.assign([], this.isShowCopied, this.isShowCopied)
            },
            GetIsShowCopied(){
                let isShowCopied = []
                for( let i=0; i<this.data.length; i++ ){
                    let tmp = []
                    for( let j=0; j<this.data[i].colors.length; j++ ){
                        tmp.push({ isShow: false, timer: null })
                    }
                    isShowCopied.push(tmp)
                }

                return isShowCopied
            },
            IsShowCopied(numberOfGroup, numberOfColor){
                if( this.isShowCopied && this.isShowCopied[numberOfGroup] && this.isShowCopied[numberOfGroup][numberOfColor] ){
                    return this.isShowCopied[numberOfGroup][numberOfColor].isShow
                }

                return false
            },
            ShowCopied(numberOfGroup, numberOfColor){
                this.SetIsShowCopied(numberOfGroup, numberOfColor, true)
            },
            HideCopied(numberOfGroup, numberOfColor){
                this.SetIsShowCopied(numberOfGroup, numberOfColor, false)
            },
            SetIsShowCopied(numberOfGroup, numberOfColor, isShow){
                if( this.isShowCopied && this.isShowCopied[numberOfGroup] ){
                    this.isShowCopied[numberOfGroup][numberOfColor].isShow = isShow
                    this.isShowCopied = Object.assign([], this.isShowCopied, this.isShowCopied)
                }
            },
            DelayHideCopied(numberOfGroup, numberOfColor){
                if( this.isShowCopied[numberOfGroup][numberOfColor].timer ){
                    clearTimeout(this.isShowCopied[numberOfGroup][numberOfColor].timer)
                }

                let timer = setTimeout(() => {
                    this.HideCopied(numberOfGroup, numberOfColor)
                }, 1000);

                this.isShowCopied[numberOfGroup][numberOfColor].timer = timer
                this.isShowCopied = Object.assign([], this.isShowCopied, this.isShowCopied)
            },
            // ============================================================
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


<style lang="scss">
    .tooltip {
        display: block !important;
        z-index: 1;

        .tooltip-inner {
            background: black;
            color: white;
            border-radius: 16px;
            padding: 5px 10px 4px;
        }

        .tooltip-arrow {
            width: 0;
            height: 0;
            border-style: solid;
            position: absolute;
            margin: 5px;
            border-color: black;
            z-index: 1;
        }

        &[x-placement^="top"] {
            margin-bottom: 5px;

            .tooltip-arrow {
                border-width: 5px 5px 0 5px;
                border-left-color: transparent !important;
                border-right-color: transparent !important;
                border-bottom-color: transparent !important;
                bottom: -5px;
                left: calc(50% - 5px);
                margin-top: 0;
                margin-bottom: 0;
            }
        }

        &[x-placement^="bottom"] {
            margin-top: 5px;

            .tooltip-arrow {
                border-width: 0 5px 5px 5px;
                border-left-color: transparent !important;
                border-right-color: transparent !important;
                border-top-color: transparent !important;
                top: -5px;
                left: calc(50% - 5px);
                margin-top: 0;
                margin-bottom: 0;
            }
        }

        &[x-placement^="right"] {
            margin-left: 5px;

            .tooltip-arrow {
                border-width: 5px 5px 5px 0;
                border-left-color: transparent !important;
                border-top-color: transparent !important;
                border-bottom-color: transparent !important;
                left: -5px;
                top: calc(50% - 5px);
                margin-left: 0;
                margin-right: 0;
            }
        }

        &[x-placement^="left"] {
            margin-right: 5px;

            .tooltip-arrow {
                border-width: 5px 0 5px 5px;
                border-top-color: transparent !important;
                border-right-color: transparent !important;
                border-bottom-color: transparent !important;
                right: -5px;
                top: calc(50% - 5px);
                margin-left: 0;
                margin-right: 0;
            }
        }

        &[aria-hidden='true'] {
            visibility: hidden;
            opacity: 0;
            transition: opacity .15s, visibility .15s;
        }

        &[aria-hidden='false'] {
            visibility: visible;
            opacity: 1;
            transition: opacity .15s;
        }
    }
</style>

<style lang="scss" scoped>

    $border: 1px solid #dfe2e5;
    .ColorTable{
        display: flex;
        flex-direction: column;
        width: 80%;
        margin: 0 auto;
        margin-bottom: 16px;

        .row{
            width: 100%;
            height: 38px;
            line-height: 38px;
            display: flex;
            flex-direction: row;
        }

        .row.content:nth-child(2n+1) {
            background-color: #f6f8fa;
        }

        .title{
            display: block;
            text-align: center;
            border: $border;
            border-bottom: unset;
            font-weight: 600;
            color: #24292e;
        }

        .display-color{
            width: 70%;
            border: $border;

            &:hover{
                cursor: pointer;
            }
        }

        .color-name{
            width: 30%;
            border: $border;
            border-left: unset;
            text-align: center;

            &:hover{
                cursor: pointer;
            }
        }

        .color-picker{
            z-index: 2;
            $box-shadow: 0 0 2px rgba(0,0,0,.3), 0 4px 8px rgba(0,0,0,.3);
            box-shadow: $box-shadow;

            .color-picker-head{
                display: flex;
                flex-direction: row;
                box-shadow: $box-shadow;

                button{
                    flex: 1;
                    background: white;
                    box-sizing: border-box;
                    border: unset;

                    $border-button: 1px solid #e2e5ea;;
                    border-top: $border-button;
                    outline: none;

                    &:last-child{
                        border-left: $border-button;
                    }

                    &:hover{
                        background: whitesmoke;
                    }
                }
            }
        }
    }
</style>
