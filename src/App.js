import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import './App.css';

import Header from './point_mall/Header';
import Footer from './point_mall/Footer';
import Home from './point_mall/Home';
import Login from './point_mall/Login';
import CategoryItems from './point_mall/CategoryItems';
import ItemDetail from './point_mall/ItemDetail';
import MyItems from './point_mall/MyItems';


function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Switch>
          <Route exact path = "/" component = {Home} />
          <Route exact path= "/login" component={Login} />
          <Route exact path= "/categories/:categoryId" component={CategoryItems} />
          <Route exact path= "/items/:itemId" component={ItemDetail} />
          <Route exact path="/me/items" component={MyItems} />
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;