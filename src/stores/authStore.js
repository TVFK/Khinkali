import { defineStore } from 'pinia'
import { reactive, ref, onMounted, watch } from 'vue'

export const useAuthStore = defineStore('authStore', () => {
  const isAuth = ref(false)
  const personCredentials = reactive({
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

  function setCredentials(person) {
    isAuth.value = true
    Object.assign(personCredentials, {
      name: person.name,
      email: person.email,
      phone: person.phone,
    })
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
    const data = JSON.parse(localStorage.getItem('authStore'))
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
