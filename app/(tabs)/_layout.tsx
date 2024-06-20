import { Link, Tabs } from 'expo-router';
import { Button, useTheme } from 'tamagui';
import { Lightbulb, Plus } from '@tamagui/lucide-icons';
import { LightbulbGroup } from 'components/lightbulbGroupSVG';

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
            <Link href="/modal" asChild>
              <Button mr="$4" variant="outlined">
                <Plus></Plus>
              </Button>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Groups',
          tabBarIcon: ({ color }) => <LightbulbGroup color={color} />,
        }}
      />
    </Tabs>
  );
}
