import React, { useState } from "react";
import { Grid, Container, TextField, Typography, Paper, FormControl, Button } from "@material-ui/core";
import { auth } from "../../firebase/initFirebase";
import { Link } from "react-router-dom";
import '../../styles/passwordReset.scss';

const PasswordReset = () => {
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
    <Grid container spacing={0}direction="column" alignItems="center" justify="center" className="passwordReset">
      <Grid item xs={11}>
        <Paper elevation={3}>
          <Typography variant="h4" align="center" style={{fontFamily: "monospace"}} className="passwordReset__title">Reset your password</Typography>
          <FormControl noValidate autoComplete="off" className="passwordReset__form">
           {emailHasBeenSent && (
             <Typography variant="h6" color="secondary">An email has been sent to you!</Typography>
             )} 
            {error !== null && (
              <Typography variant="h6" color="secondary"
              className="passwordReset__form_errorMessage" >{error}</Typography>
            )}
            <Container className="passwordReset__form_area">
              <Container>
                <TextField id="my-input" type="email" placeholder="Enter email address" label="Email Address" helperText="*I never share your email." variant="outlined" value={email} onChange={event => setEmail(event.target.value)}/>
              </Container>
              <Container style={{paddingTop:"10px"}}>
                <Button variant="contained" size="medium" color="primary" className="passwordReset__form_sendBtn" onClick={event => {sendResetEmail(event)}}disabled={!email}>Send a reset link</Button> 
              </Container>
            </Container>
          </FormControl>
          <Container className="passwordReset__backBtn">
            <Link to="/" className="passwordReset__backBtn_link">
              <Button variant="contained" size="medium" color="secondary">Back to sign in page</Button>
            </Link>
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default PasswordReset;