import _ from 'lodash';
import server from '../apis/server';
import {Dispatch} from 'redux';
import {ActionTypes} from "./types";

export interface User {
    id: number,
    username: string,
    name: string,
    email: string,
    website: string,
    phone: string
}

export interface FetchUsersAction {
    type: ActionTypes.fetchUsers,
    payload: User[]
}

export const fetchUsers = (id: number | null = null) => (dispatch: Dispatch) => _fetchUser(id, dispatch);
const _fetchUser = _.memoize(async (id, dispatch) => {
    const url = id ? `/users/${id}` : '/users'
    const result = await server.get(url);
    const payload = !Array.isArray(result.data) ? [result.data] : result.data
    dispatch({
        type: ActionTypes.fetchUsers,
        payload: payload
    });
});
