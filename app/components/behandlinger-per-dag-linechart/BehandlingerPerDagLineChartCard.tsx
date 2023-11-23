import { DatoAntall } from '~/types'
import { BehandlingerPerDagLineChart } from '~/components/behandlinger-per-dag-linechart/BehandlingerPerDagLineChart'
import { Box, Button } from '@navikt/ds-react'
import { AreaChartFillIcon } from '@navikt/aksel-icons'
import { useState } from 'react'

type Props = {
  opprettetPerDag: DatoAntall[]
}

export function BehandlingerPerDagLineChartCard(props: Props) {
  let [antallDager, setAntallDager] = useState(30)

  return (
    <Box
      background={'surface-default'}
      borderRadius="medium"
      shadow="medium"
      style={{ padding: '6px' }}
    >
      <Box>
        <div style={{ float: 'left', textAlign: 'center' }}>
          <AreaChartFillIcon
            title="Antall behandlinger"
            fontSize="1.5rem"
            style={{ verticalAlign: 'middle', marginRight: '6px' }}
          />
          Antall behandlinger
        </div>
        <div style={{ float: 'right' }}>
          <Button
            size="xsmall"
            variant={antallDager === 365 ? 'primary' : 'tertiary'}
            onClick={() => setAntallDager(365)}
          >
            365 dager
          </Button>
          <Button
            size="xsmall"
            variant={antallDager === 90 ? 'primary' : 'tertiary'}
            onClick={() => setAntallDager(90)}
          >
            90 dager
          </Button>
          <Button
            style={{ marginRight: '6px' }}
            size="xsmall"
            variant={antallDager === 30 ? 'primary' : 'tertiary'}
            onClick={() => setAntallDager(30)}
          >
            30 dager
          </Button>
          <Button
            size="xsmall"
            variant={antallDager === 7 ? 'primary' : 'tertiary'}
            onClick={() => setAntallDager(7)}
          >
            7 dager
          </Button>
        </div>
      </Box>
      <BehandlingerPerDagLineChart
        opprettetPerDag={props.opprettetPerDag}
        antallDager={antallDager}
      />
    </Box>
  )
}
