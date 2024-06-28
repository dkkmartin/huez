import { Check, ChevronDown, ChevronRight, ChevronUp } from '@tamagui/lucide-icons';
import { useMemo, useState } from 'react';
import { LinearGradient } from 'react-native-svg';
import { Button, Label } from 'tamagui';
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

export default function ModalScreen() {
  return (
    <XStack paddingVertical="$4" flex={1} flexDirection="column" alignItems="center" gap="$4">
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
  );
}
