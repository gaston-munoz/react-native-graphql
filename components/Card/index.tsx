import React from 'react';
import { View, Text } from 'react-native'

export interface CardProps {
    data: MortyElem
}

export interface MortyElem {
    name: string,
    id: number
}
 
const Card: React.SFC<CardProps> = ({data}) => {
    return ( 
        <View>
            <Text>
                This will are my Card, now is {data.id} {data.name}
            </Text>
        </View>
     );
}
 
export default Card;
