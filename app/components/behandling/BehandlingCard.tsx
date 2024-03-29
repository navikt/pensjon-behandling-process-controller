import React, { Suspense, useRef } from 'react'
import type { BehandlingDto, BehandlingerPage, DetaljertFremdriftDTO } from '~/types'
import Card from '~/components/card/Card'
import { Entry } from '~/components/entry/Entry'
import {
  BodyLong,
  Box,
  Button,
  CopyButton,
  HStack, Loader,
  Modal,
  Tabs,
  Tooltip,
} from '@navikt/ds-react'
import BehandlingAktivitetTable from '~/components/aktiviteter-table/BehandlingAktivitetTable'
import {
  ClockDashedIcon,
  CogFillIcon,
  PlayIcon,
  SandboxIcon,
  TasklistIcon,
  XMarkOctagonIcon,
} from '@navikt/aksel-icons'
import { formatIsoTimestamp } from '~/common/date'
import { Await, Link, useFetcher } from '@remix-run/react'
import { decodeBehandling } from '~/common/decodeBehandling'
import BehandlingerTable from '~/components/behandlinger-table/BehandlingerTable'
import { BehandlingKjoringerTable } from '~/components/kjoringer-table/BehandlingKjoringerTable'
import { SkeletonLoader } from '~/components/loader/SkeletonLoader'
import { BehandlingBatchDetaljertFremdriftBarChart } from '~/components/behandling-batch-fremdrift/BehandlingBatchDetaljertFremdriftBarChart'

export interface Props {
  behandling: BehandlingDto
  avhengigeBehandlinger: Promise<BehandlingerPage | null> | null
  detaljertFremdrift: Promise<DetaljertFremdriftDTO | null> | null
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

  function hasLink(rel: string) {
    return props.behandling._links && props.behandling._links[rel]
  }

  function debugButton() {
    if (hasLink('fjernFraDebug')) {
      return (
        <Tooltip content='Avslutt debugging slik at behandlingen forsetter automatisk'>
          <fetcher.Form method='post' action='fjernFraDebug'>
            <Button variant={'secondary'} icon={<SandboxIcon aria-hidden />}>
              Fjern fra debug
            </Button>
          </fetcher.Form>
        </Tooltip>
      )
    } else if (hasLink('taTilDebug')) {
      return (
        <Tooltip content='Pause automatisk behandling slik at behandlingen kan kjøres i debugger lokalt'>
          <fetcher.Form method='post' action='taTilDebug'>
            <Button variant={'secondary'} icon={<SandboxIcon aria-hidden />}>
              Ta til debug
            </Button>
          </fetcher.Form>
        </Tooltip>
      )
    } else {
      return <></>
    }
  }

