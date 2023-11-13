import React, { ForwardedRef, forwardRef } from 'react'
import { OverridableComponent } from '@navikt/ds-react'
import cl from 'clsx'
import styles from './Card.module.css'

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export type CardGridType = OverridableComponent<Props, HTMLElement>

export const CardGrid: CardGridType = forwardRef(
  (
    { children, className, as: Component = 'div', ...rest },
    ref: ForwardedRef<HTMLElement>,
  ) => {
    return (
      <Component className={cl(className, styles.cardGrid)} ref={ref} {...rest}>
        {children}
      </Component>
    )
  },
)
