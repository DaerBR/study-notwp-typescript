import server from '../apis/server';
import _ from 'lodash';
import {Dispatch} from 'redux';
import {ActionTypes} from "./types";

export interface Post {
    userId: number,
    id: number,
    title: string,
    body: string
}
export interface FetchPostsAction {
    type: ActionTypes.fetchPosts,
    payload: Post[]
}

export const fetchPosts = () => (dispatch: Dispatch) => _fetchPosts(dispatch);

const _fetchPosts = _.memoize(async dispatch => {
    const result = await server.get<Post[]>('/posts');

    dispatch({
        type: ActionTypes.fetchPosts,
        payload: result.data,
    });
});

export const fetchUserPosts = (id: number) => (dispatch: Dispatch) => _fetchUserPosts(dispatch, id);
const _fetchUserPosts = _.memoize(async (dispatch, id) => {
    console.log(id);
    const result = await server.get(`/posts?userId=${id}`);
    dispatch({
        type: ActionTypes.fetchPosts,
        payload: result.data,
    });
});