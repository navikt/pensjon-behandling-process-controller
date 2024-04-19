import { Alert, Box, CopyButton, Tabs } from '@navikt/ds-react'
import { TasklistIcon } from '@navikt/aksel-icons'
import React from 'react'
import xmlFormat from 'xml-formatter'
import Diff from '~/components/behandling/Diff'

export interface Props {
  debugJson: string
}

function prettyXml(xml: string | null): string {
  if (xml) {
    return xmlFormat(xml, {
      indentation: '  ',
      filter: (node) => node.type !== 'Comment',
      collapseContent: true,
      lineSeparator: '\n'
    })
} else {
    return ''
  }
}

export default function RtvBrevSammenligning(props: Props) {
  let data = JSON.parse(props.debugJson)

  let busXml = prettyXml(data.busXml)
  let penXml = prettyXml(data.penXml)

  let resultat
  if (data.differences) {
    if (data.differences.length > 0) {
      resultat = <Alert variant="error">Det er {data.differences.length} forskjeller</Alert>
    } else {
      resultat = <Alert variant="success">Generet XML er lik</Alert>
    }
  } else {
      resultat = <Alert variant="warning">Resultat av XML Unit Diff mangler</Alert>
  }

  return (
    <Box
      background={'surface-default'}
      style={{ padding: '6px' }}
      borderRadius='medium'
      shadow='medium'
    >
      {resultat}

      <CopyButton copyText={busXml} size={'xsmall'} text="Bus xml"/>
      <CopyButton copyText={penXml} size={'xsmall'} text="Pen xml"/>


      <Tabs defaultValue={'xmlDiff'}>
        <Tabs.List>
          <Tabs.Tab
            value='xmlDiff'
            label='XML Diff'
            icon={<TasklistIcon />}
          />
          <Tabs.Tab
            value='xmlUnitDiff'
            label='XML Unit Diff'
            icon={<TasklistIcon />}
          />
          <Tabs.Tab
            value='busXml'
            label='BUS'
            icon={<TasklistIcon />}
          />
          <Tabs.Tab
            value='penXml'
            label='pen'
            icon={<TasklistIcon />}
          />
        </Tabs.List>
        <Tabs.Panel value='xmlDiff'>
          <Diff oldStr={busXml} newStr={penXml} />
        </Tabs.Panel>
        <Tabs.Panel value='xmlUnitDiff'>
          <CopyButton copyText={busXml} size={'xsmall'} text="Bus xml"/>
          <CopyButton copyText={penXml} size={'xsmall'} text="Pen xml"/>
          <pre>
            {JSON.stringify(data.differences, null, 2)}
          </pre>
        </Tabs.Panel>
        <Tabs.Panel value='busXml'>
          <pre>{busXml}</pre>
        </Tabs.Panel>
        <Tabs.Panel value='penXml'>
          <pre>{penXml}</pre>
        </Tabs.Panel>
      </Tabs>
    </Box>
  )
}
