import { Paper, TextField, Button, Container,  Grid,  makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
// import { auth, provider } from "../../firebase/initFirebase";
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    await register(form);
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
          <form noValidate autoComplete="off" style={{width: "100%", margin: "auto", padding: "20px", textAlign: "center"}} onSubmit={handleSubmit}>
            <Container className={classes.formArea}>
              <TextField id="email" type="email" label="Email Address" variant="outlined" onChange={(e) => setForm({...form, email: e.target.value})} required />
            </Container>
            <Container style={{paddingTop:"10px"}}>
              <TextField id="password" type="password" label="Password" variant="outlined" onChange={(e) => setForm({...form, password: e.target.value})} required />
            </Container>
            <Container style={{paddingTop:"10px"}}>
              <Button type="submit" variant="contained" size="medium" color="primary" style={{cursor: "pointer"}} >Register</Button>
            </Container>
          </form>
          {/* <Typography variant="h6" align="center">OR</Typography> */}
          <Container style={{textAlign:"center", marginTop: "10px"}}>
            {/* <Button variant="contained" size="medium" color="success" onClick={signInWithGoogle} style={{cursor:"pointer"}}>Sign in with Google</Button> */}
            <Typography align="center" style={{paddingTop: "20px", fontWeight: "bold"}}>Already have an account?</Typography>
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