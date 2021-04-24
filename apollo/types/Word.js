import { gql } from '@apollo/client'

export const WordType = gql`
  type Word{
    id: ID
    seq_id: Int
    created_at: Date
    modified_at: Date
    deleted_at: Date
    word:String
    word_date:Date
    translation:String
    pronunciation:String
  }

  input CreateWordInput{
    word:String
    wordAt:Date
    translation:String
    pronunciation:String
  }

  input EditWordInput{
     id: String
     word:String
     wordAt:Date
     translation:String
     pronunciation:String
  }

  input DeleteWordInput{
    id: String
  }

  type WordsConnection {
    pageInfo: PageInfo!
    edges: [WordsEdge!]
  }

  type WordsEdge {
    cursor: Int!
    node: Word!
  }

  input WordsFilter {
    first: Int
    after: Int
    search:String
  }
 
  input WordFilter{
    word:String
    wordAt:Date
    translation:String
    pronunciation:String 
    startAt:Date
    endAt:Date
  }
  
  extend type Query {
    getWords:[Word]
    getWordsFilter(filter: WordFilter , first: Int = 20, after: Int = 0): WordsConnection
    getWordsByDate(wordAt:Date):[Word]
  }

  extend type Mutation {
    createWord(input: CreateWordInput): Word
    updateWord(input: EditWordInput): Word
    deleteWord(input: DeleteWordInput): Word
  }

`
