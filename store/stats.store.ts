import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useUserStore } from '@/store/user.store'
import { ResponseStats } from '~~/@types/responses'
import { Stats } from '~~/@types/stats'

export const useStatsStore = defineStore('stats-store', () => {
  const pulse = ref<number>(0)
  const saturation = ref<number>(0)
  const isNoise = ref<boolean>(false)
  const isLight = ref<boolean>(true)

  async function fetchStats(): Promise<Stats | Error> {
    const userStore = useUserStore()

    const response = await $fetch('/api/stats', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${userStore.getToken()}`
      }
    })

    if (!response.ok && typeof response.body.error === 'string') {
      return new Error(response.body.error)
    }

    const data = (response as ResponseStats).body

    pulse.value = data.pulse
    saturation.value = data.saturation
    isNoise.value = data.isNoise
    isLight.value = data.isLight

    return { ...(response as ResponseStats).body }
  }

  return {
    fetchStats
  }
})
