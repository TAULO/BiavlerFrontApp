<template>
    <div class="card">
        <!-- ADMIN -->
        <div class="d-flex justify-content-end" v-if="user.loggedIn">
            <i class="bi bi-arrow-clockwise position-absolute" style="margin-right: 15%; margin-top: 5%;" @click="$emit('updateRecipe')"
                data-bs-toggle="modal" data-bs-target="#addRecipeModal"></i>
            <i class="bi bi-trash-fill position-absolute" style="margin-right: 5%; margin-top: 5%;"
                @click="$emit('deleteRecipe')"></i>
        </div>
        <div v-if="hasLoaded" class="d-flex justify-content-center mt-5">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <img v-else class="card-img-top" :src="imgFile" :alt="alt">
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
                    <div class="d-flex justify-content-center ms-1">
                        <i class="bi bi-book mx-1"></i>
                        <div>{{ ingredientsCount }}</div>
                    </div>
                    <div>Ingredienser</div>
                </div>
                <div>
                    <div class="d-flex justify-content-end me-1">
                        <i class="bi bi-person mx-1"></i>
                        <div>{{ portions }}</div>
                    </div>
                    <div>Portioner</div>
                </div>
            </div>
            <p v-if="!shouldOverflow" class="card-text my-4 overflow-fix"
                style="white-space: pre-line; text-overflow: ellipsis;">
                {{ courseOfAction }}
            </p>
            <p v-else class="card-text my-4" style="white-space: pre-line; text-overflow: ellipsis;">
                {{ courseOfAction }}
            </p>
            <div class="btn btn-warning w-50" data-bs-toggle="modal" :data-bs-target="'#' + seeRecipeModal">
                Se opskrift
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "recipe-card-component",

        props: {
            hasLoaded: Boolean,
            name: String,
            prepTime: String,
            ingredientsCount: Number,
            ingredients: Array,
            portions: String,
            courseOfAction: String,
            imgFile: String,
            alt: String,
            shouldOverflow: Boolean,
            seeRecipeModal: String,
            id: String
        },

        computed: {
            user() {
                return this.$store.getters.user
            },
        },
    }
</script>
<style scoped>
    .overflow-fix {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-height: X;
        max-height: X*N;
    }

    i:hover {
        opacity: 0.5;
        cursor: pointer;
    }
</style>