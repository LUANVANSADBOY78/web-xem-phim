import React from 'react'

import {Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import UserList from '../pages/user-list/UserList';
import Watch from '../pages/watch/Watch';

/**
 * Lớp Cấu hình các đường dẫn của component
 * @returns 
 */
export default function Routes() {
    return (
        <Switch>
            <Route
                path='/login'
                exact
                component={Login}
            />
            <Route
                path='/register'
                exact
                component={Register}
            />
            <Route
                path='/:category/:id/watch'
                component={Watch}
            />
            <Route
                path='/history'
                exact
                render={(props) => <UserList {...props} type="history" />}
            />
            <Route
                path='/bookmarks'
                exact
                render={(props) => <UserList {...props} type="bookmarks" />}
            />
            <Route
                path='/:category/search/:keyword'
                component={Catalog}
            />
            <Route
                path='/:category/:id'
                component={Detail}
            />
            <Route
                path='/:category'
                component={Catalog}
            />
            <Route
                path='/'
                exact // đường dẫn chính xác
                component={Home}
            />
        </Switch>
    )
}
