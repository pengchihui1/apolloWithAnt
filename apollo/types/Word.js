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
    name:String
    time:Date
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
    edges: [WordEdge!]
  }

  type WordEdge {
    cursor: Int!
    node: Word!
  }
 
  input WordFilter{
    startAt:Date
    endAt:Date
    search:String
  }
  
  extend type Query {
    getWords:[Word]
    getWordsFilter(first:Int = 10 , after:Int = 0 , filter: WordFilter): WordsConnection
  }

  extend type Mutation {
    createWord(input: CreateWordInput): Word
    updateWord(input: EditWordInput): Word
    deleteWord(input: DeleteWordInput): Word
  }
`
