import gql from 'graphql-tag'

export default gql`
  fragment wordInfo on Word {
    id
    seq_id
    created_at
    modified_at
    deleted_at
    word
    word_date 
    translation
    pronunciation
  }
`
