import gql from 'graphql-tag'
import wordInfoFragment from 'shared/graphql/fragments/word/wordInfo'

export const deleteWordMutation = gql`
  mutation deleteWord($input:DeleteWordInput){
    deleteWord(input:$input){
      ...wordInfo
    }
  }
${wordInfoFragment}
`
