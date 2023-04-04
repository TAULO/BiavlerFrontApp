<template>
    <div class="container d-flex flex-column align-items-center text-center">
        <div class="display-6 mb-5">Opskrifter</div>
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
                            <input type="text" class="form-control" aria-describedby="basic-addon1"
                                v-model="recipe.name">
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
                            <div class="col-5 justify-self-center">
                                <RecipeCard :name="recipe.name || 'Navn'" :prepTime="recipe.prepTime || '0'"
                                    :ingredients="recipe.ingredients || '0'" :portions="recipe.portions || '0'"
                                    :courseOfAction="recipe.courseOfAction || '1... \n 2...'"
                                    :imgFile="recipe.imgFile || 'https://zippypaws.com/app/uploads/2018/05/strawberry-waffles-1024x668.jpg'"
                                    alt="" :shouldOverflow="true"></RecipeCard>
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
        <!-- see recipie modal -->
        <div class="modal fade modal-lg" id="seeRecipeModal">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header flex-column">
                        <button type="button" class="btn-close align-items-end" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                        <h1 class="modal-title fs-5 mb-3" id="seeRecipeModal">Torskefad med rejer og skaldyrsdressing</h1>
                        <div class="d-flex">
                            <div>
                                <div class="d-flex justify-content-start ms-2">
                                    <i class="bi bi-clock mx-1"></i>
                                    <div>Tid i alt <b>20 min.</b></div>
                                </div>
                            </div>
                            <div>
                                <div class="d-flex justify-content-center ms-2">
                                    <i class="bi bi-book mx-1"></i>
                                    <div>Ingredienser <b>8</b></div>
                                </div>
                            </div>
                            <div>
                                <div class="d-flex justify-content-center ms-2">
                                    <i class="bi bi-person mx-1"></i>
                                    <div>Portioner <b>4 pers.</b></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-6">
                                <h5 class="text-start">
                                    Ingredienser
                                </h5>
                                <hr>
                                <div>
                                    500 g torskefilet
                                    7 dl vand
                                    1 løg, skåret i kvarte
                                    1 spsk æblecidereddike
                                    2 tsk salt
                                    2 laurbærblade
                                    sort peber, friskkværnet
                                </div>
                            </div>
                            <div class="col-6">
                                <h5 class="text-start">
                                    Fremgangsmåde
                                </h5>
                                <hr>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- recipes -->
        <!-- <div class="row justify-content-center">
            <div class="col-xl-4 col-lg-5 col-md-6 col-sm-8 col-12">
                <RecipeCard name="Example" prepTime="20" ingredients="8" portions="4-5" courseOfAction="1."
                    imgFile="https://zippypaws.com/app/uploads/2018/05/strawberry-waffles-1024x668.jpg" alt=""
                    :shouldOverflow="false"></RecipeCard>
            </div>
        </div> -->
        <div>Kommer snart...</div>
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
<style scoped>
    hr {
        border-top: 2px solid;
    }

    .modal-header {
        border: 0px;
    }
</style>