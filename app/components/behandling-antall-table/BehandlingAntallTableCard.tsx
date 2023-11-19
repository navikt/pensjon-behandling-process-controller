import { BehandlingAntall } from '~/types'
import { Box } from '@navikt/ds-react'
import { NumberListIcon } from '@navikt/aksel-icons'
import BehandlingAntallTable from '~/components/behandling-antall-table/BehandlingAntallTable'

type Props = {
  behandlingAntall: BehandlingAntall[]
}

export function BehandlingAntallTableCard(props: Props) {
  return (
    <Box
      background={'surface-default'}
      borderRadius="medium"
      shadow="medium"
      style={{ padding: '6px' }}
    >
      <Box>
        <div style={{ float: 'left', textAlign: 'center' }}>
          <NumberListIcon
            title="a11y-title"
            fontSize="1.5rem"
            style={{ verticalAlign: 'middle', marginRight: '6px' }}
          />
          Antall etter type
        </div>
      </Box>
      <BehandlingAntallTable oppsummering={props.behandlingAntall} />
    </Box>
  )
}
