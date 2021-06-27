/* eslint-disable jsx-a11y/alt-text */
import { Radio, Container, FormControl, FormControlLabel, Grid, makeStyles, TextField, Button, Typography, RadioGroup } from "@material-ui/core";
import { auth, db } from "../../firebase/initFirebase";
import friedEgg from "../../img/Main/fried-egg.png";
import sandwich from "../../img/Main/sandwich.png";
import food from "../../img/Main/food.png";
import steak from "../../img/Main/steak.png";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

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
  radioArea: {
    width: "100%"
  }
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
  const [meal, setMeal] = useState('breakfast')
  const userId = auth.currentUser.uid;

  // const history = useHistory();

  const addRecipe = (event) => {
    event.preventDefault();
    db.collection('recipe').add({
      userId: userId,
      dishName: dishName,
      meal: meal
    }).catch(alert);
    setDishName('');
    setMeal('breakfast');
    // history.push("/");
  }

  return (
    <Container className={classes.content}>
      <Typography align="center" variant="h4" style={{color:"#008b8b", paddingTop: "30px"}}>Add New Recipe</Typography>
      <Typography variant="h6" style={{paddingLeft: "20px", paddingTop: "30px", fontFamily: "fantasy"}}>Welcome, {auth.currentUser.email}</Typography>
      <FormControl noValidate   autoComplete="off" className={classes.form}>
        <Container >
          <TextField  placeholder="Chicken Adobo" variant="outlined" style={{background: "white", margin: "40px 20px"}} size="large" value={dishName} onChange={(e) => setDishName(e.target.value)} />
          <Grid container spacing={12} justify="space-evenly" alignItems="center" className={classes.radioArea}>
            <RadioGroup row aria-label="position" name="position" defaultValue="Breakfast" >
              <Grid item xs={6} sm={3} md={3} lg={3}>
                <Container>
                  <img src={friedEgg} width={60} height={60} />
                </Container>
                <FormControlLabel value="breakfast" control={<Radio color="primary" />}label="Breakfast" labelPlacement="top" checked={meal === 'breakfast'} onClick={() => setMeal('breakfast')} />
              </Grid>
              <Grid item xs={6} sm={3} md={3} lg={3}>
                <Container>
                  <img src={sandwich} width={60} height={60} />
                </Container>
                <FormControlLabel value="lunch" control={<Radio color="primary" />}label="Lunch"labelPlacement="top" checked={meal === 'lunch'} onClick={() => setMeal('lunch')}/>
              </Grid>
              <Grid item xs={6} sm={3} md={3} lg={3}>
                <Container>
                  <img src={food} width={60} height={60} />
                </Container>
                <FormControlLabel value="snack" control={<Radio color="primary" />}label="Snack"labelPlacement="top" checked={meal === 'snack'} onClick={() => setMeal('snack')}/>
              </Grid>
              <Grid item xs={6} sm={3} md={3} lg={3}>
                <Container>
                  <img src={steak} width={60} height={60} />
                </Container>
                <FormControlLabel value="dinner" control={<Radio color="primary" />}label="Dinner"labelPlacement="top" checked={meal === 'dinner'} onClick={() => setMeal('dinner')}/>
              </Grid>
            </RadioGroup>
          </Grid>
            <Link to="/Main/AddIngredients" style={{textDecoration: "none"}}> 
              <Button variant="contained" color="secondary" style={{cursor: "pointer"}} onClick={addRecipe}>Add Recipe</Button>
            </Link>
        </Container>
      </FormControl>
     </Container>
  );
}

export default Main;