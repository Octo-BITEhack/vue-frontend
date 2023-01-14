import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user-store', () => {
  const name = ref<string>('')
  const isHelmetClosed = ref<boolean>(false)
  const isBeerBeingDrank = ref<boolean>(false)

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
    setName,
    toggleHelmet,
    setBeerDrinking
  }
})
