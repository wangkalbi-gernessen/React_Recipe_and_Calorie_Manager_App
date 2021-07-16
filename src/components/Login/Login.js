import { Container,  Grid,  Button,makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import vietnamese from '../../img/LoginSignUp/background-menu.jpeg';
import { auth, provider } from '../../firebase/initFirebase';
import { login } from '../Auth/Auth'

const useStyles = makeStyles({
  content: {
    width: "100%",
    minHeight: "100vh",  
    margin: 0,
    padding: 0,
    backgroundImage: `url(${vietnamese})`,
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
    auth.signInWithPopup(provider);
  }  

  return(
    <Grid container spacing={0}direction="column" alignItems="center" justify="center" className={classes.content}>
      {/* <Typography variant="h3" align="center" gutterBottom="true" style={{color: "white", fontFamily: "cursive"}}>Welcome to Recipe and Calorie Manager!!</Typography> */}
      <Grid item xs={11}>
        <Paper elevation={3}>
          <Typography variant="h4" align="center" gutterBottom="true" style={{fontFamily: "monospace", padding: "15px"}}>Log in here</Typography>
          <form noValidate autoComplete="off" style={{width: "100%", margin: "auto", padding: "20px", textAlign: "center"}} onSubmit={handleSubmit}>
            <Container className={classes.formArea}>
              <TextField id="my-email" type="email" label="Email Address" variant="outlined" onChange={(e) => setForm({...form, email: e.target.value})}/>
            </Container>
            <Container style={{paddingTop:"10px"}}>
              <TextField id="my-password" type="password" label="Password" variant="outlined" onChange={(e) => setForm({...form, password: e.target.value})} />
            </Container>
            <Container style={{paddingTop:"10px"}}>
              <Button type="submit" variant="contained" size="medium" color="primary" style={{cursor: "pointer"}} >Log in</Button>
            </Container>
          </form>
          <Typography variant="h6" align="center">OR</Typography>
          <Container style={{textAlign:"center", marginTop: "10px"}}>
            <Button variant="contained" size="medium" color="success" onClick={signInWithGoogle} style={{cursor:"pointer"}}>Sign in with Google</Button>
            <Typography align="center" style={{paddingTop: "20px", fontWeight: "bold"}}>Already have an account?</Typography>
            <Container style={{width: "100%", margin: "auto", textAlign: "center", padding: "10px"}}>
              <Link to="/SignUp/SignUp" style={{textDecoration: "none", color: "white"}}>
                <Button variant="contained" size="medium" color="primary">Sign up here</Button>
              </Link>
            </Container>
            <Container style={{width: "100%", margin: "auto", textAlign: "center", padding: "10px"}}>
              <Link to="/PasswordReset/PasswordReset" style={{textDecoration: "none", color: "white"}}>
                <Button variant="contained" size="medium" color="inherit">Forgot Password?</Button>
              </Link>
            </Container>
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;