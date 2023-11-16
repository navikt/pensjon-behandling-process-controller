export enum Behandlingstatus {
  OPPRETTET,
  UNDER_BEHANDLING,
  FULLFORT,
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

export interface BehandlingerResponse {
  behandlinger: BehandlingDto[]
}
