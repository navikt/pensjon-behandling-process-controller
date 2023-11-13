import React, { forwardRef, useState } from 'react'
import styles from './Card.module.css'
import cl from 'clsx'
import { CardGrid, CardGridType } from './CardGrid'
import { CardBody, CardBodyType } from './CardBody'
import { CardHeader, CardHeaderType } from './CardHeader'
import { CardHeading, CardHeadingType } from './CardHeading'
import { CardContext } from './CardContext'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  spacingBottom?: string
  children: React.ReactNode
  collapsable?: boolean
}

export interface CardType
  extends React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLDivElement>
  > {
  Body: CardBodyType
  Grid: CardGridType
  Header: CardHeaderType
  Heading: CardHeadingType
}

export const Card = forwardRef(
  ({ spacingBottom = '0', collapsable = false, children, ...rest }, ref) => {
    const [isOpen, setIsOpen] = useState(true)
    const cardBottomSpacingMap = new Map<string, string>([
      ['0', styles.cardBottomSpacing0],
      ['05', styles.cardBottomSpacing05],
      ['1', styles.cardBottomSpacing1],
      ['2', styles.cardBottomSpacing2],
      ['3', styles.cardBottomSpacing3],
      ['4', styles.cardBottomSpacing4],
      ['5', styles.cardBottomSpacing5],
      ['6', styles.cardBottomSpacing6],
      ['7', styles.cardBottomSpacing7],
      ['8', styles.cardBottomSpacing8],
      ['9', styles.cardBottomSpacing9],
      ['10', styles.cardBottomSpacing10],
      ['11', styles.cardBottomSpacing11],
      ['12', styles.cardBottomSpacing12],
      ['14', styles.cardBottomSpacing14],
      ['16', styles.cardBottomSpacing16],
      ['18', styles.cardBottomSpacing18],
      ['20', styles.cardBottomSpacing20],
      ['24', styles.cardBottomSpacing24],
      ['32', styles.cartBottomSpacing32],
    ])

    const getSpacing = (spacing: string): string => {
      return cardBottomSpacingMap.get(spacing) ?? ''
    }

    return (
      <CardContext.Provider value={{ isOpen, setIsOpen, collapsable }}>
        <div
          className={cl(styles.card, getSpacing(spacingBottom))}
          ref={ref}
          {...rest}
        >
          {children}
        </div>
      </CardContext.Provider>
    )
  },
) as CardType

Card.Body = CardBody
Card.Grid = CardGrid
Card.Header = CardHeader
Card.Heading = CardHeading

export default Card
