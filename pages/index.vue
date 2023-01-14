<script>
import DataCard from '@/components/DataCard.vue'
import { useUserStore } from '@/store/user.store'

export default {
  components: { DataCard },
  data: function data() {
    return {
      images: ['puls', 'natlenienie', 'wilgotnosc', 'cisnienie', 'glosnosc', 'jasnosc', 'temperatura'],
      value: 100,
      maxValue: 120,
      color: 'bg-blue-400'
    }
  },
  setup() {
    const store = useUserStore()

    return {
      store
    }
  },
  head() {
    return {
      title: 'Sprawdzanie danych otoczenia',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Sprawdzanie danych otoczenia'
        }
      ]
    }
  },
  async mounted() {
    const { value, isConfirmed } = await this.$swal.fire({
      title: 'Podaj swoje imię',
      icon: 'info',
      input: 'text',
      closeOnClickOutside: false,
      closeOnEsc: false,
      inputPlaceholder: 'Podaj swoje imię',
      inputValidator: (v) => (v ? undefined : 'Musisz podać imię!')
    })

    if (!isConfirmed) return

    this.$swal.fire({
      title: `Witaj, ${value}!`,
      icon: 'success',
      timer: 2000
    })

    this.store.setName(value)
  },
  methods: {
    onHelmetButtonClick() {
      this.store.toggleHelmet()
    },
    onBeerButtonTouchDown() {
      this.store.setBeerDrinking(true)
    },
    onBeerButtonTouchUp() {
      this.store.setBeerDrinking(false)
    },
    toggleBeer() {
      this.store.toggleBeer()
    }
  }
}
</script>

<template>
  <div class="container mx-auto flex items-center justify-center flex-col">
    <h1 class="text-4xl font-bold mt-4">
      {{ store.name ? `Witaj, ${store.name}!` : 'Aby kontynuować, podaj swoje imię' }}
    </h1>
    <div v-show="store.name" class="container flex flex-col md:flex-row p-4">
      <div class="w-full md:w-1/3">
        <span class="hidden md:block">Sterowanie</span>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="onHelmetButtonClick"
        >
          {{ store.isHelmetClosed ? 'Otwórz' : 'Zamknij' }} hełm
        </button>
        <button
          class="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
          @touchstart="onBeerButtonTouchDown"
          @touchend="onBeerButtonTouchUp"
          @mousedown="onBeerButtonTouchDown"
          @mouseup="onBeerButtonTouchUp"
        >
          {{ store.isBeerBeingDrank ? 'Puść aby przestać pić' : 'Pij piwo' }}
        </button>
      </div>
      <div class="w-full md:w-2/3">
        <span class="hidden md:block">Parametry</span>
      </div>
    </div>
  </div>
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
