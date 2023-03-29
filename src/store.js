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
  uploadImages,
  deleteImage,
  deleteImages,
  newUploadImages
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
      context.commit('SET_EVENTS', await await fetchDocuments("calendar"))
    },

    async getEvent(context, {
      docId
    }) {
      return fetchSingleDocument("calendar", docId)
    },

    async fetchEvents(context) {
      context.commit('SET_EVENTS', await fetchDocuments("calendar"))
    },
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
    async getImagesUrl(context) {
      context.commit('SET_IMAGES', await getImagesUrl())
    },

    async uploadImages(context, {
      files
    }) {
      await uploadImages(files)
      context.commit('SET_IMAGES', await getImagesUrl())
    },

    async newUploadImages(context, { files }) {
     await newUploadImages("Recipes/", files)
     context.commit('SET_IMAGES', await getImagesUrl())
    },

    async deleteImage(context, {
      imageName
    }) {
      await deleteImage(imageName)
      context.commit('SET_IMAGES', await getImagesUrl())
    },

    async deleteImages(context, {
      images
    }) {
      await deleteImages(images)
      context.commit('SET_IMAGES', await getImagesUrl())
    }
  }
}

const store = createStore({
  modules: {
    authModule,
    eventsModule,
    storageModule
  }
})


export default store