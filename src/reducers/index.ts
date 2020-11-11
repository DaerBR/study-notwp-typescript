import { combineReducers } from 'redux';
import { Post, User, Todo, Comment, SinglePost } from "../actions"
import { postsReducer } from "./postsReducer";
import { usersReducer } from "./usersReducer";
import { todosReducer } from "./todosReducer";
import { commentsReducer } from "./commentsReducer";
import { singlePostReducer } from './singlePostReducer'

export interface StoreState {
    posts: Post[],
    users: User[],
    todos: Todo[],
    comments: Comment[],
    singlePost: SinglePost
}
export const reducers = combineReducers<StoreState>({
    posts: postsReducer,
    users: usersReducer,
    todos: todosReducer,
    comments: commentsReducer,
    singlePost: singlePostReducer
});