import gql from 'graphql-tag'

export default gql`
  fragment wordInfo on Word {
    id
    seqId
    createdAt
    modifiedAt
    deletedAt
    word
    word_data
    translation
    pronunciation
  }
`
