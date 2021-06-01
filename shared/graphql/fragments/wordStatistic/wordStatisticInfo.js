import gql from 'graphql-tag'

export default gql`
  fragment wordStatisticInfo on WordStatistic {
    id
    seq_id
    created_at
    modified_at
    deleted_at
    word_id
    status
    user_id
  }
`
