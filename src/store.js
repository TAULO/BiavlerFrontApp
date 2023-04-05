import {
  createStore
} from 'vuex'

import Collections from './services/firebase/constans/Collections';

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

import { filter } from '@/services/uFuzzy'

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
    addDocument(Collections.CALENDAR, data)
    context.commit('SET_EVENTS', await fetchDocuments(Collections.CALENDAR))
    },

    async deleteEvent(context, docId) {
      deleteDocument(Collections.CALENDAR, docId)
      context.commit('SET_EVENTS', await fetchDocuments(Collections.CALENDAR))
    },

    async updateEvent(context, data) {
      const { docId } = data
      const { title, startDate, description } = data 
      updateDocument(Collections.CALENDAR, docId, { title, startDate, description })
      context.commit('SET_EVENTS', await fetchDocuments(Collections.CALENDAR))
    },

    async getEvent(context, { docId }) {
      return fetchSingleDocument(Collections.CALENDAR, docId)
    },

    async fetchEvents(context) {
      context.commit('SET_EVENTS', await fetchDocuments(Collections.CALENDAR))
    },

    async searchForEvents(context, { searchKeyword, needle }) {
      const haystack = await fetchDocuments(Collections.CALENDAR)
      const filteredEvents = filter(haystack, searchKeyword, needle)
      context.commit('SET_EVENTS', await filteredEvents)
    }
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
      await addDocument(Collections.COMMITEEMEMBER, data)
      context.commit("SET_COMMITTEE_MEMBERS", await fetchDocuments(Collections.COMMITEEMEMBER))
    },

    async deleteCommitteeMember(context, { docId, imageName }) {
      await deleteDocument(Collections.COMMITEEMEMBER, { docId })
      context.dispatch('deleteImage', { storagePath: 'CommitteeMembers/', imageName })
      context.commit("SET_COMMITTEE_MEMBERS", await fetchDocuments(Collections.COMMITEEMEMBER))
    },

    async updateCommitteeMember(context, data) {
      const { docId } = data 
      const { name, role, bio, email, image } = data 
      await updateDocument(Collections.COMMITEEMEMBER, docId, { name, role, bio, email, image })
      context.commit('SET_COMMITTEE_MEMBERS', await fetchDocuments(Collections.COMMITEEMEMBER))
    },

    async getCommiteeMember(context, { docId }) {
      return await fetchSingleDocument(Collections.COMMITEEMEMBER, docId)
    },

    async fetchCommitteeMembers(context) {
      context.commit('SET_COMMITTEE_MEMBERS', await fetchDocuments(Collections.COMMITEEMEMBER))
    }
  }
}

const recipesModule = {
  state: {
    recipes: [{
      name: "",
      prepTime: "",
      ingredientsCount: 0,
      ingredients: [],
      portions: "",
      courseOfAction: "",
      image: {},
      id: ""
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
      await addDocument(Collections.RECIPE, data)
      context.commit("SET_RECIPES", await fetchDocuments(Collections.RECIPE))
    },

    async deleteRecipe(context, docId) {
      await deleteDocument(Collections.RECIPE, docId)
      context.commit("SET_RECIPES", await fetchDocuments(Collections.RECIPE))
      // context.dispatch('deleteImage', {storagePath: 'Recipe/', imageName })
    },

    async updateRecipe(context, data) {
      const { docId } = data 
      const { name, role, bio, email, image } = data 
      await updateDocument(Collections.RECIPE, docId, { name, role, bio, email, image })
      context.commit("SET_RECIPES", await fetchDocuments(Collections.RECIPE))
    },

    async getRecipe(context, { docId }) {
      return await fetchSingleDocument(Collections.RECIPE, docId)
    },

    async fetchRecipes(context) {
      context.commit("SET_RECIPES", await fetchDocuments(Collections.RECIPE))
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
        await uploadImages(storagePath, files)
        context.commit('SET_IMAGES', await getImagesUrl({ storagePath }))
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