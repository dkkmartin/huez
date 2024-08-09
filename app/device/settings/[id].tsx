import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Button } from 'tamagui'
import ColorPicker, {
  Panel1,
  Swatches,
  HueSlider,
} from 'reanimated-color-picker'
import { YStack } from 'tamagui'
import { Label } from 'tamagui'
import { useEffect } from 'react'

export default function DeviceSettings() {
  const navigation = useNavigation()
  const { id } = useLocalSearchParams()

  useEffect(() => {
    navigation.setOptions({
      title: 'Settings',
    })
  }, [id])

  // Note: 👇 This can be a `worklet` function.
  const onSelectColor = ({ hex }) => {
    // do something with the selected color.
    console.log(hex)
  }

  return (
    <YStack margin={'$4'} flex={1} gap={'$4'} alignItems="center">
      <Label alignSelf="flex-start" fontSize={20}>
        Color
      </Label>
      <ColorPicker
        style={{ width: '100%', gap: 20 }}
        value="red"
        onComplete={onSelectColor}
      >
        <Panel1 />
        <HueSlider />
        <Swatches />
      </ColorPicker>

      <Button width={'50%'} onPress={() => null}>
        <Button.Text>Ok</Button.Text>
      </Button>
    </YStack>
  )
}
