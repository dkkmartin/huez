import { Button, YStack } from 'tamagui'
import { Appearance } from 'react-native'
import { Moon, Sun } from '@tamagui/lucide-icons'
import { HueBridgeSVG } from 'components/svg/hueBridgeSVG'
import { LogBox } from 'react-native'
import { Link } from 'expo-router'
import { getData } from 'lib/asyncStorage'
import { getDevices } from 'lib/hue'

export default function TabSettings() {
  const colorScheme = Appearance.getColorScheme()
  LogBox.ignoreLogs([/bad setState[\s\S]*Themed/])

  function handleThemeSwitch() {
    Appearance.setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
  }

  async function testConnection() {
    const bridgeIP = await getData('bridge-ip')
    const bridgeKey = await getData('bridge-key')
    console.log('EXPO: ', bridgeIP, bridgeKey)
    const devices = await getDevices(bridgeIP as string, bridgeKey as string)
    console.log(devices)
  }

  return (
    <YStack flex={1} gap="$3" margin="$5">
      <Button
        onPress={handleThemeSwitch}
        size="$5"
        padding="$0"
        variant="outlined"
        icon={
          colorScheme === 'dark' ? <Moon size={'$3'} /> : <Sun size={'$3'} />
        }
      >
        {colorScheme === 'dark' ? 'Dark' : 'Light'}
      </Button>
      <Link href="/ConnectBridgePage" asChild>
        <Button size="$5" variant="outlined" icon={<HueBridgeSVG size={30} />}>
          Connect bridge
        </Button>
      </Link>
      <Button onPress={testConnection} size={'$5'} variant="outlined">
        Test
      </Button>
    </YStack>
  )
}
