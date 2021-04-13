const { getTodos } = require('shared/db/models/todo')

export const todosResolver = {
    Query: {
        async viewTodo(_parent, _args, _context, _info) {
            const result = await getTodos()
            // console.log(result)
            return result
        }
    }
}