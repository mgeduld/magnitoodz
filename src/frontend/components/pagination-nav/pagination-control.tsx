import * as React from 'react'
import { Rune } from './enums/rune'

interface IProps {
  clickHandler: (event: React.MouseEvent<HTMLDivElement>) => void
  rune: Rune
}

export const PaginationControl: React.SFC<IProps> = ({
  clickHandler,
  rune
}) => {
  return (
    <div className="pointer w2 tc" onClick={clickHandler}>
      {rune}
    </div>
  )
}
