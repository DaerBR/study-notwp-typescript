import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {fetchPost, SinglePost } from "../actions";
import _ from 'lodash';
import {StoreState} from "../reducers";
import { RouteComponentProps } from 'react-router';

export interface SinglePostProps extends RouteComponentProps<{ id: string }> {
    fetchPost: Function,
    fetchUsers: Function,
    post: SinglePost,
}

class _Post extends Component<SinglePostProps> {
    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id);
    }

    render() {
        if (_.size(this.props.post) === 0) {
            return <div>Loading...</div>
        }
        const post : SinglePost = this.props.post;
        return (
            <React.Fragment>
                <div className="page-title-block">
                    <h1 className="page-title">{_.capitalize(post.title)}</h1>
                </div>
                <div className="post-meta">
                    <div className="post-author">Author: <Link to={`/user/${post.userId}`}>{post.userId}</Link></div>
                </div>
                <div className="post-content">
                    {post.body}
                </div>
                <div className="comments-block">
                    <div className="comments-title">Post comments:</div>
                </div>

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: StoreState) => {
    return { post: state.singlePost };
};

export const Post = connect(mapStateToProps, { fetchPost })(_Post);