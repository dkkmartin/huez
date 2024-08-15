import { useEffect, useState } from 'react'
import { JSX } from 'react/jsx-runtime'
import { Button, H2, XStack, Card, Slider } from 'tamagui'
import {
  ChefHat,
  Sofa,
  LampCeiling,
  SlidersHorizontal,
} from '@tamagui/lucide-icons'
import LightSliderGroup from 'components/device/lightSliderGroup'

interface Device {
  id: string
  name: string
  room: string
  lightRid: string
}

interface Group {
  name: string
  devices: Device[]
}

export default function GroupCard({
  groupData,
  setCanScroll,
}: {
  groupData: Group
  setCanScroll: (value: boolean) => void
}) {
  const [icon, setIcon] = useState<JSX.Element | null>(null)

  let newIcon: JSX.Element
  useEffect(() => {
    switch (groupData.name) {
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
  }, [groupData.name])

  return (
    <Card bordered elevate width={360}>
      <Card.Header>
        <XStack justifyContent="space-between">
          <H2 size="$8" style={{ fontWeight: 'bold' }}>
            {groupData.name}
          </H2>
          <Button>
            <SlidersHorizontal />
          </Button>
        </XStack>
      </Card.Header>

      <XStack justifyContent="center">{icon}</XStack>
      <Card.Footer padded>
        <LightSliderGroup />
      </Card.Footer>
    </Card>
  )
}
