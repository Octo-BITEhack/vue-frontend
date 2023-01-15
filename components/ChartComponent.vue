<template>
  <div class="chart-container h-64 w-full lg:w-[calc(50%_-_2rem)]">
    <LineChart :id="id" :key="id" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale
} from 'chart.js'
import 'chartjs-adapter-moment'
import { Line } from 'vue-chartjs'

import { useStatsStore } from '@/store/stats.store'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, TimeScale)

export default {
  components: {
    LineChart: Line
    // LineChart: Bar
  },
  props: {
    id: {
      type: String,
      required: true
    },
    y1: {
      type: String,
      required: true
    },
    y2: {
      type: String,
      required: true
    },
    y1Prop: {
      type: String,
      required: true
    },
    y2Prop: {
      type: String,
      required: true
    }
  },
  setup() {
    const store = useStatsStore()

    return {
      store
    }
  },
  data() {
    const datasets = [
      {
        label: this.y1,
        data: this.store.datums[this.y1Prop],
        borderColor: 'red',
        // backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
        yAxisID: 'y1'
      },
      {
        label: this.y2,
        data: this.store.datums[this.y2Prop],
        borderColor: 'blue',
        // backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
        yAxisID: 'y2'
      }
    ]

    const labels = this.store.labels[this.y1Prop]

    return {
      chartData: {
        datasets,
        labels
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y1: {
            type: 'linear',
            display: true,
            position: 'left'
          },
          y2: {
            type: 'linear',
            display: true,
            position: 'right',

            grid: {
              // only want the grid lines for one axis to show up
              drawOnChartArea: false
            }
          },
          x: {
            type: 'time',
            title: {
              display: true,
              text: 'Czas'
            }
          }
        }
      }
    }
  }
}
</script>
