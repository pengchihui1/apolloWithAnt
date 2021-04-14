const { getTodos } = require('shared/db/models/todo')

export default async (_parent, _args, _context, _info) => {
  return getTodos()
}
