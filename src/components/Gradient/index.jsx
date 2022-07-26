import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

function toFixed(n) {
  return Number(n.toFixed(3))
}

function opaqued(color, alpha) {
  return `rgba(${color.concat(alpha).join(',')})`
}

function clamp(a, b) {
  return function (x) {
    return Math.max(a, Math.min(b, x))
  }
}

function smoothStep(min, max) {
  return function (x) {
    const v = clamp(0, 1)((x - min) / (max - min))
    const s = v * v * (3 - 2 * v)
    return toFixed(s)
  }
}

let scrollEmitter = null

const smooth = smoothStep(0, 1)

function Circle(props, ctx) {
  let x = props.x,
    y = props.y,
    r = props.radius,
    velocity = props.animation.velocity,
    distanceFromCenter = props.animation.distanceFromCenter,
    boundaries = {
      x: {
        min: props.x0 ? r : -100000,
        max: props.x1 ? ctx.canvas.width - r : 100000,
      },
      y: {
        min: props.y0 ? r : -100000,
        max: props.y1 ? ctx.canvas.height - r : 100000,
      }
    },
    radians = 0,
    gradient

  this.draw = function () {
    gradient = ctx.createRadialGradient(x, y, 0, x, y, r)
    for (let i = 0; i <= 1; i += 0.1) {
      gradient.addColorStop(
        toFixed(i),
        opaqued(props.color, toFixed(1.0 - smooth(i)))
      )
    }

    ctx.fillStyle = gradient
    ctx.fillRect(x - r, y - r, 2 * r, 2 * r)
  }

  this.update = function (ctx) {
    radians += velocity
    // x = Math.max(Math.min((ctx.canvas.width * props.x) + Math.cos(radians) * (ctx.canvas.width * distanceFromCenter), boundaries.x.max), boundaries.x.min)
    // y = Math.max(Math.min((ctx.canvas.height * props.y) + Math.sin(radians) * (ctx.canvas.height * distanceFromCenter), boundaries.y.max), boundaries.y.min)

    x = (ctx.canvas.width * props.x) + Math.cos(radians) * (ctx.canvas.width * distanceFromCenter)
    y = (ctx.canvas.height * props.y) + Math.sin(radians) * (ctx.canvas.width * distanceFromCenter)

    this.draw()
  }
}

const COLOR_PRIMARY = [111, 42, 219] // blue
const COLOR_SECONDARY = [255, 127, 38] // orange
const COLOR_TERTIARY = [229, 76, 69] // red
const PARTICLES = {
  progress: [
    {
      "x": 0.1,
      "y": 0.17,
      "radius": 36,
      "color": COLOR_TERTIARY,
      "animation": {
        "velocity": 0.16,
        "distanceFromCenter": 0.07
      }
    },
    {
      "x": 0.1,
      "y": 0.17,
      "radius": 36,
      "color": COLOR_TERTIARY,
      "animation": {
        "velocity": 0.17,
        "distanceFromCenter": 0.07
      }
    },
    {
      "x": 0.1,
      "y": 0.17,
      "radius": 36,
      "color": COLOR_SECONDARY,
      "animation": {
        "velocity": 0.18,
        "distanceFromCenter": 0.07
      }
    },
    {
      "x": 0.1,
      "y": 0.17,
      "radius": 36,
      "color": COLOR_SECONDARY,
      "animation": {
        "velocity": 0.19,
        "distanceFromCenter": 0.07
      }
    },
    {
      "x": 0.1,
      "y": 0.17,
      "radius": 36,
      "color": COLOR_PRIMARY,
      "animation": {
        "velocity": 0.20,
        "distanceFromCenter": 0.07
      }
    },
    {
      "x": 0.1,
      "y": 0.17,
      "radius": 36,
      "color": COLOR_PRIMARY,
      "animation": {
        "velocity": 0.21,
        "distanceFromCenter": 0.07
      }
    }
  ],
  idle: [
    {
      "x": 0.045,
      "y": 0.05,
      "radius": 325,
      "color": COLOR_TERTIARY,
      "animation": {
        "velocity": 0.03,
        "distanceFromCenter": 0.04
      }
    },
    {
      "x": 0.05,
      "y": 0.045,
      "radius": 295,
      "color": COLOR_SECONDARY,
      "animation": {
        "velocity": 0.015,
        "distanceFromCenter": 0.03
      }
    },
    {
      "x": -0.005,
      "y": -0.005,
      "radius": 240,
      "color": COLOR_PRIMARY,
      "animation": {
        "velocity": 0.01,
        "distanceFromCenter": 0.035
      }
    }
  ],
  loading: [
    {
      "x": 0.45,
      "y": 0.5,
      "radius": 190,
      "color": COLOR_TERTIARY,
      "animation": {
        "velocity": 0.045,
        "distanceFromCenter": 0.02
      }
    },
    {
      "x": 0.5,
      "y": 0.45,
      "radius": 250,
      "color": COLOR_SECONDARY,
      "animation": {
        "velocity": 0.03,
        "distanceFromCenter": 0.025
      }
    },
    {
      "x": 0.5,
      "y": 0.5,
      "radius": 230,
      "color": COLOR_PRIMARY,
      "animation": {
        "velocity": 0.035,
        "distanceFromCenter": 0.015
      }
    }
  ]
}

const Gradient = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef()
  const [ctx, setContext] = useState()
  const [canDraw, setCanDraw] = useState(true)
  const [particles, setParticles] = useState([])
  const clear = useCallback(() => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }, [ctx])
  const animate = useCallback(() => {
    clear()
    particles.forEach(particle => particle.update(ctx))
    animationRef.current = requestAnimationFrame(animate)
  }, [animationRef, ctx, clear, particles])
  const resize = useCallback(() => {
    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight
  }, [ctx])

  // init
  useEffect(() => {
    if (ctx === undefined) return
    let particles = []
    PARTICLES.idle.forEach(particle => {
      particles.push(new Circle(particle, ctx))
    })
    setParticles(particles)
  }, [ctx, setParticles])

  // draw
  useEffect(() => {
    if (ctx === undefined) return
    animationRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationRef.current)
  }, [animationRef, animate, ctx])

  // listeneres
  useEffect(() => {
    if (ctx === undefined) return
    resize()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [ctx, resize])

  useLayoutEffect(() => {
    if (canvasRef.current !== null) {
      const ctx = canvasRef.current.getContext('2d')
      setContext(ctx)
    }
  }, [canvasRef])

  return (
    <canvas ref={canvasRef} className="gradient" />
  )
}

export default Gradient
