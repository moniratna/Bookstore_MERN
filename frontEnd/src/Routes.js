import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';


import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';

require('dotenv').config()

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <Route path="/product/:productId" exact component={Product} />
                <Route path="/cart" exact component={Cart} />

            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
