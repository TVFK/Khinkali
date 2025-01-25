import { defineStore } from 'pinia'
import { reactive, ref, onMounted, watch } from 'vue'

export interface PersonCredentials {
  name: string
  email: string
  phone: string
}

export const useAuthStore = defineStore('authStore', () => {
  const isAuth = ref(false)
  const personCredentials = reactive<PersonCredentials>({
    name: '',
    email: '',
    phone: '',
  })

  function logout() {
    isAuth.value = false
    Object.assign(personCredentials, {
      name: '',
      email: '',
      phone: '',
    })
    saveToLocalStorage()
  }

  function setCredentials(person: PersonCredentials) {
    isAuth.value = true
    Object.assign(personCredentials, person)
    saveToLocalStorage()
  }

  function saveToLocalStorage() {
    localStorage.setItem(
      'authStore',
      JSON.stringify({
        isAuth: isAuth.value,
        personCredentials,
      }),
    )
  }

  function loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('authStore') || 'null')
    if (data) {
      isAuth.value = data.isAuth
      Object.assign(personCredentials, data.personCredentials)
    }
  }

  onMounted(() => {
    loadFromLocalStorage()
  })

  watch(() => ({ isAuth: isAuth.value, personCredentials }), saveToLocalStorage, { deep: true })

  return { isAuth, personCredentials, logout, setCredentials }
})
