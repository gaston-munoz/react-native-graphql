import React from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import { useQuery,  gql, DocumentNode } from '@apollo/client';
import { Spinner, Left, CardItem,   Card, Body, Icon } from 'native-base';
import Error from '../Error'

// const img: string = 'https://www.rockandpop.cl/wp-content/uploads/2018/05/rick-y-morty-400x360.jpeg'

export interface DeatilCharacterProps {
    id: number;
    navigation: any
}

const query: DocumentNode = gql`
query ($id: ID!) {
  character(id: $id) {
    name
    species
    gender
    image
    type    
  }
}
`;

 
const DetailCharacter: React.SFC<DeatilCharacterProps> = ({ id, navigation }) => {

    const { data, loading, error } = useQuery(query,{
        variables: {
            id
        }
    })

    if(loading) return <Spinner color='#45b1d5' />;
    if(error) return <Error navigation={navigation} /> 

    const { image, name, species, gender, type } = data.character;
    const img=  { uri:  image }
    return ( 
        <ScrollView style={styles.content}>
          <View style={styles.imageContent}>
            <Image
                source={{ uri: image}}
                style={styles.image}/>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.title} >{ name }</Text>
            <View style={styles.contentCharInfo}>


              <View style={styles.contenField}> 
                <Text style={styles.label} >Gender:</Text>
                <Text style={styles.field} >{ gender }</Text>
              </View> 


              <View style={styles.contenField}> 
                <Text style={styles.label} >Species: </Text>
                <Text style={styles.field} >{ species }</Text>
              </View> 

              <View style={styles.contenField}> 
                <Text style={styles.label} >Type:</Text>
                <Text style={styles.field} >{ type ? type : 'No type' }</Text>
              </View> 

            </View>
          </View>
        </ScrollView>  
     
     );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor:  '#0095f2',
        paddingTop: 20,
        paddingBottom: 60,
        paddingHorizontal: 15,
    },
    image: {
        width: '100%',
        height: 320,
  borderRadius: 5

    },
    imageContent:{
        justifyContent: 'center',
        alignItems: 'center'

    },
    contentTitle: {
       // backgroundColor: 'red',
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        marginVertical: 10,
        fontFamily: 'OpenSans'
        
    },
    cardBody: {
    },
    label: {
        fontSize: 22,
        fontWeight:  "700"
    },
    field: {
        marginLeft: 10,
        fontSize: 22
    },
    contenField:{
        marginVertical: 5,
        flexDirection: 'row'
    },
    contentCharInfo: {
        flexDirection: "column",
        justifyContent: 'flex-start'
    }
})
 
export default DetailCharacter;