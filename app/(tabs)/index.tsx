import DeviceCard from 'components/device/deviceCard'
import { getObjectData } from 'lib/asyncStorage'
import { useEffect, useState } from 'react'
import { ScrollView, YStack } from 'tamagui'
// import { ToastControl } from 'app/CurrentToast';

export default function TabOneScreen() {
  const [storedDevices, setStoredDevices] = useState([])
  const [canScroll, setCanScroll] = useState(true)

  useEffect(() => {
    async function getStoredDevices() {
      const storedDeviceIds = await getObjectData('devices')
      setStoredDevices(storedDeviceIds)
    }
    getStoredDevices()
  }, [])

  return (
    <ScrollView scrollEnabled={canScroll}>
      <YStack
        maxWidth={360}
        margin="auto"
        marginVertical="$4"
        gap="$4"
        flex={1}
      >
        {storedDevices?.map((device, index) => (
          <DeviceCard
            setCanScroll={setCanScroll}
            key={index}
            deviceData={device}
          />
        ))}
      </YStack>
    </ScrollView>
  )
}
