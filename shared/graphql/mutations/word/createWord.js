import gql from 'graphql-tag'
import wordInfoFragment from 'shared/graphql/fragments/word/wordInfo'

export const createWordMutation = gql`
  mutation createWord($input:CreateWordInput){
    createWord(input:$input){
      ...wordInfo
    }
  }
${wordInfoFragment}
`
