import CheckboxFromEntries from '~/components/rtv-brev-sammenligning/CheckboxFromEntries'
import { Sakstyper, Vedtakstyper } from '~/enums'
import BrevgruppeValg from '~/components/rtv-brev-sammenligning/BrevgruppeValg'

export default function OpprettVedtakRtvBrevSammenligning() {

    return (
      <>
        <BrevgruppeValg></BrevgruppeValg>
        <CheckboxFromEntries name="sakType" legend="Sakstyper"
                             entries={Object.entries(Sakstyper)}></CheckboxFromEntries>
        <CheckboxFromEntries name="vedtakType" legend="Vedtakstyper"
                             entries={Object.entries(Vedtakstyper)}></CheckboxFromEntries>
        <p>
          Maks antall per sak og vedtakstype
          <input
            aria-label='Maks antall'
            name='maksAntall'
            type='number'
            placeholder='Maks antall'
          />
        </p>
        <p>
          Årstall:
          <input
            aria-label='Årstall'
            name='ar'
            type='number'
            placeholder='Årstall'
          />
        </p>
      </>

    )
}
