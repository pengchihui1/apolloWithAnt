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

// ! ========================= queries ============================
const todoQuerie = require('apollo/queries/todo')
const wordQuerie = require('apollo/queries/word')
const userQuerie = require('apollo/queries/user')
const wordTimeQuerie = require('apollo/queries/wordTime')

// ! ========================= mutations ============================
const wordMutation = require('apollo/mutations/Word')
const userMutation = require('apollo/mutations/user')
const wordTimeMutation = require('apollo/mutations/wordTime')

const typeDefs = [
  scalars.typeDefs,
  generalTypes,
  UserType,
  TodoType,
  WordType,
  WordTimeType
]

const resolvers = merge(
  {},
  scalars.resolvers,
  todoQuerie,
  wordQuerie,
  userQuerie,
  wordTimeQuerie,
  wordMutation,
  userMutation,
  wordTimeMutation
)

export const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
})
