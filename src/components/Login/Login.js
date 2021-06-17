import { Container,  makeStyles, Typography } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import vietnamese from '../../img/LoginSignUp/background-menu.jpeg';
import { auth, provider } from '../../firebase/initFirebase';
import { login } from '../Auth/Auth';

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
  const classes = useStyles();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    await login(form);
  };


  // Sign in with google
  const signInWithGoogle = () => {
    auth.signInWithPopup(provider).catch(alert);
  }  


  return(
    <Container className={classes.content}>
      <Typography variant="h4" align="center" gutterBottom="true" style={{color: "white"}}>Login</Typography>
      <Container className={classes.formArea}>
        <form style={{width:"100%", height: "100%", margin: "auto", textAlign: "center"}} onSubmit={handleSubmit}>
          <div >
            <label for="email">Email: 
              <input type="email" id="email" placeholder="Enter Email.." onChange={(e) => setForm({...form, email: e.target.value})} required/>
            </label>
          </div>
            <div>
            <label for="password">Password: 
              <input type="password" id="password" placeholder="Enter Password.." onChange={(e) => setForm({...form, password: e.target.value})} required/>
            </label>
          </div>
          <div>
            <button type="submit">Log in</button>
          </div>
        </form>
        <p>or</p>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
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