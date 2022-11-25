import React from 'react'
import { Avatar, Card } from 'react-native-paper'

const PersCard = ({ pers }) => {
    return (
        <Card
            mode="elevated"
            style={{
                borderRadius: 16,
            }}>
            <Card.Title
                title={pers.name ?? ""}
                titleStyle={{
                    fontWeight: "bold",
                    fontSize: 18,
                }}
                subtitle={pers.rank ?? ""}
                subtitleVariant="bodyMedium"
                left={(props) => (
                    <Avatar.Image
                        {...props}
                        size={46}
                        source={{ uri: pers.image }}
                    />
                )}
            />
        </Card>
    )
}

export default PersCard