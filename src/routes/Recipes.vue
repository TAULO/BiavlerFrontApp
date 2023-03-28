<template>
    <div class="container d-flex flex-column align-items-center text-center">
        <div class="display-6 mb-5">Opskrifter (under udvikling)</div>
        <!-- ADMIN -->
        <button v-if="user.loggedIn" class="btn btn-warning m-3" data-bs-toggle="modal"
            data-bs-target="#addRecipeModal">Tilføj ny opskrift
        </button>
        <!-- modal -->
        <div class="modal fade modal-lg" id="addRecipeModal">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="addRecipeModal">Tilføj ny opskrift</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <span class="input-group-text" style="min-width: 21%" id="basic-addon1">Navn</span>
                            <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="recipe.name">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" style="min-width: 21%" id="basic-addon1">Arbejdstid
                                (min.)</span>
                            <input class="form-control" aria-describedby="basic-addon1" v-model="recipe.prepTime">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" style="min-width: 21%" id="basic-addon1">Antal
                                ingredienser</span>
                            <input class="form-control" aria-describedby="basic-addon1" v-model="recipe.ingredients">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" style="min-width: 21%" id="basic-addon1">Antal
                                portioner</span>
                            <input class="form-control" aria-describedby="basic-addon1" v-model="recipe.portions">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" style="min-width: 21%">Fremgangsmåde</span>
                            <textarea class="form-control" v-model="recipe.courseOfAction"></textarea>
                        </div>
                        <div class="input-group mb-3">
                            <!-- <label class="input-group-text btn btn-secondary border-1" for="files">vælg billede</label> -->
                            <input id="files" type="file">
                        </div>
                        <div class="d-flex flex-column">
                            <p>Forhåndsvisning:</p>
                            <div class="col-6 justify-self-center">
                                <RecipeCard :name="recipe.name || 'Navn'" :prepTime="recipe.prepTime || '0'" :ingredients="recipe.ingredients || '0'" :portions="recipe.portions || '0'" :courseOfAction="recipe.courseOfAction || '1... \n 2... \n 3...'" :imgFile="recipe.imgFile || 'https://zippypaws.com/app/uploads/2018/05/strawberry-waffles-1024x668.jpg'" alt=""></RecipeCard>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Luk</button>
                        <button class="btn btn-warning">Tilføj</button>
                        <!-- <button class="btn btn-warning">Ændre</button> -->
                    </div>
                </div>
            </div>
        </div>
        <!-- recipes -->
        <div class="row justify-content-center">
            <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                <RecipeCard name="Example" prepTime="20" ingredients="8" portions="4-5" courseOfAction="bla bla bla..." imgFile="https://zippypaws.com/app/uploads/2018/05/strawberry-waffles-1024x668.jpg" alt=""></RecipeCard>
            </div>
        </div>
    </div>
</template>
<script>
    import RecipeCard from '@/components/RecipeCard.vue';

    export default {
        name: "recipes-route",
        data() {
            return {
                recipe: {
                    name: "",
                    prepTime: "",
                    ingredients: "",
                    portions: "",
                    courseOfAction: "",
                    imgFile: ""
                }
            }
        },

        components: {
            RecipeCard
        },

        computed: {
            user() {
                return this.$store.getters.user
            },
        }
    }
</script>
<style>

</style>