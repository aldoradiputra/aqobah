import type { CSSProperties, ReactNode } from 'react'

export function Panel({
  title,
  action,
  children,
  noPad = false,
  style,
}: {
  title: ReactNode
  action?: ReactNode
  children?: ReactNode
  noPad?: boolean
  style?: CSSProperties
}) {
  return (
    <div className="panel" style={style}>
      <div className="panel-header">
        <h3 className="panel-title">{title}</h3>
        {action}
      </div>
      {noPad ? children : <div className="panel-body">{children}</div>}
    </div>
  )
}
