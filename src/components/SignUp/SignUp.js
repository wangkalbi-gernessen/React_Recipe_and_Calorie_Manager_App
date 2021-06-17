import { Container,  makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { auth, provider } from "../../firebase/initFirebase";
import { Link } from "react-router-dom";
import { register } from '../Auth/Auth';

const useStyles = makeStyles({
  content: {
    width: "100%",
    height: "100vh",
    margin: 0,
    padding: 0,
    backgroundImage: "url(../../img/Login/background-menu.jpeg)",
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

const SignUp = () => {
  const classes = useStyles();

  const [form, setForm] = useState({
    email: '',
    password: '',
    displayName: '',
    birthday: ''
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
      <Typography variant="h4" align="center" gutterBottom="true" style={{color: "white"}}>Register your account</Typography>
      <Container className={classes.formArea}>
        {/* {error !== null && (
          <Typography variant="h5" align="center" gutterBottom="true" style={{color: "red"}}>{error}</Typography> */}
        {/* )} */}
        <form style={{width:"100%", height: "100%", margin: "auto", textAlign: "center"}} onSubmit={handleSubmit}>
          <div>
            <label for="name">Name: 
              <input type="text" id="name" placeholder="Enter your name.." onChange={(e) => setForm({...form, displayName: e.target.value})} required/>
            </label>
          </div>
          <div>
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
            <label for="birthday">Birthday: 
              <input type="date" id="birthday" onChange={(e) => setForm({...form, birthday: e.target.value})} required/>
            </label>
          </div>
          {/* <div>
            <label for="sex">Sex: 
              <select id="sex">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
          </div> */}
          <button type="submit">Register</button>
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