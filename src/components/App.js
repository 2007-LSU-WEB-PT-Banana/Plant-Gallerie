import React, { useState, useEffect } from 'react';
import { BrowserRouter as Route, Link, useHistory, Switch } from 'react-router-dom';

import {
  fetchAPI, BASE_URL} from '../api';

import { AllProducts, SingleProduct, CartComponent} from './index'

const App = () => {
  const [message, setMessage] = useState('');
  const [productList, setProductList] = useState([]);
  const [activeProduct, setActiveProduct] = useState("");

  useEffect(() => {
    fetchAPI(BASE_URL + '/')
      .then(response => {
        console.log("the initial get response is", response)
        setMessage(response.message);
      })
      .catch(error => {
        setMessage(error.message);
      });
  });

  useEffect( () => {
    fetchAPI(BASE_URL + '/products')
      .then((data) => {
        console.log("The product list is", data);
        setProductList(data);
      })
      .catch(console.error);
  }, []);

  const history = useHistory();

  console.log("The active product is", activeProduct)

  return (
    <div className="App">
      <header>
        <h1>Plant Gallerie</h1>
        <h2>{ message }</h2>
      <nav>
        <Link to='/' className="navLinks">Home</Link>
        <Link to='/Products' className="navLinks">All Plants</Link>        
      </nav>
      </header>
      <main>
        <Switch>
          <Route exact path="/products/:productId">
            <SingleProduct activeProduct={activeProduct} setActiveProduct={setActiveProduct} history={history}/>
          </Route>
          <Route exact path="/products">
            <AllProducts productList={productList} history={history} setActiveProduct={setActiveProduct} /> 
          </Route>
      
          <Route exact path="/cart">
          <CartComponent />

          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;