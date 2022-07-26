import ShadertoyReact from 'shadertoy-react'
import fragments from './fragments'

function Shader() {

  return (
    <ShadertoyReact fs={fragments} />
  )
}

export default Shader
