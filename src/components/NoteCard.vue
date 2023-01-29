<template>
    <div class="card-custom-big-shadow">
        <div class="card-custom card-just-text">
            <div class="content">
                <h6 class="content-category">{{ category }}</h6>
                <h4 class="content-title">{{ title }}</h4>
                <div class="content-description"><span v-html="description"></span></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "note-card-comp",
        props: {
            category: String,
            title: String,
            description: String
        }
    }
</script>

<style scoped>
    .card-custom {
        border-radius: 8px;
        background-color: #FFFFFF;
        color: #252422;
        margin-bottom: 20px;
        position: relative;
        z-index: 1;
        background-color: #ff8f5e;
        border-radius: 0px;
        box-shadow: 0 2px 2px rgba(204, 197, 185, 0.5);
        margin: 15px;
        width: 300px;
        height: 90%;
    }
    .card-custom.card-just-text {
        text-align: center;
        padding: 40px 15px;
    }
    .card-custom-big-shadow {
        max-width: 320px;
        position: relative;
    }
    .card-custom-big-shadow:before {
        background-image: url("http://static.tumblr.com/i21wc39/coTmrkw40/shadow.png");
        background-position: center bottom;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        bottom: -12%;
        content: "";
        display: block;
        left: -12%;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 0;
    }
    .content-title {
        color: white;
    }
    .content-category {
        color: #e95e37;
        font-weight: 600;
        text-transform: uppercase;
    }
    .content-description {
       color: #772510
    }
</style>