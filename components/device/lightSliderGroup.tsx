import { Sun, SunDim } from '@tamagui/lucide-icons'
import { useFocusEffect } from 'expo-router'
import { getData } from 'lib/asyncStorage'
import { changeRoomBrightness, getGroupedLight } from 'lib/hue'
import { useCallback, useEffect, useState } from 'react'
import { Slider, XStack } from 'tamagui'
import { Root } from 'types/grouped_light'

export default function LightSliderGroup({
  IP,
  ID,
}: {
  IP: string
  ID: string
}) {
  const [bridgeKey, setBridgeKey] = useState('')
  const [groupLight, setGroupLight] = useState<Root>()

  function brightness(value: any) {
    value = Math.floor(value)
    if (value > 100) value = 100
    if (value < 0) value = 0
    changeRoomBrightness(IP, bridgeKey, ID, value)
  }

  useFocusEffect(
    useCallback(() => {
      setGroupLight(undefined)
      if (!bridgeKey || !ID) return

      // if going into settings and then go back the first fetch for brightness info is gonna fail...
      // Recursive calling itself until its working with a max of 10 tries
      async function fetchDeviceInfoWithRetry(attempt = 1) {
        const response = await getGroupedLight(IP, bridgeKey, ID)
        if (response.data === undefined && attempt < 10) {
          setTimeout(() => fetchDeviceInfoWithRetry(attempt + 1), 1000)
        } else {
          if (attempt >= 10) return
          setGroupLight(response)
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

  if (groupLight?.data[0])
    return (
      <XStack alignItems="center" gap={8} width="100%" justifyContent="center">
        <SunDim></SunDim>
        <Slider
          width="80%"
          maxWidth={300}
          onSlideEnd={(event, value) => brightness(value)}
          size="$2"
          defaultValue={[groupLight?.data[0].dimming.brightness as number]}
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
