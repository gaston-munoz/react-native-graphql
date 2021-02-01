import React, { useContext } from 'react'
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import { DataContext } from '../../context/Context';
import { IContext } from '../Pagination';

export interface TabBarProps {
    
}
 
const TabBar: React.FC<TabBarProps> = () => {
    const { category, setCategory }: IContext = useContext(DataContext);

    return ( 
        <View style={styles.contTabBottom}>
        <TouchableWithoutFeedback
          onPress={()=>{ setCategory('episodes') }}
          style={styles.tabItem}>
          <Text style={[styles.textTabItem, {
            color:  category === 'episodes' ? '#101010' : '#EEEEEE'
          }]}>Episodes</Text>
        </TouchableWithoutFeedback>
        <View style={styles.separator}></View>
        <TouchableWithoutFeedback
          onPress={()=>{ setCategory('characters') }}
          style={styles.tabItemMiddle}>
          <Text style={[styles.textTabItemMiddle, {
            color:  category === 'characters' ? '#101010' : '#EEEEEE'
          }]}>Characters</Text>
        </TouchableWithoutFeedback>
        <View style={styles.separator}></View>
        <TouchableWithoutFeedback
          onPress={()=>{ setCategory('locations') }}
          style={styles.tabItem}>
          <Text style={[styles.textTabItem, {
            color:  category === 'locations' ? '#101010' : '#EEEEEE'
          }]}>Locations</Text>
        </TouchableWithoutFeedback>
      </View>
     );
}

const styles = StyleSheet.create({
    contTabBottom: {
        height: 50,
        backgroundColor: '#0095f2',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      },
      tabItem: {
        flex: 1,
      }, 
      tabItemMiddle: {
        flex: 1
      }, 
      textTabItem: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#EEEEEE'
    
      },
      textTabItemLoc: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#EEEEEE'
    
      },
      textTabItemMiddle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 0,
        
    
      },
      separator:{
        width: 2,
        height: '50%',
        backgroundColor: '#FFFFFF'
      }
})
 
export default TabBar;