/* eslint-disable prettier/prettier */
import * as React from 'react';
import moment from 'moment'
import {View, Text, StyleSheet, Button, TouchableWithoutFeedback } from 'react-native';

export interface HomeProps {
  data: string;
  navigation: any;
}
const Home: React.SFC<HomeProps> = ({navigation}) => {
  
  const toList = () => {
    console.log(navigation);
    navigation.push('List');
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
      backgroundColor: '#EEEEEE',
      alignItems: 'center'
  },
  sectionTop: {
 //   backgroundColor: '#001f3f',
    alignItems: 'center'
},
  title: {
      color: '#001f3f',
      marginTop: 50,
      marginBottom: 15,
      fontSize: 33,
      fontWeight: 'bold',
      fontFamily: 'Roboto'
  },
  subtitle: {
      color: '#001f3f',
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
    borderColor: '#001f3f',
    borderWidth: 2
  },
  textBtn: {
    color: '#001f3f',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  sectionDate: {
    marginVertical: 10
  },
  textDate: {
    fontSize: 18,
    color: '#001f3f',
    fontWeight: 'bold'
  }
})

export default Home;
