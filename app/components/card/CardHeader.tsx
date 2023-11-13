import React, { ForwardedRef, forwardRef, useContext } from 'react'
import { OverridableComponent, Tooltip } from '@navikt/ds-react'
import { Expand, Collapse } from '@navikt/ds-icons'
import cl from 'clsx'
import styles from './Card.module.css'
import { CardContext } from './CardContext'

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export type CardHeaderType = OverridableComponent<Props, HTMLElement>

const ExpandButton: React.FC<{ isOpen: boolean }> = ({ isOpen }) =>
  !isOpen ? (
    <div className={styles.cardChevron}>
      <Tooltip content="Utvid" placement="left">
        <Expand className={styles.cardChevronSvg} />
      </Tooltip>
    </div>
  ) : (
    <div className={styles.cardChevron}>
      <Tooltip content="Minimer" placement="left">
        <Collapse className={styles.cardChevronSvg} />
      </Tooltip>
    </div>
  )

export const CardHeader: CardHeaderType = forwardRef(
  (
    { children, className, as: Component = 'div', ...rest },
    ref: ForwardedRef<HTMLElement>,
  ) => {
    const { isOpen, setIsOpen, collapsable } = useContext(CardContext)
    return (
      <Component
        aria-expanded={collapsable ?? isOpen}
        className={cl(className, styles.cardHeader, {
          [styles.cardCollapsable]: collapsable,
        })}
        ref={ref}
        {...rest}
        onClick={() => collapsable && setIsOpen(!isOpen)}
        role={collapsable ? 'button' : null}
        tabIndex={collapsable ? '0' : '-1'}
      >
        <div className={styles.cardHeaderContent}>{children}</div>
        {collapsable && <ExpandButton isOpen={isOpen} />}
      </Component>
    )
  },
)
