import server from '../apis/server';
import {Dispatch} from 'redux';
import {ActionTypes} from "./types";

export interface Todo {
    id: number,
    title: string,
    userId: number,
    completed: boolean
}

export interface FetchTodosAction {
    type: ActionTypes.fetchTodos,
    payload: Todo[]
}

export const fetchTodos = () => async (dispatch: Dispatch) => {
    const result = await server.get<Todo[]>('/todos');
    dispatch({
        type: ActionTypes.fetchTodos,
        payload: result.data
    });
};