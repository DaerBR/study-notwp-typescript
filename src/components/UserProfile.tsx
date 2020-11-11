import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {fetchUsers, fetchUserPosts, Post, User} from "../actions";
import _ from "lodash";
import {StoreState} from "../reducers";
import { RouteComponentProps } from 'react-router';

export interface UserProfileProps extends RouteComponentProps<{ id: string }> {
    fetchUserPosts: Function,
    fetchUsers: Function,
    usersPosts: Post[],
    users: User[],
}

class _UserProfile extends Component<UserProfileProps> {
    componentDidMount() {
        this.props.fetchUsers(this.props.match.params.id);
        this.props.fetchUserPosts(this.props.match.params.id);
    }
    renderUserPosts() {
        if (this.props.usersPosts.length === 0) {
            return <div>No posts from this user yet...</div>
        }
        return (
            <div className="list-wrapper">
            <table>
                <thead className="list-header">
                <tr>
                    <th className="item-block header-block">ID</th>
                    <th className="item-block header-block">Post title</th>
                    <th className="item-block header-block">Actions</th>
                </tr>
                </thead>
                <tbody>
                {this.props.usersPosts.map(post => {
                    return (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td><Link className="icon-url" to={`/post/${post.id}`}>{post.title}</Link></td>
                            <td>
                                <div className="item-block buttons-block">
                                    <button><Link className="icon-url" to={`/post/${post.id}`}><i className="icon-edit"></i></Link></button>
                                </div>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            </div>



        );
    }
    render() {
        if (_.size(this.props.users) === 0) {
            return <div>Loading...</div>
        }
        const user: User = this.props.users[0];
        return (
            <React.Fragment>
                <div className="page-title-block">
                    <h1 className="page-title">{user.username}'s profile</h1>
                </div>
                <div className="user-data">
                    <div className="user-data-item">
                        <div className="user-data-label">Username:</div>
                        <div className="user-data-content">{user.username}</div>
                    </div>
                    <div className="user-data-item">
                        <div className="user-data-label">User full name:</div>
                        <div className="user-data-content">{user.name}</div>
                    </div>
                    <div className="user-data-item">
                        <div className="user-data-label">User email:</div>
                        <div className="user-data-content">{user.email}</div>
                    </div>
                    <div className="user-data-item">
                        <div className="user-data-label">User phone number:</div>
                        <div className="user-data-content">{user.phone}</div>
                    </div>
                    <div className="user-data-item">
                        <div className="user-data-label">User website:</div>
                        <div className="user-data-content">{user.website}</div>
                    </div>
                </div>
                <div className="comments-block posts-block">
                    <div className="comments-title">User's latest posts:</div>
                    <div className="comments-list">
                        {this.renderUserPosts()}
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: StoreState) => {
    return { users: state.users, usersPosts: state.posts }
};

export const UserProfile = connect(mapStateToProps, { fetchUsers, fetchUserPosts })(_UserProfile);