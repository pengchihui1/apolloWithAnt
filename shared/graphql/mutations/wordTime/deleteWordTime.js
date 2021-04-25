import gql from 'graphql-tag'
import wordTimeInfoFragment from 'shared/graphql/fragments/wordTime/wordTimeInfo'

export const deleteWordTimeQuery = gql`
  query deleteWordTime($input:DeleteWordTimeInput){
    deleteWordTime(input:$input){
      ...wordTimeInfo
    }
  }
${wordTimeInfoFragment}
`
