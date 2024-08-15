import {
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
} from '@tamagui/lucide-icons'
import { useMemo, useState } from 'react'
import { LinearGradient } from 'react-native-svg'
import { Button, Label } from 'tamagui'
import { SelectProps } from 'tamagui'
import {
  Adapt,
  FontSizeTokens,
  ListItem,
  Separator,
  Sheet,
  XStack,
  YGroup,
  YStack,
  getFontSize,
} from 'tamagui'
import { Select } from 'tamagui'

const mockup = [
  { id: '21dsan39da', name: 'Hue bulb' },
  { id: '4354asdf23', name: 'Hue bulb' },
  { id: '22121dak33', name: 'Hue bulb' },
  { id: '5s12dy4321', name: 'Hue bulb' },
  { id: 'doo30as022', name: 'Hue bulb' },
]

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

function SelectItem(props: SelectProps) {
  const [val, setVal] = useState('Kitchen')

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

export default function ModalScreen() {
  return (
    <XStack
      paddingVertical="$4"
      flex={1}
      flexDirection="column"
      alignItems="center"
      gap="$4"
    >
      <XStack flexDirection="column" width={340}>
        <Label fontSize={20} htmlFor="select">
          Select a room type
        </Label>
        <SelectItem id="select" />
      </XStack>

      <XStack flexDirection="column">
        <Label fontSize={20} htmlFor="devices">
          Select devices
        </Label>

        <YGroup
          id="devices"
          alignSelf="center"
          bordered
          width={340}
          size="$5"
          separator={<Separator />}
        >
          {mockup.map((device, index) => (
            <YGroup.Item key={index}>
              <ListItem
                hoverTheme
                pressTheme
                title={device.name}
                subTitle={device.id}
                iconAfter={ChevronRight}
              />
            </YGroup.Item>
          ))}
        </YGroup>
      </XStack>

      <XStack flex={1} alignItems="flex-end">
        <Button variant="outlined" width={340}>
          Complete
        </Button>
      </XStack>
    </XStack>
  )
}
