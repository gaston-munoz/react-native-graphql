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
const ListEntities: React.FC<ListEntitiesProps> = ({ navigation }) => {
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

  const renderList = () => {
    if(loading) 
      return showLoading();
    if(error) 
      return showError(error);
  }  

  const showError = (error: any):JSX.Element => {
    if(error.message !== '404: Not Found')
      return <Error navigation={navigation} /> 
    
    return  <Text style={styles.emptyList}>Nothing to show, look for something else...</Text>
  }

  const showLoading = ():JSX.Element => (
    <Spinner color='#45b1d5' />
  )

  return (
    <View style={styles.containerList}>
      <Header />
      <ScrollView
        ref={scrollRef}
        style={styles.sectionScroll}>
        { renderList() }
        { 
          elements && elements.map((elem: any, i: number) => (
            <Card
              navigation={(screen: any)=>navigation.navigate(screen)}
              type={category}
              data={elem}
              key={i} 
            />))
        }
        { elements && elements.length > 5 && <Pagination /> }
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
