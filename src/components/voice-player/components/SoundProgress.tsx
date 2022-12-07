import React from 'react'

type Props = {
  value?: number
  onChange?: () => void
}

function SoundProgress({ value }: Props) {
  return (
    <div className="w-full bg-[#333] rounded-[11px] h-[4px] relative cursor-pointer shadow-sm overflow-hidden">
      <div
        className="absolute h-full left-0 top-0 bg-[#C4C4C4] rounded-[11px]"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

export default SoundProgress
