import {Action, ActionTypes, SinglePost} from '../actions';

export const singlePostReducer = (
    state: SinglePost | any = {},
    action: Action) => {
    switch (action.type) {
        case ActionTypes.fetchPost:
            return action.payload;
        default:
            return state;
    }
}