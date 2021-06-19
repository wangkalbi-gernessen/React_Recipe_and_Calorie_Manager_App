import { Container,  Grid,  makeStyles, Typography } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import vietnamese from '../../img/LoginSignUp/background-menu.jpeg';
import { auth, provider } from '../../firebase/initFirebase';
import { login } from '../Auth/Auth'

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
    width: "70%",
    margin: "5% auto",
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
      <Typography variant="h3" align="center" gutterBottom="true" style={{color: "white", fontFamily: "cursive",}}>Welcome to Recipe and Calorie Manager!!</Typography>
      <Container className={classes.formArea}>
        <Typography variant="h4" align="center" gutterBottom="true" style={{color: "black", fontWeight: "bold"}}>Please log in here.</Typography>
        <form style={{width:"100%", margin: "auto", textAlign: "center", }} onSubmit={handleSubmit}>
          <Grid container direction="column" style={{width: "70%", margin: "30px auto 10px", textAlign: "left", fontSize: "20px"}} justify="center"   alignItems="center" xs={16}>
            <Grid item xs={12} sm={12}>
              <label for="email">Email: </label>
              <input type="email" id="email" placeholder="Enter Email.." onChange={(e) => setForm({...form, email: e.target.value})} style={{fontSize:"13px"}} required/>
            </Grid>
            <Grid item xs={12} sm={12}>
              <label for="password">Password: </label>
              <input type="password" id="password" placeholder="Enter Password.." onChange={(e) => setForm({...form, password: e.target.value})} style={{fontSize:"13px"}}  required/>
            </Grid>
            <Grid item xs={12} sm={12}>
              <button type="submit">Log in</button>
            </Grid>
          </Grid>
        </form>
        <Typography variant="h6" align="center">OR</Typography>
        <Container style={{textAlign:"center", marginTop: "10px"}}>
          <button onClick={signInWithGoogle}>Sign in with Google</button>
          <Typography variant="h6">Don't have an account?</Typography>
          <Container style={{background: "orange", width: "60%"}}>
            <Link to="/SignUp/SignUp" style={{textDecoration: "none", color: "white"}}>Sign up here</Link>
          </Container>
          <br />
          <Container style={{background: "green", width: "60%"}}>
            <Link to="/PasswordReset/PasswordReset" style={{textDecoration: "none", color: "white"}}>Forgot Password?</Link>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}

export default Login;