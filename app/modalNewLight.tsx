import { ChevronRight, Moon, Star } from '@tamagui/lucide-icons';
import { Anchor, H1, ListItem, Paragraph, Separator, View, XStack, YGroup } from 'tamagui';

const mockup = [
  { id: '21dsan39da', name: 'Hue bulb' },
  { id: '4354asdf23', name: 'Hue bulb' },
  { id: '22121dak33', name: 'Hue bulb' },
  { id: '5s12dy4321', name: 'Hue bulb' },
  { id: 'doo30as022', name: 'Hue bulb' },
];

export default function ModalScreen() {
  return (
    <View flex={1} alignItems="center" paddingVertical="$4">
      <H1 flex={0.1}>Add a new hue</H1>
      <XStack flex={0.45}>
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
