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
  opprettet: string
  status: string
  prioritet: number
  aktiviteter: AktivitetDTO[]
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
