import {
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
} from '@tamagui/lucide-icons'
import { getData, getObjectData, storeObjectData } from 'lib/asyncStorage'
import { useEffect, useMemo, useState } from 'react'
import {
  Adapt,
  Button,
  FontSizeTokens,
  getFontSize,
  Label,
  Select,
  Sheet,
} from 'tamagui'
import { ListItem, Separator, XStack, YGroup } from 'tamagui'
import { getDevices } from 'lib/hue'
import { Device, Root } from 'types/device'
import { SelectProps } from 'tamagui'
import { YStack } from 'tamagui'
import { LinearGradient } from 'react-native-svg'
import { router } from 'expo-router'

type LocalStorageDevice = {
  id: string
  name: string
  room: string
  lightRid: string
}

export default function ModalScreen() {
  const [devices, setDevices] = useState<Root>()
  const [selectedDevice, setSelectedDevice] = useState<Device>()
  const [val, setVal] = useState('Room')
  const [storedDevices, setStoredDevices] = useState<LocalStorageDevice[]>([])
  const [filteredDevices, setFilteredDevices] = useState<Root>()

  function handleClick(device: Device) {
    setSelectedDevice(device)
  }

  async function handleComplete() {
    const newDevice = {
      id: selectedDevice?.id,
      name: selectedDevice?.metadata?.name,
      room: val,
      lightRid: selectedDevice?.services[1].rid,
    }

    const existingDevices = await getObjectData('devices')
    if (Array.isArray(existingDevices)) {
      const newDevices = [...existingDevices, newDevice]
      storeObjectData('devices', newDevices)
    } else {
      storeObjectData('devices', [newDevice])
    }

    const newGroup = {
      name: val,
      devices: [newDevice],
    }

    const existingGroups = await getObjectData('groups')
    if (Array.isArray(existingGroups)) {
      const groupIndex = existingGroups.findIndex((group) => group.name === val)
      if (groupIndex !== -1) {
        existingGroups[groupIndex].devices.push(newDevice)
      } else {
        existingGroups.push(newGroup)
      }
      storeObjectData('groups', existingGroups)
    } else {
      storeObjectData('groups', [newGroup])
    }

    if (router.canGoBack()) {
      router.replace('/')
    }
  }

  function SelectItem(props: SelectProps) {
    const items = [
      { name: 'Living room', key: 'living_room' },
      { name: 'Kitchen', key: 'kitchen' },
      { name: 'Dining room', key: 'dining' },
      { name: 'Bedroom', key: 'bedroom' },
      { name: 'Kids bedroom', key: 'kids_bedroom' },
      { name: 'Bathroom', key: 'bathroom' },
      { name: 'Nursery', key: 'nursery' },
      { name: 'Recreation room', key: 'recreation' },
      { name: 'Office', key: 'office' },
      { name: 'Gym', key: 'gym' },
      { name: 'Hallway', key: 'hallway' },
      { name: 'Toilet', key: 'toilet' },
      { name: 'Front door', key: 'front_door' },
      { name: 'Garage', key: 'garage' },
      { name: 'Terrace', key: 'terrace' },
      { name: 'Garden', key: 'garden' },
      { name: 'Driveway', key: 'driveway' },
      { name: 'Carport', key: 'carport' },
      { name: 'Home', key: 'home' },
      { name: 'Downstairs', key: 'downstairs' },
      { name: 'Upstairs', key: 'upstairs' },
      { name: 'Top floor', key: 'top_floor' },
      { name: 'Attic', key: 'attic' },
      { name: 'Guest room', key: 'guest_room' },
      { name: 'Staircase', key: 'staircase' },
      { name: 'Lounge', key: 'lounge' },
      { name: 'Man cave', key: 'man_cave' },
      { name: 'Computer room', key: 'computer' },
      { name: 'Studio', key: 'studio' },
      { name: 'Music room', key: 'music' },
      { name: 'TV room', key: 'tv' },
      { name: 'Reading room', key: 'reading' },
      { name: 'Closet', key: 'closet' },
      { name: 'Storage room', key: 'storage' },
      { name: 'Laundry room', key: 'laundry_room' },
      { name: 'Balcony', key: 'balcony' },
      { name: 'Porch', key: 'porch' },
      { name: 'Barbecue area', key: 'barbecue' },
      { name: 'Pool', key: 'pool' },
      { name: 'Other', key: 'other' },
    ]

    return (
      <Select
        value={val}
        onValueChange={setVal}
        disablePreventBodyScroll
        {...props}
      >
        <Select.Trigger width={340} iconAfter={ChevronDown}>
          <Select.Value placeholder="Bedroom" />
        </Select.Trigger>

        <Adapt when="sm" platform="touch">
          <Sheet
            native={!!props.native}
            modal
            dismissOnSnapToBottom
            animationConfig={{
              type: 'spring',
              damping: 20,
              mass: 1.2,
              stiffness: 250,
            }}
          >
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>

        <Select.Content zIndex={200000}>
          <Select.ScrollUpButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack zIndex={10}>
              <ChevronUp size={20} />
            </YStack>
            <LinearGradient
              //@ts-ignore
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['$background', 'transparent']}
              borderRadius="$4"
            />
          </Select.ScrollUpButton>

          <Select.Viewport minWidth={200}>
            <Select.Group>
              <Select.Label>Rooms</Select.Label>

              {useMemo(
                () =>
                  items.map((item, i) => {
                    return (
                      <Select.Item
                        index={i}
                        key={item.name}
                        value={item.name.toLowerCase()}
                      >
                        <Select.ItemText>{item.name}</Select.ItemText>
                        <Select.ItemIndicator marginLeft="auto">
                          <Check size={16} />
                        </Select.ItemIndicator>
                      </Select.Item>
                    )
                  }),
                [items]
              )}
            </Select.Group>

            {props.native && (
              <YStack
                position="absolute"
                right={0}
                top={0}
                bottom={0}
                alignItems="center"
                justifyContent="center"
                width={'$4'}
                pointerEvents="none"
              >
                <ChevronDown
                  size={getFontSize((props.size as FontSizeTokens) ?? '$true')}
                />
              </YStack>
            )}
          </Select.Viewport>

          <Select.ScrollDownButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack zIndex={10}>
              <ChevronDown size={20} />
            </YStack>
            <LinearGradient
              //@ts-ignore
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['transparent', '$background']}
              borderRadius="$4"
            />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select>
    )
  }

  useEffect(() => {
    async function getDevicesList() {
      const bridgeIP = await getData('bridge-ip')
      const bridgeKey = await getData('bridge-key')
      const devices = await getDevices(bridgeIP as string, bridgeKey as string)
      setDevices(devices)
    }
    getDevicesList()
  }, [])

  useEffect(() => {
    async function getStoredDevices() {
      const storedDeviceIds = await getObjectData('devices')
      setStoredDevices(storedDeviceIds)
    }
    getStoredDevices()
  }, [])

  useEffect(() => {
    if (!storedDevices) return
    const filtered = devices?.data.filter(
      (device) =>
        !storedDevices.some((storedDevice) => storedDevice.id === device.id)
    )
    //@ts-ignore
    setFilteredDevices(filtered)
  }, [storedDevices, devices])

  return (
    <XStack
      paddingVertical="$4"
      flexDirection="column"
      alignItems="center"
      gap="$4"
    >
      <XStack flexDirection="column">
        <Label fontSize={20} htmlFor="devices">
          Select device
        </Label>

        <YGroup
          id="devices"
          alignSelf="center"
          bordered
          width={340}
          size="$5"
          height={500}
          overflow="scroll"
          separator={<Separator />}
        >
          {storedDevices
            ? //@ts-ignore
              filteredDevices?.map((device, index) => (
                <YGroup.Item key={index}>
                  <ListItem
                    backgroundColor={
                      selectedDevice?.id === device.id ? '$color.gray6Dark' : ''
                    }
                    hoverTheme
                    pressTheme
                    title={device.metadata.name}
                    subTitle={device.id}
                    iconAfter={ChevronRight}
                    onPress={() => handleClick(device)}
                  />
                </YGroup.Item>
              ))
            : devices?.data.map((device, index) => (
                <YGroup.Item key={index}>
                  <ListItem
                    backgroundColor={
                      selectedDevice?.id === device.id ? '$color.gray6Dark' : ''
                    }
                    hoverTheme
                    pressTheme
                    title={device.metadata.name}
                    subTitle={device.id}
                    iconAfter={ChevronRight}
                    onPress={() => handleClick(device)}
                  />
                </YGroup.Item>
              ))}
        </YGroup>
      </XStack>

      {selectedDevice ? (
        <>
          <XStack flexDirection="column" width={340}>
            <Label fontSize={20} htmlFor="select">
              Select a room type
            </Label>
            <SelectItem id="select" />
          </XStack>
          <XStack flex={1} alignItems="flex-end">
            <Button variant="outlined" width={340} onPress={handleComplete}>
              Complete
            </Button>
          </XStack>
        </>
      ) : null}
    </XStack>
  )
}
