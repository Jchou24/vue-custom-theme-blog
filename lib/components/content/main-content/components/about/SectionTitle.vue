<template>
    <div class="SectionTitle drop-shadow-1 text-shadow-1">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "SectionTitle",
        components:{
            
        },
    }
</script>

<style lang="scss" scoped>
    .SectionTitle{
        margin: 0 auto;
        position: relative;

        font-size: 36px;
        width: fit-content;

        padding-top: 5px;
        padding-bottom: 15px;
        padding-left: 40px;
        padding-right: 40px;

        background: rgba(90, 17, 17, 0.65);

        border-radius: 30px;
        box-shadow: 50px 0px 50px rgba(226, 226, 226, 0.4), -20px 0px 50px rgba(226, 226, 226, 0.4);

        @media (max-width: 1179px) { 
            margin-top: 50px;
        }

        @media (max-width: 619px){
            margin-top: 20px;
            font-size: 32px;
        }

        @media (max-width: $mediaquery-width-sm) { 
            font-size: 28px;
            padding-left: 15px;
            padding-right: 15px;
        }
    }
</style>
