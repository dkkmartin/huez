import { Sun, SunDim } from '@tamagui/lucide-icons'
import { getData } from 'lib/asyncStorage'
import { changeBrightness } from 'lib/hue'
import { useEffect, useState } from 'react'
import { Slider, XStack } from 'tamagui'

export default function LightSlider({ IP, ID }: { IP: string; ID: string }) {
  const [selectedBrightness, setSelectedBrightness] = useState()
  const [bridgeKey, setBridgeKey] = useState('')

  function brightness(value: any) {
    console.log('slider key: ', bridgeKey)
    changeBrightness(IP, bridgeKey, ID, Math.floor(value))
  }

  useEffect(() => {
    async function getBridgeKey() {
      const bridgeKey = await getData('bridge-key')
      setBridgeKey(bridgeKey as string)
    }
    getBridgeKey()
  }, [])

  return (
    <XStack alignItems="center" gap={8} width="100%" justifyContent="center">
      <SunDim></SunDim>
      <Slider
        width="80%"
        maxWidth={300}
        onSlideMove={(value) => null}
        onSlideEnd={(event, value) => brightness(value)}
        size="$2"
        defaultValue={[50]}
        max={100}
        step={1}
      >
        <Slider.Track>
          <Slider.TrackActive />
        </Slider.Track>
        <Slider.Thumb circular index={0} />
      </Slider>
      <Sun></Sun>
    </XStack>
  )
}
