/* eslint-disable jsx-a11y/alt-text */
import { Radio, Container, FormControl, FormControlLabel, Grid, TextField, Button, Typography, RadioGroup } from "@material-ui/core";
import { auth } from "../../firebase/initFirebase";
import friedEgg from "../../img/Main/fried-egg.png";
import sandwich from "../../img/Main/sandwich.png";
import food from "../../img/Main/food.png";
import steak from "../../img/Main/steak.png";
import { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import AddIngredients from './AddIngredients';
import '../../styles/mainPage.scss';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  form: {
    width: "100%",
    margin: "30px auto",
    padding: 0,
    textAlign: "center",
  },
});


const Main = () => {
  const classes = useStyles();
  const [dishName, setDishName] = useState('');
  const [meal, setMeal] = useState('breakfast');
  const history = useHistory();

  const addRecipe = (event) => {
    history.push("/Main/AddIngredients", {dishName: dishName, meal: meal});
  }

  return (
    <Container className="main">
      <Typography align="center" variant="h4" className="main__title">Add New Recipe</Typography>
      <Typography style={{fontFamily: "cursive"}} className="main__emailAddress" >Welcome, {auth.currentUser.email}</Typography>
      <FormControl noValidate   autoComplete="off" className={classes.form}>
        <Container>
          <TextField  placeholder="Chicken Adobo" variant="outlined" className="main__form_textField" size="large" value={dishName} onChange={(e) => setDishName(e.target.value)}/>
          <Grid container spacing={12} justify="space-evenly" alignItems="center" className="main__form_radio">
            <RadioGroup row aria-label="position" name="position" defaultValue="Breakfast" >
              <Grid item xs={6} sm={3} md={3} lg={3} className="main__form_img">
                <Container>
                  <img src={friedEgg} width={60} height={60} />
                </Container>
                <FormControlLabel value="breakfast" control={<Radio color="primary" />}label="Breakfast" labelPlacement="top" checked={meal === 'breakfast'} onClick={() => setMeal('breakfast')} />
              </Grid>
              <Grid item xs={6} sm={3} md={3} lg={3} className="main__form_img">
                <Container>
                  <img src={sandwich} width={60} height={60} />
                </Container>
                <FormControlLabel value="lunch" control={<Radio color="primary" />}label="Lunch" labelPlacement="top" checked={meal === 'lunch'} onClick={() => setMeal('lunch')}/>
              </Grid>
              <Grid item xs={6} sm={3} md={3} lg={3} className="main__form_img">
                <Container>
                  <img src={food} width={60} height={60} />
                </Container>
                <FormControlLabel value="snack" control={<Radio color="primary" />}label="Snack"labelPlacement="top" checked={meal === 'snack'} onClick={() => setMeal('snack')}/>
              </Grid>
              <Grid item xs={6} sm={3} md={3} lg={3} className="main__form_img">
                <Container>
                  <img src={steak} width={60} height={60} />
                </Container>
                <FormControlLabel value="dinner" control={<Radio color="primary" />}label="Dinner"labelPlacement="top" checked={meal === 'dinner'} onClick={() => setMeal('dinner')}/>
              </Grid>
            </RadioGroup>
          </Grid>
          <Button size="large" variant="contained" color="secondary" className="main__form_button" onClick={addRecipe} disabled={!dishName}>Add Recipe</Button>
        </Container>
      </FormControl>
      <Switch>
        <Route path="/Main/AddIngredients" component={AddIngredients} />
      </Switch>
     </Container>
  );
}

export default Main;