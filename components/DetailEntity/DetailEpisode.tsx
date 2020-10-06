import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { DocumentNode, gql, useQuery } from '@apollo/client';
import { Spinner, ListItem, Left, Thumbnail, Body } from 'native-base';
import Error from '../Error'
import { ScrollView } from 'react-native-gesture-handler';

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
      </ListItem >
    )
}

const query: DocumentNode = gql`
query ($id: ID!) {
  episode (id: $id) {
    name
    air_date
    episode
    characters {
      name
      image
    }
  }
}`

export  interface ICard {
    data: IChar
}

export interface DetailEpisodeProps {
    id: number;
    navigation: any
}

interface IChar {
    id: number;
    name: string;
    image: string;
}
 
const DetailEpisode: React.SFC<DetailEpisodeProps> = ({ id, navigation }) => {

    const { data, loading, error } = useQuery(query,{
        variables: {
            id
        }
    })
    console.log('useQuery', data, loading, error);
    
    if(loading) return <Spinner color='#45b1d5' />;
    if(error) return <Error navigation={navigation} /> 

    let characters = []
    for(let i = 0; i < 5; i++) {
        if(data.episode.characters[i])
          characters.push(data.episode.characters[i])
    }
    const { name, episode, air_date  } = data.episode

    return ( 
        <ScrollView style={styles.content}>
          <View style={styles.cardBody}>
            <Text style={styles.title} >{ name }</Text>
            <View style={styles.contentCharInfo}>

              <View style={styles.contenField}> 
                <Text style={styles.label} >Episode:</Text>
                <Text style={styles.field} >{ episode }</Text>
              </View> 


              <View style={styles.contenField}> 
                <Text style={styles.label} >Release date: </Text>
                <Text style={styles.field} >{ air_date }</Text>
              </View> 

              <Text style={styles.label} >Characters:</Text>
              <View style={styles.contentCards}> 
                {
                    characters.map((char, i) =>(
                        <Card
                        // navigation={navigation}
                         data={char}
                          key={i} />
                    ))
                }
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
        paddingVertical: 7,
        paddingHorizontal: 20,
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
      marginVertical: 5,
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
        fontSize: 24
    }
})
 
export default DetailEpisode;