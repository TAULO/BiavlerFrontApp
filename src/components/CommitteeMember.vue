<template>
    <div class="team-boxed">
            <div class="row people">
                <div class="card col-md-6 col-lg-4 item">
                    <div class="box">
                        <img class="rounded-circle" src="../assets/2.jpg">
                        <h3 class="name">Ben Johnson</h3>
                        <p class="title">Musician</p>
                        <p class="description">Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus.
                            Praesent aliquam in tellus eu gravida. Aliquam varius finibus est, et interdum justo
                            suscipit id. Etiam dictum feugiat tellus, a semper massa. </p>
                        <div class="social"><a href="#"><i class="fa fa-facebook-official"></i></a><a href="#"><i
                                    class="fa fa-twitter"></i></a><a href="#"><i class="fa fa-instagram"></i></a></div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
    export default {
        name: "committee-member-component"
    }
</script>

<style scoped>
    .team-boxed {
        color: #313437;
    }

    .team-boxed p {
        color: #7d8285;
    }

    .team-boxed h2 {
        font-weight: bold;
        margin-bottom: 40px;
        padding-top: 40px;
        color: inherit;
    }

    @media (max-width:767px) {
        .team-boxed h2 {
            margin-bottom: 25px;
            padding-top: 25px;
            font-size: 24px;
        }
    }

    .team-boxed .intro {
        font-size: 16px;
        max-width: 500px;
        margin: 0 auto;
    }

    .team-boxed .intro p {
        margin-bottom: 0;
    }

    .team-boxed .item {
        text-align: center;
        padding: 30px;
    }

    .team-boxed .item .box {
        text-align: center;
    }

    img {
        height: 200px;
        margin-bottom: 30px;
    }
</style>