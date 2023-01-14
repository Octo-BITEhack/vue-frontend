import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user-store', () => {
  const name = ref<string>('')
  const isHelmetClosed = ref<boolean>(false)
  const isBeerBeingDrank = ref<boolean>(false)

  async function login(username: string, password: string): Promise<boolean> {
    const response = await $fetch('/api/login', {
      method: 'POST',
      body: { username, password }
    })

    if (response.ok) {
      setName(username)
    }

    return response.ok
  }

  function setName(newName: string) {
    name.value = newName
  }

  function toggleHelmet() {
    isHelmetClosed.value = !isHelmetClosed.value
  }

  function setBeerDrinking(newIsBeerBeingDrank: boolean) {
    isBeerBeingDrank.value = newIsBeerBeingDrank
  }

  return {
    name,
    isHelmetClosed,
    isBeerBeingDrank,
    login,
    toggleHelmet,
    setBeerDrinking
  }
})
