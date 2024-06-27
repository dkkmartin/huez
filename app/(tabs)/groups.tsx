import GroupCard from 'components/group/groupCard';
import { useState } from 'react';
import { ScrollView, Text, View, YStack } from 'tamagui';

const mockup = {
  errors: [],
  data: [
    {
      type: 'Lorem',
      id: 'A1B2C3D4E5',
      children: [
        { rid: 'X1Y2Z3W4', rtype: 'light' },
        { rid: 'Y2Z3W4X1', rtype: 'contact' },
        { rid: 'Z3W4X1Y2', rtype: 'motion' },
        { rid: 'W4X1Y2Z3', rtype: 'light' },
      ],
      metadata: {
        name: 'Kitchen',
        archetype: 'kitchen',
      },
    },
    {
      type: 'Lorem',
      id: 'F6G7H8I9J0',
      children: [
        { rid: 'U7V8W9X0', rtype: 'motion' },
        { rid: 'V8W9X0U7', rtype: 'light' },
        { rid: 'W9X0U7V8', rtype: 'contact' },
        { rid: 'X0U7V8W9', rtype: 'light' },
      ],
      metadata: {
        name: 'Living Room',
        archetype: 'living_room',
      },
    },
    {
      type: 'Lorem',
      id: 'K1L2M3N4O5',
      children: [
        { rid: 'P6Q7R8S9', rtype: 'light' },
        { rid: 'Q7R8S9P6', rtype: 'motion' },
        { rid: 'R8S9P6Q7', rtype: 'contact' },
        { rid: 'S9P6Q7R8', rtype: 'light' },
      ],
      metadata: {
        name: 'Bathroom',
        archetype: 'bathroom',
      },
    },
    {
      type: 'Lorem',
      id: 'P5O4N3M2L1',
      children: [
        { rid: 'K0J9H8G7', rtype: 'contact' },
        { rid: 'J9H8G7F6', rtype: 'light' },
        { rid: 'H8G7F6E5', rtype: 'motion' },
        { rid: 'G7F6E5D4', rtype: 'light' },
      ],
      metadata: {
        name: 'Garage',
        archetype: 'garage',
      },
    },
    {
      type: 'Lorem',
      id: 'Z9Y8X7W6',
      children: [
        { rid: 'V5U4T3S2', rtype: 'motion' },
        { rid: 'U4T3S2R1', rtype: 'contact' },
        { rid: 'T3S2R1Q0', rtype: 'light' },
        { rid: 'S2R1Q0P9', rtype: 'motion' },
      ],
      metadata: {
        name: 'Office',
        archetype: 'office',
      },
    },
    {
      type: 'Lorem',
      id: 'Z9Y8X7W6',
      children: [
        { rid: 'V5U4T3S2', rtype: 'motion' },
        { rid: 'U4T3S2R1', rtype: 'contact' },
        { rid: 'T3S2R1Q0', rtype: 'light' },
        { rid: 'S2R1Q0P9', rtype: 'motion' },
      ],
      metadata: {
        name: 'Pool',
        archetype: 'pool',
      },
    },
  ],
};

export default function TabGroups() {
  const [canScroll, setCanScroll] = useState(true);

  return (
    <ScrollView scrollEnabled={canScroll}>
      <YStack maxWidth={360} margin="auto" marginVertical="$4" gap="$4" flex={1}>
        {mockup.data.map((device, index) => (
          <GroupCard setCanScroll={setCanScroll} key={index} groupData={device} />
        ))}
      </YStack>
    </ScrollView>
  );
}
