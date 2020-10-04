/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Card from '../Card'
import { DataContext} from '../../context/Context'

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
 // const [ elements, setElements ] = useState(elemsFake || [])
 // const filter: string = ''
  const { data, filter, category, loading, setCategory, setFilter } = useContext(DataContext);
  console.log('DATALIST1', data)
  let elements: Array<any>
  if(data)
    elements = category === 'characters' ? data.characters.results : category === 'episodes' ? data.episodes.results : data.locations.results
  else elements = []  
  console.log('DATALIST2', data, elements)

  return (
    
    <View style={styles.containerList}>
      <ScrollView style={styles.sectionScroll}>
      {
        loading ? <Text>Cargando.........</Text> :
        !elements || !elements.length ? <Text> Nada que mostrar</Text>
        :
        elements.map((elem: any, i: int) => (<Card data={elem} key={i} />))
      }
      </ScrollView>
      <View style={styles.contTabBottom}>
        <TouchableWithoutFeedback
          onPress={()=>{ setCategory('episodes') }}
          style={styles.tabItem}>
          <Text style={styles.textTabItem}>Episodes</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={()=>{ setCategory('characters') }}
          style={styles.tabItemMiddle}>
          <Text style={styles.textTabItemMiddle}>Characters</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={()=>{ setCategory('locations') }}
          style={styles.tabItem}>
          <Text style={styles.textTabItem}>Locations</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerList: {
    flex: 1,
   // color: 'green'

  },
  sectionScroll: {
    flex: 1,
    backgroundColor: 'red'

  },
  contTabBottom: {
    height: 60,
    backgroundColor: 'purple',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopColor: '#000',
    borderTopWidth: 1
  },
  tabItem: {
    flex: 1,
  }, 
  tabItemMiddle: {
    flex: 1
  }, 
  textTabItem: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  textTabItemMiddle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 20,

  }
})

export default ListEntities;
