<script>
import AlarmNumbers from '@/components/AlarmNumbers.vue'
import ChartComponent from '@/components/ChartComponent.vue'
import DataCard from '@/components/DataCard.vue'
import { useStatsStore } from '@/store/stats.store'
import { useUserStore } from '@/store/user.store'

export default {
  components: { DataCard, AlarmNumbers, ChartComponent },
  setup() {
    const statsStore = useStatsStore()
    const userStore = useUserStore()

    return {
      statsStore,
      userStore
    }
  },
  data() {
    return {
      data: [
        {
          id: 0,
          prop: 'pulse',
          image: 'puls',
          text: 'Puls',
          minValue: 60,
          maxValue: 140,
          unit: 'bpm'
        },
        {
          id: 1,
          prop: 'isLight',
          image: 'jasnosc',
          text: 'Jest jasno?',
          minValue: 0
        },
        {
          id: 2,
          prop: 'isNoise',
          image: 'glosnosc',
          text: 'Jest głośno?',
          maxValue: 1
        },
        {
          id: 3,
          prop: 'saturation',
          image: 'natlenienie',
          text: 'Saturacja',
          minValue: 80,
          unit: '%'
        }
      ],
      interval: null,
      mobiles: ['999 - Pogotowie', '997 - Policja', '998 - Straż pożarna']
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
          title: 'Zaloguj się do systemu',
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

        areCredentialsValid = await this.userStore.login(username, password)
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
      title: `Witaj, ${this.userStore.name}!`,
      icon: 'success',
      timer: 2000
    })

    this.interval = setInterval(async () => {
      try {
        const stats = await this.statsStore.fetchStats()

        if (stats instanceof Error) throw stats
      } catch (e) {
        console.error(e)
        clearInterval(this.interval)

        await this.$swal.fire({
          title: 'Wystąpił błąd podczas pobierania danych',
          text: e.message,
          icon: 'error'
        })

        // location.reload()
      }
    }, 1000)
  },
  beforeUnmount() {
    this.userStore.logout()
  },
  methods: {
    async onHelmetButtonClick() {
      await this.userStore.toggleHelmet()
    },
    async onFanButtonClick() {
      await this.userStore.toggleFan()
    },
    async onBeerButtonTouchDown() {
      await this.userStore.setBeerDrinking(true)
    },
    async onBeerButtonTouchUp() {
      await this.userStore.setBeerDrinking(false)
    },
    async toggleBeer() {
      await this.userStore.toggleBeer()
    }
  }
}
</script>

<template>
  <div class="container mx-auto flex items-center justify-center flex-col">
    <h1 class="text-5xl font-bold mt-4 mb-4 underline">
      {{ userStore.name ? `Witaj, ${userStore.name}!` : 'Aby kontynuować, zaloguj się' }}
    </h1>
    <div v-if="userStore.name && statsStore.data.length > 0" class="container flex flex-wrap lg:flex-row p-4">
      <div class="w-full lg:w-1/3 mb-4 lg:pr-6">
        <h2 class="hidden text-2xl w-full mb-3 lg:block">Sterowanie</h2>
        <div class="flex flex-col gap-3">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-4xl lg:py-2 lg:px-4 lg:text-lg"
            @click="onHelmetButtonClick"
          >
            {{ userStore.isHelmetClosed ? 'Otwórz' : 'Zamknij' }} hełm
          </button>
          <button
            class="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-4 px-8 rounded-lg text-4xl lg:py-2 lg:px-4 lg:text-lg"
            @touchstart="onBeerButtonTouchDown"
            @touchend="onBeerButtonTouchUp"
            @mousedown="onBeerButtonTouchDown"
            @mouseup="onBeerButtonTouchUp"
          >
            {{ userStore.isBeerBeingDrank ? 'Puść, aby przestać pić' : 'Pij piwo' }}
          </button>
          <button
            class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-4 px-8 rounded-lg text-4xl lg:py-2 lg:px-4 lg:text-lg"
            @click="onFanButtonClick"
          >
            {{ userStore.isFanOn ? 'Wyłącz' : 'Włącz' }} wiatrak
          </button>
        </div>
      </div>
      <hr class="w-full mb-4 lg:hidden" />
      <div class="w-full lg:w-2/3 mx-auto flex flex-col lg:flex-row flex-wrap gap-3">
        <h2 class="hidden text-2xl w-full lg:block">Parametry</h2>
        <data-card
          v-for="record in data"
          :key="record.id"
          :image="record.image"
          :text="record.text"
          :unit="record.unit || ''"
          :max-value="record.maxValue === undefined ? NaN : +record.maxValue"
          :min-value="record.minValue === undefined ? NaN : +record.minValue"
          :prop="record.prop"
        />
      </div>
      <hr class="w-full mt-6 lg:mt-8" />
      <h2 class="hidden text-2xl w-full mt-4 lg:mt-8 lg:block">Znalazłeś się w ekstremalnej sytuacji?</h2>
      <alarm-numbers v-for="mobile in mobiles" :key="mobile" :mobile="mobile" />

      <hr class="w-full mt-6 lg:mt-8" />
      <div class="w-full mt-6 lg:mt-8 flex flex-col flex-wrap gap-4 justify-between lg:flex-row">
        <chart-component
          id="pulse-saturation"
          y1="Tętno [bpm]"
          y2="Saturacja SpO2 [%]"
          y1-prop="pulse"
          y2-prop="saturation"
        />
        <chart-component id="noise-dim" y1="Jasność" y2="Hałas" y1-prop="isNoise" y2-prop="isLight" />
      </div>
    </div>
  </div>
</template>
