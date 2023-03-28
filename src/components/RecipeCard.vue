<template>
    <div class="card">
        <img class="card-img-top" :src="imgFile"
            :alt="alt">
        <div class="card-body">
            <h4 class="card-title text-start">
                {{ name }}
            </h4>
            <hr>
            <div class="d-flex flex-row justify-content-between">
                <div>
                    <div class="d-flex justify-content-start">
                        <i class="bi bi-clock mx-1"></i>
                        <div>{{ prepTime }}</div>
                    </div>
                    <div>Minutter</div>
                </div>
                <div>
                    <div class="d-flex justify-content-start">
                        <i class="bi bi-book mx-1"></i>
                        <div>{{ ingredients }}</div>
                    </div>
                    <div>Ingredienser</div>
                </div>
                <div>
                    <div class="d-flex justify-content-start">
                        <i class="bi bi-person mx-1"></i>
                        <div>{{ portions }}</div>
                    </div>
                    <div>Portioner</div>
                </div>
            </div>
            <p class="card-text m-4">
                {{ courseOfAction }}
            </p>
            <div class="btn btn-warning w-50">
                Se opskrift
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "recipe-card-component",
        props: {
            name: String,
            prepTime: String,
            ingredients: String,
            portions: String,
            courseOfAction: String,
            imgFile: String,
            alt: String
        }
    }
</script>
<style>

</style>