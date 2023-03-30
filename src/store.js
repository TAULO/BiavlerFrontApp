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
    async getImagesUrl(context, storagePath) {
      context.commit('SET_IMAGES', await getImagesUrl(storagePath))
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
      if (storagePath && imageName) {
          await deleteImage(storagePath, imageName)
          context.commit('SET_IMAGES', await getImagesUrl({ storagePath }))
      } else {
        throw 'err in delete image'
      }
    },

    async deleteImages(context, { storagePath, images }) {
      if (storagePath && images) {
        await deleteImages(storagePath, images)
        context.commit('SET_IMAGES', await getImagesUrl({ storagePath }))
      } else {
        throw 'err in delete multiple images'
      }
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