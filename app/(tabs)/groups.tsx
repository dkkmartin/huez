import GroupCard from 'components/group/groupCard'
import { getData, getObjectData } from 'lib/asyncStorage'
import { getRooms } from 'lib/hue'
import { useEffect, useState } from 'react'
import { ScrollView, YStack } from 'tamagui'
import { Root } from 'types/rooms'

export default function TabGroups() {
  const [groups, setGroups] = useState<Root>()
  const [canScroll, setCanScroll] = useState(true)

  useEffect(() => {
    async function getGroups() {
      const bridgeIP = await getData('bridge-ip')
      const bridgeKey = await getData('bridge-key')
      const response = await getRooms(bridgeIP as string, bridgeKey as string)
      setGroups(response)
    }
    getGroups()
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
        {groups?.data.map((group, index) => (
          <GroupCard
            setCanScroll={setCanScroll}
            key={index}
            groupData={group}
          />
        ))}
      </YStack>
    </ScrollView>
  )
}
