/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import moment from 'moment'
import {View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { DataContext } from '../../context/Context';

export interface HomeProps {
  navigation: any;
}
const Home: React.SFC<HomeProps> = ({navigation}) => {
  const { setFilter } = useContext(DataContext);

  const toList = () => {
    setFilter('');
    navigation.push('List', { screen: 'List' });
  }

  return (
    <View style={styles.container}>
      <View style={styles.sectionTop}>
        <Text style={styles.title}>React Native Challenge</Text>
        <Text style={styles.subtitle}>Gastón Muñoz</Text>
      </View>
      <View style={styles.sectionBottom}>
          <TouchableWithoutFeedback
            onPress={()=>{ toList() }}
            style={styles.btnEnter}>
            <View style={styles.btnEnter}>
              <Text style={styles.textBtn}> Enter </Text>  
            </View>  
          </TouchableWithoutFeedback>
      </View>
      <View style={styles.sectionDate}>
        <Text style={styles.textDate}>{ moment().format('DD MMM yyyy') }</Text>
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#EFEFEF',
      alignItems: 'center'
  },
  sectionTop: {
    alignItems: 'center'
},
  title: {
      color: '#0084E1',
      marginTop: 50,
      marginBottom: 15,
      fontSize: 33,
      fontWeight: 'bold',
      fontFamily: 'Roboto'
  },
  subtitle: {
      color: '#0084E1',
      marginTop: 0,
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'Roboto'
  },
  sectionBottom: {
    marginTop: '80%',
    alignItems: 'center',
    borderRadius: 100,
    marginBottom: 40,
  },
  btnEnter: {
    paddingVertical: 20,
    borderRadius: 80,
    padding: 0,
    minWidth: '50%',
    borderColor: '#0084E1',
    borderWidth: 2
  },
  textBtn: {
    color: '#0084E1',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  sectionDate: {
    marginVertical: 10
  },
  textDate: {
    fontSize: 18,
    color: '#0084E1',
    fontWeight: 'bold'
  }
})

export default Home;
