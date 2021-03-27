import gql from 'graphql-tag'

export default gql`
  fragment todoInfo on Todo {
    id
    text
    done
  }
`
