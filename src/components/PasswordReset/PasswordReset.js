import React, { useState, useContext } from "react";
import { UserContext } from "../Providers/UserProvider";
import { Typography, Container, makeStyles } from "@material-ui/core";
import { auth } from "../Firebase/initFirebase";
import vietnamese from '../../img/LoginSignUp/background-menu.jpeg';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  content: {
    width: "100%",
    height: "100vh",
    margin: 0,
    padding: 0,
    backgroundImage: `url(${vietnamese})`,
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
      setError('Error resetting password');
    });
  };

  return(
    <Container className={classes.content}>
      <Typography var iant="h5" align="center" gutterBottom="true" style={{color: "white"}}>Reset your password</Typography>
      <Container className={classes.formArea}>
        <form style={{width:"100%", height: "100%", margin: "auto", textAlign: "center"}} >
          {emailHasBeenSent && (
            <div>An email has been sent to you!</div>
          )}
          {error !== null && (
            <div>{error}</div>
          )}
          <div>
            <label for="email">Email: 
              <input type="email" id="email" placeholder="Enter Email.." value={email} onChange={event => setEmail(event.target.value)} required/>
            </label>
          </div>
          <button onClick={event => {sendResetEmail(event)}}>Send a reset link</button>
        </form>
        <Link to="/">Back to sign in page</Link>
      </Container>
    </Container>
  );
}

export default PasswordReset;