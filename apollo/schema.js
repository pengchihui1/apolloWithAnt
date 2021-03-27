import { makeExecutableSchema } from 'graphql-tools'
// const { makeExecutableSchema, addSchemaLevelResolver } = require('@graphql-tools/schema')

const merge = require('lodash/merge')
// ! ========================= types ============================
import { UserType } from './types/UserType'
import { TodoType } from './types/TodoType'

// ! ========================= queries ============================
import { userResolver } from './queries/userresolvers'
import { todosResolver } from './queries/todoresolvers'

const typeDefs = [
  UserType,
  TodoType
]

const resolvers = merge(
  {},
  userResolver,
  todosResolver
)

export const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
})

// schema = addSchemaLevelResolver(schema, async (root, args, ctx, info) => {
//   if (info && info.operation && info.operation.__runAtMostOnce) {
//     delete info.operation.__runAtMostOnce
//   }
// })

// module.exports = schema
