import { Box, CopyButton, Tabs } from '@navikt/ds-react'
import { TasklistIcon } from '@navikt/aksel-icons'
import React from 'react'

export interface Props {
  debugJson: string
}

export default function RtvBrevSammenligning(props: Props) {
  let data = JSON.parse(props.debugJson)
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
          <CopyButton copyText={data.busXml} size={'xsmall'} text="Bus xml"/>
          <CopyButton copyText={data.penXml} size={'xsmall'} text="Pen xml"/>
                          <pre>
                  {JSON.stringify(data.differences, null, 2)}
                </pre>
        </Tabs.Panel>
        <Tabs.Panel value='busXml'>
                          <pre>
                  {data.busXml}
                </pre>
        </Tabs.Panel>
        <Tabs.Panel value='penXml'>
                          <pre>
                  {data.penXml}
                </pre>
        </Tabs.Panel>
      </Tabs>
    </Box>
  )
}
