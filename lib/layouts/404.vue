<template>
    <div class="not-found">
        <h1>Sorry, page not found!</h1>

        <h3>
            <router-link to="/">
                Back to home
            </router-link>
        </h3>

        <h3>
            <a href="#" @click.prevent="$router.go(-1)">Back to previous page</a>
        </h3>
    </div>
</template>

<script>
    export default {
        name: "NotFound"
    }
</script>

<style lang="scss" scoped>

    div.not-found{   
        background: #ffffff94;
        border-radius: 15px;
        margin: auto;
        text-align: center;

        h1{
            margin-bottom: 20px;
        }

        a{
            cursor: pointer;
        }

        @media (max-width: $mediaquery-width-sm) { 
            padding: 20px;
            padding-left: 0px;
            padding-right: 0px;
            height: 185px;
            margin-top: 100px;
            margin-left: 5px;
            margin-right: 5px;

            h1{
                font-size: 32px;
            }

            h3{
                font-size: 24px;
            }
        }

        @media (min-width: $mediaquery-width-sm) { 
            padding: 20px;
            width: 500px;
            height: 200px;
            margin-top: 100px;
        }
    }

</style>
