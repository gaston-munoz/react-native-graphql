import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Spinner, ListItem, Left, Thumbnail, Body } from 'native-base';
import { useQuery, gql, DocumentNode } from '@apollo/client';
import Error from '../Error'

const Card = ({ data }: ICard) => {
    return(
        <ListItem 
            thumbnail
            style={styles.card} >
        <Left>
          <Thumbnail square  source={{ uri: data.image }} style={styles.thumbnail} />
        </Left>
        <Body>
          <Text style={styles.text} >{ data.name }</Text>
        </Body>
      </ListItem>
    )
}

const query: DocumentNode = gql`
query ($id: ID!) {
  location (id: $id) {
    name
    type
    dimension
    residents {
      name
      image
    }
  }
}`

export  interface ICard {
    data: IChar
}

interface IChar {
    id: number;
    name: string;
    image: string;
}
 

export interface DetailLocationProps {
    id: number,
    navigation: any
}
 
const DetailLocation: React.SFC<DetailLocationProps> = ({ id, navigation }) => {

    const { data, loading, error } = useQuery(query,{
        variables: {
            id
        }
    })
    console.log('useQuery', data, loading, error);
    
    if(loading) return <Spinner color='#45b1d5' />;
    if(error) return <Error navigation={navigation} /> 

    console.log(data.location.residents)
    // data.episode.characters.splice(5, Number(data.episode.characters.length) - 1)
    let residents = []
    for(let i = 0; i < 5; i++) {
        if(data.location.residents[i])
          residents.push(data.location.residents[i])
    }
 
    const { name, type, dimension  } = data.location
 
    console.log('location', name, type, residents, dimension)

    return ( 
        <View style={styles.content}>
          <View style={styles.cardBody}>
            <Text style={styles.title} >{ name }</Text>
            <View style={styles.contentCharInfo}>

              <View style={styles.contenField}> 
                <Text style={styles.label} >Dimension:</Text>
                <Text style={styles.field} >{ dimension }</Text>
              </View> 


              <View style={styles.contenField}> 
                <Text style={styles.label} >Type: </Text>
                <Text style={styles.field} >{ type }</Text>
              </View> 

              <Text style={styles.label} >Residents:</Text>
              <View style={styles.contentCards}> 
                {
                    residents.map((char, i) =>(
                        <Card
                        // navigation={navigation}
                         data={char}
                          key={i} />
                    ))
                }
              </View> 

            </View>
          </View>
        </View> 
     );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor:  '#0095f2',
        paddingVertical: 7,
        paddingHorizontal: 20,
    },
    image: {
        width: '100%',
        height: 350,
  borderRadius: 5

    },
    imageContent:{
        justifyContent: 'center',
        alignItems: 'center'

    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 29,
        textAlign: 'center',
        marginVertical: 2,
        fontFamily: 'OpenSans'
        
    },
    cardBody: {
    },
    label: {
        fontSize: 24,
        fontWeight:  "700"
    },
    field: {
        marginLeft: 10,
        fontSize: 24
    },
    contenField:{
        marginVertical: 2,
        flexDirection: 'row'
    },
    contentCharInfo: {
        flexDirection: "column",
        justifyContent: 'flex-start'
    },
    contentCards: {
        paddingTop: 6,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    // card

    card: {
        marginVertical: 3,
        paddingVertical: 2,
        paddingHorizontal: 5,
        paddingRight: 0,
        marginHorizontal: 0,
        marginLeft: 0,
        marginRight: 0,
        maxHeight: 80,
        borderRadius: 7,
        backgroundColor: '#0095f2',
        width: '100%'
    },
    text: {
        color: '#111111',
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10
    },
    thumbnail: {
      marginHorizontal: 0,
      marginLeft: 10,
      borderRadius: 5
    }, 
    headerText: {

    },
    cardContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        textAlign: 'center',
        justifyContent: "center"


    },
    cardTitle: {
        color: '#111111',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 7,
        marginBottom: 10,
        backgroundColor: '#DDDDDD',
        width: '100%'

    },
    subtitle: {
        color: '#111111',
        fontSize: 24,
   //     fontWeight: 'bold',
   //     textAlign: 'center'
    }
})
 
export default DetailLocation;
