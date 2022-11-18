import { useNavigation } from '@react-navigation/native'
import { FlatList, Stack, Text } from 'native-base'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Appbar } from 'react-native-paper'
import { useGetPersQuery } from '../../services/persAPI'

const HomeScreen = () => {
  const navigation = useNavigation()

  const listPers = useGetPersQuery().data?.data || []

  console.log('pers', useGetPersQuery().data?.data)

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
        data={listPers || []}
        ListEmptyComponent={() => (
          <Stack p={4} alignItems="center">
            <Text>Data not found</Text>
          </Stack>
        )}
        ItemSeparatorComponent={() => <Stack h={4} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UserFormScreen', {
                id: item.id,
                type: 'edit'
              })
            }
          >
            <Stack bg="white" shadow={2} p={4}>
              <Text bold>{item.name || ''}</Text>
              <Text>{item.rank || ''}</Text>
            </Stack>
          </TouchableOpacity>
        )}
      />
    </Stack>
  )
}

export default HomeScreen
