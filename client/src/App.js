import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import Login from './pages/login/Login';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

function App() {
  const user = false;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>

        <Route path="/register">{user ? <Redirect to="/" /> : <Register />}</Route>

        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>

        <Route path="/profile/:username">
          <Profile />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
