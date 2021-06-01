import gql from 'graphql-tag'
import wordInfoFragment from 'shared/graphql/fragments/word/wordInfo'

export const updateWordMutation = gql`
  mutation updateWord($input:EditWordInput){
    updateWord(input:$input){
      ...wordInfo
    }
  }
${wordInfoFragment}
`
