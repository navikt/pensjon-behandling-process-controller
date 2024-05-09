import BrevgruppeValg from '~/components/rtv-brev-sammenligning/BrevgruppeValg'

export default function OpprettAutobrevRtvBrevSammenligning() {
  return (<>
      <BrevgruppeValg></BrevgruppeValg>
      <p>
        Maks antall:
        <input
          aria-label='Maks antall'
          name='maksAntall'
          type='number'
          placeholder='Maks antall'
        />
      </p>
      <p>
        Start AutobrevId:
        <input
          aria-label='Start AutobrevId'
          name='startAutobrevId'
          type='number'
          placeholder='Start AutobrevId'
        />
      </p>
    </>)
}
