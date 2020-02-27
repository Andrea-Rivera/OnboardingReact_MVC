import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Customers } from './components/Customers/CustomerIndex';
import { Products } from './components/Products/ProductsIndex';
import { Stores } from './components/Stores/StoresIndex';
import { Sales } from './components/Sales/SalesIndex';
import { EditCustomer } from './components/Customers/EditCustomer';
import { EditStores } from './components/Stores/EditStores';





class App extends Component {
    render() {
        return (


            <BrowserRouter>
                <div className="container">

                    <h1 justify-content-center>Onboarding Task</h1>
                    <div className="ui inverted segment">
                        <div className="ui inverted secondary menu">
                            <a href="/" className=" item">Customers</a>
                            <a href="/Products" className="item">Products</a>
                            <a href="/Stores" className="item">Stores</a>
                            <a href="/Sales" className="item">Sales</a>
                        </div>
                    </div>

                   

                    <Switch>
                        <Route path='/' component={Customers} exact />
                        <Route path='/Products' component={Products} exact />
                        <Route path='/Stores' component={Stores} exact />
                        <Route path='/Sales' component={Sales} exact />
                        <Route path='/EditCustomer/:customerId' component={EditCustomer} exact />
                        <Route path='/Stores/:storeId' component={EditStores} exact />
                       
                    </Switch>
                </div>
            </BrowserRouter>
      
     );
    
    }
}

export default App;

