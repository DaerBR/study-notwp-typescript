import React, { Component } from "react";
import { connect } from "react-redux";
import {fetchTodos, fetchUsers, Todo, User} from "../actions";
import {Link} from "react-router-dom";
import {StoreState} from "../reducers";

interface TodosListProps {
    fetchTodos: Function,
    fetchUsers: Function,
    todos: Todo[],
    users: User[],
}

class _TodosList extends Component<TodosListProps> {
    state = { term: ''};

    componentDidMount() {
        this.props.fetchUsers();
        this.props.fetchTodos();
    }

    onSearchInputChange = async (e: React.FormEvent<HTMLInputElement>) => {
        await this.setState({term: e.currentTarget.value});
    }

    filterTodos() {
        const result: Todo[] = [];

        this.props.todos.forEach(todo => {
            if (todo.title.indexOf(this.state.term) !== -1) {
                result.push(todo);
            }
        });
        return result;
    }
    renderTodosList() {
        const filteredTodos = this.state.term === '' ? this.props.todos : this.filterTodos();

        if (filteredTodos.length === 0) {
            return (
                <tr>
                    <td>No todos found...</td>
                </tr>
            );
        }

        return filteredTodos.map(todo => {
            const userData = this.props.users.find(user => user.id === todo.userId);
            return (
                <tr key={todo.id}>
                    <td>{todo.id}</td>
                    <td>{todo.title}</td>
                    <td><Link to={`/user/${todo.userId}`}>{userData ? userData.username : todo.userId}</Link></td>
                    <td><span className={todo.completed ? 'completed-todo' : 'active-todo'}>{todo.completed ? 'Completed' : 'Active'}</span></td>
                </tr>
            );
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="page-title-block">
                    <h1 className="page-title">To do list</h1>
                    <div className="search-block">
                        <label className="header-search-label">Filter by title:</label>
                        <input type="text" name="search-todos" value={this.state.term} onChange={(e) => {
                            this.onSearchInputChange(e)
                        }}/>
                    </div>
                </div>

                <div className="list-wrapper">
                    <table>
                        <thead className="list-header">
                        <tr>
                            <th className="item-block header-block">ID</th>
                            <th className="item-block header-block">Title</th>
                            <th className="item-block header-block">User</th>
                            <th className="item-block header-block">Is Completed</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderTodosList()}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: StoreState) => {
    return { todos: state.todos, users: state.users }
}
export const TodosList =  connect(mapStateToProps, { fetchTodos, fetchUsers })(_TodosList);

