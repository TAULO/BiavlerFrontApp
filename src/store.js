import {
  createStore
} from 'vuex'

import {
  auth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  searcEventQuery
} from './services/firebase/auth'

import {
  getEvents,
  addEvent,
  deleteEvent
} from './services/firebase/db'

import { getImagesUrl, uploadImages, deleteImage, deleteImages } from './services/firebase/storage';

const store = createStore({
  state: {
    user: {
      loggedIn: false,
      data: null
    },

    events: [{
      title: "",
      startDate: null,
      endDate: null,
      description: "",
      id: ""
    }],

    images: [{name: "", url: ""}]

  },
  getters: {
    user(state) {
      return state.user
    },

    events(state) {
      return state.events
    },

    images(state) {
      console.log(state.images)
      return state.images
    }
  },

  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },

    SET_USER(state, data) {
      state.user.data = data;
    },

    SET_EVENTS(state, data) {
      state.events = data
    },

    SET_IMAGES(state, data) {
      state.images = data
    }
  },

  actions: {
    async logIn(context, {
      email,
      password
    }) {
      try {
        const response = await signInWithEmailAndPassword(auth, email, password)
        if (response) {
          context.commit('SET_LOGGED_IN', true)
          context.commit('SET_USER', response.user)
          console.log("login succeeded")
        } else {
          throw new Error('Der skete en fejl ved login. Prøv igen')
        }
      } catch (e) {
        console.log(e)
        throw new Error('Der skete en fejl ved login. Kig efter korrekt e-mail eller password og prøv igen.')
      }
    },

    async logOut(context) {
      await signOut(auth)
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

    async fetchEvents(context) {
      context.commit('SET_EVENTS', await getEvents())
    },

    async searcEventQuery(context, {
      title
    }) {
      context.commit('SET_EVENTS', await searcEventQuery(title))
    },

    async getImagesUrl(context) {
      context.commit('SET_IMAGES', await getImagesUrl())
    },

    async uploadImages(context, { files }) {
      await uploadImages(files)
      context.commit('SET_IMAGES', await getImagesUrl())
    },

    async deleteImage(context, { imageName }) {
      await deleteImage(imageName)
      context.commit('SET_IMAGES', await getImagesUrl())
    },

    async deleteImages(context, { images }) {
      await deleteImages(images)
      context.commit('SET_IMAGES', await getImagesUrl())
    }
  },
})

export default store