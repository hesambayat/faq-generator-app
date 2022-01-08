import { useMemo } from 'react'
import Tooltip from '../Tooltip'

const Button = ({ children, className, disabled, variant, title, ...props }) => {
  const classNames = useMemo(() => {
    const names = ['button']
    if (variant) names.push(`button--${variant}`)
    if (disabled) names.push('disabled')
    if (className) names.push(className)
    return names.join(' ')
  }, [className, disabled, variant])

  if (disabled && title) {
    return (
      <Tooltip title={title} interactive>
        <div className={classNames}>{children}</div>
      </Tooltip>
    )
  }

  return (
    <button className={classNames} disabled={disabled} {...props}>{children}</button>
  )
}

export default Button
