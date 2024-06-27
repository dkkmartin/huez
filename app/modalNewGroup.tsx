import { Check, ChevronDown, ChevronRight, ChevronUp } from '@tamagui/lucide-icons';
import { useMemo, useState } from 'react';
import { LinearGradient } from 'react-native-svg';
import { Label } from 'tamagui';
import { SelectProps } from 'tamagui';
import {
  Adapt,
  FontSizeTokens,
  H1,
  ListItem,
  Separator,
  Sheet,
  View,
  XStack,
  YGroup,
  YStack,
  getFontSize,
} from 'tamagui';
import { Select } from 'tamagui';

const mockup = [
  { id: '21dsan39da', name: 'Hue bulb' },
  { id: '4354asdf23', name: 'Hue bulb' },
  { id: '22121dak33', name: 'Hue bulb' },
  { id: '5s12dy4321', name: 'Hue bulb' },
  { id: 'doo30as022', name: 'Hue bulb' },
];

const items = [
  { name: 'Kitchen' },
  { name: 'Living room' },
  { name: 'Bathroom' },
  { name: 'Garage' },
  { name: 'Office' },
];

function SelectItem(props: SelectProps) {
  const [val, setVal] = useState('Kitchen');

  return (
    <Select value={val} onValueChange={setVal} disablePreventBodyScroll {...props}>
      <Select.Trigger width={220} iconAfter={ChevronDown}>
        <Select.Value placeholder="Something" />
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
          <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
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
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['$background', 'transparent']}
            borderRadius="$4"
          />
        </Select.ScrollUpButton>

        <Select.Viewport
          // to do animations:
          // animation="quick"
          // animateOnly={['transform', 'opacity']}
          // enterStyle={{ o: 0, y: -10 }}
          // exitStyle={{ o: 0, y: 10 }}
          minWidth={200}
        >
          <Select.Group>
            <Select.Label>Fruits</Select.Label>
            {/* for longer lists memoizing these is useful */}
            {useMemo(
              () =>
                items.map((item, i) => {
                  return (
                    <Select.Item index={i} key={item.name} value={item.name.toLowerCase()}>
                      <Select.ItemText>{item.name}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  );
                }),
              [items]
            )}
          </Select.Group>
          {/* Native gets an extra icon */}
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
              <ChevronDown size={getFontSize((props.size as FontSizeTokens) ?? '$true')} />
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
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['transparent', '$background']}
            borderRadius="$4"
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
}

export default function ModalScreen() {
  return (
    <View flex={1} alignItems="center" paddingVertical="$4">
      <H1>Add new group</H1>

      <XStack
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="$4"
        paddingTop="$4"
      >
        <SelectItem />

        <YGroup alignSelf="center" bordered width={340} size="$5" separator={<Separator />}>
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
    </View>
  );
}
