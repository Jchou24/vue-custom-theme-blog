<template>    
    <div class="quarter-oval">
        <div class="quarter-oval-transform"></div>
    </div>
</template>

<script>

    export default {
        name: "QuarterOval",
    }
</script>

<style lang="scss" scoped>
    // ==========================================================================================
    // quarter-oval

    .quarter-oval{
        position: absolute;
        
        left: 0px;
        bottom: 0px;
    }

    .quarter-oval-transform{
        opacity: 0.3;
        height: 880px;
        width: 60vw;

        @media (max-width: $mediaquery-width-l) { 
            height: 0px;
        }

        background-image: radial-gradient(ellipse at bottom left, whitesmoke 60%, transparent 70%);
    }
    // ==========================================================================================
</style>
