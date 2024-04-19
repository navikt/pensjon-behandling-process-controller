import { Box, CopyButton, Tabs } from '@navikt/ds-react'
import { TasklistIcon } from '@navikt/aksel-icons'
import React from 'react'
import xmlFormat from 'xml-formatter';

export interface Props {
  debugJson: string
}

function prettyXml(xml: string | null): string {
  if (xml) {
    console.log("oh so pretty")
  let perty = xmlFormat(xml, {
    indentation: '  ',
    filter: (node) => node.type !== 'Comment',
    collapseContent: true,
    lineSeparator: '\n'
  })
    console.log(perty)
    return perty
} else {
    return ''
  }
}

export default function RtvBrevSammenligning(props: Props) {
  let data = JSON.parse(props.debugJson)

  let busXml = prettyXml(data.busXml)
  let penXml = prettyXml(data.penXml)

  return (
    <Box
      background={'surface-default'}
      style={{ padding: '6px' }}
      borderRadius='medium'
      shadow='medium'
    >
      <Tabs defaultValue={'forskjeller'}>
        <Tabs.List>
          <Tabs.Tab
            value='forskjeller'
            label='Forskjeller'
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
        <Tabs.Panel value='forskjeller'>
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
