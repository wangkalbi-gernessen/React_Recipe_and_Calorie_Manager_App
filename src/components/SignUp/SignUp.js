import { Container,  makeStyles, Typography } from "@material-ui/core";
import { useState } from "react";
import firebase from '../Firebase/initFirebase';

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

  const addUser = (event) => {
    event.preventDefault();
    const userInfo = {
      name: name,
      email: email,
      password: password,
      birthday: birthday
    };
    firebase.firestore().collection('users').add(userInfo);
    setName("");
    setEmail("");
    setPassword("");
    setBirthday("");
  }

  return(
    <Container className={classes.content}>
      <Typography variant="h4" align="center" gutterBottom="true" style={{color: "white"}}>Register your account</Typography>
      <Container className={classes.formArea}>
        <form style={{width:"100%", height: "100%", margin: "auto", textAlign: "center"}} onSubmit={addUser}>
          <div>
            <label for="name">Name: 
              <input type="text" id="name" placeholder="Enter your name.." value={name} onChange={event => setName(event.target.value)}/>
            </label>
          </div>
          <div>
            <label for="email">Email: 
              <input type="email" id="email" placeholder="Enter Email.." value={email} onChange={event => setEmail(event.target.value)}/>
            </label>
          </div>
          <div>
            <label for="password">Password: 
              <input type="password" id="password" placeholder="Enter Password.." value={password} onChange={event => setPassword(event.target.value)}/>
            </label>
          </div>
          <div>
            <label for="birthday">Birthday: 
              <input type="date" id="birthday" value={birthday} onChange={event => setBirthday(event.target.value)}/>
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
          <button type="submit">Register</button>
        </form>
      </Container>
    </Container>
  );
}

export default SignUp;