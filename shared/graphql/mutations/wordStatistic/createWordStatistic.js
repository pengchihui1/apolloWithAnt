import gql from 'graphql-tag'
import wordStatisticInfoFragment from 'shared/graphql/fragments/wordStatistic/wordStatisticInfo'

export const createWordStatisticMutation = gql`
  mutation createWordStatistic($input:CreateWordStatisticInput){
    createWordStatistic(input:$input){
      ...wordStatisticInfo
    }
  }
${wordStatisticInfoFragment}
`
