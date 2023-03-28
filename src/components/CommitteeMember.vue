<template>
    <div class="card mb-3 text-center">
       <img class="card-img-top" :src="imgSrc" alt="">
       <div class="card-body">
            <h4 class="card-title">
                {{ name }}
            </h4>
            <div class="card-subtitle text-muted">
                {{ role }}
            </div>
            <hr>
            <p>{{ bio }}</p>
       </div>
       <div class="card-booter text-muted">
            {{ email }}
       </div>
    </div>
</template>
<script>
    export default {
        name: "committee-member-component",
        props: {
            image: String,
            name: String,
            role: String,
            bio: String,
            imgSrc: String,
            email: String
        }
    }
</script>

<style scoped>
    .card {
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        padding: 10px;
    }

    img {
        height: 150px;
        width: auto;
        margin-bottom: 30px;
    }

    @media only screen and (max-width: 500px) {
        .card-title {
            font-size: medium;
        }

        .card {
            /* width: 100%!important; */
            font-size: small;
        }
    }

    @media only screen and (max-width: 1100px) {
        img {
            height: 100px;
            width: auto;
            margin-bottom: 30px;
        }
    }

</style>