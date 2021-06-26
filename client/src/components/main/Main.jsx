import { useState } from "react"
import { useQuery, gql, useMutation } from "urql"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Dropdown } from 'react-bootstrap'
import mainLogo from "../../static/images/main_logo.png"
import tick from "../../static/images/tick.png"

import "./Main.scss"
import 'bootstrap/dist/css/bootstrap.min.css'

function Main() {
    const { user, isAuthenticated, isLoading, logout } = useAuth0()
    const [text, setText] = useState("")

    const query = gql`
        query {
            todos(user_email: ${JSON.stringify(user.email)}) {
                id
                text
                status
            },

            completedTodos(user_email: ${JSON.stringify(user.email)}) {
                id
                text
                status
            }
        }
    `

    const addTodo = `
    mutation ($text: String, $user_email: String) {
        addTodo (data: 
        {
            text: $text
            user_email: $user_email
        })
        {
            text
        }
    }
    `

    const deleteTodo = `
    mutation ($id: Int) {
        deleteTodo (data: 
        {
            id: $id
        })
        {
            text
        }
    }
    `

    const completeTodo = `
    mutation ($id: Int) {
        completeTodo (data: 
        {
            id: $id
        })
        {
            text
        }
    }
    `

    const inCompleteTodo = `
    mutation ($id: Int) {
        inCompleteTodo (data: 
        {
            id: $id
        })
        {
            text
        }
    }
    `

    let [result] = useQuery({
        query: query
    })

    const [addTodoResult, addTodoMutation] = useMutation(addTodo)
    const [deleteTodoResult, deleteTodoMutation] = useMutation(deleteTodo)
    const [completeTodoResult, completeTodoMutation] = useMutation(completeTodo)
    const [inCompleteTodoResult, inCompleteTodoMutation] = useMutation(inCompleteTodo)

    const handleAddPic = () => {
        try {
            const user_email = user.email
            const variables = { text, user_email }

            addTodoMutation(variables).then(result => {
                if (result.error) {
                    console.error(addTodoResult)
                    alert("Failure!")
                }
                else {
                    alert("Successfully added")
                    window.location.reload()
                }
            })
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleCompleteTask = (id) => {
        try {
            id = parseInt(id)
            const variables = { id }

            completeTodoMutation(variables).then(result => {
                if (result.error) {
                    console.error(deleteTodoResult)
                    console.error(result.error.message)
                    alert("Failure!")
                }
                else {
                    alert("Successfully completed")
                    window.location.reload()
                }
            })
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleInCompleteTask = (id) => {
        try {
            id = parseInt(id)
            const variables = { id }

            inCompleteTodoMutation(variables).then(result => {
                if (result.error) {
                    console.error(deleteTodoResult)
                    console.error(result.error.message)
                    alert("Failure!")
                }
                else {
                    alert("Successfully marked due")
                    window.location.reload()
                }
            })
        } catch (error) {
            console.error(error.message);
        }
    }


    const handleDeleteTask = (id) => {
        try {
            id = parseInt(id)
            const variables = { id }

            deleteTodoMutation(variables).then(result => {
                if (result.error) {
                    console.error(deleteTodoResult)
                    console.error(result.error.message)
                    alert("Failure!")
                }
                else {
                    alert("Successfully deleted")
                    window.location.reload()
                }
            })
        } catch (error) {
            console.error(error.message);
        }
    }

    let { data, fetching, error } = result
    if (fetching) return <p>Loading...</p>
    if (error) return <p>Oh no... {error.message}</p>

    if (isLoading) {
        return (
            <h1>loading...</h1>
        )
    }

    if (isAuthenticated && data) {
        if (window.innerWidth < 960) {
            return (
                <div className="main-wrapper">
                    <div className="right-wrapper">
                        <div className="right-title">
                            <span>
                                all todo
                            </span>
                        </div>
                        <div className="right-content">
                            <form >
                                <fieldset>
                                    <legend>TODO</legend>
                                    {data.todos.map((todo) => (
                                        <div className="todo-wrapper" key={todo.id}>
                                            <div className="todo-content-left">
                                                <div className="todo-checkbox"></div>
                                                <div className="todo-text">
                                                    <span>{todo.text}</span>
                                                </div>
                                            </div>
                                            <div className="todo-content-right">
                                                <div className="todo-menu">
                                                    <span>
                                                        ...
                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="main-wrapper">
                    <div className="left-wrapper">
                        <div className="left-top">
                            <div className="left-top-row">
                                <img src={mainLogo} alt="Main Logo" draggable={false} />
                            </div>
                            <div className="left-top-row">
                                <span><FontAwesomeIcon icon={faHome} /></span>
                            </div>
                            <div className="left-top-row">
                                <img src={tick} alt="Main Logo" />
                            </div>
                        </div>
                        <div className="left-bottom">
                            <Dropdown>
                                <Dropdown.Toggle variant="none" id="dropdown-basic">
                                    <div className="left-bottom-row">
                                        <span>...</span>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <span onClick={() => logout({ returnTo: window.location.origin })}>Logout</span>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="left-bottom-row"></div>
                            <div className="left-bottom-row">
                                <span>S</span>
                            </div>
                        </div>
                    </div>
                    <div className="right-wrapper">
                        <div className="right-title">
                            <span>
                                all todo
                            </span>
                        </div>
                        <div className="right-add-content">
                            <div className="add-content-col">
                                <input type="text" name="add" id="add-todo" value={text}
                                    placeholder="Add text here ..."
                                    onChange={(e) => {
                                        setText(e.target.value)
                                    }} />
                            </div>
                            <div className="add-content-col">
                                <button id="add-btn" onClick={() => {
                                    handleAddPic()
                                }}>ADD</button>
                            </div>
                        </div>
                        <div className="right-content">
                            <form >
                                <fieldset>
                                    <legend>DUE</legend>
                                    {data.todos.map((todo) => (
                                        <div className="todo-wrapper" key={todo.id}>
                                            <div className="todo-content-left">
                                                <div className="todo-checkbox"></div>
                                                <div className="todo-text">
                                                    <span>{todo.text}</span>
                                                </div>
                                            </div>
                                            <div className="todo-content-right">
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="none" id="dropdown-basic">
                                                        <div className="todo-menu">
                                                            <span>...</span>
                                                        </div>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item>
                                                            <span onClick={() => {
                                                                handleDeleteTask(todo.id)
                                                            }}>Delete</span>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item>
                                                            <span onClick={() => {
                                                                handleCompleteTask(todo.id)
                                                            }}>Complete</span>
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    ))}
                                </fieldset>
                            </form>
                        </div>
                        <div className="right-content">
                            <form >
                                <fieldset>
                                    <legend>COMPLETED</legend>
                                    {data.completedTodos.map((todo) => (
                                        <div className="todo-wrapper" key={todo.id}>
                                            <div className="todo-content-left">
                                                <div className="todo-checkbox"></div>
                                                <div className="todo-text">
                                                    <span>{todo.text}</span>
                                                </div>
                                            </div>
                                            <div className="todo-content-right">
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="none" id="dropdown-basic">
                                                        <div className="todo-menu">
                                                            <span>...</span>
                                                        </div>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item>
                                                            <span onClick={() => {
                                                                handleDeleteTask(todo.id)
                                                            }}>Delete</span>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item>
                                                            <span onClick={() => {
                                                                handleInCompleteTask(todo.id)
                                                            }}>Due</span>
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    ))}
                                </fieldset>
                            </form>
                        </div>

                    </div>
                </div>
            )
        }
    }
}

export default withAuthenticationRequired(Main)