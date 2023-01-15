<template>
  <div
    :class="`inline-flex items-center justify-between w-full rounded-2xl py-4 px-8 text-3xl lg:w-80 lg:rounded-xl lg:p-2 lg:text-2xl ${computedColor}`"
  >
    <lazy-client-only>
      <nuxt-img :src="`/img/${image}.png`" height="64" width="64" />
    </lazy-client-only>
    <div>
      <span class="lg:w-52 block">
        {{ text }}:
        <strong
          >{{ unit ? statsStore.data.at(-1)![prop] : statsStore.data.at(-1)![prop] ? 'tak' : 'nie' }} {{ unit }}</strong
        >
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { useStatsStore } from '~~/store/stats.store'

export default {
  name: 'DataCard',
  props: {
    image: {
      type: String,
      required: true
    },
    prop: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    maxValue: {
      type: Number || undefined,
      required: true
    },
    minValue: {
      type: Number || undefined,
      required: true
    },
    unit: {
      type: String,
      required: true
    }
  },
  setup() {
    const statsStore = useStatsStore()

    return {
      statsStore
    }
  },
  computed: {
    computedColor() {
      const val = this.statsStore.data.at(-1)

      if (!val) return 'bg-gray-500'

      if (this.maxValue !== undefined && val[this.prop] >= this.maxValue) return 'bg-red-500'
      if (this.minValue !== undefined && val[this.prop] <= this.minValue) return 'bg-red-500'

      return 'bg-green-500'
    }
  }
}
</script>
