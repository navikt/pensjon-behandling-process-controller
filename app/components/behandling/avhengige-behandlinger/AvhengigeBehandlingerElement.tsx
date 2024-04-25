import React from 'react'
import type { BehandlingerPage } from '~/types'
import { Select } from '@navikt/ds-react'
import BehandlingerTable from '~/components/behandlinger-table/BehandlingerTable'
import { useSearchParams } from '@remix-run/react'
import { decodeBehandling } from '~/common/decodeBehandling'

export interface Props {
  avhengigeBehandlinger: BehandlingerPage
}

export default function AvhengigeBehandlingerElement(props: Props) {
  const [searchParams, setSearchParams] = useSearchParams()

  let ekstraBehandlingType
  let currentBehandlingType = searchParams.get('behandlingType')
  if (currentBehandlingType && !props.avhengigeBehandlinger.behandlingTyper.includes(currentBehandlingType)) {
    ekstraBehandlingType = (<option value={currentBehandlingType}>{decodeBehandling(currentBehandlingType)}</option>)
  } else {
    ekstraBehandlingType = (<></>)
  }

  return (<>
    <div>
      <Select
        label='Behandlingtype'
        defaultValue={searchParams.get('behandlingType') || undefined}
        onChange={(value) => {
          searchParams.set('behandlingType', value.target.value)
          setSearchParams(searchParams, {
            preventScrollReset: true,
          })
        }}
      >
        <option value=''>Alle typer</option>
        {
          ekstraBehandlingType
        }

        {props.avhengigeBehandlinger.behandlingTyper.map((type) => {
          return (<option key={type} value={type}>{decodeBehandling(type)}</option>)
        })}

      </Select>
      <Select
        label='Behandlingsstatus'
        defaultValue={searchParams.get('status') || undefined}
        onChange={(value) => {
          searchParams.set('status', value.target.value)
          setSearchParams(searchParams, {
            preventScrollReset: true,
          })
        }}
      >
        <option value=''>Alle statuser</option>
        <option value='FULLFORT'>Fullført</option>
        <option value='STOPPET'>Stoppet</option>
        <option value='UNDER_BEHANDLING'>Under behandling</option>
        <option value='DEBUG'>Debug</option>
        <option value='OPPRETTET'>Opprettet</option>
      </Select>
    </div>

    <BehandlingerTable behandlingerResponse={props.avhengigeBehandlinger} />
  </>)
}
