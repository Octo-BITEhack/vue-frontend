<template>
  <div
    :class="`inline-flex items-center justify-between w-full rounded-2xl py-4 px-8 text-3xl lg:w-80 lg:rounded-xl lg:p-2 lg:text-2xl ${color}`"
  >
    <lazy-client-only>
      <nuxt-img :src="`/img/${image}.png`" height="64" width="64" />
    </lazy-client-only>
    <div>
      <span class="capitalize lg:w-52 block"
        >{{ texts[image] }}: <strong>{{ value }}</strong></span
      >
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
  },
  data() {
    return {
      texts: {
        puls: 'Puls',
        wilgotnosc: 'Wilgotność'
      } as { [key: string]: string }
    }
  }
}
</script>
