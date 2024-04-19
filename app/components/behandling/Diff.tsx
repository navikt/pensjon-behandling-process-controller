import React from 'react'
import * as diff from 'diff'
import type { Change } from 'diff'

export interface Props {
  oldStr: string
  newStr: string
}

export default function Diff(props: Props) {
  return <span>{
    diff.diffLines(props.oldStr, props.newStr).map((group: Change) => {

    if (group.added) {
      return <pre
        key={group.count}
        style={{
          color: 'var(--a-surface-success)',
          backgroundColor: 'var(--a-surface-success-subtle)',
        }}
      >
        {group.value}
      </pre>

    } else if (group.removed) {
      return <pre
        key={group.count}
        style={{
          color: 'var(--a-surface-danger)',
          backgroundColor: 'var(--a-surface-danger-subtle)',
        }}
      >
        {group.value}
      </pre>
    } else {
      return <pre
        key={group.count}
      >
        {group.value}
      </pre>
    }
  })
  }</span>
}
