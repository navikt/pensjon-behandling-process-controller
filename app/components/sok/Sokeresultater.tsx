import React from "react";
import BehandlingerTable from "../behandlinger-table/BehandlingerTable";
import type { BehandlingDto } from '~/types'
import { Sokefelt } from "./Sokefelt";



interface Props  {
    behandling: BehandlingDto
}


export function Sokeresultater(props: Props) {


    return <div><Sokefelt></Sokefelt>
    {/*some resultat container*/}</div>
}
