import type { ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { requireAccessToken } from '~/services/auth.server'
import { getSokeresultater } from '~/services/behandling.server'
import { useLoaderData } from '@remix-run/react'
import { HGrid } from '@navikt/ds-react'
import {
  ClipboardFillIcon,
  CogFillIcon,
  ExclamationmarkTriangleFillIcon,
  XMarkOctagonFillIcon,
} from '@navikt/aksel-icons'
import { formatNumber } from '~/common/number'
import { DashboardCard } from '~/components/dashboard-card/DashboardCard'
import { BehandlingAntallTableCard } from '~/components/behandling-antall-table/BehandlingAntallTableCard'
import { BehandlingerPerDagLineChartCard } from '~/components/behandlinger-per-dag-linechart/BehandlingerPerDagLineChartCard'
import { Sokeresultater } from '~/components/sok/Sokeresultater'
import { Sokefelt } from '~/components/sok/Sokefelt'

export const loader = async ({ request }: ActionFunctionArgs) => {
  const accessToken = await requireAccessToken(request)
  const sokResponse = await getSokeresultater(accessToken)
  if (!sokResponse) {
    throw new Response('Not Found', { status: 404 })
  }

  return json({ dashboardResponse: sokResponse })
}

export default function Sok() {
    return (
        <Sokefelt></Sokefelt>
    )
}