import { Switch, Route } from 'react-router-dom';
import { Component } from 'react';
import Login from './pages/Login';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Login } />
        </Switch>
      </div>
    );
  }
}

export default App;
