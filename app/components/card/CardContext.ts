import { createContext } from 'react'

export interface ICardContext {
  isOpen: boolean
  setIsOpen: (k: boolean) => void
  collapsable: boolean
}

export const CardContext = createContext<ICardContext>({
  isOpen: false,
  setIsOpen: console.log,
  collapsable: false,
})
