import { createStore } from 'vuex'
import { auth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from './services/firebase/auth'
import { getEvents } from './services/firebase/db'

const store = createStore({
    state: {
      user: {
        loggedIn: false,
        data: null
      },
      events: []
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
                throw new Error('login failed')
            }
          },
      
          async logOut(context){
            await signOut(auth)
            context.commit('SET_LOGGED_IN', false)
            context.commit('SET_USER', null)
            console.log("user logged out")
          },
      
          async fetchUser(context, user) {
            context.commit("SET_LOGGED_IN", user !== null);
            if (user) {
              context.commit("SET_USER", {
                displayName: user.displayName,
                email: user.email
              });
            } else {
              context.commit("SET_USER", null);
            }
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

        async fetchEvents(context) {
          console.log(await getEvents())
          context.commit('SET_EVENTS', await getEvents())
        }
      },
})

export default store