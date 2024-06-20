import DeviceCard from 'components/device/deviceCard';
import { XStack, YStack } from 'tamagui';
// import { ToastControl } from 'app/CurrentToast';

const mockup = {
  errors: [],
  data: [
    {
      id: '3c0f60c0-c342-41ca-98f4-ef27b4811d8b',
      id_v1: '/lights/1',
      product_data: {
        model_id: 'LCA001',
        manufacturer_name: 'Signify Netherlands B.V.',
        product_name: 'Hue color lamp',
        product_archetype: 'sultan_bulb',
        certified: true,
        software_version: '1.90.1',
        hardware_platform_type: '100b-112',
      },
      metadata: {
        name: 'Hue color lamp 1',
        archetype: 'sultan_bulb',
      },
      identify: {},
      services: [
        {
          rid: 'b6565fa0-09fc-4347-944e-ff94cfe3b76a',
          rtype: 'zigbee_connectivity',
        },
        {
          rid: '60b598c4-55ee-4843-b276-2bdcfa1b723f',
          rtype: 'light',
        },
        {
          rid: '3374bdfb-b1a1-4fe4-9576-dcb0d259cf83',
          rtype: 'entertainment',
        },
        {
          rid: 'a4582531-c721-4d00-aa9f-fbf73f158b38',
          rtype: 'device_software_update',
        },
      ],
      type: 'device',
    },
  ],
};

export default function TabOneScreen() {
  return (
    <XStack maxWidth={360} margin="auto" justifyContent="center" padding="$4" flex={1}>
      <YStack>
        <DeviceCard deviceData={mockup} />
      </YStack>
    </XStack>
  );
}
