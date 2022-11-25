import { Stack } from 'native-base'
import React from 'react'
import { ImageBackground } from 'react-native';
import { ActivityIndicator, Appbar } from 'react-native-paper'
import { useGetPersByIdQuery } from '../../services/persAPI';

const DetailScreen = ({ route, navigation }) => {

    const id = route.params.id;
    const { data, isLoading } = useGetPersByIdQuery(id);

    return (
        <Stack flex={1}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Detail Personil" />
                <Appbar.Action
                    icon="delete"
                />
            </Appbar.Header>
            <Stack  paddingX={24}>
                {isLoading ? (
                    <ActivityIndicator />
                ): (
                    <Stack alignItems="center">
                        <ImageBackground
                            style={{ 
                                height: 300,
                                width: 400,
                                maxWidth: 600,
                            }}
                            source={{
                                uri: "https://mabesal.indi.network/" + data?.data.image,
                            }}
                        />
                    </Stack>
                )}
            </Stack>
        </Stack>
    )
}

export default DetailScreen