import React, { createContext, useState, useEffect } from 'react';
import { useLazyQuery, useQuery, gql, DocumentNode } from '@apollo/client'

export interface ContextProps {
    
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
 
const ProviderDataContext: React.SFC<ContextProps> = (props) => {
    const [ category, setCategory ] = useState('characters');
    const [ filter, setFilter ] = useState('');

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

    console.log('FROM CONTEXT', data, loading, error, filter, category)

    return ( 
        <DataContext.Provider
           value={{
               filter,
               category,
               data,
               loading,
               error,
               
               setFilter,
               setCategory,
           }}
         >
            {props.children}
        </DataContext.Provider>
     );
}
 
export default ProviderDataContext;