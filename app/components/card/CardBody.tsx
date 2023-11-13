import React, { ForwardedRef, forwardRef, useContext } from 'react'
import { OverridableComponent } from '@navikt/ds-react'
import cl from 'clsx'
import styles from './Card.module.css'
import { CardContext } from './CardContext'

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export type CardBodyType = OverridableComponent<Props, HTMLElement>

export const CardBody: CardBodyType = forwardRef(
  (
    { children, className, as: Component = 'div', ...rest },
    ref: ForwardedRef<HTMLElement>,
  ) => {
    const { isOpen, collapsable } = useContext(CardContext)

    if (!isOpen && collapsable) return null
    return (
      <Component
        className={cl(className, styles.cardBody.toString())}
        ref={ref}
        {...rest}
      >
        {children}
      </Component>
    )
  },
)
