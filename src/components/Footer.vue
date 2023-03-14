<template>
    <footer class="container-fluid">
        <img src="../assets/flyingBee.png" alt="">
    </footer>
</template>

<script>
    export default {
        name: "footer-component"
    }

</script>

<style scoped>
    footer {
        width: 100%;
        height: 100px;
        position: fixed;
    }
    img {
        height: 100px;
        margin-left: 10px;
        transform: rotate(60deg) rotateY(180deg) translate(45px, 15px);
        width: auto;
    }

    @media only screen and (max-width: 767px) {
        img {
            height: 50px;
            width: auto;
            transform: rotate(60deg) rotateY(180deg) translate(20px, 30px);
        }
    }
</style>