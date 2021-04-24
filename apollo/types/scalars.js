const LowercaseString = require('./custom-scalars/LowercaseString')

const GraphQLDate = require('graphql-date')
const GraphQLJSON = require('graphql-type-json')

const typeDefs = /* GraphQL */ `
    scalar Date
    scalar JSON
    scalar Upload
    scalar LowercaseString
`

const resolvers = {
  Date: GraphQLDate,
  JSON: GraphQLJSON,
  LowercaseString: LowercaseString
}

module.exports = {
  typeDefs,
  resolvers
}
