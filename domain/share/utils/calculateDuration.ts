import dayjs from 'dayjs'

type DurationSeg = {
  startedAt?: Date
  finishedAt?: Date
}

const calculateDuration = (segments: DurationSeg[]) => {
  const totalDuration = segments.reduce((acc, seg) => {
    if (seg.startedAt && seg.finishedAt) {
      const durationInSeconds = dayjs(seg.finishedAt).diff(
        seg.startedAt,
        'second',
      )
      return acc + durationInSeconds
    }
    return acc
  }, 0)
  let formattedDuration = ''
  if (totalDuration >= 3600) {
    const hours = Math.floor(totalDuration / 3600)
    const minutes = Math.floor((totalDuration % 3600) / 60)
    const seconds = totalDuration % 60
    formattedDuration = `${hours} 時 ${minutes} 分 ${seconds} 秒`
  } else if (totalDuration >= 60) {
    const minutes = Math.floor(totalDuration / 60)
    const seconds = totalDuration % 60
    formattedDuration = `${minutes} 分 ${seconds} 秒`
  } else {
    formattedDuration = `${totalDuration} 秒`
  }

  return {
    value: totalDuration,
    formatted: formattedDuration,
  }
}

export default calculateDuration
