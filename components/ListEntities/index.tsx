/* eslint-disable prettier/prettier */
import * as React from 'react';
import { View, Text } from 'react-native';

export interface ListEntitiesProps {
  data: string;
}
const ListEntities: React.SFC<ListEntitiesProps> = () => {
  return (
    <View>
      <Text>Hello from the list of entities</Text>
    </View>
  );
};

export default ListEntities;
