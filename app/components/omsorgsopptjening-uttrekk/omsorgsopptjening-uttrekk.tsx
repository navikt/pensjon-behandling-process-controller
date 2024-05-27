import React, { useState } from 'react'
import { FileObject, UNSAFE_FileUpload, VStack } from '@navikt/ds-react'
import { Form } from '@remix-run/react'

export default function OpprettOmsorgsopptjeningUttrekk() {

  const Filopplasting = () => {

    const [files, setFiles] = useState<FileObject[]>([])

    return (
      <VStack gap='6'>
        <UNSAFE_FileUpload.Dropzone
          label='Last opp fil'
          fileLimit={{ max: 1, current: files.length }}
          multiple={false}
          onSelect={setFiles}
        />
        {files.map((file) => (
          <UNSAFE_FileUpload.Item
            key={file.file.name}
            file={file.file}
            button={{
              action: 'delete',
              onClick: () => setFiles([]),
            }}
          />
        ))}
      </VStack>
    )
  }

  return (
    <Form method='POST'>
      <Filopplasting />
      <p>
        <button type='submit'>Opprett</button>
      </p>
    </Form>
  )
}

