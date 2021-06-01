import { gql } from '@apollo/client'

export const WordStatisticType = gql`
    type WordStatistic {
        id: ID
        seq_id: Int
        created_at: Date
        modified_at: Date
        deleted_at:Date
        word_id:String
        status:Boolean
        user_id:String
        
        #单词
        word:Word   
        #用户
        user:User
        #数量
        number:String
    }
    
    input CreateWordStatisticInput{
        word_id:String
        status:Boolean
    }

    input EditWordStatisticInput{
        id: ID
        word_id:String
        status:Boolean
        user_id:String
    }

    input DeleteWordStatisticInput{
        id: ID
    }
    type WordStatisticConnection {
        pageInfo: PageInfo!
        edges: [WordStatisticEdge!]
      }
    
    type WordStatisticEdge {
        cursor: Int!
        node: WordStatistic!
    }

    input filter{
        status: Boolean
    }

   extend type Query {
      getWordStatistic(first: Int = 10, after: Int = 0,filter:filter):WordStatisticConnection
   }

   extend type Mutation {
      createWordStatistic(input: CreateWordStatisticInput): WordStatistic
      updateWordStatistic(input: EditWordStatisticInput): WordStatistic
      deleteWordStatistic(input: DeleteWordStatisticInput): WordStatistic
   }

`
