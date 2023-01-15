<script>
import DataCard from '@/components/DataCard.vue'
import { useUserStore } from '@/store/user.store'

export default {
  components: { DataCard },
  setup() {
    const store = useUserStore()

    return {
      store
    }
  },
  data: function data() {
    return {
      images: ['puls', 'natlenienie', 'glosnosc', 'jasnosc'],
      value: 100,
      maxValue: 120,
      color: 'bg-blue-400',
      unit: ''
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
    let areCredentialsValid = false

    while (!areCredentialsValid) {
      try {
        const {
          value: { username, password },
          isConfirmed
        } = await this.$swal.fire({
          title: 'Podaj swoje imię',
          icon: 'info',
          html:
            '<input type="text" id="swal-input1" name="swal-input1" class="swal2-input" placeholder="Nazwa użytkownika..." required />' +
            '<label for="swal-input1" class="swal2-label text-sm text-gray-400">Podaj swoją nazwę użytkownika</label>' +
            '<input type="password" id="swal-input2" name="swal-input2" class="swal2-input" placeholder="Hasło..." required />' +
            '<label for="swal-input2" class="swal2-label text-sm text-gray-400">Podaj swoje hasło</label>',
          closeOnClickOutside: false,
          closeOnEsc: false,
          inputPlaceholder: 'Podaj swoje imię',
          preConfirm: () => {
            const user = document.getElementById('swal-input1').value
            const passwd = document.getElementById('swal-input2').value

            if (!user) {
              this.$swal.showValidationMessage('Musisz podać nazwę użytkownika!')
              return 'Musisz podać nazwę użytkownika'
            }

            if (!passwd) {
              this.$swal.showValidationMessage('Musisz podać hasło!')
              return 'Musisz podać hasło'
            }

            return {
              username: user,
              password: passwd
            }
          }
        })

        if (!isConfirmed) continue

        areCredentialsValid = await this.store.login(username, password)
      } catch (e) {
        console.error(e)
        await this.$swal.fire({
          title: 'Musisz podać nazwę użytkownika i hasło!',
          icon: 'error',
          timer: 2000
        })

        continue
      }

      if (!areCredentialsValid) {
        await this.$swal.fire({
          title: 'Nieprawidłowy użytkownik lub hasło',
          icon: 'error',
          timer: 2000
        })
      }
    }

    this.$swal.fire({
      title: `Witaj, ${this.store.name}!`,
      icon: 'success',
      timer: 2000
    })
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
    <h1 class="text-5xl font-bold mt-4 mb-4 underline">
      {{ store.name ? `Witaj, ${store.name}!` : 'Aby kontynuować, podaj swoje imię' }}
    </h1>
    <div v-show="store.name" class="container flex flex-col lg:flex-row p-4">
      <div class="w-full lg:w-1/3 mb-4 lg:pr-6">
        <h2 class="hidden text-2xl w-full mb-3 lg:block">Sterowanie</h2>
        <div class="flex flex-col gap-3">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-4xl lg:py-2 lg:px-4 lg:text-lg"
            @click="onHelmetButtonClick"
          >
            {{ store.isHelmetClosed ? 'Otwórz' : 'Zamknij' }} hełm
          </button>
          <button
            class="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-4 px-8 rounded-lg text-4xl lg:py-2 lg:px-4 lg:text-lg"
            @touchstart="onBeerButtonTouchDown"
            @touchend="onBeerButtonTouchUp"
            @mousedown="onBeerButtonTouchDown"
            @mouseup="onBeerButtonTouchUp"
          >
            {{ store.isBeerBeingDrank ? 'Puść, aby przestać pić' : 'Pij piwo' }}
          </button>
        </div>
      </div>
      <hr class="mb-4 lg:hidden" />
      <div class="w-full lg:w-2/3 mx-auto flex flex-col lg:flex-row flex-wrap gap-3">
        <h2 class="hidden text-2xl w-full lg:block">Parametry</h2>
        <data-card
          v-for="image in images"
          :key="image"
          :image="image"
          :value="value"
          :max-value="maxValue"
          :color="color"
        />
      </div>
    </div>
  </div>
</template>
