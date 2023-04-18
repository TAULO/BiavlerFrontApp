import {
  defineStore
} from 'pinia'


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

import {
  filter
} from '@/services/uFuzzy'
import StoragePaths from './services/firebase/constans/StoragePaths';

export const authStore = defineStore('auth', {
  state: () => {
    return {
      user: {
        loggedIn: false,
        data: null
      }
    }
  },
  getters: {
    user(state) {
      return state
    },
  },
  actions: {
    async logIn({
      email,
      password
    }) {
      const response = await logIn(email, password)
      if (response) {
        this.user.loggedIn = true
        this.user.data = response.user
        console.log("login succeeded")
      } else {
        throw new Error('Der skete en fejl ved login. Prøv igen')
      }
    },

    async logOut() {
      await logOut(auth)
      this.user.loggedIn = false
      this.user.data = null
      console.log("user logged out")
    },

    authChanged() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.loggedIn = true
          this.user.data = user
        } else {
          this.user.loggedIn = false
          this.user.data = null
        }
      })
    },
  }
})

export const eventStore = defineStore('event', {
  state: () => {
    return {
      events: [{
        title: "",
        startDate: null,
        description: "",
        id: ""
      }]
    }
  },
  getters: {
    getEvents(state) {
      return state
    },
  },
  actions: {
    async addEvent(data) {
      addDocument(Collections.CALENDAR, data)
      this.events = await fetchDocuments(Collections.CALENDAR) 
    },

    async deleteEvent(docId) {
      deleteDocument(Collections.CALENDAR, docId)
      this.events = await fetchDocuments(Collections.CALENDAR) 
    },

    async updateEvent(data) {
      const {
        docId
      } = data
      const {
        title,
        startDate,
        description
      } = data
      updateDocument(Collections.CALENDAR, docId, {
        title,
        startDate,
        description
      })
      this.events = await fetchDocuments(Collections.CALENDAR) 
    },

    async getEvent({
      docId
    }) {
      return fetchSingleDocument(Collections.CALENDAR, docId)
    },

    async fetchEvents() {
      this.events = await fetchDocuments(Collections.CALENDAR) 
    },

    async searchForEvents({
      searchKeyword,
      needle
    }) {
      const haystack = await fetchDocuments(Collections.CALENDAR)
      const filteredEvents = filter(haystack, searchKeyword, needle)
      this.events = await filteredEvents
    }
  }
})

export const committeeStore = defineStore('committee', {
  state: () => {
    return {
      committeeMembers: [{
        name: "",
        role: "",
        bio: "",
        email: "",
        image: {},
        id: ""
      }]
    }
  },

  getters: {
    getCommitteeMembers(state) {
      return state
    }
  },

  actions: {
    async addCommitteeMember(data) {
      await addDocument(Collections.COMMITEEMEMBER, data)
      this.committeeMembers = await fetchDocuments(Collections.COMMITEEMEMBER)
    },

    async deleteCommitteeMember({
      docId,
      imageName
    }) {
      await deleteDocument(Collections.COMMITEEMEMBER, {
        docId
      })
      storageStore.deleteImages({storagePath: StoragePaths.COMMITEEMEMBER, imageName})
      await fetchDocuments(Collections.COMMITEEMEMBER)
    },

    async updateCommitteeMember(data) {
      const {
        docId
      } = data
      const {
        name,
        role,
        bio,
        email,
        image
      } = data
      await updateDocument(Collections.COMMITEEMEMBER, docId, {
        name,
        role,
        bio,
        email,
        image
      })
      await fetchDocuments(Collections.COMMITEEMEMBER)
    },

    async getCommiteeMember({
      docId
    }) {
      return await fetchSingleDocument(Collections.COMMITEEMEMBER, docId)
    },

    async fetchCommitteeMembers() {
      this.committeeMembers = await fetchDocuments(Collections.COMMITEEMEMBER)
    }
  }
})

export const recipeStore = defineStore('recipe', {
  state: () => {
    return {
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
    }
  },

  getters: {
    getRecipes(state) {
      return state
    }
  },

  actions: {
    async addRecipe(data) {
      await addDocument(Collections.RECIPE, data)
      this.recipes = await fetchDocuments(Collections.RECIPE)
    },

    async deleteRecipe(docId) {
      await deleteDocument(Collections.RECIPE, docId)
      this.recipes = await fetchDocuments(Collections.RECIPE)
    },

    async updateRecipe(data) {
      const {
        docId
      } = data
      const {
        name,
        role,
        bio,
        email,
        image
      } = data
      await updateDocument(Collections.RECIPE, docId, {
        name,
        role,
        bio,
        email,
        image
      })
      console.log(await fetchDocuments(Collections.RECIPE), Collections.RECIPE)
      this.recipes = await fetchDocuments(Collections.RECIPE)
    },

    async getRecipe({
      docId
    }) {
      return await fetchSingleDocument(Collections.RECIPE, docId)
    },

    async fetchRecipes() {
      this.recipes = await fetchDocuments(Collections.RECIPE)
    }
  }
})

export const storageStore = defineStore('storage', {
  state: () => {
    return {
      images: [{
        name: "",
        url: ""
      }]
    }
  },

  getters: {
    getImages(state) {
      return state
    }
  },

  actions: {
    async getImagesUrl(storagePath) {
      this.images = await getImagesUrl(storagePath)
    },

    async getImageURL({
      storagePath,
      imageName
    }) {
      return await getImageURL({
        storagePath,
        imageName
      })
    },

    async uploadImages({
      storagePath,
      files
    }) {
      await uploadImages(storagePath, files)
      this.images = await getImagesUrl({ storagePath })
    },

    async deleteImage({
      storagePath,
      imageName
    }) {
      await deleteImage(storagePath, imageName)
      this.images = await getImagesUrl({ storagePath })
    },

    async deleteImages({
      storagePath,
      images
    }) {
      await deleteImages(storagePath, images)
      this.images = await getImagesUrl({ storagePath })
    }
  }
})