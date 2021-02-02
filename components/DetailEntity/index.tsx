import { Body, Left, ListItem, Spinner, Text, Thumbnail, View } from 'native-base';
import React, { JSXElementConstructor, useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Image } from 'react-native';
import { DataContext } from '../../context/Context';
import { DetailsContext } from '../../context/DetailsContext';
import Error from '../Error';

export interface DetailEntityProps {
  entityId: number;
  category: string;
  navigation?: any
}

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


interface IEntity {
  name       : string;
  episode?   : string;
  air_date?  : string;
  characters?: any[];
  dimension? : string;
  type?      : string;
  residents? : any[];
  species?   : string;
  image?     : string;
  gender?    : string;
  elems      : any[]
}

const Card = ({ data }: ICard): JSX.Element => {
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
 
const DetailEntity: React.SFC<DetailEntityProps> = ({ navigation }) => {
    const { category }: DetailEntityProps = useContext(DataContext);
    const { data, loading, error } = useContext(DetailsContext);

    const initEntity: IEntity = {
      name      : '',
      episode   : '',
      air_date  : '',
      characters: [],
      dimension : '',
      type      : '',
      residents : [],
      species   : '',
      image     : '',
      gender    : '',
      elems     : []
    }
    const [ entity, setEntity ] = useState(initEntity)

    useEffect(()=>{
      if(data) {
        if(category === 'characters') {
          setEntity(data.character);
        }
        else {
          const elems: any[] = [];
  
          for(let i = 0; i < 5; i++) {
            if(category === 'episodes') {   /// It is not possible to use Object.entries() because the position of the arrays is different
              if(data.episode.characters[i]) {
                elems.push({...data.episode.characters[i] });                     
              } 
            }
            else {
              if(data.location.residents[i]) {
                elems.push({...data.location.residents[i] });                     
               } 
            }
          }   
  
          setEntity({ ...data[`${category === 'episodes' ? 'episode' : 'location'}`], elems });
        }
      }  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ data ])


    const renderDetails = (data: IEntity):JSX.Element => {
      if(category === 'characters')
        return showCharacterDetails(data);
      
      return showLocaEpiDetails(data)
    }

    const showLocaEpiDetails = (data: IEntity): JSX.Element => (
      <View style={styles.cardBody}>
        <Text style={styles.title} >{ data.name }</Text>
        <View style={styles.contentCharInfo}>

          <View style={styles.contenField}> 
            <Text style={styles.label} >{ category === 'episodes' ? 'Episode: ' : 'Dimension: ' }</Text>
            <Text style={styles.field} >{ category === 'episodes' ? data.episode : data.dimension }</Text>
          </View> 


          <View style={styles.contenField}> 
            <Text style={styles.label} >{ category === 'episodes' ? 'Release date: ' : 'Type: ' }</Text>
            <Text style={styles.field} >{ category === 'episodes' ? data.air_date : data.type }</Text>
          </View> 

          <Text style={styles.label} >{ category === 'episodes' ? 'Characters: ' : 'Residents: ' }</Text>
          <View style={styles.contentCards}> 
            {
               data.elems && data.elems.map((char, i) =>(
                    <Card
                      data={char}
                      key={i} />
                ))
            }
          </View> 
        </View>
      </View>
    )

    const showCharacterDetails = (data: IEntity):JSX.Element => {
      const { image } = data;
      return(
      <>
        <View style={styles.imageContent}>
          <Image
                source={{ uri: image || ' '}}
                style={styles.image}/>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.title} >{ data.name }</Text>
          <View style={styles.contentCharInfo}>

            <View style={styles.contenField}> 
              <Text style={styles.label} >Gender:</Text>
              <Text style={styles.field} >{ data.gender }</Text>
            </View> 

            <View style={styles.contenField}> 
              <Text style={styles.label} >Species: </Text>
              <Text style={styles.field} >{ data.species }</Text>
            </View> 

            <View style={styles.contenField}> 
              <Text style={styles.label} >Type:</Text>
              <Text style={styles.field} >{ data.type ? data.type : 'No type' }</Text>
            </View> 

          </View>
        </View>
      </>
    )
  }

  const showLoading = ():JSX.Element => (<Spinner color='#45b1d5' />)
  const showError = ():JSX.Element => (<Error navigation={navigation}/>)

  if(loading) return showLoading();
  if(error) return showError(); 

  return ( 
    <ScrollView style={styles.content}>
      { entity && renderDetails(entity) }
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
      marginVertical: 5,
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
      marginVertical: 5,
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
      marginVertical: 5,
      paddingVertical: 5,
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
      fontSize: 22,
      fontWeight: 'bold',
      marginLeft: 20
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
      fontSize: 24
  }
})
 
export default DetailEntity;
