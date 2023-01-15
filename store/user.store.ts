import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user-store', () => {
  const name = ref<string>('')
  const token = ref<string>('')
  const isHelmetClosed = ref<boolean>(false)
  const isBeerBeingDrank = ref<boolean>(false)
  const isFanOff = ref<boolean>(true)

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

    await $fetch('/api/helmet', {
      method: 'POST',
      body: { isHelmetClosed: isHelmetClosed.value }
    })
  }

  async function toggleFan() {
    isFanOff.value = !isFanOff.value

    await $fetch('/api/fan', {
      method: 'POST',
      body: { isFanOff: isFanOff.value }
    })
  }

  async function setBeerDrinking(newIsBeerBeingDrank: boolean) {
    isBeerBeingDrank.value = newIsBeerBeingDrank

    await $fetch('/api/beer', {
      method: 'POST',
      body: { isBeerBeingDrank: isBeerBeingDrank.value }
    })
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
    login,
    logout,
    toggleHelmet,
    toggleFan,
    setBeerDrinking,
    getToken
  }
})
