<template>
    <div class="ViewSection" :class="cls" >
        <slot></slot>
    </div>
</template>

<script>
    import { check_is_mobile } from '@theme/js/utility.js'

    export default {
        name: "ViewSection",
        computed:{
            cls:{
                get(){
                    return {
                        mobile: this.is_mobile()
                    }
                }
            },
        },
        methods:{
            is_mobile(){
                return check_is_mobile()
            },
        },
    }
</script>

<style lang="scss" scoped>
    .ViewSection{
        width: 100vw;
        min-height: 102vh;
        padding-top: 70px;
        padding-bottom: 70px;
        position: relative;
        display: flex;
        justify-content: center;

        font-size: 26px;
        text-align: center;

        height: 900px;

        // ======================================================
        // TMP Parameters
        background: black;
        color: white;
        // ======================================================
    }
</style>
