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
                            <input class="form-control" aria-describedby="basic-addon1"
                                v-model="recipe.ingredientsCount" type="number" placeholder="max 15">
                        </div>
                        <hr>
                        <div class="input-group mb-3" v-for="(count, index) in numberOfIngredients" :key="index">
                            <span class="input-group-text" style="min-width: 21%" id="basic-addon1">Ingrediens:
                                ({{ count }})</span>
                            <input class="form-control" aria-describedby="basic-addon1" style="max-width: 35%;"
                                @input="addIngredients($event, index)">
                        </div>
                        <hr>
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
                                    :ingredientsCount="recipe.ingredientsCount || '0'"
                                    :portions="recipe.portions || '0'"
                                    :courseOfAction="recipe.courseOfAction || '1... \n 2...'"
                                    :imgFile="recipe.imgFile || 'https://zippypaws.com/app/uploads/2018/05/strawberry-waffles-1024x668.jpg'"
                                    alt="" :shouldOverflow="true"></RecipeCard>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Luk</button>
                        <button class="btn btn-warning" @click="addRecipe()">Tilføj</button>
                        <!-- <button class="btn btn-warning">Ændre</button> -->
                    </div>
                </div>
            </div>
        </div>

        <!-- recipes -->
        <div class="row justify-content-center">
            <template v-for="(recipe, index) in recipes" :key="index">
                <div class="col-xl-4 col-lg-5 col-md-6 col-sm-8 col-12 mb-5">
                    <!-- recipe -->
                    <RecipeCard :name="recipe.name" :prepTime="recipe.prepTime"
                        :ingredientsCount="recipe.ingredientsCount" :portions="recipe.portions"
                        :courseOfAction="recipe.courseOfAction"
                        imgFile="https://zippypaws.com/app/uploads/2018/05/strawberry-waffles-1024x668.jpg" alt=""
                        :shouldOverflow="false" :seeRecipeModal="'seeRecipeModal' + index" :id="recipe.id" @deleteRecipe="deleteRecipe(recipe.id)"></RecipeCard>
                    <!-- see recipie modal -->
                    <div class="modal fade modal-lg" :id="'seeRecipeModal' + index" >
                        <div class="modal-dialog modal-dialog-scrollable">
                            <div class="modal-content">
                                <div class="modal-header flex-column">
                                    <button type="button" class="btn-close align-items-end" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                    <h1 class="modal-title fs-5 mb-3" :id="'seeRecipeModal' + index">{{ recipe.name }}</h1>
                                    <div class="d-flex">
                                        <div>
                                            <div class="d-flex justify-content-start ms-4">
                                                <i class="bi bi-clock mx-1"></i>
                                                <div>Tid i alt <b>{{ recipe.prepTime }} min.</b></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="d-flex justify-content-center ms-4">
                                                <i class="bi bi-book mx-1"></i>
                                                <div>Ingredienser <b>{{ recipe.ingredientsCount }}</b></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="d-flex justify-content-center ms-4">
                                                <i class="bi bi-person mx-1"></i>
                                                <div>Portioner <b>{{ recipe.portions }} pers.</b></div>
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
                                            <template v-for="(ingredient, index) in recipe.ingredients" :key="index">
                                                <p class="text-start ms-1">
                                                    {{ ingredient }}
                                                </p>
                                            </template>
                                        </div>
                                        <div class="col-6">
                                            <h5 class="text-start">
                                                Fremgangsmåde
                                            </h5>
                                            <hr>
                                            <p class="text-start ms-1">
                                                {{ recipe.courseOfAction }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <!-- <div>Kommer snart...</div> -->
    </div>
</template>
<script>
    import RecipeCard from '@/components/RecipeCard.vue';

    export default {
        name: "recipes-route",
        data() {
            return {
                hasLoaded: false,
                recipe: {
                    name: "",
                    prepTime: "",
                    ingredientsCount: 0,
                    ingredients: [],
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

            recipes() {
                console.log(this.$store.getters.recipes)
                return this.$store.getters.recipes
            },

            numberOfIngredients() {
                const n = parseInt(this.recipe.ingredientsCount)
                const maxIngredients = 15

                if (!isNaN(n)) {
                    if (n > maxIngredients) {
                        return maxIngredients
                    } else {
                        return n
                    }
                } else {
                    return 0
                }
            }
        },

        methods: {
            addRecipe() {
                this.$store.dispatch('addRecipe', this.recipe)
            },

            deleteRecipe(docId) {
                console.log(docId)
                this.$store.dispatch('deleteRecipe', { docId })
            },

            addIngredients(e, index) {
                const ingredient = e.target.value
                this.recipe.ingredients[index] = ingredient
            }
        },

        created() {
            this.$store.dispatch('fetchRecipes')
                .then(() => {
                    this.hasLoaded = true
                })
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