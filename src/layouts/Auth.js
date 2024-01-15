import React, { Component } from "react";
import AuthNavbar from "../views/auth/AuthNavbar";
import { routes } from "../routes.js";
import getRoutes from "../utils/getRoutes";
import { Switch, Redirect, Route } from "react-router-dom";
import Product from "../views/components/Product";
import Products from "../views/components/Products";
import Women from "../views/components/Women";
import Men from "../views/components/Men";

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.handleUpdateLanguage = this.props.handleUpdateLanguage.bind(this);
  }

  addToCart() {}

  render() {
    return (
      <div className="site_app">
        <div className="site_body">
          <AuthNavbar
            language={this.props.language}
            handleUpdateLanguage={this.props.handleUpdateLanguage}
          />
          <Switch>
            {getRoutes(routes, "/auth")}
            <Route
              path="/product/:id"
              render={(props) => <Product {...props} />}
            />
            <Route path="/products" component={Products} />
            <Route
              path="/women"
              render={(props) => (
                <Women addToCart={this.addToCart} {...props} />
              )}
            />
            <Route
              path="/men"
              render={(props) => <Men addToCart={this.addToCart} {...props} />}
            />
            <Redirect from="*" to="/products" />
          </Switch>
        </div>
      </div>
    );
  }
}
