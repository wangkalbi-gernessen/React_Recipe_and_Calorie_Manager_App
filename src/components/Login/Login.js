import { Container,  Grid,  Button, Paper, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from '../Auth/Auth';
import '../../styles/login.scss';

const Login = () => {
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
    <Grid container className="login" direction="column" alignItems="center" justify="center">
      <Grid item xs={10} sm={10} md={10} xl={10} lg={10} className="login__item">
      <Typography variant="h2" align="center"  className="login__title" style={{fontFamily: "cursive"}}>Welcome to Recipe and Calorie Manager!!</Typography>
        <Paper elevation={3} className="login__paper">
          <Typography variant="h4" align="center" gutterBottom="true" className="login__here" style={{fontFamily: "monospace"}}>Log in here</Typography>
          <form noValidate autoComplete="off" className="login__form" onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                {errorMessage !== null && (
                  <Typography variant="h6" color="secondary" className="login__form_errorMessage" >{errorMessage}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={12} xl={12} lg={12} className="login__form_gridItem">
                <TextField id="my-email" type="email" label="Email Address" variant="outlined" onChange={(e) => setForm({...form, email: e.target.value})}/>
              </Grid>
              <Grid item xs={12} sm={12} md={12} xl={12} lg={12} className="login__form_gridItem">
                <TextField id="my-password" type="password" label="Password" variant="outlined" onChange={(e) => setForm({...form, password: e.target.value})} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} xl={12} lg={12} className="login__form_gridItem">
                <Button type="submit" variant="contained" size="medium" color="primary" className="login__form_loginBtn">Log in</Button>
              </Grid>
            </Grid>
          </form>
          <Container className="login__noAccount">
            <Typography align="center" className="login__noAccount_text">Don't have an account?</Typography>
            <Container className="login__noAccount_btnContainer">
              <Link to="/SignUp/SignUp" className="login__noAccount_btnLink">
                <Button variant="contained" size="medium" color="primary">Sign up here</Button>
              </Link>
            </Container>
            <Container className="login__passwordReset">
              <Link to="/PasswordReset/PasswordReset" className="login__passwordReset_link">
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