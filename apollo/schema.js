import { makeExecutableSchema } from 'graphql-tools'

// 其它字符串解析器
const scalars = require('apollo/types/scalars')
const generalTypes = require('apollo/types/general')
const merge = require('lodash/merge')

// ! ========================= types ============================
const { TodoType } = require('apollo/types/Todo')
const { WordType } = require('apollo/types/Word')
const { UserType } = require('apollo/types/User')
const { WordTimeType } = require('apollo/types/WordTime')
const { WordStatisticType } = require('apollo/types/WordStatistic')

// ! ========================= queries ============================
const todoQuerie = require('apollo/queries/todo')
const wordQuerie = require('apollo/queries/word')
const userQuerie = require('apollo/queries/user')
const wordTimeQuerie = require('apollo/queries/wordTime')
const wordStatisticQuerie = require('apollo/queries/wordStatistic')

// ! ========================= mutations ============================
const wordMutation = require('apollo/mutations/Word')
const userMutation = require('apollo/mutations/user')
const wordTimeMutation = require('apollo/mutations/wordTime')
const wordStatisticMutation = require('apollo/mutations/wordStatistic')

const typeDefs = [
  scalars.typeDefs,
  generalTypes,
  UserType,
  TodoType,
  WordType,
  WordTimeType,
  WordStatisticType
]

const resolvers = merge(
  {},
  scalars.resolvers,
  todoQuerie,
  wordQuerie,
  userQuerie,
  wordTimeQuerie,
  wordStatisticQuerie,
  wordMutation,
  userMutation,
  wordTimeMutation,
  wordStatisticMutation
)

export const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
})
