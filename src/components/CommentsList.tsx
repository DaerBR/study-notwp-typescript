import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments, fetchUsers, Comment, User } from '../actions';
import { Link } from 'react-router-dom';
import { StoreState } from "../reducers";

interface CommentsListProps {
    fetchComments: Function,
    fetchUsers: Function,
    comments: Comment[],
    users: User[]
}
class _CommentsList extends Component<CommentsListProps> {

    componentDidMount() {
        this.props.fetchUsers();
        this.props.fetchComments();
    }

    getRandomDate = (): string => {
        const start = new Date(2017, 0, 1);
        const end = new Date();
        const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

        return randomDate.toLocaleDateString();
    }

    renderCommentsList = () => {
        if (this.props.comments.length === 0) {
            return <tr><td>Loading...</td></tr>
        }
        return this.props.comments.map(comment => {
            return(
                <tr key={comment.id}>
                    <td>{comment.id}</td>
                    <td><Link to={`/post/${comment.postId}`}>{comment.name}</Link></td>
                    <td>{comment.body}</td>
                    <td>{comment.email}</td>
                    <td>{this.getRandomDate()}</td>
                    <td>
                        <div className="item-block buttons-block">
                            <button><i className="icon-cross-close"></i></button>
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
                    <h1 className="page-title">User's comments</h1>
                </div>
                <div className="list-wrapper">
                    <table>
                        <thead className="list-header">
                        <tr>
                            <th className="item-block header-block">ID</th>
                            <th className="item-block header-block">Post title</th>
                            <th className="item-block header-block">Text</th>
                            <th className="item-block header-block">User</th>
                            <th className="item-block header-block">Date</th>
                            <th className="item-block header-block">Tools</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderCommentsList()}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: StoreState) => {
    return { comments: state.comments, users: state.users }
};

export const CommentsList = connect(mapStateToProps, { fetchComments, fetchUsers })(_CommentsList);