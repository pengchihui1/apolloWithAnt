import gql from 'graphql-tag'
import todoInfoFragment from '../../fragments/todo/todoInfo'

export const getTodoQuery = gql`
  query getTodoQuery() {
    viewTodo{
      ...todoInfo
    }
  }
  ${todoInfoFragment}
`