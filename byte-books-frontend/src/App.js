import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
import ContactUsPage from './pages/contactUsPage';
import Main from './pages/Main';
import Store from './pages/Store';
import Cart from './pages/Cart';
import Orders from './pages/Orders';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/contact-us" component={ContactUsPage} />
        <Route path="/Main" component={Main} />
        <Route path='/Store' component={Store}/>
        <Route path='/Cart' component={Cart}/>
        <Route path='/Orders' component={Orders}/>
      </Switch>
    </Router>
  );
}

export default App;
