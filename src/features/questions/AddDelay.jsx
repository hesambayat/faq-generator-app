import { useEffect, useCallback, useState } from 'react'

const COOKIE_NAMESPACE = 'request:delay'
const COOKIE_VALUE = '5000'

const AddDelay = () => {
  const [checked, setChecked] = useState(window.localStorage.getItem(COOKIE_NAMESPACE) === COOKIE_VALUE)
  const toggleDelay = useCallback((e) => {
    setChecked(n => !n)
  }, [])

  useEffect(() => {
    if (checked) {
      window.localStorage.setItem(COOKIE_NAMESPACE, COOKIE_VALUE)
    } else {
      window.localStorage.removeItem(COOKIE_NAMESPACE)
    }
  }, [checked])

  return (
    <div className="delay">
      <input
        id="mock"
        type="checkbox"
        value={COOKIE_VALUE}
        onChange={toggleDelay}
        checked={checked}
      />
      <label htmlFor="mock">
        {`Add ${COOKIE_VALUE/1000} seconds delay`}
      </label>
    </div>
  )
}

export default AddDelay