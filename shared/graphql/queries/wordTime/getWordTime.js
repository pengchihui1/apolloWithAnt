import gql from 'graphql-tag'
import wordTimeInfoFragment from 'shared/graphql/fragments/wordTime/wordTimeInfo'

export const getWordTimeQuery = gql`
  query getWordTime($first:Int, $after:Int){
    getWordTime(first:$first,after:$after){
      ...wordTimeInfo
    }
  }
${wordTimeInfoFragment}
`
