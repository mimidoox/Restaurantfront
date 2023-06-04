import logo from "./logo.png";
import './Login.css';
import {useEffect,useState} from "react";
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate = useNavigate();
    useEffect(() => {
        fetch('http://localhost:8082/users/all')
          .then((response) => response.json())
          .then((data) => {setUsers(data);
        console.log(users)})
          .catch((error) => console.error('Error:', error));
      }, []);
      useEffect(() => {
        
      }, []);
      const handleSubmit = (event) => {
        
        const foundUser = users.find(
            
            (fetchedUser) => user === fetchedUser.login && password === fetchedUser.password
          );
        if(foundUser){
            navigate('/List');
        }
      };
    const handleUserChange = (event) => {
        setUser(event.target.value);
      };
    
      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };
    const [user, setUser] = useState('');
      const [password, setPassword] = useState('');
      const [users, setUsers] = useState([]);
      const [loginStatus, setLoginStatus] = useState(true);
  return (
    <div>
    <title>Login V1</title>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    {/*===============================================================================================*/}	
   
    {/*===============================================================================================*/}
    <link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css" />
    {/*===============================================================================================*/}
    <link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css" />
    {/*===============================================================================================*/}
    <link rel="stylesheet" type="text/css" href="vendor/animate/animate.css" />
    {/*===============================================================================================*/}	
    <link rel="stylesheet" type="text/css" href="vendor/css-hamburgers/hamburgers.min.css" />
    {/*===============================================================================================*/}
    <link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css" />
    {/*===============================================================================================*/}
    <link rel="stylesheet" type="text/css" href="css/util.css" />
    <link rel="stylesheet" type="text/css" href="css/main.css" />
    {/*===============================================================================================*/}
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img src={logo} alt="IMG" />
          </div>
          <form onSubmit={handleSubmit} className="login100-form validate-form">
            <span className="login100-form-title">
              Connexion
            </span>
            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
              <input value={user} onChange={handleUserChange} className="input100" type="text" name="email" placeholder="Email" />
              <span className="focus-input100" />
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true" />
              </span>
            </div>
            <div className="wrap-input100 validate-input" data-validate="Password is required">
              <input value={password} onChange={handlePasswordChange} className="input100" type="password" name="pass" placeholder="Password" />
              <span className="focus-input100" />
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true" />
              </span>
            </div>
            <div className="container-login100-form-btn">
              <button type="submit" className="login100-form-btn">
                Login
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
    {/*===============================================================================================*/}	
    {/*===============================================================================================*/}
    {/*===============================================================================================*/}
    {/*===============================================================================================*/}
    {/*===============================================================================================*/}
  </div>
  );
}

export default Login;