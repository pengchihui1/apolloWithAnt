import gql from 'graphql-tag'
import wordTimeInfoFragment from '../../fragments/word/wordTimeInfo'

// 获取单词
export const getWordsQuery = gql`
  query getWords{
    getWords{
      ...wordInfo
    }
  }
${wordTimeInfoFragment}
`
