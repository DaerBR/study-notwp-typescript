import server from '../apis/server';
import _ from 'lodash';
import {Dispatch} from 'redux';
import {ActionTypes} from "./types";

export interface Comment {
    id: number,
    postId: number,
    userId: number,
    name: string,
    body: string,
    email: string
}

export interface FetchCommentsAction {
    type: ActionTypes.fetchComments,
    payload: Comment[]
}

export const fetchComments = () => (dispatch: Dispatch) => _fetchComments(dispatch);
const _fetchComments = _.memoize(async dispatch => {
    const result = await server.get('/comments');

    dispatch({
        type: ActionTypes.fetchComments,
        payload: result.data
    });
});