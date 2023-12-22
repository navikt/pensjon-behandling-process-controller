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
import { Search } from "@navikt/ds-react";

export const loader = async ({ request }: ActionFunctionArgs) => {
  const accessToken = await requireAccessToken(request)
  const sokResponse = await getSokeresultater(accessToken, "22976726")
  if (!sokResponse) {
    throw new Response('Not Found', { status: 404 })
  }

  return json({ behandlingerResponse: sokResponse })
}

export default function Sok() {

  const { behandlingerResponse } = useLoaderData<typeof loader>()
    return (<div>   
       <form >
      <Search label="SakId" variant="primary" />
      </form>
        <Sokeresultater behandlingerResponse={behandlingerResponse} ></Sokeresultater>
        </div>
    )
}