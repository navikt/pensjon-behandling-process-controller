export enum Behandlingstatus {
  OPPRETTET,
  UNDER_BEHANDLING,
  FULLFORT,
  STOPPET,
  DEBUG,
}

export enum Aktivitetstatus {
  OPPRETTET,
  FEILET,
  FULLFORT,
  UNDER_BEHANDLING,
}

export type BehandlingDto = {
  behandlingId: number
  type: string
  uuid: string
  funksjonellIdentifikator: string
  forrigeBehandlingId: number | null
  sisteKjoring: string
  utsattTil: string | null
  stoppet: string | null
  opprettet: string
  status: string
  prioritet: number
  behandlingKjoringer: BehandlingKjoringDTO[]
  aktiviteter: AktivitetDTO[]

  fnr: string | null
  sakId: number | null
  kravId: number | null
  vedtakId: number | null
  journalpostId: string | null
  kibanaUrl?: string

  _links?: HalLinks
}

export type BehandlingKjoringDTO = {
  behandlingKjoringId: number
  behandlingId: number
  aktivitetId: number | null
  startet: string
  avsluttet: string
  correlationId: string
  feilmelding: string | null
  stackTrace: string | null

  _links?: HalLinks
}

export type AktivitetDTO = {
  aktivitetId: number
  type: string
  opprettet: string
  uuid: string
  funksjonellIdentifikator: string
  antallGangerKjort: number
  sisteAktiveringsdato: string
  status: string
  utsattTil: string | null
  ventPaForegaendeAktiviteter: boolean
}

export type BehandlingerPage = {
  content: BehandlingDto[]

  pageable: string
  totalPages: number
  totalElements: number
  last: boolean
  first: boolean
  numberOfElements: number
  number: number
  size: number
  empty: boolean

  sort: PageSort
}

export type PageSort = {
  unsorted: boolean
  sorted: boolean
  empty: boolean
}

export type BehandlingAntall = {
  navn: string
  antall: number
}

export type DatoAntall = {
  dato: string
  antall: number
}

export type DashboardResponse = {
  totaltAntallBehandlinger: number
  feilendeBehandlinger: number
  antallUferdigeBehandlinger: number
  ukjenteBehandlingstyper: string[]
  behandlingAntall: BehandlingAntall[]
  opprettetPerDag: DatoAntall[]
}

export interface HalLink {
  href: string
  type: string
}

export interface HalLinks {
  [s: string]: HalLink | HalLink[]
}

export type StartBatchResponse = {
  behandlingId: number
}

export type BehandlingSearchResult = {
   behandlingId: number,
   type: string,
   uuid: string,
   funksjonellIdentifikator: string,
   forrigeBehandlingId: number,
   sisteKjoring: string | null,
   utsattTil:  string | null,
   opprettet:  string | null,
   stoppet:  string | null,
   status: string,
   prioritet: number
}
