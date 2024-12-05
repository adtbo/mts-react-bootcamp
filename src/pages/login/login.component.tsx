import './login.css';

const _renderForm = () => (
  <div className='formContainer'>
    <button>Click me</button>
  </div>
);

const Login = () => {
  return (
    <div className="container">
      <h1>Welcome to new M Bank ATM</h1>
      {_renderForm()}
    </div>
  );
};

Login.displayName = "LoginPage";

export default Login;
