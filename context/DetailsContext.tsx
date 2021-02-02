import React, { createContext, useState, useContext, useEffect } from 'react';
import { DataContext } from './Context';
import { DocumentNode, gql, useLazyQuery } from '@apollo/client';

export const DetailsContext = createContext<any>(null);

const queryCharacter = gql`
query ($id: ID!) {
  character(id: $id) {
    name
    species
    gender
    image
    type    
  }
}`

const queryEpisode = gql`
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

const queryLocation = gql`
query ($id: ID!) {
  location (id: $id) {
    name
    type
    dimension
    residents {
      name
      image
    }
  }
}`

export interface ProviderDetailsContextProps {
    
}
 
const ProviderDetailsContext: React.FC<ProviderDetailsContextProps> = ({ children }) => {
    const { category } = useContext(DataContext);    
    const [ entityId, setEntityId ] = useState(0);

    const query: DocumentNode = category === 'characters' ? queryCharacter : category === 'episodes' ?
      queryEpisode : queryLocation;

    let [ getData, { data, loading, error } ]  = useLazyQuery(query)

    const setData = () => {
        data = null;
    }

    useEffect(()=> {
        if(entityId) {
            getData({
                variables: {
                    id: entityId
                }
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ entityId ])

    return ( 
        <DetailsContext.Provider
            value={{
                entityId,
                data,
                loading,
                error,

                setEntityId,
                getData,
                setData
            }}
        >
            { children }
        </DetailsContext.Provider>
     );
}
 
export default ProviderDetailsContext;