import { Container,  makeStyles, Typography } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import vietnamese from '../../img/LoginSignUp/background-menu.jpeg';
import { auth, signInWithGoogle } from '../Firebase/initFirebase';

const useStyles = makeStyles({
  content: {
    width: "100%",
    height: "100vh",
    margin: 0,
    padding: 0,
    backgroundImage: `url(${vietnamese})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  formArea: {
    background: "white",
    height: "70%",
    width: "70%",
    margin: "auto",
    padding: "auto",
    opacity: "0.9"
  }
});

const Login = () => {
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch(error => {
    setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });
  };

  const classes = useStyles();
  return(
    <Container className={classes.content}>
      <Typography variant="h4" align="center" gutterBottom="true" style={{color: "white"}}>Login</Typography>
      <Container className={classes.formArea}>
        <form style={{width:"100%", height: "100%", margin: "auto", textAlign: "center"}}>
          <div >
            <label for="email">Email: 
              <input type="email" id="email" placeholder="Enter Email.." value={email} onChange={event => setEmail(event.target.value)} required/>
            </label>
          </div>
            <div>
            <label for="password">Password: 
              <input type="password" id="password" placeholder="Enter Password.." value={password} onChange={event => setPassword(event.target.value)} required/>
            </label>
          </div>
          <div>
            <button onClick={(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>Log in</button>
          </div>
        </form>
        <p>or</p>
        <button onClick={() => signInWithGoogle()}>Sign in with Google</button>
        <p>
          Don't have an account?{" "}
          <Link to="/SignUp/SignUp">
            Sign up here
          </Link>{" "}
          <br />{" "}
          <Link to="/PasswordReset/PasswordReset">
            Forgot Password?
          </Link>
        </p>
      </Container>
    </Container>
  );
}

export default Login;