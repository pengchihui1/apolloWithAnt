import gql from 'graphql-tag'
import wordTimeInfoFragment from 'shared/graphql/fragments/wordTime/wordTimeInfo'

export const createWordTimeMutation = gql`
  mutation createWordTime($input:CreateWordTimeInput){
    createWordTime(input:$input){
      ...wordTimeInfo
    }
  }
${wordTimeInfoFragment}
`
