import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchPosts, fetchUsers, Post, User} from '../actions';
import { Link } from "react-router-dom";
import { StoreState } from "../reducers";

interface PostsListProps {
    fetchPosts: Function,
    fetchUsers: Function,
    posts: Post[],
    users: User[]
}

export class _PostsList extends Component<PostsListProps> {
    state = {term: ''};

    componentDidMount() {
        this.props.fetchUsers();
        this.props.fetchPosts();
    }

    onSearchInputChange = async (e: React.FormEvent<HTMLInputElement>) => {
        await this.setState({term: e.currentTarget.value});
    }

    filterPosts = () => {
        const result: Post[] = [];

        this.props.posts.forEach(post => {
            if (post.title.indexOf(this.state.term) !== -1) {
                result.push(post);
            }
        });

        return result;
    }

    renderPostsList() {
        const filteredPosts = this.state.term === '' ? this.props.posts : this.filterPosts();

        if (filteredPosts.length === 0) {
            return <tr>
                <td>No posts found...</td>
            </tr>
        }
        return filteredPosts.map(post => {
            const userData = this.props.users.find(user => user.id === post.userId);

            return (
                <tr key={post.id}>
                    <td>{post.id}</td>
                    <td><Link className="icon-url" to={`/post/${post.id}`}>{post.title}</Link></td>
                    <td><Link to={`/user/${post.userId}`}>{userData ? userData.username : post.userId}</Link></td>
                    <td>
                        <div className="item-block buttons-block">
                            <button><Link className="icon-url" to={`/post/${post.id}`}><i
                                className="icon-edit"></i></Link></button>
                            <button><Link className="icon-url" to={`/post/${post.id}`}><i
                                className="icon-cross-close"></i></Link></button>
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
                    <h1 className="page-title">Posts</h1>
                    <div className="search-block">
                        <label className="header-search-label">Filter by title:</label>
                        <input type="text" name="search-posts" value={this.state.term} onChange={(e) => {
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
                            <th className="item-block header-block">Author</th>
                            <th className="item-block header-block">Tools</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderPostsList()}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: StoreState) => {
    return {posts: state.posts, users: state.users};
};

export const PostsList = connect(
    mapStateToProps,
    {fetchPosts, fetchUsers}
)(_PostsList);