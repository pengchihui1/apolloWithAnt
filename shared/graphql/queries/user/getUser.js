import gql from 'graphql-tag'
import userInfoFragment from '../../fragments/user/userInfo'

export const getViewerQuery = gql`
  query getViewerQuery{
    viewer{
      ...userInfo
    }
  }
  ${userInfoFragment}
`

// export const getViewerQuery = gql`
//   query getViewerQuery{
//     viewer{
//         id
//         name
//         status
//     }
//   }
// `