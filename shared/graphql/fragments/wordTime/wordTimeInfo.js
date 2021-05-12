import gql from 'graphql-tag'

export default gql`
  fragment wordTimeInfo on WordTime {
    id
    seq_id
    created_at
    modified_at
    deleted_at
    start_date
    end_date
    challenge_time
  }
`
