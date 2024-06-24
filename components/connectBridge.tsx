import { Button, H1, Sheet, XStack, YStack, YGroup, ListItem, Input, Paragraph } from 'tamagui';
import { HueBridgeSVG } from './svg/hueBridgeSVG';
import { ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { getHueKey } from 'lib/hue';
import { Check, MoveRight } from '@tamagui/lucide-icons';

interface BridgesListType {
  id: string;
  internalipaddress: string;
  port: number;
}

export default function ConnectBridge() {
  const [tooManyRequests, setTooManyRequests] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [canFetchBridge, setCanFetchBridge] = useState(false);
  const [canShowBridgeList, setCanShowBridgeList] = useState(false);
  const [canConnectToBridge, setCanConnectToBridge] = useState(false);
  const [canBridgeLink, setCanBridgeLink] = useState(false);
  const [linkSuccess, setLinkSuccess] = useState(false);
  const [selectedIP, setSelectedIP] = useState('');
  const [manuallyIP, setManuallyIP] = useState('');
  const [bridgesList, setBridgesList] = useState<BridgesListType[]>([]);

  function setIP(ip: string) {
    2;
    setSelectedIP(ip);
  }

  function handleConnectClick() {
    setCanShowBridgeList(false);
    setCanConnectToBridge(true);
    setLoading(true);
  }

  useEffect(() => {
    async function handleHueConnection() {
      try {
        const response = await getHueKey(selectedIP);
        if (response[0].error.description === 'link button not pressed') {
          setCanBridgeLink(true);
        } else {
          setLinkSuccess(true);
        }
      } catch (error) {
        console.error('Error during connection:', error);
      }
    }
    if (canConnectToBridge) {
      handleHueConnection();
    }
  }, [canConnectToBridge, selectedIP]);

  useEffect(() => {
    console.log(canBridgeLink);
  }, [canBridgeLink]);

  useEffect(() => {
    async function getBridgesList() {
      try {
        const data = await fetch('https://discovery.meethue.com');
        if (data.status === 429) {
          setTooManyRequests(true);
          throw new Error('Too many requests!');
        } else {
          setBridgesList(await data.json());
          setLoading(false);
          setCanShowBridgeList(true);
        }
      } catch (error) {
        console.log(error);
        setTooManyRequests(true);
        setLoading(false);
        // Toast notification for error here
      } finally {
        // Toast notification for something else if needed here
        setLoading(false);
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
      {!tooManyRequests ? (
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

              <YGroup flex={0.5} alignSelf="center" justifyContent="center">
                {canShowBridgeList
                  ? bridgesList.map((device, index) => (
                      <YGroup.Item key={index}>
                        <ListItem
                          onPress={() => setIP(device.internalipaddress)}
                          icon={
                            <HueBridgeSVG
                              size={25}
                              color={selectedIP === device.internalipaddress ? '#00f308' : '#000'}
                            />
                          }
                          title={`${device.id}`}
                          subTitle={`${device.internalipaddress}`}
                        ></ListItem>
                      </YGroup.Item>
                    ))
                  : loading && (
                      <XStack flex={0.5}>
                        <ActivityIndicator
                          size={'large'}
                          color={'#000'}
                          style={{ transform: [{ scaleX: 4 }, { scaleY: 4 }] }}
                        />
                      </XStack>
                    )}
              </YGroup>
              <XStack flex={0.25} alignItems="flex-end">
                {selectedIP && !loading ? (
                  <Button onPress={handleConnectClick} variant="outlined" size={'$5'}>
                    Connect
                  </Button>
                ) : null}
              </XStack>
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
                <H1 size={'$9'}>Find your bridge</H1>
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
                  <Button
                    onPress={() => {
                      setClicked(true);
                    }}
                    variant="outlined"
                    size={'$5'}
                  >
                    Find bridge
                  </Button>
                ) : null}
              </XStack>
            </YStack>
          )}
        </Sheet.Frame>
      ) : !canBridgeLink ? (
        <Sheet.Frame>
          <YStack
            flex={1}
            padding={'$4'}
            flexDirection="column"
            justifyContent="space-around"
            alignItems="center"
          >
            <XStack flex={0.25} flexDirection="column" alignItems="center">
              {!loading ? (
                <>
                  <H1 size={'$9'}>Too many requests</H1>
                  <Paragraph>Enter IP manually</Paragraph>
                </>
              ) : (
                <H1 size={'$9'}>Connecting</H1>
              )}
            </XStack>

            <XStack flex={0.5} alignItems="center">
              {!loading ? (
                <Input
                  value={manuallyIP}
                  onChangeText={(text) => setManuallyIP(text)}
                  keyboardType="decimal-pad"
                  size={'$4'}
                  style={{ width: '100%' }}
                ></Input>
              ) : (
                <ActivityIndicator
                  size={'large'}
                  color={'#000'}
                  style={{ transform: [{ scaleX: 4 }, { scaleY: 4 }] }}
                />
              )}
            </XStack>
            <XStack flex={0.25} alignItems="flex-end">
              {!loading && (
                <Button
                  onPress={() => {
                    setIP(manuallyIP);
                    setCanConnectToBridge(true);
                    setLoading(true);
                  }}
                  variant="outlined"
                  size={'$5'}
                >
                  Connect
                </Button>
              )}
            </XStack>
          </YStack>
        </Sheet.Frame>
      ) : !linkSuccess ? (
        <Sheet.Frame>
          <YStack
            flex={1}
            padding={'$4'}
            flexDirection="column"
            justifyContent="space-around"
            alignItems="center"
          >
            <XStack flex={0.25} flexDirection="column" alignItems="center">
              <>
                <H1 size={'$9'}>Linking</H1>
                <Paragraph>Click the button on top of the bridge</Paragraph>
              </>
            </XStack>
            <XStack flex={0.5} alignItems="center">
              <MoveRight
                animation={'bouncy'}
                size={100}
                style={{ position: 'absolute', left: -50 }}
              ></MoveRight>
              <HueBridgeSVG size={200} />
            </XStack>
            <XStack flex={0.25} alignItems="flex-end">
              <Button
                onPress={() => {
                  setIP(manuallyIP);
                  setCanConnectToBridge(true);
                  setLoading(true);
                }}
                variant="outlined"
                size={'$5'}
              >
                Connect
              </Button>
            </XStack>
          </YStack>
        </Sheet.Frame>
      ) : (
        <Sheet.Frame>
          <YStack
            flex={1}
            padding={'$4'}
            flexDirection="column"
            justifyContent="space-around"
            alignItems="center"
          >
            <XStack flex={0.25} flexDirection="column" alignItems="center">
              <>
                <H1 size={'$9'}>Linking completed</H1>
                <Paragraph>You are now linked to the bridge</Paragraph>
              </>
            </XStack>
            <XStack flex={0.5} alignItems="center">
              <Check size={200} color={'#00f308'}></Check>
            </XStack>
            <XStack flex={0.25}></XStack>
          </YStack>
        </Sheet.Frame>
      )}
    </Sheet>
  );
}
