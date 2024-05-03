import React from 'react'
import type { BehandlingerPage } from '~/types'
import BehandlingerTable from '~/components/behandlinger-table/BehandlingerTable'

export interface Props {
  avhengigeBehandlinger: BehandlingerPage
}

export default function AvhengigeBehandlingerElement(props: Props) {
  return (<>
    <BehandlingerTable visStatusSoek={true} behandlingerResponse={props.avhengigeBehandlinger} />
  </>)
}
