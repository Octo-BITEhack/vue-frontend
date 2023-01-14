<template>
  <div :class="`flex items-center justify-evenly w-full md:w-[320px] rounded-lg p-2 text-2xl ${color}`">
    <nuxt-img :src="`/img/${image}.png`" height="64" width="64" />
    <div>
      <strong class="text-transform: capitalize">{{ image }}: {{ value }}</strong>
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
      type: Number,
      required: true
    },
    maxValue: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  }
}
</script>
