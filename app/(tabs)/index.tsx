import {
  Anchor,
  Button,
  H1,
  H2,
  Paragraph,
  XStack,
  YStack,
  Card,
  Separator,
  Slider,
} from 'tamagui';
import { ToastControl } from 'app/CurrentToast';
import { SlidersHorizontal, Lamp, Palette, Sun, SunDim } from '@tamagui/lucide-icons';

export default function TabOneScreen() {
  return (
    <XStack maxWidth={360} margin="auto" justifyContent="center" padding="$4" flex={1}>
      <YStack>
        <Card bordered elevate width={360}>
          <Card.Header>
            <XStack justifyContent="space-between">
              <H2 size="$8" style={{ fontWeight: 'bold' }}>
                Living room lamp 1
              </H2>
              <Button>
                <SlidersHorizontal />
              </Button>
            </XStack>
          </Card.Header>
          <XStack justifyContent="center">
            <Lamp size={80}></Lamp>
          </XStack>
          <Card.Footer padded>
            <XStack alignItems="center" margin="auto" gap={8}>
              <SunDim></SunDim>
              <Slider size="$1" width={250} defaultValue={[50]} max={100} step={1}>
                <Slider.Track>
                  <Slider.TrackActive />
                </Slider.Track>
                <Slider.Thumb circular index={0} />
              </Slider>

              <Sun></Sun>
            </XStack>
          </Card.Footer>
        </Card>
      </YStack>
    </XStack>
  );
}
