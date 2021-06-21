import React, { useState } from "react";
import { Grid, Container, TextField, Typography, Paper, makeStyles, FormControl, Button } from "@material-ui/core";
import { auth } from "../../firebase/initFirebase";
import vietnamese from '../../img/LoginSignUp/background-menu.jpeg';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  content: {
    width: "100%",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    backgroundImage: `url(${vietnamese})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
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

const PasswordReset = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);

  const sendResetEmail = event => {
    event.preventDefault();
    auth.sendPasswordResetEmail(email).then(() => {
      setEmailHasBeenSent(true);
      setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
    }).catch(() => {
      setError('The email address does not exist.');
    });
  };

  return(
    <Grid container spacing={0}direction="column" alignItems="center" justify="center" className={classes.content}>
      <Grid item xs={11}>
        <Paper elevation={3}>
          <Typography variant="h4" align="center" gutterBottom="true" style={{fontFamily: "monospace", padding: "15px"}}>Reset your password</Typography>
          <FormControl noValidate autoComplete="off" style={{width: "100%", margin: "auto", padding: "20px", textAlign: "center"}}>
           {emailHasBeenSent && (
             <Typography variant="h6" color="secondary">An email has been sent to you!</Typography>
             )} 
            {error !== null && (
              <Typography variant="h6" color="secondary">{error}</Typography>
            )}
            <Container className={classes.formArea}>
              <Container>
                <TextField id="my-input" type="email" label="Email Address" helperText="*I never share your email." variant="outlined" value={email} onChange={event => setEmail(event.target.value)}/>
              </Container>
              <Container style={{paddingTop:"10px"}}>
                <Button variant="contained" size="medium" color="primary" style={{cursor: "pointer"}} onClick={event => {sendResetEmail(event)}}>Send a reset link</Button> 
              </Container>
            </Container>
          </FormControl>
          <Container style={{width: "100%", margin: "auto", textAlign: "center", padding: "10px"}}>
            <Link to="/" style={{textDecoration: "none"}}>
              <Button variant="contained" size="medium" color="secondary">Back to sign in page</Button>
            </Link>
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default PasswordReset;