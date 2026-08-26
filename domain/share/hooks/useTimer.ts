import { useState, useEffect } from 'react'

type UseTimerProps = {
  endTime: Date
  onFinish: () => void
}

type UseTimerReturnType = {
  remain: number
}

const useTimer: (props: UseTimerProps) => UseTimerReturnType = ({
  endTime,
  onFinish,
}) => {
  const [remain, setRemain] = useState(() => endTime.getTime() - Date.now())

  useEffect(() => {
    const updateRemain = () => {
      const newRemain = endTime.getTime() - Date.now()
      setRemain(newRemain)

      if (newRemain <= 0) {
        onFinish()
        return false
      }

      return true
    }

    if (!updateRemain()) return

    const interval = setInterval(() => {
      if (!updateRemain()) clearInterval(interval)
    }, 1000)
    return () => clearInterval(interval)
  }, [endTime, onFinish])

  return { remain }
}

export default useTimer
