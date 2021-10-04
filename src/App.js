import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import AuthManager from './components/authManager';

export const App = () => {

  window.firebase.initializeApp({ projectId: 'hackideas-d552f' });

  return (
    <Router>
      <AuthManager />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
