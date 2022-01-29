import { Container,  Grid,  Button,makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import vietnamese from '../../img/LoginSignUp/background-menu.jpeg';
import { login } from '../Auth/Auth'

const useStyles =makeStyles((theme) => ({
  // root: {
  //   flexGlow: 1,
  // },
  content: {
    minWidth: "100vw",
    minHeight: "100vh",  
    margin: 0,
    padding: 0,
    backgroundImage: `url(${vietnamese})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
}));

const Login = () => {
  const classes = useStyles();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await login(form);
    } catch(err) {
      setErrorMessage(err.message);
    }
  };

  return(
    <Grid container direction="column" alignItems="center" justify="center" className={classes.content}>
      <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
        <Typography variant="h2" align="center" gutterBottom="true" style={{color: "white", fontFamily: "cursive"}}>Welcome to Recipe and Calorie Manager!!</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
        <Paper elevation={3} style={{margin: "30px"}}>
          <Typography variant="h4" align="center" gutterBottom="true" style={{fontFamily: "monospace", padding: "15px"}}>Log in here</Typography>
          <Grid container>
          <form noValidate autoComplete="off" style={{width: "100%", margin: "auto", padding: "10px", textAlign: "center"}} onSubmit={handleSubmit}>
              <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                {errorMessage !== null && (
                  <Typography variant="h6" color="secondary" style={{marginBottom:"15px"}}>{errorMessage}</Typography>
                )}
                <TextField id="my-email" type="email" label="Email Address" variant="outlined" onChange={(e) => setForm({...form, email: e.target.value})}/>
              </Grid>
              <Grid item xs={12} sm={12} md={12} xl={12} lg={12} style={{paddingTop:"10px"}}>
                <TextField id="my-password" type="password" label="Password" variant="outlined" onChange={(e) => setForm({...form, password: e.target.value})} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} xl={12} lg={12} style={{paddingTop:"10px"}}>
                <Button type="submit" variant="contained" size="medium" color="primary" style={{cursor: "pointer"}} >Log in</Button>
              </Grid>
          </form>
            </Grid>
          <Container style={{textAlign:"center", marginTop: "10px"}}>
            <Typography align="center" style={{fontWeight: "bold"}}>Don't have an account?</Typography>
            <Container style={{width: "100%", margin: "auto", textAlign: "center", padding: "10px"}}>
              <Link to="/SignUp/SignUp" style={{textDecoration: "none", color: "white"}}>
                <Button variant="contained" size="medium" color="primary">Sign up here</Button>
              </Link>
            </Container>
            <Container style={{width: "100%", margin: "auto", textAlign: "center", padding: "10px"}}>
              <Link to="/PasswordReset/PasswordReset" style={{textDecoration: "none", color: "white"}}>
                <Button variant="contained" size="medium" color="secondary">Forgot Password?</Button>
              </Link>
            </Container>
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;