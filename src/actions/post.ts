import server from '../apis/server';
import _ from 'lodash';
import {Dispatch} from 'redux';
import {ActionTypes} from "./types";


export interface SinglePost {
    userId: number,
    id: number,
    title: string,
    body: string
}
export interface FetchPostAction {
    type: ActionTypes.fetchPost,
    payload: SinglePost
}

export const fetchPost = (id: string) => (dispatch: Dispatch) => _fetchPost(id, dispatch);
const _fetchPost = _.memoize(async (id, dispatch) => {
    const result = await server.get(`/posts/${id}`);

    dispatch({
        type: ActionTypes.fetchPost,
        payload: result.data
    });
});