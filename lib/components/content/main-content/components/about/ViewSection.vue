<template>
    <div class="ViewSection">
        <slot></slot>
    </div>
</template>

<script>

    export default {
        name: "ViewSection",
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
