import { createStore } from 'vuex'
import { auth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from './services/firebase/auth'
// eslint-disable-next-line no-unused-vars
import { getEvents, addEvent, deleteEvent } from './services/firebase/db'

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
    },
    getters: {
        user(state) {
            return state.user
        },
        events(state) {
          return state.events
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
          console.log(data)
          state.events = data
        }
      },
      actions: {
        async logIn(context, { email, password }) {
            const response = await signInWithEmailAndPassword(auth, email, password)
            if (response) {
              context.commit('SET_LOGGED_IN', true)
              context.commit('SET_USER', response.user)
              console.log("login succeeded")
            } else {
                throw new Error('Der skete en fejl ved login. Prøv igen')
            }
          },
      
          async logOut(context){
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

        async addEvent(context, { title, startDate, endDate, description }) {
          addEvent(title, startDate, endDate, description)
          context.commit('SET_EVENTS', await getEvents())
        },

        async deleteEvent(context, { docId }) {
          deleteEvent(docId)
          context.commit('SET_EVENTS', await getEvents())
        },

        async fetchEvents(context) {
          context.commit('SET_EVENTS', await getEvents())
        }
      },
})

export default store