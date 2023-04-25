<template>
    <div class="container d-flex flex-column align-items-center text-center">
        <div class="display-6 mb-5">Opskrifter</div>
        <!-- ADMIN -->
        <button v-if="user.loggedIn" class="btn btn-warning m-3" data-bs-toggle="modal" data-bs-target="#addRecipeModal"
            @click="openAddRecipeModal()">Tilføj ny opskrift
        </button>
        <!-- add recipe modal -->
        <div class="modal fade modal-lg" id="addRecipeModal">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 v-if="!shouldUpdate" class="modal-title fs-5" id="addRecipeModal">Tilføj ny opskrift</h1>
                        <h1 v-else class="modal-title fs-5" id="addRecipeModal">Opdater opskrift</h1>
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
                            <input id="files" class="form-control" type="file" @change="getCurrentFileOnChange($event)">
                        </div>
                        <div class="d-flex flex-column">
                            <!-- preview recipe -->
                            <p>Forhåndsvisning:</p>
                            <div class="col-xl-5 col-lg-5 col-md-8 col-sm-8 col-12">
                                <RecipeCard :name="recipe.name || 'Navn'" :prepTime="recipe.prepTime || '0'"
                                    :ingredientsCount="recipe.ingredientsCount || '0'"
                                    :portions="recipe.portions || '0'"
                                    :courseOfAction="recipe.courseOfAction || '1... \n 2...'"
                                    :imgFile="this.previewImage?.url" alt="" :shouldOverflow="true"
                                    :hasLoaded="this.hasLoaded"></RecipeCard>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Luk</button>
                        <button v-if="!shouldUpdate" class="btn btn-warning" @click="addRecipe()">Tilføj</button>
                        <button v-else class="btn btn-warning" @click="updateRecipe()">Ændre</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- recipes -->
        <div class="row justify-content-center w-100" v-if="hasRecipes && this.hasLoaded">
            <template v-for="(recipe, index) in recipes" :key="index">
                <!-- recipes -->
                <div class="col-xl-4 col-lg-5 col-md-6 col-sm-8 col-12 mb-5">
                    <RecipeCard :name="recipe.name" :prepTime="recipe.prepTime"
                        :ingredientsCount="recipe.ingredientsCount" :portions="recipe.portions"
                        :courseOfAction="recipe.courseOfAction" :imgFile="recipe.imgFile?.url" alt=""
                        :shouldOverflow="false" :seeRecipeModal="'seeRecipeModal' + index" :id="recipe.id"
                        @deleteRecipe="deleteRecipe(recipe.id)" @updateRecipe="openUpdateRecipeModal(recipe.id)">
                    </RecipeCard>
                </div>
                <!-- see recipie modal -->
                <div class="modal fade modal-lg" :id="'seeRecipeModal' + index">
                    <div class="modal-dialog modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header flex-column">
                                <button type="button" class="btn-close align-items-end" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                                <h1 class="modal-title fs-3 mb-3" :id="'seeRecipeModal' + index">{{ recipe.name }}</h1>
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
                                        <p class="text-start ms-1 overflow-fix" style="white-space: pre-line;">
                                            {{ recipe.courseOfAction }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <div class="spinner-border" role="status" v-else-if="!this.hasLoaded">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div v-else>
            Ingen opskrifter tilføjet endnu
        </div>
    </div>
</template>
<script>
    import { mapStores } from 'pinia';
    import { authStore, storageStore, recipeStore } from '@/store';
    import RecipeCard from '@/components/RecipeCard.vue';
    import StoragePaths from '@/services/firebase/constans/StoragePaths';
    import {
        toastSuccess,
        toastError,
        toastWarning
    } from '../services/toasty.js'

    export default {
        name: "recipes-route",
        data() {
            return {
                previewImage: {},
                tempFileArr: [],
                shouldUpdate: false,
                hasLoaded: false,
                recipe: {
                    name: "",
                    prepTime: "",
                    ingredientsCount: 0,
                    ingredients: [],
                    portions: "",
                    courseOfAction: "",
                    imgFile: {},
                }
            }
        },

        components: {
            RecipeCard
        },

        computed: {
            ...mapStores(authStore, storageStore, recipeStore),

            user() {
                return this.authStore.user
            },

            recipes() {
                return this.recipeStore.recipes
            },

            hasRecipes() {
                return this.recipes.length > 0
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
                let {
                    imgFile
                } = this.recipe
                imgFile = this.previewImage
                try {
                    this.recipeStore.addRecipe({ ...this.recipe, imgFile })
                    toastSuccess('Opskrift tilføet')
                } catch (e) {
                    toastError('Der skete en fejl')
                }
            },

            deleteRecipe(docId) {
                try {
                    this.recipeStore.deleteRecipe({ docId })
                    toastWarning('Opskrift slettet')
                } catch (e) {
                    toastError('Der skete en fejl')
                }
            },

            updateRecipe() {
                const {
                    id
                } = this.recipe
                try {
                    this.recipeStore.updateRecipe({ docId: id, ...this.recipe })
                    this.clearInputFields()
                    toastSuccess('Opskrift opdateret')
                } catch (e) {
                    toastError('Der skete en fejl')
                }
            },

            addIngredients(e, index) {
                const ingredient = e.target.value
                this.recipe.ingredients[index] = ingredient
            },

            getCurrentFileOnChange(e) {
                this.previewImage = e.target.files
                // load image 
                this.hasLoaded = true
                this.storageStore.uploadImages({
                        storagePath: StoragePaths.RECIPE,
                        files: this.previewImage
                    })
                    .then(async () => {
                        console.log(this.previewImage)
                        const currFileURL = await this.storageStore.getImageURL({
                            storagePath: StoragePaths.RECIPE,
                            imageName: this.previewImage[0].name
                        })
                        this.tempFileArr.push(this.previewImage)
                        this.previewImage = currFileURL
                        // finish loading
                        this.hasLoaded = false
                    })

            },

            openAddRecipeModal() {
                this.shouldUpdate = false
                this.clearInputFields()
            },

            async openUpdateRecipeModal(docId) {
                this.shouldUpdate = true
                const currRecipe = await this.recipeStore.getRecipe({ docId })
                this.recipe =  { ...currRecipe, id: docId }
            },

            clearInputFields() {
                this.recipe = {
                    name: "",
                    prepTime: "",
                    ingredientsCount: 0,
                    ingredients: [],
                    portions: "",
                    courseOfAction: "",
                    imgFile: {}
                }
            },
        },

        created() {
            this.recipeStore.fetchRecipes().then(() => this.hasLoaded = true)
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