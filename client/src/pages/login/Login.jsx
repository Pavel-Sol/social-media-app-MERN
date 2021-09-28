import {useState} from 'react'
import { useContext } from 'react';
import {Link} from 'react-router-dom';

import "./login.css";
import {loginCall} from './../../apiCalls'
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const { isFetching, dispatch, error } = useContext(AuthContext);
  const [email, setEmail ] = useState('')
  const [password, setPassword ] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    loginCall({email, password}, dispatch)
  }
  
  // console.log('error:----> ', error)
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social-app</h3>
          <span className="loginDesc">
          Общайся с друзьями по всему миру.
          </span>
        </div>
        <div className="loginRight">
          <form
           onSubmit={(e) => handleSubmit(e)}
           className="loginBox">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email" 
              className="loginInput" />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" className="loginInput" />
            <button
            disabled={isFetching}
            type="submit" className="loginButton">{isFetching ? 'Загрузка...' :'Войти'}</button>
            <Link to='/register'
               className='RegisterLink'>
              <span className="RegisterLink">Зарегистрироваться</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login