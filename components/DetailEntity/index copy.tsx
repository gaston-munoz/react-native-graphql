import React, { useContext } from 'react';
import { DataContext } from '../../context/Context';
import DetailCharacter from './DetailCharacter'
import DetailEpisode from './DetailEpisode';
import DetailLocation from './DetailLocation';

export interface DetailEntityProps {
  entityId: number;
  category: string;
  navigation?: any
}
 
const DetailEntity: React.SFC<DetailEntityProps> = ({ navigation }) => {
    const { category, entityId }: DetailEntityProps = useContext(DataContext);

    return ( 
        <>
        {
            category === 'characters' ? 
              <DetailCharacter id={entityId} navigation={navigation} />
            :
              category === 'episodes' ? 
                <DetailEpisode  id={entityId} navigation={navigation}/>
              :
                <DetailLocation  id={entityId} navigation={navigation}/>  

        }
        </>
     );
}
 
export default DetailEntity;