import { Search } from "@navikt/ds-react";
import { getSokeresultater } from "~/services/behandling.server";
import type { BehandlingDto } from '~/types'


const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
        getSokeresultater(
            "a","123"
        )
  
}


export function Sokefelt() {
    return  (  
    <form onSubmit = {handleSubmit}>
    <Search label="SakId" variant="primary" />
    </form>) 
} 