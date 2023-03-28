import {
  createStore
} from 'vuex'

import {
  auth,
  onAuthStateChanged,
  searcEventQuery,
  logIn,
  logOut
} from './services/firebase/auth'

import {
  getEvents,
  getEvent,
  addEvent,
  deleteEvent,
  updateEvent
} from './services/firebase/db'

import {
  getImagesUrl,
  uploadImages,
  deleteImage,
  deleteImages
} from './services/firebase/storage';

// const store = createStore({
  // state: {
  //   user: {
  //     loggedIn: false,
  //     data: null
  //   },

  //   events: [{
  //     title: "",
  //     startDate: null,
  //     endDate: null,
  //     description: "",
  //     id: ""
  //   }],

  //   images: [{
  //     name: "",
  //     url: ""
  //   }]

  // },
  // getters: {
  //   user(state) {
  //     return state.user
  //   },

  //   events(state) {
  //     return state.events
  //   },

  //   images(state) {
  //     return state.images
  //   }
  // },

  // mutations: {
  //   SET_LOGGED_IN(state, value) {
  //     state.user.loggedIn = value;
  //   },

  //   SET_USER(state, data) {
  //     state.user.data = data;
  //   },

  //   SET_EVENTS(state, data) {
  //     state.events = data
  //   },

  //   SET_IMAGES(state, data) {
  //     state.images = data
  //   }
  // },

  // actions: {
  //   async logIn(context, {
  //     email,
  //     password
  //   }) {
  //     const response = await logIn(email, password)
  //     if (response) {
  //       context.commit('SET_LOGGED_IN', true)
  //       context.commit('SET_USER', response.user)
  //       console.log("login succeeded")
  //     } else {
  //       throw new Error('Der skete en fejl ved login. Prøv igen')
  //     }
  //   },

  //   async logOut(context) {
  //     await logOut(auth)
  //     context.commit('SET_LOGGED_IN', false)
  //     context.commit('SET_USER', null)
  //     console.log("user logged out")
  //   },

  //   authChanged(context) {
  //     onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         context.commit('SET_LOGGED_IN', true)
  //         context.commit('SET_USER', user)
  //       } else {
  //         context.commit('SET_LOGGED_IN', false)
  //         context.commit('SET_USER', user)
  //       }
  //     })
  //   },

  //   async addEvent(context, {
  //     title,
  //     startDate,
  //     endDate,
  //     description
  //   }) {
  //     addEvent(title, startDate, endDate, description)
  //     context.commit('SET_EVENTS', await getEvents())
  //   },

  //   async deleteEvent(context, {
  //     docId
  //   }) {
  //     deleteEvent(docId)
  //     context.commit('SET_EVENTS', await getEvents())
  //   },

  //   async updateEvent(context, {
  //     docId,
  //     title,
  //     startDate,
  //     endDate,
  //     description
  //   }) {
  //     updateEvent(docId, title, startDate, endDate, description)
  //     context.commit('SET_EVENTS', await getEvents())
  //   },

  //   async getEvent(context, {
  //     docId
  //   }) {
  //     return getEvent(docId)
  //   },

  //   async fetchEvents(context) {
  //     context.commit('SET_EVENTS', await getEvents())
  //   },

  //   async searcEventQuery(context, {
  //     title
  //   }) {
  //     context.commit('SET_EVENTS', await searcEventQuery(title))
  //   },

  //   async getImagesUrl(context) {
  //     context.commit('SET_IMAGES', await getImagesUrl())
  //   },

  //   async uploadImages(context, {
  //     files
  //   }) {
  //     await uploadImages(files)
  //     context.commit('SET_IMAGES', await getImagesUrl())
  //   },

  //   async deleteImage(context, {
  //     imageName
  //   }) {
  //     await deleteImage(imageName)
  //     context.commit('SET_IMAGES', await getImagesUrl())
  //   },

  //   async deleteImages(context, {
  //     images
  //   }) {
  //     await deleteImages(images)
  //     context.commit('SET_IMAGES', await getImagesUrl())
  //   }
  // },
// })

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
      endDate: null,
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
    async addEvent(context, {
      title,
      startDate,
      endDate,
      description
    }) {
      addEvent(title, startDate, endDate, description)
      context.commit('SET_EVENTS', await getEvents())
    },

    async deleteEvent(context, {
      docId
    }) {
      deleteEvent(docId)
      context.commit('SET_EVENTS', await getEvents())
    },

    async updateEvent(context, {
      docId,
      title,
      startDate,
      endDate,
      description
    }) {
      updateEvent(docId, title, startDate, endDate, description)
      context.commit('SET_EVENTS', await getEvents())
    },

    async getEvent(context, {
      docId
    }) {
      return getEvent(docId)
    },

    async fetchEvents(context) {
      context.commit('SET_EVENTS', await getEvents())
    },

    async searcEventQuery(context, {
      title
    }) {
      context.commit('SET_EVENTS', await searcEventQuery(title))
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