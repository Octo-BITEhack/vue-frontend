<template>
  <div class="container w-full md:w-2/3 mx-auto flex flex-col md:flex-row flex-wrap items-center gap-3 justify-center">
    <data-card
      v-for="image in images"
      :key="image"
      :image="image"
      :value="value"
      :max-value="maxValue"
      :color="color"
    />
  </div>
</template>

<script>
import DataCard from '@/components/DataCard.vue'

export default {
  components: { DataCard },
  data: function data() {
    return {
      images: ['puls', 'natlenienie', 'wilgotnosc', 'cisnienie', 'glosnosc', 'jasnosc', 'temperatura'],
      value: 100,
      maxValue: 120,
      color: 'bg-blue-400'
    }
  }
}
</script>
