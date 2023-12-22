import { Search } from "@navikt/ds-react";
import { getSokeresultater } from "~/services/behandling.server";
import type { BehandlingDto } from '~/types';
import { requireAccessToken } from '~/services/auth.server';


{/*const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const accessToken = await requireAccessToken(request)
    e.preventDefault()
        getSokeresultater(
            "22958049",accessToken
        )
  
}*/}


export function Sokefelt() {
    return  (  
    <form >
    <Search label="SakId" variant="primary" />
    </form>) 
} 