import React, {Component} from 'react';
import './App.scss';
import { HeaderMenu } from './HeaderMenu';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { PostsList } from "./PostsList";
import { UsersList } from "./UsersList";
import { Post } from "./Post";
import { UserProfile } from "./UserProfile";
import { CommentsList } from "./CommentsList";
import { TodosList } from "./TodosList";

export class App extends Component {

     render() {
        return (
            <div className="app-wrapper">
                <Router>
                    <HeaderMenu />
                    <div className="content-wrapper">
                        <Switch>
                            <Route path="/" exact component={PostsList} />
                            <Route path="/users" exact component={UsersList} />
                            <Route path="/post/:id" exact component={Post} />
                            <Route path="/user/:id" exact component={UserProfile} />
                            <Route path="/comments" exact component={CommentsList} />
                            <Route path="/todos" exact component={TodosList} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}