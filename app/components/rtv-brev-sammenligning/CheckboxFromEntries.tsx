import { Checkbox, CheckboxGroup } from '@navikt/ds-react'
import { useState } from 'react'

interface props {
  entries: [string, string][],
  name: string,
  legend: string,
}

export default function CheckboxFromEntries(props: props) {
  const [valgteEntries, setValgteEntries] = useState<string[]>([])

  const velgEntry = (value: string) => setValgteEntries((list) => list.includes(value) ? list.filter((id) => id !== value) : [...list, value])

  return (<div>
      <CheckboxGroup
        name={props.legend}
        legend={props.legend}
        size='small'
        value={valgteEntries}
      >
        {props.entries.map(([key, value]) => {
          return <Checkbox
            name={props.name}
            key={key}
            value={key}
            onChange={() => velgEntry(key)}
          >
            {value}
          </Checkbox>
        })}
      </CheckboxGroup>
    <Checkbox
      checked={valgteEntries.length === props.entries.length}
      indeterminate={valgteEntries.length > 0 && valgteEntries.length !== props.entries.length}
      onChange={() => {
        valgteEntries.length ? setValgteEntries([]) : setValgteEntries(props.entries.map(([key]) => {
          return key
        }))
      }}
      size="small"
    >
      Velg alle
    </Checkbox>

    </div>)
}
