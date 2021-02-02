import React, { useContext } from 'react';
import { DataContext } from '../../context/Context';
import { DetailsContext } from '../../context/DetailsContext';
import { View,  StyleSheet } from 'react-native';
import { ListItem, Text, Right, Button, Body, Left, Thumbnail } from 'native-base';

export interface CardProps {
    data: MortyElem,
    type: string,
    navigation: any
}

export interface MortyElem {
    name: string,
    id: number,
    image?: string,
    episode?: string,
    dimension?: string
}
 
const Card: React.FC<CardProps> = ({ data, navigation, ...props }) => { DetailsContext
    const { category: type } = useContext(DataContext);
    const { setEntityId } = useContext(DetailsContext);

    const handleToDetail = () => {
        setEntityId(data.id);
        navigation('Details');
    }

    const renderCard = (): JSX.Element => {
      if(type === 'characters')
        return showCharactersCard();    
      else
        return showLocaEpiCard();
    }    
 
    const showLocaEpiCard = (): JSX.Element => (
      <Body>
        <View style={styles.content}>
          <Text style={styles.title} >{ data.name }</Text>   
        </View> 
          <View style={styles.content}>
              <Text style={styles.subtitle} >{ type === 'episodes' ? 'Episode: ' :  'Dimension: ' }</Text>
              <Text style={styles.subtitle} >{ type === 'episodes' ? data.episode :  data.dimension }</Text>
          </View> 
      </Body>  
    )

    const showCharactersCard = ():JSX.Element => (
      <View style={styles.charContent}>
          <Thumbnail large source={{ uri: data.image }} style={styles.thumbnail} />
        <Body>
          <Text style={styles.text} >{ data.name }</Text>
        </Body>
      </View> 
    )

    return ( 
      <ListItem 
        onPress={() => { handleToDetail() }}
        style={styles.card} >
        { renderCard() }    
      </ListItem>
     );
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 5,
        paddingVertical: 5,
        paddingHorizontal: 0,
        paddingRight: 3,
        marginLeft: 0,
        marginRight: 0,

        marginHorizontal: 0,
        width: '100%',

        borderRadius: 7,
        backgroundColor: '#FFFFFF'
    },
    charContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    text: {
        color: '#111111',
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft:0,
        textAlign: 'left',
        paddingLeft: 20,
    },
    thumbnail: {
      marginVertical: 5,
      marginHorizontal: 0,
      marginLeft: 20,
      marginRight: 10,
      paddingHorizontal: 0,


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
        fontSize: 24
    }
})
 
export default Card;
