import gql from 'graphql-tag'
import wordTimeInfoFragment from 'shared/graphql/fragments/wordTime/wordTimeInfo'

export const updateWordTimeQuery = gql`
  query updateWordTime($input: EditWordTimeInput){
    updateWordTime(input:$input){
      ...wordTimeInfo
    }
  }
${wordTimeInfoFragment}
`
