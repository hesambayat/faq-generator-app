import { useMemo } from 'react'

const Alert = ({ children, className, variant, ...props }) => {
  const classNames = useMemo(() => {
    const names = ['alert']
    if (variant) names.push(`alert--${variant}`)
    if (className) names.push(className)
    return names.join(' ')
  }, [className, variant])

  
  return (
    <div className={classNames} role="alert" {...props}>
      {children}
    </div>
  )
}

export default Alert
