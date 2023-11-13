export function splitOnCapitals(string: string) {
  let match = string.match(/[A-Z][a-z]+/g)
  if (match) {
    return match.join(' ')
  } else {
    return string
  }
}
export function decodeBehandling(string: string) {
  switch (string) {
    case 'DodsmeldingBehandling':
      return 'Dødsmelding'
    case 'IverksettVedtakBehandling':
      return 'Iverksett vedtak'
    case 'FleksibelApSakBehandling':
      return 'Alderspensjonssøknad'
    case 'IverksettOmsorgspoengBehandling':
      return 'Iverksett omsorgspoeng'

    default:
      return splitOnCapitals(string.replace(/Behandling$/, ''))
  }
}
