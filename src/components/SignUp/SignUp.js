import { Paper, TextField, Button, Container,  Grid,  makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register } from '../Auth/Auth';
import japanese from '../../img/LoginSignUp/japanese-cuisine.jpeg';

const useStyles = makeStyles({
  content: {
    width: "100%",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    backgroundImage: `url(${japanese})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  formArea: {
    background: "white",
    width: "100%",
    height: "100%",
    margin: 0,
    padding: "auto",
    opacity: "0.9",
  }
});

const SignUp = () => {
  const classes = useStyles();
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
    <Grid container spacing={0}direction="column" alignItems="center" justify="center" className={classes.content}>
      <Grid item xs={11}>
        <Paper elevation={3}>
          <Typography variant="h4" align="center" gutterBottom="true" style={{color: "black", fontWeight: "bold", padding: "15px"}}>Register your account</Typography>
          <form noValidate autoComplete="off" style={{width: "100%", margin: "auto", padding: "10px", textAlign: "center"}} onSubmit={handleSubmit}>
            <Container className={classes.formArea}>
            {errorMessage !== null && (
                <Typography variant="h6" color="secondary" style={{marginBottom:"15px"}}>{errorMessage}</Typography>
              )}
              <TextField id="email" type="email" label="Email Address" variant="outlined" onChange={(e) => setForm({...form, email: e.target.value})} required />
            </Container>
            <Container style={{paddingTop:"10px"}}>
              <TextField id="password" type="password" label="Password" variant="outlined" onChange={(e) => setForm({...form, password: e.target.value})} required />
            </Container>
            <Container style={{paddingTop:"10px"}}>
              <Button type="submit" variant="contained" size="medium" color="primary" style={{cursor: "pointer"}} >Register</Button>
            </Container>
          </form>
          <Container style={{textAlign:"center", marginTop: "10px"}}>
            <Typography align="center" style={{fontWeight: "bold"}}>Already have an account?</Typography>
            <Container style={{width: "100%", margin: "auto", textAlign: "center", paddingBottom: "10px"}}>
              <Link to="/" style={{textDecoration: "none", color: "white"}}>
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