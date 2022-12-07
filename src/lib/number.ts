export const parseDurationInSec = (sec: number) => {
  return (
    parseInt(String(Number(sec || 0) / 60))
      .toString()
      .padStart(2, '0') +
    ':' +
    parseInt((Number(sec || 0) % 60).toFixed(2))
      .toString()
      .padStart(2, '0')
  )
}
