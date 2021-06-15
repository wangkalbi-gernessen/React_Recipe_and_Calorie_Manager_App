import { Container,  makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { auth, generateUserDocument, signInWithGoogle } from "../Firebase/initFirebase";
import { Link } from "react-router-dom";

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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const [birthday, setBirthday] = useState(''); 
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const addUser = async(event, email, password) => {
    event.preventDefault();
    // const userInfo = {
    //   name: name,
    //   email: email,
    //   password: password,
    //   birthday: birthday
    // };
    // firebase.firestore().collection('users').add(userInfo);
    try {
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, {name, birthday});
    } catch(error) {
      setError('Error Signing up with email and password');
    }

    setName("");
    setEmail("");
    setPassword("");
    setBirthday("");
    setMessage('Your account was registered.');
  }

  return(
    <Container className={classes.content}>
      <Typography variant="h4" align="center" gutterBottom="true" style={{color: "white"}}>Register your account</Typography>
      <Container className={classes.formArea}>
        <form style={{width:"100%", height: "100%", margin: "auto", textAlign: "center"}}>
          <div>
            <label for="name">Name: 
              <input type="text" id="name" placeholder="Enter your name.." value={name} onChange={event => setName(event.target.value)} required/>
            </label>
          </div>
          <div>
            <label for="email">Email: 
              <input type="email" id="email" placeholder="Enter Email.." value={email} onChange={event => setEmail(event.target.value)} required/>
            </label>
          </div>
          <div>
            <label for="password">Password: 
              <input type="password" id="password" placeholder="Enter Password.." value={password} onChange={event => setPassword(event.target.value)} required/>
            </label>
          </div>
          <div>
            <label for="birthday">Birthday: 
              <input type="date" id="birthday" value={birthday} onChange={event => setBirthday(event.target.value)} required/>
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
          <button type="submit" onClick={event => {addUser(event, email, password)}}>Register</button>
          <Typography variant="h5" align="center" style={{color:"red"}}>{message}</Typography>
        </form>
        <p>or</p>
        <button onClick={() => {
          try {
            signInWithGoogle();
          } catch(error) {
            console.error("Error signing in with Google", error);
          }
        }}>Sign in with Google</button>
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