import React from 'react'
import { Box, Pagination, Select, Table } from '@navikt/ds-react'
import { useSort } from '~/hooks/useSort'
import type { BehandlingDto, BehandlingerPage } from '~/types'
import { Link, useSearchParams } from '@remix-run/react'
import { formatIsoTimestamp } from '~/common/date'
import { decodeBehandling } from '~/common/decodeBehandling'

interface Props {
  visStatusSoek: boolean,
  behandlingerResponse: BehandlingerPage,
}

export default function BehandlingerTable(props: Props) {
  const { sortKey, onSort, sortFunc, sortDecending } =
    useSort<BehandlingDto>('behandlingId')
  const [searchParams, setSearchParams] = useSearchParams()

  const sortedBehandlinger = React.useMemo(() => {
    return props.behandlingerResponse.content.sort(sortFunc)
  }, [props, sortFunc])

  const onPageChange = (page: number) => {
    searchParams.set('page', (page - 1).toString())
    setSearchParams(searchParams)
  }

  function statusOptions(medLabel: boolean) {
    return <Select
      label={null}
      defaultValue={searchParams.get('status') || undefined}
      onChange={(value) => {
        searchParams.set('status', value.target.value)
        setSearchParams(searchParams, {
          preventScrollReset: true,
        })
      }}
    >
      <option value=''>Alle statuser</option>
      <option value='FEILENDE'>Feilende</option>
      <option value='DEBUG'>Debug</option>
      <option value='STOPPET'>Stoppet</option>
      <option value='UNDER_BEHANDLING'>Under behandling</option>
      <option value='OPPRETTET'>Opprettet</option>
      <option value='FULLFORT'>Fullført</option>
    </Select>
  }

  function behandlingtypeOptions() {
    let ekstraBehandlingType
    let currentBehandlingType = searchParams.get('behandlingType')
    if (currentBehandlingType && !props.behandlingerResponse.behandlingTyper.sort((a,b) => 0 - (a > b ? -1 : 1)).includes(currentBehandlingType)) {
      ekstraBehandlingType = (<option value={currentBehandlingType}>{decodeBehandling(currentBehandlingType)}</option>)
    } else {
      ekstraBehandlingType = (<></>)
    }

    return <Select
      label={null}
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

      { props.behandlingerResponse.behandlingTyper ?
        props.behandlingerResponse.behandlingTyper.map((type) => {
        return (<option key={type} value={type}>{decodeBehandling(type)}</option>)
      })
        : <></>
      }

    </Select>
  }

  return (
    <>
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
              <Table.ColumnHeader sortable sortKey="behandlingId" style={{ borderBottomWidth: 0, paddingBottom: 0 }}>
                BehandlingId
              </Table.ColumnHeader>
              <Table.ColumnHeader sortable sortKey="type" style={{ borderBottomWidth: 0, paddingBottom: 0 }}>
                Type
              </Table.ColumnHeader>
              <Table.ColumnHeader sortable sortKey="opprettet" style={{ borderBottomWidth: 0, paddingBottom: 0 }}>
                Opprettet
              </Table.ColumnHeader>
              <Table.ColumnHeader sortable sortKey="sisteKjoring" style={{ borderBottomWidth: 0, paddingBottom: 0 }}>
                Siste kjøring
              </Table.ColumnHeader>
              <Table.ColumnHeader sortable sortKey="utsattTil" style={{ borderBottomWidth: 0, paddingBottom: 0 }}>
                Utsatt til
              </Table.ColumnHeader>
              <Table.ColumnHeader sortable sortKey="status" style={{ borderBottomWidth: 0, paddingBottom: 0 }}>
                Status
              </Table.ColumnHeader>
            </Table.Row>
            <Table.Row>
              <Table.DataCell style={{ paddingTop: 0 }}>
              </Table.DataCell>
              <Table.DataCell style={{ paddingTop: 0 }}>
                {behandlingtypeOptions()}
              </Table.DataCell>
              <Table.DataCell style={{ paddingTop: 0 }}>
              </Table.DataCell>
              <Table.DataCell style={{ paddingTop: 0 }}>
              </Table.DataCell>
              <Table.DataCell style={{ paddingTop: 0 }}>
              </Table.DataCell>
              <Table.DataCell style={{ paddingTop: 0 }}>
                {props.visStatusSoek ?
                  statusOptions(false)
                  : <></>}
              </Table.DataCell>
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
    </>

)
}
