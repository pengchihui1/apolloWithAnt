import gql from 'graphql-tag'
import wordfoFragment from '../../fragments/word/wordInfo'

// 获取单词
export const getWordsQuery = gql`
  query getWords{
    getWords{
      ...wordInfo
    }
  }
${wordfoFragment}
`
