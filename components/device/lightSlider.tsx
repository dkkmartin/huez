import { Sun, SunDim } from '@tamagui/lucide-icons'
import { useFocusEffect } from 'expo-router'
import { getData } from 'lib/asyncStorage'
import { changeBrightness, getBrightness } from 'lib/hue'
import { useCallback, useEffect, useState } from 'react'
import { Slider, XStack } from 'tamagui'
import { Root } from 'types/deviceLightInfo'

export default function LightSlider({
  IP,
  ID,
  RID,
}: {
  IP: string
  ID: string
  RID: string
}) {
  const [bridgeKey, setBridgeKey] = useState('')
  const [deviceInfo, setDeviceInfo] = useState<Root>()

  function brightness(value: any) {
    value = Math.floor(value)
    if (value > 100) value = 100
    if (value < 0) value = 0
    changeBrightness(IP, bridgeKey, RID, value)
  }

  useFocusEffect(
    useCallback(() => {
      setDeviceInfo(undefined)
      if (!bridgeKey || !ID) return
      async function fetchDeviceInfo() {
        const response = await getBrightness(IP, bridgeKey, RID)
        setDeviceInfo(response)
      }
      fetchDeviceInfo()

      return () => {}
    }, [bridgeKey, ID])
  )

  useEffect(() => {
    async function getBridgeKey() {
      const bridgeKey = await getData('bridge-key')
      setBridgeKey(bridgeKey as string)
      console.log('refreshed')
    }
    getBridgeKey()
  }, [])

  if (deviceInfo)
    return (
      <XStack alignItems="center" gap={8} width="100%" justifyContent="center">
        <SunDim></SunDim>
        <Slider
          width="80%"
          maxWidth={300}
          onSlideEnd={(event, value) => brightness(value)}
          size="$2"
          defaultValue={[deviceInfo?.data[0].dimming.brightness as number]}
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

  return null
}
