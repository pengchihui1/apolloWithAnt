import { gql } from '@apollo/client'

export const UserType = gql`
    type User {
      id: ID!
      name: String!
      status: String!
    }
    
    extend type Query {
      viewer: User
    }
`
