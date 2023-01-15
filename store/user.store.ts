import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user-store', () => {
  const name = ref<string>('')
  const token = ref<string>('')
  const isHelmetClosed = ref<boolean>(false)
  const isBeerBeingDrank = ref<boolean>(false)
  const isFanOn = ref<boolean>(false)

  async function login(username: string, password: string): Promise<boolean> {
    const response = await $fetch('/api/login', {
      method: 'POST',
      body: { username, password }
    })

    if (response.ok) {
      setName(username)
      setToken(response.body.token)
    }

    return response.ok
  }

  function logout() {
    setName('')
    setToken('')
  }

  function setName(newName: string) {
    name.value = newName
  }

  async function toggleHelmet() {
    isHelmetClosed.value = !isHelmetClosed.value

    const response = await $fetch('/api/helmet', {
      method: 'POST',
      body: { isHelmetClosed: isHelmetClosed.value },
      headers: {
        authorization: `Bearer ${getToken()}`
      }
    })

    if (!response.ok) {
      isHelmetClosed.value = !isHelmetClosed.value
    }
  }

  async function toggleFan() {
    isFanOn.value = !isFanOn.value

    const response = await $fetch('/api/fan', {
      method: 'POST',
      body: { isFanOn: isFanOn.value },
      headers: {
        authorization: `Bearer ${getToken()}`
      }
    })

    if (!response.ok) {
      isFanOn.value = !isFanOn.value
    }
  }

  async function setBeerDrinking(newIsBeerBeingDrank: boolean) {
    isBeerBeingDrank.value = newIsBeerBeingDrank

    const response = await $fetch('/api/beer', {
      method: 'POST',
      body: { isBeerBeingDrank: isBeerBeingDrank.value },
      headers: {
        authorization: `Bearer ${getToken()}`
      }
    })

    if (!response.ok) {
      isBeerBeingDrank.value = !isBeerBeingDrank.value
    }
  }

  function setToken(newToken: string) {
    token.value = newToken
  }

  function getToken() {
    return token.value
  }

  return {
    name,
    isHelmetClosed,
    isBeerBeingDrank,
    isFanOn,
    login,
    logout,
    toggleHelmet,
    toggleFan,
    setBeerDrinking,
    getToken
  }
})
