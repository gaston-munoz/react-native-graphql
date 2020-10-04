/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { Item, Input, Icon, Button } from 'native-base';
import Card from '../Card';
import { DataContext} from '../../context/Context';
import Header from '../Header'
import TabBar from '../TabBar';
let elemsFake = [
  'React',
  'Node',
  'Angular',
  'Vue',
  'React',
]



export interface ListEntitiesProps {
  data: string;
}
const ListEntities: React.SFC<ListEntitiesProps> = () => {

  const { data, filter, category, loading, setCategory, setFilter, error } = useContext(DataContext);
  let elements: Array<any>
  if(data)
    elements = category === 'characters' ? data.characters.results : category === 'episodes' ? data.episodes.results : data.locations.results
  else elements = []  

  return (
    
    <View style={styles.containerList}>
      <Header />
      <ScrollView style={styles.sectionScroll}>

      {
        loading ? <Text>Cargando.........</Text> :
        !elements || !elements.length ? <Text> Nada que mostrar</Text>
        :
        elements.map((elem: any, i: number) => (<Card type={category} data={elem} key={i} />))
      }
      </ScrollView>
      <TabBar />
    </View>
  );
};

const styles = StyleSheet.create({
  containerList: {
    flex: 1,
    justifyContent: 'center'
   // color: 'green'

  },
  sectionScroll: {
    flex: 1,
    backgroundColor: '#232323',
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: 'white'
    
  },

})

export default ListEntities;
