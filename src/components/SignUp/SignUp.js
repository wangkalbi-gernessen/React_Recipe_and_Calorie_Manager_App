import { Paper, TextField, Button, Container,  Grid,  makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register } from '../Auth/Auth';
import '../../styles/signUp.scss';

const SignUp = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await register(form);
    } catch(err) {
      setErrorMessage(err.message);
    }
  };

  // Sign in with google
  // const signInWithGoogle = () => {
  //   auth.signInWithPopup(provider);
  // }  

  return(
    <Grid container spacing={0}direction="column" alignItems="center" justify="center" className="signup">
      <Grid item xs={11}>
        <Paper elevation={3}>
          <Typography variant="h4" align="center" gutterBottom="true" className="signup__title" >Register your account</Typography>
          <form noValidate autoComplete="off" className="signup__form" onSubmit={handleSubmit}>
            <Container className="signup__form_container">
            {errorMessage !== null && (
                <Typography variant="h6" color="secondary" className="signup__form_errorMessage">{errorMessage}</Typography>
              )}
              <TextField id="email" type="email" label="Email Address" variant="outlined" onChange={(e) => setForm({...form, email: e.target.value})} required />
            </Container>
            <Container className="signup__form_password">
              <TextField id="password" type="password" label="Password" variant="outlined" onChange={(e) => setForm({...form, password: e.target.value})} required />
            </Container>
            <Container className="signup__form_signupBtnContainer">
              <Button type="submit" variant="contained" size="medium" color="primary" className="signup__form_signupBtn">Register</Button>
            </Container>
          </form>
          <Container className="signup__buttons" >
            <Typography align="center" className="signup__buttons_account">Already have an account?</Typography>
            <Container className="signup__buttons_signBtnContainer">
              <Link to="/" className="signup__buttons_signBtnLink">
                <Button variant="contained" size="medium" color="primary">Sign in here</Button>
              </Link>
            </Container>
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default SignUp;