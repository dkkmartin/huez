import {
  SlidersHorizontal,
  Lamp,
  Sun,
  SunDim,
  ChefHat,
  Sofa,
  Bath,
  Car,
  Briefcase,
  LampDesk,
  LampCeiling,
} from '@tamagui/lucide-icons';
import { useEffect, useState } from 'react';
import { JSX } from 'react/jsx-runtime';
import { Button, H2, XStack, Card, Slider } from 'tamagui';

interface Group {
  type: string;
  id: string;
  children: Array<{
    rid: string;
    rtype: string;
  }>;
  metadata: {
    name: string;
    archetype: string;
  };
}

export default function GroupCard({
  groupData,
  setCanScroll,
}: {
  groupData: Group;
  setCanScroll: (value: boolean) => void;
}) {
  const [icon, setIcon] = useState<JSX.Element | null>(null);

  let newIcon: JSX.Element;
  useEffect(() => {
    switch (groupData.metadata.archetype) {
      case 'kitchen':
        newIcon = <ChefHat size={80} />;
        break;
      case 'living_room':
        newIcon = <Sofa size={80} />;
        break;
      case 'bathroom':
        newIcon = <Bath size={80} />;
        break;
      case 'garage':
        newIcon = <Car size={80} />;
        break;
      case 'office':
        newIcon = <Briefcase size={80} />;
        break;
      default:
        newIcon = <LampCeiling size={80} />;
        break;
    }
    setIcon(newIcon);
  }, [groupData.metadata.archetype]);

  return (
    <Card bordered elevate width={360}>
      <Card.Header>
        <XStack justifyContent="space-between">
          <H2 size="$8" style={{ fontWeight: 'bold' }}>
            {groupData.metadata.name}
          </H2>
          <Button>
            <SlidersHorizontal />
          </Button>
        </XStack>
      </Card.Header>

      <XStack justifyContent="center">{icon}</XStack>
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
