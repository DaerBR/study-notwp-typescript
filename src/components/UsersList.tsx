import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchUsers, User } from "../actions";
import { Link } from 'react-router-dom';
import { StoreState } from "../reducers";

interface UsersListProps {
    fetchUsers: Function,
    users: User[]
}
export class _UsersList extends Component<UsersListProps> {
    componentDidMount() {
        this.props.fetchUsers();
    }

    renderUsersList() {
        if (!this.props.users || this.props.users.length === 0) {
            return <tr><td>Loading...</td></tr>
        }
        return this.props.users.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td><Link to={`/user/${user.id}`}>{user.username}</Link></td>
                    <td><Link to={`/user/${user.id}`}>{user.name}</Link></td>
                    <td>{user.email}</td>
                    <td>
                        <div className="item-block buttons-block">
                            <Link to={`/user/${user.id}`}><i className="icon-edit"></i></Link>
                        </div>
                    </td>
                </tr>
            );
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="page-title-block">
                    <h1 className="page-title">Users</h1>
                    <div className="search-block">
                        <label className="header-search-label">Filter by username:</label>
                        <input type="text" name="search-posts"/>
                    </div>
                </div>
                <div className="list-wrapper">
                    <table>
                        <thead className="list-header">
                        <tr>
                            <th className="item-block header-block">ID</th>
                            <th className="item-block header-block">User name</th>
                            <th className="item-block header-block">Full name</th>
                            <th className="item-block header-block">Email</th>
                            <th className="item-block header-block">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderUsersList()}
                       </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: StoreState) => {
    return { users: state.users };
}
export const UsersList =  connect(mapStateToProps, { fetchUsers })(_UsersList);