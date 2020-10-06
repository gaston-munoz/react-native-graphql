import { Icon } from 'native-base';
import React, { useContext } from 'react'
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import { DataContext } from '../../context/Context';

export interface IContext {
    category: string;
    filter: string;
    data: any;
    loading: boolean;
    error: any;
    setCategory: Function;
    getData: Function;
    setFilter: Function;
}
 
const Pagination: React.SFC<any> = () => {
    const { category, filter, setCategory, data, getData }: IContext = useContext(DataContext);
    let nextPag = category === 'characters' ? data.characters.info.next : category === 'episodes' ?
    data.episodes.info.next : data.locations.info.next;
    let prevPag = category === 'characters' ? data.characters.info.prev : category === 'episodes' ?
    data.episodes.info.prev : data.locations.info.prev;

    const getNextPag = (next: number) => {
      if(next)
        getData({
          variables: {
            text: {
              name: filter
            },
            page: next
          }
        })
    }

    const getPrevPag = (prev: number) => {
      if(prev)
        getData({
          variables: {
            text: {
              name: filter
            },
            page: prev
          }
        })
    }

    return ( 
      <View style={styles.contTabBottom}>

        <View style={styles.asideSection} >
          <Icon
            name='arrow-left'
            type='FontAwesome5'
            onPress={()=>{ getPrevPag(prevPag) }}
            style={[{ fontSize: 20, marginHorizontal: 10, color: prevPag ? '#fff' : '#666' }]}/>
          <TouchableWithoutFeedback
            onPress={()=>{ getPrevPag(prevPag) }}
            style={styles.tabItem}>
            <Text style={[styles.textTabItem,  { color: prevPag ? '#fff' : '#666' }]}>Prev</Text>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.asideSection} >
          <TouchableWithoutFeedback
            disabled={false}
            onPress={()=>{ getNextPag(nextPag) }}
            style={styles.tabItem}>
            <Text style={[styles.textTabItem, { color: nextPag ? '#fff' : '#666'   }]}>Next</Text>
          </TouchableWithoutFeedback>
          <Icon
            name='arrow-right'
            onPress={()=>{ getNextPag(nextPag) }}
            type='FontAwesome5'
            style={[{ fontSize: 20, marginHorizontal: 10, color: nextPag ? '#fff' : '#666'  }]}/>

        </View>

      </View>
     );
}

const styles = StyleSheet.create({
    contTabBottom: {
        height: 50,
        backgroundColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopColor: '#000',
        borderTopWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        marginTop: 20
      },
      tabItem: {
        
      }, 
      tabItemMiddle: {
        flex: 1
      }, 
      textTabItem: {
        fontSize: 22,
        color: '#EEEEEE',
        paddingHorizontal: 0
    
      },
      textTabItemMiddle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 0,
        color: '#0095f2'
    
      },
      separator:{
        width: 2,
        height: '50%',
        backgroundColor: '#FFFFFF'
      },
      asideSection: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }
})
 
export default Pagination;