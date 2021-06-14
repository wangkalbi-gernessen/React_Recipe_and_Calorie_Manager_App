import { Button, Container,  makeStyles, Typography } from "@material-ui/core";
import { Route, Router } from 'react-router-dom';

const useStyles = makeStyles({
  content: {
    width: "100%",
    height: "100vh",
    margin: 0,
    padding: 0,
    backgroundImage: "url('Login/background-menu.jpeg')",
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
})

const Login = () => {
  const classes = useStyles();
  return(
    <Container className={classes.content}>
      <Typography variant="h4" align="center" gutterBottom="true" style={{color: "white"}}>Welcome to Recipe and Calorie Manager!!</Typography>
      <Container className={classes.formArea}>
        <form style={{width:"100%", height: "100%", margin: "auto", textAlign: "center"}}>
          <div >
            <label for="email">Email: 
              <input type="text" id="email" placeholder="Enter Email.." />
            </label>
          </div>
          <div>
            <label for="password">Password: 
              <input type="text" id="password" placeholder="Enter Password.." />
            </label>
          </div>
          {/* <Router>
            <Route path="../SignUp/SignUp" component={SignUp}>
              <Button variant="contained" color="primary" style={{margin: '10px'}}>Sign Up</Button>
            </Route>
          </Router> */}
        </form>
      </Container>
    </Container>
  );
}

export default Login;