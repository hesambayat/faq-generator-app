import { cloneElement, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

const SITE_PADDING = 20

const Tooltip = ({ children, title, displayOnClick = false, interactive = false }) => {
  const ref = useRef(null)
  const [rect, setRect] = useState()
  const [style, setStyle] = useState(null)
  const [coord, setCoord] = useState({ x: 0, y: 0 })
  const classNames = useMemo(() => {
    const classNames = ['tooltip']
    if (!displayOnClick) classNames.push('tooltip--delayed')
    return classNames.join(' ')
  }, [displayOnClick])
  const dismiss = useCallback(() => setRect(null), [])
  const display = useCallback((e) => setRect(e.currentTarget.getBoundingClientRect()), [])
  const onClick = useCallback((e) => {
    displayOnClick ? display(e) : dismiss()
    children?.props?.onClick && children.props.onClick(e)
  }, [children?.props, dismiss, display, displayOnClick])
  const onMouseLeave = useCallback((e) => {
    dismiss()
    children?.props?.onMouseLeave && children.props.onMouseLeave(e)
  }, [children?.props, dismiss])
  const onMouseOver = useCallback((e) => {
    display(e)
    children?.props?.onMouseOver && children.props.onMouseOver(e)
  }, [children?.props, display])
  const onMouseMove = useCallback((e) => {
    setCoord({
      x: e.clientX,
      y: e.clientY
    })
    children?.props?.onMouseMove && children.props.onMouseMove(e)
  }, [children?.props])
  useLayoutEffect(() => {
    if (ref.current === null) return

    let { height, width } = ref.current.getBoundingClientRect()
    let bottom = interactive ? coord.y + 60 : rect.bottom + rect.height
    let l = interactive ? coord.x : rect.left
    let t = interactive ? coord.y : rect.top
    let x = l + width + SITE_PADDING > window.innerWidth ? window.innerWidth - width - SITE_PADDING : l
    let y = t - height < 1 ? bottom + (height / 2) : t

    setStyle({
      top: `${y}px`,
      left: `${x}px`,
    })
  }, [coord, interactive, rect, ref])
  useEffect(() => {
    window.addEventListener('scroll', dismiss)
    return () => window.removeEventListener('scroll', dismiss)
  }, [dismiss])

  return (
    <>
      {cloneElement(children, {
        onClick,
        onMouseOver,
        onMouseLeave,
        onMouseMove
      })}
      {rect && <span ref={ref} className={classNames} style={style}>{title}</span>}
    </>
  )
}

export default Tooltip
