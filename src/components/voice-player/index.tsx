import classNames from 'classnames'
import AudioIcon from 'components/icons/Audio'
import SvgDownload from 'components/icons/Download'
import SvgPause2 from 'components/icons/Pause2'
import SvgPlay2 from 'components/icons/Play2'
import useForceReRender from 'hooks/useForceRender'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

import image from './assets/image.png'
import SoundProgress from './components/SoundProgress'

type Props = {
  url?: string
  defaultIsPlaying?: boolean
  title?: string
  subTitle?: string
}

function VoicePlayer(props: Props) {
  const { url, defaultIsPlaying, title, subTitle } = props
  const audio = useRef(new Audio(url))
  const duration = audio.current.duration
  const [isPlaying, setIsPlaying] = useState(defaultIsPlaying)
  const [progressPercent, setProgressPercent] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const forceRender = useForceReRender()

  useHotkeys('space', () => {
    setIsPlaying((state) => !state)
  })

  useHotkeys('right', () => {
    if (audio.current) {
      audio.current.currentTime += 5
    }
  })

  useHotkeys('left', () => {
    if (audio.current) {
      audio.current.currentTime -= 5
    }
  })

  const play = () => {
    setIsPlaying(true)
  }

  const pause = () => {
    setIsPlaying(false)
  }

  const handleClickProgress = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left //x position within the element.
    const percent = (x / rect.width) * 100
    if (audio.current?.currentTime) {
      audio.current.currentTime = (percent / 100) * duration
      forceRender()
    }
  }

  const handleDownload = () => {
    window.open(
      audio.current?.src + '&download=true',
      audio.current?.src + '.wav'
    )
  }

  const handleVolumeProgress = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left //x position within the element.
    const percent = (x / rect.width) * 100
    if (audio.current) {
      audio.current.volume = percent / 100
      forceRender()
    }
  }

  const getSecondsAndMinuts = (seconds = 0) => {
    if (isNaN(seconds) || !seconds) return '00:00'
    return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(
      Math.floor(seconds % 60)
    ).padStart(2, '0')}`
  }

  const handleIncreaseSpeed = () => {
    if (audio.current) {
      if (audio.current.playbackRate === 2) {
        audio.current.playbackRate = 1
      } else {
        audio.current.playbackRate = 2
      }
    }
    forceRender()
  }

  const handleDecreaseSpeed = () => {
    if (audio.current) {
      if (audio.current.playbackRate === 0.5) {
        audio.current.playbackRate = 1
      } else {
        audio.current.playbackRate = 0.5
      }
    }
    forceRender()
  }

  useEffect(() => {
    audio?.current?.addEventListener('timeupdate', () => {
      const { currentTime } = audio?.current
      setProgressPercent((currentTime / duration) * 100)
    })
    audio?.current?.addEventListener('ended', () => {
      setIsPlaying(false)
    })
    audio?.current?.addEventListener('canplay', () => {
      setIsReady(true)
    })
  }, [audio.current, duration])

  useEffect(() => {
    if (isPlaying) {
      audio?.current?.play()
    } else {
      audio?.current?.pause()
    }
    return () => {
      audio?.current?.pause()
    }
  }, [isPlaying])

  return (
    <div className="flex w-full h-full bg-black">
      {/* player */}
      <div className="flex-1 pr-[28px] pl-4 flex items-center">
        {/* right section */}
        <div className="flex items-center">
          <SvgDownload
            onClick={handleDownload}
            className="ml-8 w-[10px] h-[17px] cursor-pointer"
          />
          <div className="w-[76px] ml-4" onClick={handleVolumeProgress}>
            <SoundProgress value={audio.current.volume * 100} />
          </div>
          <AudioIcon className="w-[14px] h-[16px]" />
        </div>

        {/* middle */}
        <div className="mx-auto w-[505px] flex flex-col">
          <div className="flex items-center justify-center w-full">
            <SpeedIcon
              isActive={audio.current.playbackRate === 2}
              onClick={handleIncreaseSpeed}
            >
              2x
            </SpeedIcon>
            {!isReady && <span>not ready</span>}
            {isReady && isPlaying && (
              <SvgPause2
                onClick={pause}
                className="mx-[62px] w-3 h-3 cursor-pointer"
              />
            )}
            {isReady && !isPlaying && (
              <SvgPlay2
                onClick={play}
                className="mx-[62px] w-3 h-4 cursor-pointer"
              />
            )}
            <SpeedIcon
              isActive={audio.current.playbackRate === 0.5}
              onClick={handleDecreaseSpeed}
            >
              0.5x
            </SpeedIcon>
          </div>
          <div className="flex items-center w-full ">
            <span className="text-[#C4C4C4]">
              {getSecondsAndMinuts(duration)}
            </span>
            <div className="flex-1 mx-3" onClick={handleClickProgress}>
              <SoundProgress value={progressPercent} />
            </div>
            <span className="text-[#C4C4C4]">
              {getSecondsAndMinuts(audio?.current?.currentTime)}
            </span>
          </div>
        </div>

        {/* left section */}
        <div>
          {title && <div className="text-[#F1F1F1]">{title}</div>}
          {subTitle && (
            <div className="text-3 text-[#646464] text-left mt-2">
              {subTitle}
            </div>
          )}
        </div>
      </div>

      {/* image */}
      <img alt={'play'} src={image} className="h-full w-[70px] block" />
    </div>
  )
}

type SpeedIconProps = {
  isActive?: boolean
  children?: ReactNode
  onClick?: () => void
}

const SpeedIcon = ({ isActive, children, onClick }: SpeedIconProps) => (
  <div
    className={classNames(
      'text-[#C4C4C4] rounded cursor-pointer p-[8px] flex items-center justify-center',
      isActive && 'bg-[#0086B3]'
    )}
    onClick={onClick}
    style={{ direction: 'ltr', fontFamily: 'sans-serif', fontSize: 12 }}
  >
    {children}
  </div>
)

export default VoicePlayer
