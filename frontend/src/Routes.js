import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Link,
  BrowserRouter,
} from "react-router-dom";

import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import Cart from "./core/Cart";

function Routes() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/signup" component={Signup} exact />
          <Route path="/signin" component={Signin} exact />
          <PrivateRoute
            path="/user/dashboard"
            component={UserDashBoard}
            exact
          />
          <AdminRoute
            path="/admin/dashboard"
            component={AdminDashBoard}
            exact
          />
          <AdminRoute
            path="/admin/create/category"
            component={AddCategory}
            exact
          />
          <AdminRoute
            path="/admin/categories"
            component={ManageCategories}
            exact
          />
          <AdminRoute
            path="/admin/create/product"
            component={AddProduct}
            exact
          />
          <AdminRoute path="/admin/products" component={ManageProducts} exact />
          <AdminRoute
            path="/admin/product/update/:productId"
            component={UpdateProduct}
            exact
          />
          <Route path="/cart" component={Cart} exact />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default Routes;
