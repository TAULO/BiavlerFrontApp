import {
  createStore
} from 'vuex'

import {
  auth,
  onAuthStateChanged,
  logIn,
  logOut
} from './services/firebase/auth'

import {
  addDocument,
  deleteDocument,
  updateDocument,
  fetchSingleDocument,
  fetchDocuments
} from './services/firebase/db'

import {
  getImagesUrl,
  getImageURL,
  deleteImage,
  deleteImages,
  uploadImages,
} from './services/firebase/storage';

const authModule = {
  state: {
    user: {
      loggedIn: false,
      data: null
    },
  },
  getters: {
    user(state) {
      return state.user
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },

    SET_USER(state, data) {
      state.user.data = data;
    },
  },
  actions: {
    async logIn(context, {
      email,
      password
    }) {
      const response = await logIn(email, password)
      if (response) {
        context.commit('SET_LOGGED_IN', true)
        context.commit('SET_USER', response.user)
        console.log("login succeeded")
      } else {
        throw new Error('Der skete en fejl ved login. Prøv igen')
      }
    },

    async logOut(context) {
      await logOut(auth)
      context.commit('SET_LOGGED_IN', false)
      context.commit('SET_USER', null)
      console.log("user logged out")
    },

    authChanged(context) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          context.commit('SET_LOGGED_IN', true)
          context.commit('SET_USER', user)
        } else {
          context.commit('SET_LOGGED_IN', false)
          context.commit('SET_USER', user)
        }
      })
    },
  }
}

const eventsModule = {
  state: {
    events: [{
      title: "",
      startDate: null,
      description: "",
      id: ""
    }],
  },
  getters: {
    events(state) {
      return state.events
    },
  },
  mutations: {
    SET_EVENTS(state, data) {
      state.events = data
    },
  },
  actions: {
    async addEvent(context, data) {
    addDocument("calendar", data)
    context.commit('SET_EVENTS', await fetchDocuments("calendar"))
    },

    async deleteEvent(context, docId) {
      deleteDocument("calendar", docId)
      context.commit('SET_EVENTS', await fetchDocuments("calendar"))
    },

    async updateEvent(context, data) {
      const { docId } = data
      const { title, startDate, description } = data 
      updateDocument("calendar", docId, { title, startDate, description })
      context.commit('SET_EVENTS', await fetchDocuments("calendar"))
    },

    async getEvent(context, { docId }) {
      return fetchSingleDocument("calendar", docId)
    },

    async fetchEvents(context) {
      context.commit('SET_EVENTS', await fetchDocuments("calendar"))
    },
  }
}

const committeeModule = {
  state: {
    committeeMembers: [{
      name: "",
      role: "",
      bio: "",
      email: "",
      image: {},
      id: ""
    }]
  },

  getters: {
    committeeMembers(state) {
      return state.committeeMembers
    }
  },

  mutations: {
    SET_COMMITTEE_MEMBERS(state, data) {
      state.committeeMembers = data
    }
  },

  actions: {
    async addCommitteeMember(context, data) {
      await addDocument("CommitteeMember", data)
      context.commit("SET_COMMITTEE_MEMBERS", await fetchDocuments("CommitteeMember"))
    },

    async deleteCommitteeMember(context, { docId, imageName }) {
      await deleteDocument("CommitteeMember", { docId })
      context.dispatch('deleteImage', { storagePath: 'CommitteeMembers/', imageName })
      context.commit("SET_COMMITTEE_MEMBERS", await fetchDocuments("CommitteeMember"))
    },

    async updateCommitteeMember(context, data) {
      const { docId } = data 
      const { name, role, bio, email, image } = data 
      await updateDocument('CommitteeMember', docId, { name, role, bio, email, image })
      context.commit('SET_COMMITTEE_MEMBERS', await fetchDocuments('CommitteeMember'))
    },

    async getCommiteeMember(context, { docId }) {
      return await fetchSingleDocument("CommitteeMember", docId)
    },

    async fetchCommitteeMembers(context) {
      context.commit('SET_COMMITTEE_MEMBERS', await fetchDocuments('CommitteeMember'))
    }
  }
}

const recipesModule = {
  recipes: {
    recipes: [{
      name: "",
      prepTime: "",
      ingredients: "",
      portions: "",
      courseOfAction: "",
      image: { }
   }]
  },

  getters: {
    recipes(state) {
      return state.recipes
    }
  },

  mutations: {
    SET_RECIPES(state, data) {
      state.recipes = data
    }
  },

  actions: {
    async addRecipe(context, data) {
      await addDocument("Recipe", data)
      context.commit("SET_RECIPES", await fetchDocuments("Recipe"))
    },

    async deleteRecipe(context, docId, imageName) {
      await deleteDocument("Recipe", docId)
      context.commit("SET_RECIPES", await fetchDocuments("Recipe"))
      context.dispatch('deleteImage', {storagePath: 'Recipe/', imageName })
    },

    async updateRecipe(context, data) {
      console.log(data)
      const { docId } = data 
      const { name, role, bio, email, image } = data 
      await updateDocument('Recipe', docId, { name, role, bio, email, image })
      context.commit("SET_RECIPES", await fetchDocuments("Recipe"))
    },

    async getRecipe(context, { docId }) {
      return await fetchSingleDocument("Recipe", docId)
    },

    async fetchRecipes(context) {
      context.commit("SET_RECIPES", await fetchDocuments("Recipe"))
    }
  }
}

const storageModule = {
  state: {
    images: [{
      name: "",
      url: ""
    }]
  },

  getters: {
    images(state) {
      return state.images
    }
  },

  mutations: {
    SET_IMAGES(state, data) {
      state.images = data
    }
  },

  actions: {
    async getImagesUrl(context, storagePath) {
      context.commit('SET_IMAGES', await getImagesUrl(storagePath))
    },

    async getImageURL(context, { storagePath, imageName }) {
      return await getImageURL({ storagePath, imageName })
    },

    async uploadImages(context, { storagePath, files }) {
      if (storagePath && files) {
        await uploadImages(storagePath, files)
        context.commit('SET_IMAGES', await getImagesUrl({ storagePath }))
      } else {
        throw "err in upload images"
      }
    },

    async deleteImage(context, { storagePath, imageName }) {
      await deleteImage(storagePath, imageName)
      context.commit('SET_IMAGES', await getImagesUrl({ storagePath }))
    },

    async deleteImages(context, { storagePath, images }) {
      await deleteImages(storagePath, images)
      context.commit('SET_IMAGES', await getImagesUrl({ storagePath }))
    }
  }
}

const store = createStore({
  modules: {
    authModule,
    eventsModule,
    committeeModule,
    storageModule,
    recipesModule
  }
})


export default store