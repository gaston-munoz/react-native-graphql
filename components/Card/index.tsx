import React from 'react';
import { View,  StyleSheet } from 'react-native';
import { ListItem, Text, Right, Button, Body, Left, Thumbnail } from 'native-base';

export interface CardProps {
    data: MortyElem,
    type: string
}

export interface MortyElem {
    name: string,
    id: number,
    image: string,
    episode?: string,
    dimension?: string
}
 
const Card: React.SFC<CardProps> = ({data, type}) => {
    return ( 
        <ListItem 
          selected
          thumbnail
          onPress={() => { console.log('Thuimb PRES!!') }}
          style={styles.card} >
        { 
          type === 'characters' ?    
          <>
            <Left>
              <Thumbnail large source={{ uri: data.image }} style={styles.thumbnail} />
            </Left>
            <Body>
              <Text style={styles.text} >{ data.name }</Text>
            </Body>
          </>  
            :
            <Body>
              <View style={styles.content}>
                {/*<Text style={styles.subtitle} >Name:</Text> */}
                <Text style={styles.title} >{ data.name }</Text>   
              </View> 
              { type === 'episodes' ?
                <View style={styles.content} >
                   {/* <Text style={styles.subtitle} >Episode:</Text> */}
                    <Text style={styles.subtitle} >Episode: { data.episode }</Text>
                </View> 
                : 
                <View style={styles.content}>
                    <Text style={styles.subtitle} >Dimension: </Text>
                    <Text style={styles.subtitle} >{ data.dimension }</Text>
                </View> 
              }
            </Body>  

        }    

        </ListItem>
     );
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 5,
        paddingVertical: 5,
        paddingHorizontal: 0,
        paddingRight: 3,
 
        borderRadius: 7,
        backgroundColor: '#FFFFFF'
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
      marginLeft: 20

    }, 
    headerText: {

    },
    content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        textAlign: 'center',
        justifyContent: "center"


    },
    title: {
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
 
export default Card;
