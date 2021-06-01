import gql from 'graphql-tag'
import wordInfoFragment from 'shared/graphql/fragments/word/wordInfo'

// 获取单词
export const getWordsFilterQuery = gql`
  query getWordsFilter($first:Int,$after:Int,$filter:WordFilter){
    getWordsFilter(first:$first,after:$after,filter:$filter){
      pageInfo{
        hasNextPage
      }
      edges{
        cursor
        node{
          ...wordInfo
        }
      }
    }
  }
${wordInfoFragment}
`
