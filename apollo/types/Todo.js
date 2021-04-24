import { gql } from '@apollo/client'

export const TodoType = gql`
  type Todo {
    id: ID
    text: String
    done: Boolean
  }

  type Query {
    viewTodo: [Todo]
  }
  type Mutation {
    editTodo: Todo
  }

`
