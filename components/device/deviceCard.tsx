import { SlidersHorizontal, Lamp, Sun, SunDim } from '@tamagui/lucide-icons';
import { Button, H2, XStack, Card, Slider } from 'tamagui';
import { Root } from 'types/device';

export default function DeviceCard({ deviceData }: { deviceData: Root }) {
  return (
    <Card bordered elevate width={360}>
      <Card.Header>
        <XStack justifyContent="space-between">
          <H2 size="$8" style={{ fontWeight: 'bold' }}>
            {deviceData.data[0].metadata.name}
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
  );
}
