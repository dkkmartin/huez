import { useEffect, useState } from 'react'
import {
  SlidersHorizontal,
  ChefHat,
  Sofa,
  Bath,
  Car,
  Briefcase,
  LampCeiling,
} from '@tamagui/lucide-icons'
import { Button, H2, XStack, Card, Slider, H1 } from 'tamagui'
import { JSX } from 'react/jsx-runtime'
import { Link } from 'expo-router'
import LightSlider from './lightSlider'
import { getData } from 'lib/asyncStorage'

export default function DeviceCard({
  deviceData,
  setCanScroll,
}: {
  deviceData: { id: string; name: string; room: string; lightRid: string }
  setCanScroll: (value: boolean) => void
}) {
  const [icon, setIcon] = useState<JSX.Element | null>(null)
  const [bridgeIP, setBridgeIP] = useState('')

  useEffect(() => {
    async function getStorage() {
      const bridgeIP = await getData('bridge-ip')
      setBridgeIP(bridgeIP as string)
    }
    getStorage()
  }, [])

  useEffect(() => {
    let newIcon: JSX.Element
    switch (deviceData.room) {
      case 'kitchen':
        newIcon = <ChefHat size={80} />
        break
      case 'living_room':
        newIcon = <Sofa size={80} />
        break
      case 'bathroom':
        newIcon = <Bath size={80} />
        break
      case 'garage':
        newIcon = <Car size={80} />
        break
      case 'office':
        newIcon = <Briefcase size={80} />
        break
      default:
        newIcon = <LampCeiling size={80} />
        break
    }
    setIcon(newIcon)
  }, [deviceData.room])

  return (
    <Card bordered elevate width={360}>
      <Card.Header>
        <XStack justifyContent="space-between">
          <XStack flexDirection="column">
            <H1 size="$8" style={{ fontWeight: 'bold' }}>
              {deviceData.name}
            </H1>
            <H2 size="$1" style={{ fontWeight: 'lighter' }}>
              {deviceData.room}
            </H2>
          </XStack>
          <Link
            href={{
              //@ts-ignore
              pathname: '/device/settings/[id]',
              params: { id: deviceData.id },
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
        <LightSlider
          IP={bridgeIP}
          ID={deviceData.id}
          RID={deviceData.lightRid}
        />
      </Card.Footer>
    </Card>
  )
}
