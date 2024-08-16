import { useEffect, useState } from 'react'
import { JSX } from 'react/jsx-runtime'
import { Button, H2, XStack, Card } from 'tamagui'
import {
  ChefHat,
  Sofa,
  LampCeiling,
  SlidersHorizontal,
} from '@tamagui/lucide-icons'
import { Daum } from 'types/rooms'
import { Link } from 'expo-router'
import LightSliderGroup from 'components/device/lightSliderGroup'
import { getData } from 'lib/asyncStorage'
import { Daum as groupedDaum } from 'types/grouped_light'
import { getGroupedLights } from 'lib/hue'

interface Device {
  id: string
  name: string
  room: string
  lightRid: string
}

export default function GroupCard({
  groupData,
  setCanScroll,
}: {
  groupData: Daum
  setCanScroll: (value: boolean) => void
}) {
  const [icon, setIcon] = useState<JSX.Element | null>(null)
  const [bridgeIP, setBridgeIP] = useState('')
  const [bridgeKey, setBridgeKey] = useState('')
  const [FilteredGroupLight, setFilteredGroupLight] = useState<groupedDaum>()

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
    async function x() {
      const groupedLightResponse = await getGroupedLights(bridgeIP, bridgeKey)
      const filteredGroup = groupedLightResponse.data.find(
        (light) => light.owner.rid === groupData.id
      )
      setFilteredGroupLight(filteredGroup)
    }
    x()
  }, [groupData])

  let newIcon: JSX.Element
  useEffect(() => {
    switch (groupData.metadata.archetype) {
      case 'kitchen':
        newIcon = <ChefHat size={80} />
        break
      case 'living room':
        newIcon = <Sofa size={80} />
        break
      default:
        newIcon = <LampCeiling size={80} />
        break
    }
    setIcon(newIcon)
  }, [groupData.metadata.name])

  return (
    <Card bordered elevate width={360}>
      <Card.Header>
        <XStack justifyContent="space-between">
          <H2 size="$8" style={{ fontWeight: 'bold' }}>
            {groupData.metadata.name}
          </H2>
          <Link
            href={{
              //@ts-ignore
              pathname: '/room/settings/[id]',
              params: { id: groupData.id },
            }}
          >
            <Button>
              <SlidersHorizontal />
            </Button>
          </Link>
        </XStack>
      </Card.Header>

      <XStack justifyContent="center">{icon}</XStack>
      <Card.Footer padded>
        <LightSliderGroup ID={FilteredGroupLight?.id as string} IP={bridgeIP} />
      </Card.Footer>
    </Card>
  )
}
