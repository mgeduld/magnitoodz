import * as React from 'react'

interface IProps {
  color: string
  chunkSize: number
  unit?: string
}

export const DashTranslation: React.SFC<IProps> = ({
  color,
  chunkSize,
  unit
}) => {
  return (
    <div className="mt0 mb0 ml4">
      <span>
        <span className={color}>-</span>
        <span>
          {' '}
          a single dash above equals {chunkSize.toLocaleString()} {unit && unit}{' '}
        </span>
      </span>
    </div>
  )
}
