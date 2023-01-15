<template>
  <div
    :class="`inline-flex items-center justify-between w-full rounded-2xl py-4 px-8 text-3xl lg:w-80 lg:rounded-xl lg:p-2 lg:text-2xl ${computedColor}`"
  >
    <lazy-client-only>
      <nuxt-img :src="`/img/${image}.png`" height="64" width="64" />
    </lazy-client-only>
    <div>
      <span class="lg:w-52 block">
        {{ text }}: <strong>{{ unit ? value : value ? 'tak' : 'nie' }} {{ unit }}</strong>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DataCard',
  props: {
    image: {
      type: String,
      required: true
    },
    value: {
      type: Number || String,
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
  computed: {
    computedColor() {
      return (this.maxValue && this.value >= this.maxValue) || (this.minValue && this.value <= this.minValue)
        ? 'bg-red-500'
        : 'bg-green-500'
    }
  }
}
</script>
