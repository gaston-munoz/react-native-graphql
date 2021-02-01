import React, { createContext, useState, useEffect } from 'react';
import { useLazyQuery, useQuery, gql, DocumentNode } from '@apollo/client'

export interface ContextProps {
    children: JSX.Element
}

export const DataContext = createContext<any>(null);

const queryCharacters: DocumentNode = gql`
  query ($text: FilterCharacter, $page: Int) {
      characters(filter: $text, page: $page) {
          info {
            next
            prev
          }
          results{
            id
            name
            image
          }
    }
}`

const queryEpisodes: DocumentNode = gql`
  query ($text: FilterEpisode, $page: Int) {
    episodes(filter: $text, page: $page) {
      info {
        next
        prev
      }
      results{
        id
        name
        episode 
    }
  }
}
`

const queryLocations: DocumentNode = gql`
  query ($text: FilterLocation, $page: Int) {
    locations(filter: $text, page: $page) {
      info {
        next
        prev
      }
      results{
        id
        name
        dimension 
    }
 }
}`
 
const ProviderDataContext: React.SFC<ContextProps> = ({ children }) => {
    const [ category, setCategory ] = useState('characters');
    const [ filter, setFilter ] = useState('');
    const [ entityId, setEntityId ] = useState(null)

    const [ getData, { data, loading, error }] = useLazyQuery(
      category === 'characters' ? queryCharacters :   category === 'episodes' ? queryEpisodes : queryLocations)

    useEffect(()=>{
      if(filter === '' || filter.length >= 3) {
        getData({
          variables: { 
            text: { 
              name: filter
            }
          }
        })
      }
    }, [ filter, category ])  

    return ( 
      <DataContext.Provider
          value={{
              filter,
              category,
              data,
              loading,
              error,
              entityId,
              
              getData,
              setFilter,
              setCategory,
              setEntityId
          }}
        >
          { children }
      </DataContext.Provider>
    );
}
 
export default ProviderDataContext;