<template>
    <div class="container">
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
        color: #252422;
        margin-bottom: 20px;
        position: relative;
        z-index: 1;
        background-color: #f3ac19;
        border-radius: 0px;
        box-shadow: 0 2px 2px rgba(204, 197, 185, 0.5);
        margin: 15px;
        width: 300px;
        height: 90%;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
    .card-custom.card-just-text {
        text-align: center;
        padding: 40px 15px;
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