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
  sisteKjoring: string
  utsattTil: string | null
  stoppet: string | null
  opprettet: string
  status: string
  prioritet: number
  aktiviteter: AktivitetDTO[]

  fnr: string | null
  sakId: number | null
  kravId: number | null
  vedtakId: number | null
  journalpostId: string | null
  kibanaUrl?: string
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