  function fjernUtsattButton() {
    if (hasLink('fortsett')) {
      return (
        <Tooltip content='Fjerner utsatt tidspunkt slik at behandling kan kjøres umiddelbart'>
          <fetcher.Form method='post' action='fortsett'>
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

  function runButton() {
    if (hasLink('runBehandling')) {
      return (
        <Tooltip content='Kjører behandlingen lokalt'>
          <fetcher.Form method='post' action='runBehandling'>
            <Button
              variant={'secondary'}
              icon={<CogFillIcon aria-hidden />}
              name={'runBehandling'}
            >
              Kjør lokalt
            </Button>
          </fetcher.Form>
        </Tooltip>
      )
    } else {
      return <></>
    }
  }

  function stoppButton() {
    if (hasLink('stopp')) {
      return (
        <>
          <Tooltip content='Stopper behandlingen, skal kun gjøres om feil ikke kan løses på annen måte'>
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
              <fetcher.Form method='post' action='taTilDebug'>
                <Button type='button' variant='danger' onClick={stopp}>
                  Stopp behandling
                </Button>
              </fetcher.Form>
              <Button
                type='button'
                variant='secondary'
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

  function copyPasteEntry(name: string, value: string | number | null) {
    if (value) {
      return (
        <Entry labelText={`${name}`}>
          <HStack align='start'>
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
      <div className={'flex-grid'} style={{ paddingTop: '12px' }}>
        <div className={'col'}>
          <Box
            background={'surface-default'}
            style={{ padding: '6px' }}
            borderRadius='medium'
            shadow='medium'
          >
            <Card id={props.behandling.uuid}>
              <Card.Header>
                <Card.Heading>
                  {decodeBehandling(props.behandling.type)}
                </Card.Heading>
              </Card.Header>
              <Card.Body>
                <Card.Grid>
                  {copyPasteEntry('BehandlingId', props.behandling.behandlingId)}
                  {copyPasteEntry('Fødselsnummer', props.behandling.fnr)}
                  {copyPasteEntry('SakId', props.behandling.sakId)}
                  {copyPasteEntry('KravId', props.behandling.kravId)}
                  {copyPasteEntry('VedtakId', props.behandling.vedtakId)}
                  {copyPasteEntry('JournalpostId', props.behandling.journalpostId)}
                  {props.behandling.forrigeBehandlingId ? (
                    <Entry labelText={'Opprettet av behandling'}>
                      <Link
                        to={`/behandling/${props.behandling.forrigeBehandlingId}`}
                      >
                        {props.behandling.forrigeBehandlingId}
                      </Link>
                    </Entry>
                  ) : (
                    <></>
                  )}
                  {copyPasteEntry('JournalpostId', props.behandling.journalpostId)}

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
                </Card.Grid>
                <Card.Grid>
                  {fjernUtsattButton()}

                  {debugButton()}

                  {stoppButton()}

                  {runButton()}
                </Card.Grid>
                <Card.Grid>
                  <a
                    href={props.behandling.kibanaUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Kibana
                  </a>
                </Card.Grid>
              </Card.Body>
            </Card>
          </Box>
        </div>
        {props.detaljertFremdrift ? (
          <div className={'col'}>
            <Box
              background={'surface-default'}
              style={{ padding: '6px' }}
              borderRadius='medium'
              shadow='medium'
            >
              <Card.Header>
                <Card.Heading>
                  Fremdrift avhengige behandlinger
                  <Suspense fallback={<Loader size="small" title="Venter..." />}>
                    <Await resolve={props.detaljertFremdrift}>
                      {detaljertFremdrift =>
                        detaljertFremdrift ? (
                          ' ' + ((detaljertFremdrift.ferdig / detaljertFremdrift.totalt) * 100).toFixed(2) + '%'
                        ) : (
                          <></>
                        )
                      }
                    </Await>
                  </Suspense>
                </Card.Heading>
              </Card.Header>
              <Card>
                <Card.Grid>
                  <Suspense fallback={<Loader size='3xlarge' title='Venter...' />}>
                    <Await resolve={props.detaljertFremdrift}>
                      {detaljertFremdrift =>
                        detaljertFremdrift ? (
                          <BehandlingBatchDetaljertFremdriftBarChart detaljertFremdrift={detaljertFremdrift} />
                        ) : (
                          <>Mangler endepunkt for detaljertfremdrift</>
                        )
                      }
                    </Await>
                  </Suspense>
                </Card.Grid>
              </Card>
            </Box>
          </div>
        ) : (
          <></>
        )}
      </div>

      <Box
        background={'surface-default'}
        style={{ padding: '6px', marginTop: '12px' }}
        borderRadius='medium'
        shadow='medium'
      >
        <Tabs defaultValue={'kjoringer'}>
          <Tabs.List>
            <Tabs.Tab
              value='kjoringer'
              label='Kjøringer'
              icon={<TasklistIcon />}
            />
            <Tabs.Tab
              value='aktiviteter'
              label='Aktiviteter'
              icon={<TasklistIcon />}
            />
            {props.avhengigeBehandlinger ? (
              <Tabs.Tab
                value='behandlinger'
                label='Avhengige behandlinger'
                icon={<ClockDashedIcon />}
              />
            ) : (
              <></>
            )}
          </Tabs.List>
          <Tabs.Panel value='kjoringer'>
            <BehandlingKjoringerTable behandling={props.behandling} visAktivitetId={true} />
          </Tabs.Panel>
          <Tabs.Panel value='aktiviteter'>
            <BehandlingAktivitetTable behandling={props.behandling} />
          </Tabs.Panel>
          {props.avhengigeBehandlinger ? (
            <Tabs.Panel value='behandlinger'>
              <Suspense fallback={<SkeletonLoader />}>
                <Await resolve={props.avhengigeBehandlinger}>
                  {avhengigeBehandlinger =>
                    avhengigeBehandlinger ? (
                      <BehandlingerTable behandlingerResponse={avhengigeBehandlinger} />
                    ) : (
                      <></>
                    )
                  }
                </Await>
              </Suspense>
            </Tabs.Panel>
          ) : (
            <></>
          )}
        </Tabs>
      </Box>
    </>
  )
}
