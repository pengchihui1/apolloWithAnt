import gql from 'graphql-tag'

import wordInfoFragment from 'shared/graphql/fragments/word/wordInfo'

export const getWordStatisticQuery = gql`
  query getWordStatistic($first:Int, $after:Int,$filter:filter){
    getWordStatistic(first:$first,after:$after,filter:$filter){
      pageInfo{
        hasNextPage
      }
      edges{
        cursor
        node{
            word_id
            status
            number
            word{
              ...wordInfo
            }
        }
      }  
    }
  }
${wordInfoFragment}
`
