<template>
    <div class="FlipCircle flip"></div>
</template>

<script>
    export default {
        name: "FlipCircle",
    }
</script>

<style lang="scss" scoped>
    
    .FlipCircle{
        overflow: hidden;
        width: 500px;
        height: 500px;
        border-radius: 100%;
        background: rgba(220, 220, 220, 0.7);

        @media (max-width: $mediaquery-width-sm) { 
            width: 380px;
            height: 380px;
        }
    }

    .flip{
        -webkit-animation-name: spinner; 
        -webkit-animation-timing-function: linear; 
        -webkit-animation-iteration-count: infinite; 
        -webkit-animation-duration: 3s;
        animation-name: spinner; 
        animation-timing-function: linear; 
        animation-iteration-count: infinite; 
        animation-duration: 3s; 
        -webkit-transform-style: preserve-3d; 
        -moz-transform-style: preserve-3d; 
        -ms-transform-style: preserve-3d; 
        transform-style: preserve-3d;
    }

    /* WebKit and Opera browsers */ 
    @-webkit-keyframes spinner { 
        from{ 
            -webkit-transform: rotateY(0deg); 
        } 
        to{ 
        -webkit-transform: rotateY(-360deg); 
        } 
    }
    
    /* all other browsers */ 
    @keyframes spinner { 
        from { 
            -moz-transform: rotateY(0deg); 
            -ms-transform: rotateY(0deg); 
            transform: rotateY(0deg); 
        } 
        to{ 
            -moz-transform: rotateY(-360deg); 
            -ms-transform: rotateY(-360deg); 
            transform: rotateY(-360deg); 
        } 
    }

</style>
