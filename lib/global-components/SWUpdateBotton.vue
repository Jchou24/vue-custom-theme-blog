<template>
    <SWUpdatePopup>
        <div
            slot-scope="{ enabled, reload, message, buttonText }"
            class="my-sw-update-popup">
            {{ message }}<br>
            <button @click="reload">{{ buttonText }}</button>
        </div>
    </SWUpdatePopup>
</template>

<script>
import SWUpdatePopup from '@vuepress/plugin-pwa/lib/SWUpdatePopup.vue'

export default {
    name: "SWUpdateBotton",
    components: { SWUpdatePopup }
}
</script>

<style lang="scss">
    .sw-update-popup{
        border-color: $color-border-light !important;
        border-width: 5px !important;
        border-radius: 15px !important;

        button{
            border: none !important;
            border-radius: 10px !important;
            background-color: unset !important;
            box-shadow: inset 0px 0px 8px 1px $color-border-light !important;
            outline: none !important;
            &:active{
                outline: none !important;
            }
            &:focus{
                outline: none !important;
            }
        }
    }
</style>


