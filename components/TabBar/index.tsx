import React, { useContext } from 'react'
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import { DataContext } from '../../context/Context';

export interface TabBarProps {
    
}
 
const TabBar: React.SFC<TabBarProps> = () => {
    const { category, setCategory } = useContext(DataContext);

    return ( 
        <View style={styles.contTabBottom}>
        <TouchableWithoutFeedback
          onPress={()=>{ setCategory('episodes') }}
          style={styles.tabItem}>
          <Text style={styles.textTabItem}>Episodes</Text>
        </TouchableWithoutFeedback>
        <View style={styles.separator}></View>
        <TouchableWithoutFeedback
          onPress={()=>{ setCategory('characters') }}
          style={styles.tabItemMiddle}>
          <Text style={styles.textTabItemMiddle}>Characters</Text>
        </TouchableWithoutFeedback>
        <View style={styles.separator}></View>
        <TouchableWithoutFeedback
          onPress={()=>{ setCategory('locations') }}
          style={styles.tabItem}>
          <Text style={styles.textTabItem}>Locations</Text>
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
        borderTopColor: '#000',
        borderTopWidth: 1
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
      textTabItemMiddle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 0,
        color: '#101010'
    
      },
      separator:{
        width: 2,
        height: '50%',
        backgroundColor: '#FFFFFF'
      }
})
 
export default TabBar;