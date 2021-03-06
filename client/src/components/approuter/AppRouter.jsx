import { useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Home from './../../pages/home/Home';
import Profile from './../../pages/profile/Profile';
import Register from './../../pages/register/Register';
import Login from './../../pages/login/Login';
import Messenger from '../../pages/messenger/Messenger';
import { AuthContext } from './../../context/AuthContext';

const AppRouter = () => {
   const { user } = useContext(AuthContext);
   
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>

        <Route path="/register">{user ? <Redirect to="/" /> : <Register />}</Route>

        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>

        <Route path="/messenger">{!user ? <Redirect to="/" /> : <Messenger />}</Route>

        <Route path="/profile/:username">
          <Profile />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter