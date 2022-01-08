import { Tooltip } from '../../components'

const Info = ({ children }) => (
  <Tooltip title={children} displayOnClick>
    <span className="info">
      <i className="i i-info" />
    </span>
  </Tooltip>
)

export default Info
