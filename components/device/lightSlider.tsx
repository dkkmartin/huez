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

      // if going into settings and then go back the first fetch for brightness info is gonna fail...
      // Recursive calling itself until its working with a max of 10 tries
      async function fetchDeviceInfoWithRetry(attempt = 1) {
        const response = await getBrightness(IP, bridgeKey, RID)
        if (response.data === undefined && attempt < 10) {
          setTimeout(() => fetchDeviceInfoWithRetry(attempt + 1), 1000)
        } else {
          setDeviceInfo(response)
        }
      }

      fetchDeviceInfoWithRetry()

      return () => {}
    }, [bridgeKey, ID])
  )

  useEffect(() => {
    async function getBridgeKey() {
      const bridgeKey = await getData('bridge-key')
      setBridgeKey(bridgeKey as string)
    }
    getBridgeKey()
  }, [])

  if (deviceInfo?.data[0])
    return (
      <XStack alignItems="center" gap={8} width="100%" justifyContent="center">
        <SunDim></SunDim>
        <Slider
          width="80%"
          maxWidth={300}
          onSlideEnd={(event, value) => brightness(value)}
          size="$2"
          defaultValue={
            deviceInfo.data[0].dimming
              ? [deviceInfo?.data[0]?.dimming?.brightness as number]
              : [50]
          }
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
