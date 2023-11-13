import React from 'react'
import { Table } from '@navikt/ds-react'
import { useSort } from '~/hooks/useSort'
import type { BehandlingDto, BehandlingerResponse } from '~/types'
import { Link } from '@remix-run/react'
import { formatIsoTimestamp } from '~/common/date'
import { decodeBehandling } from '~/components/behandling/decode'

interface Props {
  behandlingerResponse: BehandlingerResponse
}

export default function BehandlingerTable(props: Props) {
  const { sortKey, onSort, sortFunc, sortDecending } =
    useSort<BehandlingDto>('behandlingId')

  const sortedBehandlinger = React.useMemo(() => {
    return props.behandlingerResponse.behandlinger.sort(sortFunc)
  }, [props, sortKey, sortDecending])

  return (
    <Table
      size={'medium'}
      onSortChange={onSort}
      sort={{
        direction: sortDecending ? 'descending' : 'ascending',
        orderBy: sortKey as string,
      }}
      zebraStripes
    >
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader sortable sortKey="behandlingId">
            BehandlingId
          </Table.ColumnHeader>
          <Table.ColumnHeader sortable sortKey="type">
            Type
          </Table.ColumnHeader>
          <Table.ColumnHeader sortable sortKey="opprettet">
            Opprettet
          </Table.ColumnHeader>
          <Table.ColumnHeader sortable sortKey="sisteKjoring">
            Siste kjøring
          </Table.ColumnHeader>
          <Table.ColumnHeader sortable sortKey="utsattTil">
            Utsatt til
          </Table.ColumnHeader>
          <Table.ColumnHeader sortable sortKey="status">
            Status
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sortedBehandlinger?.map((it: BehandlingDto) => {
          return (
            <Table.Row key={it.uuid}>
              <Table.DataCell>
                <Link to={`/behandling/${it.behandlingId}`}>
                  {it.behandlingId}
                </Link>
              </Table.DataCell>
              <Table.DataCell>{decodeBehandling(it.type)}</Table.DataCell>
              <Table.DataCell>
                {formatIsoTimestamp(it.opprettet)}
              </Table.DataCell>
              <Table.DataCell>
                {formatIsoTimestamp(it.sisteKjoring)}
              </Table.DataCell>
              <Table.DataCell>
                {formatIsoTimestamp(it.utsattTil)}
              </Table.DataCell>
              <Table.DataCell>{it.status}</Table.DataCell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}
