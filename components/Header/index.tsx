import React, { useContext } from 'react';
import { DataContext } from '../../context/Context';
import { View, StyleSheet } from 'react-native';
import { Icon, Input, Item } from 'native-base';
import { IContext } from '../Pagination/index';

const Header = (): JSX.Element => {
  const { filter, setFilter }: IContext = useContext(DataContext)
  return ( 
    <View style={styles.contentInput}>
        <Item rounded style={styles.sectionInput}>
          <Icon active name='search' type='FontAwesome5' />
          <Input 
            value={filter}
            style={styles.textInput}
            onChangeText={(text) => {setFilter(text)}}
            placeholder='Search'/>
        </Item>
        <Icon 
          name='times-circle'
          style={styles.iconButtonInput}
          onPress={() => setFilter('')}
          type='FontAwesome5' />
    </View>
  );
}

const styles = StyleSheet.create({
    sectionInput: {
        backgroundColor: '#FFFFFF',
        padding: 3,
        paddingHorizontal: 0,
        color: '#00F',
        flex: 1 ,
        borderWidth: 0,
        borderColor: '#FFFFFF'
   
      },
      textInput: {
        margin: 0,
        flex: 1,
        width: '100%',
        fontSize: 22,
        borderWidth: 0,
        borderColor: '#FFFFFF'
    
      },
      buttonInput: {
        width: 'auto',
        textAlign: 'center',
        paddingHorizontal: 0,
        justifyContent: 'center',
        alignItems: 'center',
      },
      contentInput: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#0095f2',
        paddingHorizontal: 10,
        height: 'auto',
        paddingVertical: 7,
        maxHeight: 60
      },
      iconButtonInput: {
        marginTop: -1,
        marginLeft: 10,
        fontSize: 47
      }
})
 
export default Header;