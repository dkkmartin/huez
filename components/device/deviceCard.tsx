import { SlidersHorizontal, Lamp, Sun, SunDim } from '@tamagui/lucide-icons';
import { Button, H2, XStack, Card, Slider } from 'tamagui';
import { Device } from 'types/device';

export default function DeviceCard({
  deviceData,
  setCanScroll,
}: {
  deviceData: Device;
  setCanScroll: (value: boolean) => void;
}) {
  return (
    <Card bordered elevate width={360}>
      <Card.Header>
        <XStack justifyContent="space-between">
          <H2 size="$8" style={{ fontWeight: 'bold' }}>
            {deviceData.metadata.name}
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
          <Slider
            onSlideMove={() => setCanScroll(false)}
            onSlideEnd={() => setCanScroll(true)}
            size="$2"
            width={250}
            defaultValue={[50]}
            max={100}
            step={1}
          >
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
