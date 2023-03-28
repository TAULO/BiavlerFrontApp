<template>
    <div class="card mb-3 w-75">
        <div class="row no-gutters">
            <div class="col-lg-4 d-flex align-items-center justify-content-center ">
                <img src="../assets/bee.png" alt="...">
            </div>
            <div class="col-lg-8">
                <div class="card-body d-flex flex-column align-items-center">
                    <h5 class="card-title">{{ name }}</h5>
                    <p class="card-text">{{ role }}</p>
                    <p class="card-text">{{ bio }}</p>
                    <p class="card-text mt-lg-5"><small class="text-muted">{{ email }}</small></p>
                </div>
            </div>
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
        height: 200px;
        width: auto;
        margin-bottom: 30px;
    }

    @media only screen and (max-width: 500px) {
        .card-title {
            font-size: medium;
        }

        .card {
            width: 100%!important;
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