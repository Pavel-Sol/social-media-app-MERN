import "./login.css";

const Login = () => {
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
          <div className="loginBox">
            <input placeholder="Email" className="loginInput" />
            <input placeholder="Password" className="loginInput" />
            <button className="loginButton">Войти</button>
            <span className="RegisterLink">Зарегистрироваться</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login