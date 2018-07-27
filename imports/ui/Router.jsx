import React from 'react';
import {Route} from 'react-router';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import PostCreate from './pages/Posts/PostCreate.jsx';
import PostEdit from './pages/Posts/PostEdit.jsx';
import PostList from './pages/Posts/PostList.jsx';
import PostView from './pages/Posts/PostView.jsx';
import PostListReactive from './pages/Posts/PostListReactive.jsx';
import Register from './pages/Users/Register.jsx';
import Login from './pages/Users/Login.jsx';

export default class Router extends React.Component {
    render(){

        return(
            <App>
                <Route exact path="/" component={Home} />
                <Route exact path="/posts" component={PostList} />
                <Route exact path="/posts/reactive" component={PostListReactive} />
                <Route exact path="/posts/create" component={PostCreate} />
                <Route exact path="/posts/edit/:_id" component={PostEdit} />
                <Route exact path="/posts/view/:_id" component={PostView} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
            </App>

        );
    }
}