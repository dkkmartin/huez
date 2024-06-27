import { Link, Tabs } from 'expo-router';
import { Button, useTheme } from 'tamagui';
import { Lightbulb, Plus, Settings } from '@tamagui/lucide-icons';
import { LightbulbGroup } from 'components/svg/lightbulbGroupSVG';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.red10.val,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Lights',
          tabBarIcon: ({ color }) => <Lightbulb color={color} />,
          headerRight: () => (
            <Link href="/modalNewLight" asChild>
              <Button mr="$4" variant="outlined">
                <Plus></Plus>
              </Button>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: 'Groups',
          tabBarIcon: ({ color }) => <LightbulbGroup color={color} />,
          headerRight: () => (
            <Link href="/modalNewGroup" asChild>
              <Button mr="$4" variant="outlined">
                <Plus></Plus>
              </Button>
            </Link>
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Settings color={color} />,
        }}
      />

      <Tabs.Screen
        name="ConnectBridgePage"
        options={{
          title: 'Connect bridge',
          href: null,
        }}
      />
    </Tabs>
  );
}
