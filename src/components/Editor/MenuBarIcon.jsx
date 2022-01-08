import Tooltip from '../Tooltip'

const MenuBarIcon = ({ active, menuId, title, ...props }) => {
  return (
    <Tooltip title={title}>
      <button 
        {...props}
        className={active ? 'is-active' : ''}
      >
        <i className={`i i-format-${menuId}`} />
      </button>
    </Tooltip>
  )
}

export default MenuBarIcon
