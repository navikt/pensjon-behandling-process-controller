
import BehandlingerTable from "../behandlinger-table/BehandlingerTable";
import type { BehandlingDto, BehandlingerPage } from '~/types'



interface Props  {
    behandlingerResponse: BehandlingerPage
}


export function Sokeresultater(props: Props) {


    return <div>
    <BehandlingerTable
    behandlingerResponse={props.behandlingerResponse}></BehandlingerTable></div>
}
