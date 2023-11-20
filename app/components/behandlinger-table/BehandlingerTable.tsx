import React from 'react'
import { Box, Pagination, Table } from '@navikt/ds-react'
import { useSort } from '~/hooks/useSort'
import type { BehandlingDto, BehandlingerPage } from '~/types'
import { Link, useSearchParams } from '@remix-run/react'
import { formatIsoTimestamp } from '~/common/date'
import { decodeBehandling } from '~/common/decodeBehandling'

interface Props {
  behandlingerResponse: BehandlingerPage
}

export default function BehandlingerTable(props: Props) {
  const { sortKey, onSort, sortFunc, sortDecending } =
    useSort<BehandlingDto>('behandlingId')
  const [, setSearchParams] = useSearchParams()

  const sortedBehandlinger = React.useMemo(() => {
    return props.behandlingerResponse.content.sort(sortFunc)
  }, [props, sortFunc])

  const onPageChange = (page: number) => {
    const params = new URLSearchParams()
    params.set('page', (page - 1).toString())
    setSearchParams(params)
  }

  return (
    <Box
      background={'surface-default'}
      style={{ padding: '6px' }}
      borderRadius="medium"
      shadow="medium"
    >
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
      <Pagination
        page={props.behandlingerResponse.number + 1}
        count={props.behandlingerResponse.totalPages}
        boundaryCount={1}
        siblingCount={1}
        prevNextTexts={true}
        onPageChange={onPageChange}
      />
    </Box>
  )
}
