import type { FremdriftDTO } from '~/types'
import {
  ArcElement,
  Chart as ChartJS,
  Filler,
  Legend,
  Tooltip,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

import ChartDataLabels from 'chartjs-plugin-datalabels'

type Props = {
  fremdrift: FremdriftDTO
}

ChartJS.register(
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  ChartDataLabels,
)

export function BehandlingBatchFremdriftDoughnutChart(props: Props) {

  return (
    <Doughnut
      data={{
        labels: [
          'Fullforte',
          'Under behandling',
        ],
        datasets: [{
          data: [props.fremdrift.fullforte, props.fremdrift.totalt - props.fremdrift.fullforte],
          backgroundColor: [
            'rgb(133,255,99)',
            'rgb(235,54,54)',
          ],
          hoverOffset: 4,
          borderWidth: 1,
        }],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
            align: 'center',
          },
          datalabels: {
            anchor: 'end',
            align: 'end',
            formatter: (value: number) => {
              return (value * 100 / props.fremdrift.totalt).toFixed(2) + '%'
            },
            color: '#000000',
          },
        },
      }}
    />
  )
}
