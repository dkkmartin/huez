import { Button, H1, Sheet, XStack, YStack, ListItem, YGroup } from 'tamagui';
import { HueBridgeSVG } from './svg/hueBridgeSVG';
import { ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';

interface BridgesListType {
  id: string;
  internalipaddress: string;
  port: number;
}

const mockup = [
  { id: 'ecb5fafffe25a28f', internalipaddress: '192.168.8.100', port: 443 },
  { id: 'ecb5fafffe16074f', internalipaddress: '192.168.8.142', port: 443 },
  { id: 'ecb5fafffea288b0', internalipaddress: '192.168.86.27', port: 443 },
];

export default function ConnectBridge() {
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [canFetchBridge, setCanFetchBridge] = useState(false);
  const [bridgesList, setBridgesList] = useState<BridgesListType[]>([]);

  useEffect(() => {
    async function getBridgesList() {
      try {
        const data = await fetch('https://discovery.meethue.com');
        if (data.status === 429) {
          throw new Error('Too many requests!');
        } else {
          setBridgesList(await data.json());
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        // Toast notification for error here
      } finally {
        // Toast notification for something else if needed here
      }
    }
    if (canFetchBridge) {
      getBridgesList();
    }
  }, [canFetchBridge]);

  useEffect(() => {
    if (clicked) {
      setLoading(true);
      setCanFetchBridge(true);
    }
  }, [clicked]);

  return (
    <Sheet
      snapPoints={[60, 30]}
      open={true}
      disableDrag
      dismissOnOverlayPress={false}
      zIndex={100_000}
      animation="medium"
    >
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame>
        {bridgesList.length > 0 ? (
          <YStack
            flex={1}
            padding={'$4'}
            flexDirection="column"
            justifyContent="space-around"
            alignItems="center"
          >
            <XStack flex={0.25}>
              <H1 size={'$9'}>Connect your bridge</H1>
            </XStack>

            <YGroup alignSelf="center" bordered>
              {mockup.map((device, index) => (
                <YGroup.Item key={index}>
                  <ListItem
                    icon={<HueBridgeSVG size={25} />}
                    title={`${device.id}`}
                    subTitle={`${device.internalipaddress}`}
                  ></ListItem>
                </YGroup.Item>
              ))}
            </YGroup>
          </YStack>
        ) : (
          <YStack
            flex={1}
            padding={'$4'}
            flexDirection="column"
            justifyContent="space-around"
            alignItems="center"
          >
            <XStack flex={0.25}>
              <H1 size={'$9'}>Connect your bridge</H1>
            </XStack>
            <XStack flex={0.5}>
              {loading ? (
                <ActivityIndicator
                  size={'large'}
                  color={'#000'}
                  style={{ transform: [{ scaleX: 4 }, { scaleY: 4 }] }}
                />
              ) : (
                <HueBridgeSVG size={200} />
              )}
            </XStack>

            <XStack flex={0.25} alignItems="flex-end">
              {!loading ? (
                <Button onPress={() => setClicked(true)} variant="outlined" size={'$5'}>
                  Find bridge
                </Button>
              ) : null}
            </XStack>
          </YStack>
        )}
      </Sheet.Frame>
    </Sheet>
  );
}
