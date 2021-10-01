import axios from 'axios';
import {useState} from 'react'
import { useHistory } from 'react-router';


import "./register.css";

const Register = () => {
  const [username, setUsername ] = useState('')
  const [email, setEmail ] = useState('')
  const [password, setPassword ] = useState('')
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newUser = {username, email, password}

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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username" className="loginInput" />
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
            <button type='submit' className="loginButton">Зарегистрироваться</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register