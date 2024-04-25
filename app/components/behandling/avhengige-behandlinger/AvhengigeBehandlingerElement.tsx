import React from 'react'
import type { BehandlingerPage } from '~/types'
import { Select } from '@navikt/ds-react'
import BehandlingerTable from '~/components/behandlinger-table/BehandlingerTable'
import { useSearchParams } from '@remix-run/react'

export interface Props {
  avhengigeBehandlinger: BehandlingerPage
}

export default function AvhengigeBehandlingerElement(props: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (<>
    <div>
      <Select
        label='Behandlingsstatus'
        onChange={(value) => {
          searchParams.set("status", value.target.value);
          setSearchParams(searchParams, {
            preventScrollReset: true,
          });
        }}
      >
        <option value=''>Alle</option>
        <option value='FULLFORT' selected={searchParams.get("status") === 'FULLFORT'}>Fullført</option>
        <option value='STOPPET' selected={searchParams.get("status") === 'STOPPET'}>Stoppet</option>
        <option value='UNDER_BEHANDLING' selected={searchParams.get("status") === 'UNDER_BEHANDLING'}>Under behandling</option>
        <option value='DEBUG' selected={searchParams.get("status") === 'DEBUG'}>Debug</option>
        <option value='OPPRETTET' selected={searchParams.get("status") === 'OPPRETTET'}>Opprettet</option>
      </Select>
      <Select
        label='Nivå'
        onChange={(value) => {
          searchParams.set("minLevel", value.target.value);
          searchParams.set("maxLevel", value.target.value);
          setSearchParams(searchParams, {
            preventScrollReset: true,
          });
        }}
      >
        <option value=''>Alle</option>
        <option value='2' selected={searchParams.get("minLevel") === '2'}>2</option>
        <option value='3' selected={searchParams.get("minLevel") === '3'}>3</option>
        <option value='4' selected={searchParams.get("minLevel") === '4'}>4</option>
      </Select>
    </div>

    <BehandlingerTable behandlingerResponse={props.avhengigeBehandlinger} />
  </>)
}
