import { gql } from '@apollo/client'

export const UserType = gql`
    type User {
      id: ID
      seq_id: Int
      created_at: Date
      modified_at: Date
      deleted_at: Date
      name:String
      password:String
      email:String
      is_admin:Boolean
      profile_photo:String
    }
    
    input UserFilter{
      id: ID
      name:String
      password:String
      email:String
      isAdmin:Boolean
    }

    input CreateUserInput{
      name:String
      possword:String
      email:String
      isAdmin:Boolean
      profilePhoto:String
    }

    input EditUserInput{
      id: ID
      name:String
      password:String
      email:String
      isAdmin:Boolean
    }

    input DeleteUserInput{
      id: ID
    }
    
    extend type Query {
      getUser(search: UserFilter): User
    }
    extend type Mutation {
      createUser(input: CreateUserInput): User
      updateUser(input: EditUserInput): User
      deleteUser(input: DeleteUserInput): User
    }
`
