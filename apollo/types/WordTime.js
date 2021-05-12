import { gql } from '@apollo/client'

export const WordTimeType = gql`
    type WordTime {
        id: ID
        seq_id: Int
        created_at: Date
        modified_at: Date
        deleted_at:Date
        start_date:Date
        end_date:Date
        challenge_time:Int
    }
    
    input CreateWordTimeInput{
        startAt:Date
        endAt:Date
        time:Int
    }

    input EditWordTimeInput{
        id: ID
        startAt:Date
        endAt:Date
        time:Int
    }

    input DeleteWordTimeInput{
        id: ID
    }
    extend type Query {
      getWordTime(first: Int = 20, after: Int = 0): [WordTime]
   }

   extend type Mutation {
      createWordTime(input: CreateWordTimeInput): WordTime
      updateWordTime(input: EditWordTimeInput): WordTime
      deleteWordTime(input: DeleteWordTimeInput): WordTime
   }

`
