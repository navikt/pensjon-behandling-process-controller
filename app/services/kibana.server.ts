import type { BehandlingDto } from '~/types'
import { utcToZonedTime } from 'date-fns-tz'
import { env } from '~/services/env.server'

export function kibanaLink(behandling: BehandlingDto) {
  const application = env.penApplication
  const timeZone = 'Europe/Oslo'
  const opprettetDate = new Date(behandling.opprettet)
  const sisteKjoringDate = new Date(behandling.sisteKjoring)
  const femMinutter = 5 * 60 * 1000

  const adjustToNorwegianTime = (date: Date) => {
    return utcToZonedTime(date, timeZone)
  }

  const startTime = adjustToNorwegianTime(
    new Date(opprettetDate.getTime() - femMinutter)).toISOString()
  const endTime = adjustToNorwegianTime(
    new Date(sisteKjoringDate.getTime() + femMinutter)).toISOString()

  const refreshInterval = `(refreshInterval:(pause:!t,value:0),time:(from:'${startTime}',to:'${endTime}'))`
  const query = `(language:kuery,query:'application:%22${application}%22%20AND%20x_behandlingId:%22${behandling.behandlingId}%22')`
  return `https://logs.adeo.no/app/kibana#/discover?_g=${refreshInterval}&_a=(columns:!(level,message),grid:(columns:(level:(width:63))),index:'96e648c0-980a-11e9-830a-e17bbd64b4db',interval:auto,query:${query},sort:!(!('@timestamp',desc)))`
}
