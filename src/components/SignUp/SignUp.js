import { Container,  Grid,  makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { auth, provider } from "../../firebase/initFirebase";
import { Link } from "react-router-dom";
import { register } from '../Auth/Auth';
import japanese from '../../img/LoginSignUp/japanese-cuisine.jpeg';

const useStyles = makeStyles({
  content: {
    width: "100%",
    height: "100vh",
    margin: 0,
    padding: 0,
    backgroundImage: `url(${japanese})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  formArea: {
    background: "white",
    height: "50%",
    width: "70%",
    margin: "auto auto",
    padding: "auto",
    opacity: "0.9"
  }
});

const SignUp = () => {
  const classes = useStyles();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    await register(form);
  };

  // Sign in with google
  const signInWithGoogle = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return(
    <Container className={classes.content}>
      <Container className={classes.formArea}>
        <Typography variant="h4" align="center" gutterBottom="true" style={{color: "black", fontWeight: "bold"}}>Register your account</Typography>
        {/* {error !== null && (
          <Typography variant="h5" align="center" gutterBottom="true" style={{color: "red"}}>{error}</Typography> */}
        {/* )} */}
        
        <form style={{width:"100%", height: "100%", margin: "auto", textAlign: "center"}} onSubmit={handleSubmit}>
          <Grid container direction="column" style={{width: "70%", margin: "30px auto 10px", textAlign: "left", fontSize: "20px"}} justify="center"   alignItems="center" xs={16}>
            <Grid item xs={12} sm={12}>
              <label for="email">Email: 
                <input type="email" id="email" placeholder="Enter Email.." onChange={(e) => setForm({...form, email: e.target.value})} required/>
              </label>
            </Grid>
            <Grid item xs={12} sm={12}>
              <label for="password">Password: 
                <input type="password" id="password" placeholder="Enter Password.." onChange={(e) => setForm({...form, password: e.target.value})} required/>
              </label>
            </Grid>
            <Grid item xs={12} sm={12}>
              <button type="submit">Register</button>
            </Grid>
          </Grid>
        </form>
        <p>or</p>
        <button onClick={signInWithGoogle}>Sign in with Google</button> 
        <p>
          Already have an account?{" "}
          <Link to="/">
            Sign in here
          </Link>{" "}
        </p>
      </Container>
    </Container>
  );
}

export default SignUp;