import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Button } from 'tamagui'
import ColorPicker, { Panel3, HueSlider } from 'reanimated-color-picker'
import { YStack } from 'tamagui'
import { useEffect, useState } from 'react'
import { changeColor, getDeviceInfo } from 'lib/hue'
import { getData } from 'lib/asyncStorage'
import { Root } from 'types/device'
import LightSlider from 'components/device/lightSlider'

export default function DeviceSettings() {
  const navigation = useNavigation()
  const { id } = useLocalSearchParams()
  const [bridgeIP, setBridgeIP] = useState('')
  const [bridgeKey, setBridgeKey] = useState('')
  const [deviceInfo, setDeviceInfo] = useState<Root>()

  useEffect(() => {
    navigation.setOptions({
      title: 'Settings',
    })
  }, [id])

  useEffect(() => {
    async function getStorage() {
      const bridgeIP = await getData('bridge-ip')
      const bridgeKey = await getData('bridge-key')
      setBridgeIP(bridgeIP as string)
      setBridgeKey(bridgeKey as string)
    }
    getStorage()
  }, [])

  useEffect(() => {
    if (!bridgeIP) return
    async function deviceInfo() {
      const response = await getDeviceInfo(bridgeIP, bridgeKey, id as string)
      setDeviceInfo(response)
    }
    deviceInfo()
  }, [bridgeIP])

  const onSelectColor = ({ hex }) => {
    const response = changeColor(
      bridgeIP as string,
      bridgeKey as string,
      deviceInfo?.data[0].services[1].rid as string,
      hex as string
    )
  }

  if (bridgeIP && bridgeKey)
    return (
      <YStack margin={'$4'} flex={1} gap="$10" alignItems="center">
        <ColorPicker
          style={{ width: '100%', gap: 20 }}
          value="red"
          onComplete={onSelectColor}
        >
          <Panel3 />
          <HueSlider />
        </ColorPicker>

        <LightSlider
          IP={bridgeIP}
          ID={deviceInfo?.data[0].id as string}
          RID={deviceInfo?.data[0].services[1].rid as string}
        />
      </YStack>
    )
}
