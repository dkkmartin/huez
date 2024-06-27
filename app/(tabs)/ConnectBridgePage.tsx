import { Check } from '@tamagui/lucide-icons';
import { getData, storeData } from 'lib/asyncStorage';
import { getHueKey } from 'lib/hue';
import { useEffect, useState } from 'react';
import { Button, H1, Input, XStack, YStack } from 'tamagui';

export default function ConnectBridgePage() {
  const [IP, setIP] = useState('');
  const [canConnectToBridge, setCanConnectToBridge] = useState(false);
  const [bridgeConnectionTrue, setBridgeConnectionTrue] = useState(false);
  const [bridgeKey, setBridgeKey] = useState('');
  const [bridgeIP, setBridgeIP] = useState('');

  function handleConnect() {
    setCanConnectToBridge(true);
  }

  useEffect(() => {
    async function getLocalStorage() {
      const bridgeIP = await getData('bridge-ip');
      const bridgeKey = await getData('bridge-key');
      setBridgeIP(bridgeIP || '');
      setBridgeKey(bridgeKey || '');
    }
    getLocalStorage();
  }, []);

  useEffect(() => {
    console.log(bridgeIP, bridgeKey);
  }, [bridgeIP, bridgeKey]);

  useEffect(() => {
    async function handleHueConnection() {
      try {
        const response = await getHueKey(IP);
        if (response[0]?.error?.description === 'link button not pressed') {
          console.log('Link button not pressed');
          setCanConnectToBridge(false);
        } else if (response[0].success) {
          console.log('Connected to bridge');
          storeData('bridge-key', response[0]?.success?.username);
          storeData('bridge-ip', IP);
          setBridgeConnectionTrue(true);
        }
      } catch (error) {
        console.error('Error during connection:', error);
        setCanConnectToBridge(false);
      }
    }
    if (canConnectToBridge) {
      handleHueConnection();
    }
  }, [canConnectToBridge]);

  useEffect(() => {
    async function testBridgeKey() {
      const headersList = {
        Accept: 'application/json',
        'hue-application-key': bridgeKey || '',
        'Content-Type': 'application/json',
      };
      try {
        console.log(bridgeIP, bridgeKey);
        const response = await fetch(`https://${bridgeIP}/clip/v2/resource/device`, {
          method: 'GET',
          headers: headersList,
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    if (bridgeIP && bridgeKey) {
      testBridgeKey();
    }
  }, [bridgeIP, bridgeKey]);

  return (
    <>
      {!bridgeConnectionTrue ? (
        <YStack flex={0.5} padding={'$4'} flexDirection="column" alignItems="center">
          <XStack flex={0.25} flexDirection="column" alignItems="center">
            <H1 size={'$9'}>Enter IP</H1>
          </XStack>

          <XStack flex={0.5} alignItems="center">
            <Input
              value={IP}
              onChangeText={(text) => setIP(text)}
              keyboardType="decimal-pad"
              size={'$4'}
              style={{ width: '100%' }}
            ></Input>
          </XStack>
          <XStack flex={0.25} alignItems="flex-end">
            <Button onPress={handleConnect} variant="outlined" size={'$5'}>
              Connect
            </Button>
          </XStack>
        </YStack>
      ) : (
        <YStack flex={0.5} padding={'$4'} flexDirection="column" alignItems="center">
          <XStack flex={0.25} flexDirection="column" alignItems="center">
            <H1 size={'$9'}>Connected</H1>
          </XStack>

          <XStack flex={0.5} alignItems="center">
            <Check color={'#00f308'} size={200}></Check>
          </XStack>
        </YStack>
      )}
    </>
  );
}
