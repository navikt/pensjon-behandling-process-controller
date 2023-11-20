import React, { useRef } from 'react'
import type { BehandlingDto } from '~/types'
import Card from '~/components/card/Card'
import { Entry } from '~/components/entry/Entry'
import {
  BodyLong,
  Box,
  Button,
  CopyButton,
  HStack,
  Modal,
  Tooltip,
} from '@navikt/ds-react'
import BehandlingAktivitetTable from '~/components/aktiviteter-table/BehandlingAktivitetTable'
import { PlayIcon, SandboxIcon, XMarkOctagonIcon } from '@navikt/aksel-icons'
import { formatIsoTimestamp } from '~/common/date'
import { useFetcher } from '@remix-run/react'
import { decodeBehandling } from '~/common/decodeBehandling'

export interface Props {
  behandling: BehandlingDto
}

export default function BehandlingCard(props: Props) {
  const fetcher = useFetcher()

  const stopModal = useRef<HTMLDialogElement>(null)

  function stopp() {
    fetcher.submit(
      {},
      {
        action: 'stopp',
        method: 'POST',
      },
    )

    stopModal.current?.close()
  }

  function debugButton() {
    if (
      props.behandling.status === 'FULLFORT' ||
      props.behandling.status === 'STOPPET'
    ) {
      return <></>
    } else if (props.behandling.status === 'DEBUG') {
      return (
        <Tooltip content="Avslutt debugging slik at behandlingen forsetter automatisk (kun mulig i testmiljø)">
          <fetcher.Form method="post" action="fjernFraDebug">
            <Button variant={'secondary'} icon={<SandboxIcon aria-hidden />}>
              Fjern fra debug
            </Button>
          </fetcher.Form>
        </Tooltip>
      )
    } else {
      return (
        <Tooltip content="Pause automatisk behandling slik at behandlingen kan kjøres i debugger lokalt (kun mulig i testmiljø)">
          <fetcher.Form method="post" action="taTilDebug">
            <Button variant={'secondary'} icon={<SandboxIcon aria-hidden />}>
              Ta til debug
            </Button>
          </fetcher.Form>
        </Tooltip>
      )
    }
  }

  function fjernUtsattButton() {
    if (props.behandling.status === 'UNDER_BEHANDLING') {
      return (
        <Tooltip content="Fjerner utsatt tidspunkt slik at behandling kan kjøres umiddelbart">
          <fetcher.Form method="post" action="fortsett">
            <Button
              variant={'secondary'}
              icon={<PlayIcon aria-hidden />}
              name={'fortsett'}
            >
              Fortsett
            </Button>
          </fetcher.Form>
        </Tooltip>
      )
    } else {
      return <></>
    }
  }

  function stoppButton() {
    if (
      props.behandling.status !== 'FULLFORT' &&
      props.behandling.status !== 'STOPPET'
    ) {
      return (
        <>
          <Tooltip content="Stopper behandlingen, skal kun gjøres om feil ikke kan løses på annen måte">
            <Button
              variant={'danger'}
              icon={<XMarkOctagonIcon aria-hidden />}
              onClick={() => stopModal.current?.showModal()}
            >
              Stopp behandling
            </Button>
          </Tooltip>

          <Modal ref={stopModal} header={{ heading: 'Stopp behandling' }}>
            <Modal.Body>
              <BodyLong>
                Ønsker du virkerlig å stoppe denne behandlingen. Saken, kravet,
                vedtaket eller liknende, som behandlinger er knyttet til må mest
                sannsynlig rapporteres til linja. Stopping av en behandling skal
                kun gjøres om feil ikke kan løses på annen måte. Denne
                handlingen kan ikke angres
              </BodyLong>
            </Modal.Body>
            <Modal.Footer>
              <fetcher.Form method="post" action="taTilDebug">
                <Button type="button" variant="danger" onClick={stopp}>
                  Stopp behandling
                </Button>
              </fetcher.Form>
              <Button
                type="button"
                variant="secondary"
                onClick={() => stopModal.current?.close()}
              >
                Avbryt
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )
    } else {
      return <></>
    }
  }

  function copyPaseEntry(name: string, value: string | number | null) {
    if (value) {
      return (
        <Entry labelText={`${name}`}>
          <HStack align="start">
            {value}
            <Tooltip content={`Kopier ${name}`}>
              <CopyButton copyText={value.toString()} size={'xsmall'} />
            </Tooltip>
          </HStack>
        </Entry>
      )
    } else {
      return <></>
    }
  }

  return (
    <>
      <Box
        background={'surface-default'}
        style={{ padding: '6px' }}
        borderRadius="medium"
        shadow="medium"
      >
        <Card id={props.behandling.uuid}>
          <Card.Header>
            <Card.Heading>
              {decodeBehandling(props.behandling.type)}
            </Card.Heading>
          </Card.Header>
          <Card.Body>
            <Card.Grid>
              <Entry labelText={'BehandlingId'}>
                <HStack align="start">
                  {props.behandling.behandlingId}
                  <Tooltip content="Kopier behandlingsidentifikator">
                    <CopyButton
                      copyText={props.behandling.behandlingId.toString()}
                      size={'xsmall'}
                    />
                  </Tooltip>
                </HStack>
              </Entry>
              <Entry labelText={'Status'}>{props.behandling.status}</Entry>
              <Entry labelText={'Funksjonell identifikator'}>
                {props.behandling.funksjonellIdentifikator}
              </Entry>

              <Entry labelText={'Opprettet'}>
                {formatIsoTimestamp(props.behandling.opprettet)}
              </Entry>
              <Entry labelText={'Siste kjøring'}>
                {formatIsoTimestamp(props.behandling.sisteKjoring)}
              </Entry>
              <Entry labelText={'Utsatt til'}>
                {formatIsoTimestamp(props.behandling.utsattTil)}
              </Entry>
              <Entry labelText={'Stoppet'}>
                {formatIsoTimestamp(props.behandling.stoppet)}
              </Entry>

              <Entry labelText={'Prioritet'}>
                {props.behandling.prioritet}
              </Entry>

              {copyPaseEntry('Fødselsnummer', props.behandling.fnr)}
              {copyPaseEntry('SakId', props.behandling.sakId)}
              {copyPaseEntry('KravId', props.behandling.kravId)}
              {copyPaseEntry('VedtakId', props.behandling.vedtakId)}
              {copyPaseEntry('JournalpostId', props.behandling.journalpostId)}
            </Card.Grid>
            <Card.Grid>
              {fjernUtsattButton()}

              {debugButton()}

              {stoppButton()}
            </Card.Grid>
            <Card.Grid>
              <a
                href={props.behandling.kibanaUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Kibana
              </a>
            </Card.Grid>
          </Card.Body>
        </Card>
      </Box>
      <Box
        background={'surface-default'}
        style={{ padding: '6px', marginTop: '12px' }}
        borderRadius="medium"
        shadow="medium"
      >
        <Card id={props.behandling.uuid}>
          <Card.Header>
            <Card.Heading>Aktiviteter</Card.Heading>
          </Card.Header>
          <Card.Body>
            <BehandlingAktivitetTable behandling={props.behandling} />
          </Card.Body>
        </Card>
      </Box>
    </>
  )
}
