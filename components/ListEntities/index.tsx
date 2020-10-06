/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';

import { Item, Input, Icon, Button, Spinner } from 'native-base';
import Card from '../Card';
import { DataContext} from '../../context/Context';
import Header from '../Header'
import TabBar from '../TabBar';
import Error from '../Error'
import Pagination, { IContext } from '../Pagination'

export interface ListEntitiesProps {
  navigation: any;
}
const ListEntities: React.SFC<ListEntitiesProps> = ({ navigation }) => {
  const scrollRef: any = useRef();

  const { data, filter, category, loading, setCategory, setFilter, error }: IContext = useContext(DataContext);
  let elements: Array<any>
  if(data)
    elements = category === 'characters' ? data.characters.results : category === 'episodes' ? data.episodes.results : data.locations.results
  else elements = []  

  useEffect(()=> {
    if(filter === '' || filter.length >= 3) {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true
      })
    }
  }, [ filter, category ])

  return (
    
    <View style={styles.containerList}>
      <Header />
      <ScrollView
        ref={scrollRef}
        style={styles.sectionScroll}>
      {
        loading ? <Spinner color='#45b1d5' /> :
        error && error.message !== '404: Not Found' ? <Error navigation={navigation} /> 
        :
          !elements.length ? <Text style={styles.emptyList}>Nothing to show, look for something else...</Text>
        :
        <>
       { elements.map((elem: any, i: number) => (
          <Card
          navigation={(screen: any)=>navigation.navigate(screen)}
           type={category}
           data={elem}
            key={i} />))
        }
  
        { elements && elements.length > 5 ? <Pagination /> : null }
        </>
        }
      </ScrollView>
      <TabBar />
    </View>
  );
};

const styles = StyleSheet.create({
  containerList: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 0
  },
  sectionScroll: {
    flex: 1,
    backgroundColor: '#1046cf',
    paddingHorizontal: 15,
    color: 'white',
    marginLeft: 0,
    paddingBottom: 100
  },
  emptyList: {
    textAlign: 'center',
    fontSize: 26,
    color: '#e74c3c',
    fontWeight: 'bold'
  }

})

export default ListEntities;
