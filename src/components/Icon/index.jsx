const Icon = ({ icon, ...props }) => {
  return (
    <button className="icon" {...props}>
      <i className={`i i-${icon}`} />
    </button>
  )
}

export default Icon
