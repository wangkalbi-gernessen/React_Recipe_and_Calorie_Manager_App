import { Container, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { auth } from "../Firebase/initFirebase";
import Footer from '../Footer/Footer';
import { UserContext } from '../../Providers/UserProvider';

const useStyles = makeStyles({
  content: {
    background: "#f5f5dc",
    width: "100%",
    height: "100vh",
    margin: 0,
    padding: 0
  },
  form: {
    width: "100%",
    height: "100%",
    margin: "50px auto",
    padding: 0,
    textAlign: "center"
  }
});

const buttonImages = [
  {id: 1, image: "/Main/fried-egg.png", type: "Breakfast"},
  {id: 2, image: "/Main/sandwich.png", type: "Lunch"},
  {id: 3, image: "/Main/food.png", type: "Snack"},
  {id: 4, image: "/Main/steak.png", type: "Dinner"}
];

const Main = () => {
  const classes = useStyles();
  const user = useContext(UserContext);
  const {name, email, birthday} = user;
  console.log(user);
  console.log(name);
  console.log(email);
  console.log(birthday);

  return (
    <Container className={classes.content}>
      <Typography align="left" variant="h4" style={{color:"#008b8b"}}>Add New Recipe</Typography>
      <Container>
        <Typography>{email}</Typography>
        <Typography>{name}</Typography>
        <Typography>{birthday}</Typography>
        <form noValidate autoComplete="off" className={classes.form}>
          <TextField  placeholder="Chicken Adobo" variant="outlined" style={{background: "white", margin: "0 30px"}} size="small" />
          <Grid container spacing={12} justify="space-evenly" alignItems="center" style={{margin: "30px 0"}}>
            { buttonImages.map ((buttonImage) => (
            <Grid item xs={6} sm={3} md={2} lg={2}>
              <Typography>{buttonImage.type}</Typography>
            </Grid>
            ))}
          </Grid>
        </form>
        <button onClick={() => {auth.signOut()}}>Log out</button>
      </Container>
      <Footer />
     </Container>
  );
}

export default Main;