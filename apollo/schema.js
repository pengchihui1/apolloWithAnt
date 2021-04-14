// const { makeExecutableSchema, addSchemaLevelResolver } = require('@graphql-tools/schema')

import { makeExecutableSchema } from 'graphql-tools'

// 其它字符串解析器
const scalars = require('apollo/types/scalars')
const generalTypes = require('apollo/types/general')

// ! ========================= types ============================
const { UserType } = require('apollo/types/User')
const { TodoType } = require('apollo/types/Todo')
const { WordType } = require('apollo/types/Word')

// ! ========================= queries ============================
const user = require('apollo/queries/user')
const todo = require('apollo/queries/todo')
const word = require('apollo/queries/word')

const merge = require('lodash/merge')

const typeDefs = [
  scalars.typeDefs,
  generalTypes,
  UserType,
  TodoType,
  WordType
]

const resolvers = merge(
  {},
  // queries
  scalars.resolvers,
  user,
  todo,
  word
)

export const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
})
