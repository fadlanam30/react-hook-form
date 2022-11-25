import { FlatList, Stack, Text } from 'native-base'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Appbar } from 'react-native-paper'
import PersCard from '../../components/PersCard'
import { useGetPersQuery } from '../../services/persAPI'

const HomeScreen = ({ navigation }) => {

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
          onPress={() => navigation.navigate('DetailScreen', { id: item.id})}
          >
            <PersCard
              pers={item}
            >

            </PersCard>
          </TouchableOpacity>
        )}
      />
    </Stack>
  )
}

export default HomeScreen
