import { useEffect, useMemo, useState } from 'react'
import useEase from 'use-easing'
import ShadertoyReact from 'shadertoy-react'
import fragments from './fragments'
import uniforms from './uniforms'
import * as easings from './easings'


function normalize(scale, x, y) {
  return {
    "uScale": { "type": "1f", "value": scale },
    "uPosition": { "type": "2f", "value": [x, y]}
  }
}

function Shader({ scene }) {
  const [current, setCurrent] = useState(0)
  const { value: scale, setTrigger: triggerScale } = useEase({
    start: uniforms.scenes[current].scale,
    end: uniforms.scenes[scene].scale,
    easingFn: easings.easeInOutBack,
    duration: 3,
    autoStart: false
  })

  const { value: x, setTrigger: triggerX } = useEase({
    start: uniforms.scenes[current].x,
    end: uniforms.scenes[scene].x,
    easingFn: easings.easeInOutSine,
    duration: 3,
    autoStart: false
  })

  const { value: y, setTrigger: triggerY } = useEase({
    start: uniforms.scenes[current].y,
    end: uniforms.scenes[scene].y,
    easingFn: easings.easeInOutBack,
    duration: 6,
    autoStart: false
  })

  const u = useMemo(() => normalize(scale, x, y), [scale, x, y])

  useEffect(() => {
    if (scene !== current) {
      setCurrent(scene)
      triggerX(true)
      triggerY(true)
      triggerScale(true)
    }
  }, [current, scene, setCurrent, triggerScale, triggerX, triggerY])

  // useEffect(() => {
  //   console.log(`%c [debug] what`, 'color:deeppink')
  // }, [scene, triggerScale])

  console.log(`%c [debug] scale`, 'color:deeppink', scale)
  console.log(`%c [debug] u`, 'color:deeppink', u)
  return (
    <ShadertoyReact fs={fragments} uniforms={u} />
  )
}

export default Shader
