/* eslint-disable jsx-a11y/alt-text */
import { Radio, Container, FormControl, FormControlLabel, Grid, makeStyles, TextField, Button, Typography, RadioGroup } from "@material-ui/core";
import { auth, db } from "../../firebase/initFirebase";
import friedEgg from "../../img/Main/fried-egg.png";
import sandwich from "../../img/Main/sandwich.png";
import food from "../../img/Main/food.png";
import steak from "../../img/Main/steak.png";
import { useState } from "react";

const useStyles = makeStyles({
  content: {
    background: "#f5f5dc",
    minWidth: "100%",
    minHeight: "100vh",
    margin: 0,
    padding: 0
  },
  form: {
    width: "100%",
    margin: "30px auto",
    padding: 0,
    textAlign: "center"
  },
});

// const buttonImages = [
//   {id: 1, image: friedEgg, type: "Breakfast"},
//   {id: 2, image: sandwich, type: "Lunch"},
//   {id: 3, image: food, type: "Snack"},
//   {id: 4, image: steak, type: "Dinner"}
// ];

const Main = () => {
  const classes = useStyles();

  const [dishName, setDishName] = useState('');
  const [meal, setMeal] = useState('Breakfast')
  const userId = auth.currentUser.uid;

  const addRecipe = () => {
    db.collection('recipe').add({
      userId: userId,
      dishName: dishName,
      meal: meal
    }).catch(alert);
  }

  return (
    <Container className={classes.content}>
      <Typography align="center" variant="h4" style={{color:"#008b8b", paddingTop: "30px"}}>Add New Recipe</Typography>
      <Typography variant="h5" style={{paddingLeft: "20px", paddingTop: "30px", fontFamily: "fantasy"}}>Welcome, {auth.currentUser.email}</Typography>
      <FormControl noValidate   autoComplete="off" className={classes.form}>
        <Container >
          <TextField  placeholder="Chicken Adobo" variant="outlined" style={{background: "white", margin: "40px 20px"}} size="large" value={dishName} onChange={(e) => setDishName(e.target.value)} />
          <Grid container spacing={12} justify="space-evenly" alignItems="center" style={{margin: "30px 0"}}>
            <RadioGroup row aria-label="position" name="position" defaultValue="Breakfast">
              <Grid item xs={6} sm={3} md={2} lg={2}>
                <FormControlLabel value="breakfast" control={<Radio color="primary" />}label="Breakfast"labelPlacement="top" checked={meal === 'breakfast'} onClick={() => setMeal('breakfast')} />
              </Grid>
              <Grid item xs={6} sm={3} md={2} lg={2}>
                <FormControlLabel value="lunch" control={<Radio color="primary" />}label="Lunch"labelPlacement="top" checked={meal === 'lunch'} onClick={() => setMeal('lunch')}/>
              </Grid>
              <Grid item xs={6} sm={3} md={2} lg={2}>
                <FormControlLabel value="snack" control={<Radio color="primary" />}label="Snack"labelPlacement="top" checked={meal === 'snack'} onClick={() => setMeal('snack')}/>
              </Grid>
              <Grid item xs={6} sm={3} md={2} lg={2}>
              <FormControlLabel value="dinner" control={<Radio color="primary" />}label="Dinner"labelPlacement="top" checked={meal === 'dinner'} onClick={() => setMeal('dinner')}/>
              </Grid>
            </RadioGroup>
            {/* { buttonImages.map ((buttonImage) => ( */}
            {/* <Grid item xs={6} sm={3} md={2} lg={2}>
               */}

              {/* <img src={buttonImage.image} style={{height: "60px", width: "60px"}} className={classes.btn} /> 
              <Typography>{buttonImage.type}</Typography>
              <input type="radio" value={buttonImage.type} />
            // </Grid>
            ))} */}
          {/* </Grid> */}
          </Grid>
          <Button variant="contained" color="secondary" style={{cursor: "pointer"}} onClick={addRecipe}>Add Recipe</Button>
        </Container>
      </FormControl>
     </Container>
  );
}

export default Main;