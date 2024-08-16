import { useLocalSearchParams, useNavigation } from 'expo-router'
import ColorPicker, { Panel3, HueSlider } from 'reanimated-color-picker'
import { YStack } from 'tamagui'
import { useEffect, useState } from 'react'
import { changeRoomColor, getGroupedLights, getRoom } from 'lib/hue'
import { getData } from 'lib/asyncStorage'
import { Root as RootDevice } from 'types/device'
import { Daum as groupedDaum } from 'types/grouped_light'
import LightSliderGroup from 'components/device/lightSliderGroup'

export default function DeviceSettings() {
  const navigation = useNavigation()
  const { id } = useLocalSearchParams()
  const [bridgeIP, setBridgeIP] = useState('')
  const [bridgeKey, setBridgeKey] = useState('')
  const [groupInfo, setGroupInfo] = useState<RootDevice>()
  const [FilteredGroupLight, setFilteredGroupLight] = useState<groupedDaum>()

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
    if (!bridgeIP && !bridgeKey) return
    async function getRoomInfo() {
      const response = await getRoom(bridgeIP, bridgeKey, id as string)
      setGroupInfo(response)
    }
    getRoomInfo()
  }, [bridgeIP, bridgeKey])

  const onSelectColor = async ({ hex }) => {
    const response = changeRoomColor(
      bridgeIP as string,
      bridgeKey as string,
      FilteredGroupLight?.id as string,
      hex as string
    )
  }

  useEffect(() => {
    if (!bridgeIP && !bridgeKey) return
    async function x() {
      const groupedLightResponse = await getGroupedLights(bridgeIP, bridgeKey)
      const filteredGroup = groupedLightResponse.data.find(
        (light) => light.owner.rid === id
      )
      setFilteredGroupLight(filteredGroup)
    }
    x()
  }, [groupInfo])

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

        <LightSliderGroup IP={bridgeIP} ID={FilteredGroupLight?.id as string} />
      </YStack>
    )
}
