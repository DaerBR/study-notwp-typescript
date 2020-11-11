import {Action, ActionTypes, Comment} from '../actions';

export const commentsReducer = (state: Comment[] = [], action: Action) => {
    switch (action.type) {
        case(ActionTypes.fetchComments):
            return action.payload;
        default:
            return state;
    }
}