import { FetchPostsAction } from "./posts";
import { FetchUsersAction } from "./users";
import { FetchTodosAction } from "./todos";
import { FetchCommentsAction } from "./comments";
import { FetchPostAction } from "./post";

export enum ActionTypes {
    fetchPosts,
    fetchUsers,
    fetchTodos,
    fetchComments,
    fetchPost,
}

export type Action = FetchPostsAction | FetchUsersAction | FetchTodosAction | FetchCommentsAction | FetchPostAction;