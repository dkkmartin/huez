import { Button, YStack } from 'tamagui';
import { Appearance } from 'react-native';
import { Moon, Sun } from '@tamagui/lucide-icons';
import { HueBridgeSVG } from 'components/svg/hueBridgeSVG';
import { useEffect } from 'react';
import { LogBox } from 'react-native';
import { Link } from 'expo-router';

export default function TabSettings() {
  const colorScheme = Appearance.getColorScheme();
  LogBox.ignoreLogs([/bad setState[\s\S]*Themed/]);

  function handleThemeSwitch() {
    Appearance.setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  }

  return (
    <YStack flex={1} gap="$3" margin="$5">
      <Button
        onPress={handleThemeSwitch}
        size="$5"
        padding="$0"
        variant="outlined"
        icon={colorScheme === 'dark' ? <Moon size={'$3'} /> : <Sun size={'$3'} />}
      >
        {colorScheme === 'dark' ? 'Dark' : 'Light'}
      </Button>
      <Link href="/ConnectBridgePage" asChild>
        <Button size="$5" variant="outlined" icon={<HueBridgeSVG size={30} />}>
          Connect bridge
        </Button>
      </Link>
    </YStack>
  );
}
