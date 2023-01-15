import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useUserStore } from '@/store/user.store'
import { ResponseStats } from '~~/@types/responses'
import { Stats } from '~~/@types/stats'
import getDatumAndLabelFromStat from '~~/functions/getDatumAndLabelFromStat'

export const useStatsStore = defineStore('stats-store', () => {
  const data = ref<(Stats & { timestamp: Date })[]>([])
  const labels = ref<{ [key: keyof Stats]: Date[] }>({})
  const datums = ref<{ [key: keyof Stats]: string[] }>({})
  const chartKey = ref<number>(0)

  async function fetchStats(): Promise<void | Error> {
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

    const { body } = response as ResponseStats

    appendStats({ ...body, timestamp: new Date() } as Stats & { timestamp: Date })
    createLabelsAndDatums()

    // chartKey.value++
  }

  function appendStats(stats: Stats & { timestamp: Date }): void {
    data.value.push(stats)
  }

  function createLabelsAndDatums(): void {
    labels.value = {}
    datums.value = {}

    for (const value of data.value) {
      for (const key in value) {
        if (key === 'timestamp') {
          continue
        }

        if (!labels.value[key]) {
          labels.value[key] = []
          datums.value[key] = []
        }

        const { x, y } = getDatumAndLabelFromStat(value, key as keyof Stats)

        labels.value[key].push(y)
        datums.value[key].push(x)
      }
    }
  }

  return {
    chartKey,
    data,
    labels,
    datums,
    fetchStats
  }
})
