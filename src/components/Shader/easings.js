export const easeInOutSine = (t, b, c, d) => (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b

export const easeInOutBack = (t, b, c, d) => {
  let s = 1.70158;
  if ((t /= d / 2) < 1)
    return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b
  return (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b
}
