const { getTodos } = require('shared/db/models/index')

export const todosResolver = {
    Query: {
        async viewTodo(_parent, _args, _context, _info) {
            const result = await getTodos()
            // console.log(result)
            return result
        }
    }
}