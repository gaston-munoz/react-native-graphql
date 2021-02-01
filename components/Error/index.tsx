import React, { useContext } from 'react';
import { DataContext} from '../../context/Context';
import { View, StyleSheet } from 'react-native';
import { Card, CardItem, Text, Left, Icon, Body} from 'native-base';
import {  Image  } from 'react-native'
import { IContext } from '../Pagination';

const img = 'https://www.rockandpop.cl/wp-content/uploads/2018/05/rick-y-morty-400x360.jpeg'

export interface ErrorProps {
    navigation: any
}
 
const Error: React.FC<ErrorProps> = ({ navigation }) => {
    const { setFilter }: IContext = useContext(DataContext);

    return ( 
        <View>
            <Card>
                <CardItem style={styles.contentTitle}>
                    <Left style={styles.left}>
                        <Icon style={styles.icon} active name='arrow-left' type='FontAwesome5'
                            onPress={() =>{
                                setFilter('');  
                                navigation.goBack()}} />
                        <Body>
                        <Text style={styles.title}>
                             Ups... an error has been ocurred, go back!
                        </Text>
                    </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                 <Image source={{uri: img}} style={styles.image}/>
                </CardItem>
            </Card>
        </View>
     );
}

const styles = StyleSheet.create({
    image: {
        height: 400, 
        width: '100%',
        flex: 1
    },
    contentTitle: {
        backgroundColor: 'red',
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
        marginLeft: 10
    },
    left: {
        width: 20,
        padding: 0
    },
    icon: {
        fontSize: 50,
        width: 55,
       color: '#0096d0',
       borderRadius: 50,
       padding: 2
    }
})
 
export default Error;