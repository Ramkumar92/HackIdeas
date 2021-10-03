import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import AppProvider from './store';
import '@fontsource/roboto';
import AuthManager from './components/authManager';

export const App = () => {
  return (
    <AppProvider>
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
    </AppProvider>
  );
}

export default App;
