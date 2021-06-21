/* eslint-disable jsx-a11y/alt-text */
import { Container, FormControl, Grid, makeStyles, TextField, Button, Typography, RadioGroup } from "@material-ui/core";
import { auth } from "../../firebase/initFirebase";
import friedEgg from "../../img/Main/fried-egg.png";
import sandwich from "../../img/Main/sandwich.png";
import food from "../../img/Main/food.png";
import steak from "../../img/Main/steak.png";
import database from "../../firebase/initFirebase";
import { useState } from "react";

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
    margin: "30px auto",
    padding: 0,
    textAlign: "center"
  },
  btn: {
    cursor: "pointer",
    // transition: "0.2s all",
    "&: hover" : {
      transform: "scale(2, 1.5)",
      background: "yellow"
    }
  }
});

const buttonImages = [
  {id: 1, image: friedEgg, type: "Breakfast"},
  {id: 2, image: sandwich, type: "Lunch"},
  {id: 3, image: food, type: "Snack"},
  {id: 4, image: steak, type: "Dinner"}
];

const Main = () => {
  const classes = useStyles();

  const [dishName, setDishName] = useState('');
  const userId = auth.currentUser.uid;

  const addRecipe = (e) => {
    // database.ref('recipe').set({

    // })
  }


  return (
    <Container className={classes.content}>
      <Typography align="center" variant="h4" style={{color:"#008b8b", paddingTop: "30px"}}>Add New Recipe</Typography>
      <Typography variant="h5" style={{paddingLeft: "20px", paddingTop: "30px", fontFamily: "fantasy"}}>Welcome, {auth.currentUser.email}</Typography>
      <FormControl noValidate   autoComplete="off" className={classes.form}>
        <Container >
          <TextField  placeholder="Chicken Adobo" variant="outlined" style={{background: "white", margin: "40px 20px"}} size="large" value={dishName} onChange={(e) => setDishName(e.target.value)} />
          <Grid container spacing={12} justify="space-evenly" alignItems="center" style={{margin: "30px 0"}}>
            <RadioGroup>
            { buttonImages.map ((buttonImage) => (
            <Grid item xs={6} sm={3} md={2} lg={2}>
              {/* <Button value={buttonImage.type}>
                <img src={buttonImage.image} style={{height: "100%", width: "100%"}} className={classes.btn} /> 
              </Button> */}
              <Typography>{buttonImage.type}</Typography>
            </Grid>
            ))}
            </RadioGroup>
          </Grid>
          <Button variant="contained" color="secondary" style={{cursor: "pointer"}}>Add Recipe</Button>
        </Container>
      </FormControl>
     </Container>
  );
}

export default Main;