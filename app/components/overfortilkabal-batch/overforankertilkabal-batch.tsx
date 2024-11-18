import { Button, Detail, FileObject, UNSAFE_FileUpload, VStack } from '@navikt/ds-react'
import React, { useState } from 'react'
import { Form, useSubmit } from '@remix-run/react'

export default function OverforAnkerTilKabalBatch() {

  const [files, setFiles] = useState<FileObject[]>([]);

  const submit = useSubmit();

  async function submitForm() {
    console.log("Submitter form!")
    const file = files[0]!.file;
    const content = JSON.parse(await file.text());
    submit({request: content}, {method: 'POST', encType: 'application/json'});
  }

  return <Form name="overfortilkabal" method='POST' encType="multipart/form-data">
  <VStack gap="6">
    <Detail>{"Nødvendig format: {dry_run: boolean, vedtak_list:[{vedtak_id: string}]}"}</Detail>
    <UNSAFE_FileUpload.Dropzone
      label="Last opp fil. "
      fileLimit={{ max: 1, current: files.length }}
      multiple={false}
      onSelect={setFiles}
    />
    {files.map((file) => (
      <UNSAFE_FileUpload.Item
        key={file.file.name}
        file={file.file}
        button={{
          action: "delete",
          onClick: () => setFiles([]),
        }}
      />
    ))}
    <Button onClick={submitForm} disabled={files.length == 0}>Start behandling</Button>
  </VStack>
  </Form>;
}

