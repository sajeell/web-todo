const { GraphQLServer } = require("graphql-yoga")
const models = require('./models');

const typeDefs = `
type Query {
    todos(user_email: String): [Todo]
    completedTodos(user_email: String): [Todo]
}

type Todo {
    id: Int
    text: String
    status: String
}

type Mutation {
    addTodo(data: addTodoArgs) : Todo
    deleteTodo(data: deleteTodoArgs) : Todo
    completeTodo(data: completeTodoArgs) : Todo
    inCompleteTodo(data: completeTodoArgs) : Todo
}

input addTodoArgs {
    user_email: String
    text: String
}

input deleteTodoArgs {
    id: Int
}

input completeTodoArgs {
    id: Int
}
`
const resolvers = {
    Query: {
        todos: async (parent, args, ctx, info) => {
            const user_email = args.user_email
            const todos = await models.Todo.findAll({
                where: {
                    user_email: user_email,
                    status: "incomplete"
                }
            });
            return todos
        },
        completedTodos: async (parent, args, ctx, info) => {
            const user_email = args.user_email
            const todos = await models.Todo.findAll({
                where: {
                    user_email: user_email,
                    status: "complete"
                }
            });
            return todos
        }
    },
    Mutation: {
        async addTodo(parent, args, ctx, info) {
            const arguments = { ...args.data }

            const user_email = arguments.user_email
            const text = arguments.text

            await models.Todo.create({
                user_email: user_email,
                text: text
            })
        },
        async deleteTodo(parent, args, ctx, info) {
            const arguments = { ...args.data }
            const id = arguments.id
            await models.Todo.destroy({
                where: {
                    id: parseInt(id)
                }
            })
        },
        async completeTodo(parent, args, ctx, info) {
            const arguments = { ...args.data }
            const id = arguments.id
            await models.Todo.update(
                {
                    status: 'complete'
                },
                {
                    where: {
                        id: parseInt(id)
                    }
                }
            )
        },
        async inCompleteTodo(parent, args, ctx, info) {
            const arguments = { ...args.data }
            const id = arguments.id
            await models.Todo.update(
                {
                    status: 'incomplete'
                },
                {
                    where: {
                        id: parseInt(id)
                    }
                }
            )
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log("Server is running at :4000");
})