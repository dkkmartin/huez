import GroupCard from 'components/group/groupCard'
import { getObjectData } from 'lib/asyncStorage'
import { useEffect, useState } from 'react'
import { ScrollView, YStack } from 'tamagui'

export default function TabGroups() {
  const [storedGroups, setStoredGroups] = useState([])
  const [canScroll, setCanScroll] = useState(true)

  useEffect(() => {
    async function getStoredGroups() {
      const storedGroupData = await getObjectData('groups')
      setStoredGroups(storedGroupData)
      console.log(storedGroupData)
    }
    getStoredGroups()
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
        {storedGroups?.map((group, index) => (
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
