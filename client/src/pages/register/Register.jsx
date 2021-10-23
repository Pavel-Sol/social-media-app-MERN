import axios from 'axios';
import { useHistory } from 'react-router';
import {useInput} from './../../hooks/useInput'

import "./register.css";

const Register = () => {
  const email = useInput('')
  const password = useInput('')
  const username = useInput('')
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newUser = {username: username.value, email: email.value, password: password.value}

    try {
     await axios.post("/auth/register", newUser);
     history.push("/login");
    } catch (error) {
      console.log('error => ', error);
    }
  }

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
          <form className="loginBox" 
            onSubmit={(e) => handleSubmit(e)}>
            <input 
              value={username.value}
              onChange={username.onChange}
              placeholder="Username" className="loginInput" />
            <input
              value={email.value} 
              onChange={email.onChange}
              type="email"
              placeholder="Email" 
              className="loginInput" />
            <input
              value={password.value}
              onChange={password.onChange}
              placeholder="Password" className="loginInput" />
            <button type='submit' className="loginButton">Зарегистрироваться</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register