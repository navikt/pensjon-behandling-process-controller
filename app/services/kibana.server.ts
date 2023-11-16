import type { BehandlingDto } from '~/types'
import { env } from '~/services/env.server'

export function kibanaLink(behandling: BehandlingDto) {
  const minuteMultiplier = 60000
  const application = env.penApplication

  const startTime = new Date(
    new Date(behandling.opprettet).getTime() - 5 * minuteMultiplier,
  ).toISOString()
  const endTime = new Date(
    new Date(behandling.sisteKjoring).getTime() + 5 * minuteMultiplier,
  ).toISOString()

  const refreshInterval = `(refreshInterval:(pause:!t,value:0),time:(from:'${startTime}',to:'${endTime}'))`
  const query = `(language:kuery,query:'application:%22${application}%22%20AND%20x_behandlingId:%22${behandling.behandlingId}%22')`
  return `https://logs.adeo.no/app/kibana#/discover?_g=${refreshInterval}&_a=(columns:!(level,message),grid:(columns:(level:(width:63))),index:'logstash-*',interval:auto,query:${query},sort:!(!('@timestamp',desc)))`
}