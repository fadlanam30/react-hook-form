import { useNavigation } from '@react-navigation/native'
import { FlatList, Stack, Text } from 'native-base'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Appbar } from 'react-native-paper'

const HomeScreen = () => {
  const navigation = useNavigation()
  return (
    <Stack flex={1}>
      <Appbar.Header>
        <Appbar.Content title="Mabes App" />
        <Appbar.Action
          icon="plus"
          onPress={() => navigation.navigate('UserFormScreen')}
        />
      </Appbar.Header>
      <FlatList
        _contentContainerStyle={{ p: 5 }}
        keyExtractor={(item) => item.id}
        data={[]}
        ListEmptyComponent={() => (
          <Stack p={4} alignItems="center">
            <Text>Data not found</Text>
          </Stack>
        )}
        ItemSeparatorComponent={() => <Stack h={4} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('TodoFormScreen', {
                id: item.id,
                type: 'edit'
              })
            }
          >
            <Stack bg="white" shadow={2} p={4}>
              <Text bold>{item.title || ''}</Text>
              <Text>{item.desc || ''}</Text>
            </Stack>
          </TouchableOpacity>
        )}
      />
    </Stack>
  )
}

export default HomeScreen
