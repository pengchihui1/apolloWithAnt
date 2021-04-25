import gql from 'graphql-tag'
import wordTimeInfoFragment from 'shared/graphql/fragments/wordTime/wordTimeInfo'

export const createWordTimeQuery = gql`
  query createWordTime($input:CreateWordTimeInput){
    createWordTime(input:$input){
      ...wordTimeInfo
    }
  }
${wordTimeInfoFragment}
`
