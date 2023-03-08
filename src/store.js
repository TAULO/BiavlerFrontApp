import { createStore } from 'vuex'
import { auth, signInWithEmailAndPassword, signOut } from './services/firebase/auth'

const store = createStore({
    state: {
      user: {
        loggedIn: false,
        data: null
      }
    },
    getters: {
        user(state) {
            return state.user
        }
    },
    mutations: {
        SET_LOGGED_IN(state, value) {
          state.user.loggedIn = value;
        },
        
        SET_USER(state, data) {
          state.user.data = data;
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
        }
      }   
})

export default store