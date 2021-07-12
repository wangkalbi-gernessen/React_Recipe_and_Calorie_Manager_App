/* eslint-disable jsx-a11y/alt-text */
import { Grid, Paper, Container, makeStyles, Button, Typography, Table, TableBody, TableRow, TableCell, Dialog, DialogContent, DialogActions, TextField, FormControlLabel, RadioGroup, Radio} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { auth, db } from '../../firebase/initFirebase';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import friedEgg from "../../img/Main/fried-egg.png";
import sandwich from "../../img/Main/sandwich.png";
import food from "../../img/Main/food.png";
import steak from "../../img/Main/steak.png";

const useStyles = makeStyles({
  content: {
    background: "#f5f5dc",
    minWidth: "100%",
    minHeight: "100vh",
    margin: 0,
    padding: 0  
  }
});

const EditRecipe = () => {
  const classes = useStyles();
  // const history = useHistory();
  const location = useLocation();
  const recipe = location.state.recipe;
  const [ ingredient, setIngredient ] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [nutritions, setNutritions] = useState({});
  const [selectedRecipeId, setSelectedRecipeId] = useState('');
  const [updateDishName, setUpdatedDishName] = useState(recipe.dishName);
  const [updateMeal, setUpdatedMeal] = useState(recipe.mealType);
  // const [toUpdateId, setToUpdateId] = useState('');

  const mergeNutrition = (data) => {
    const res = {};

    data.forEach(basket => { 
      for (let [key, value] of Object.entries(basket)) { 
        if (res[key]) { 
          res[key] += value; 
        } else { 
          res[key] =  value;
        }
      }
    });
    return res;
  }

  // fetch data from Calorie Ninjas API
  const fetchAPI = (event) => {
    event.preventDefault();
    fetch('https://api.calorieninjas.com/v1/nutrition?query=' + ingredient, { 
      method: 'GET',
      headers: {'X-Api-Key': 'f/TgvT5UXyrfwO03Fzk/jw==hnra1zNlgjYiplLH'},
    })
    .then(res => res.json())
    .then(data => data.items)
    .then((items) => {
      let arr = items;
      const mergedNutritions = mergeNutrition(arr);
      for(let key in mergedNutritions) {
        nutritions[key] = mergedNutritions[key];
      }

      let dt = Object.assign({}, nutritions);
      setNutritions([dt]);
    }).catch((error) => {
      console.log("error");
    });
    addIngredient();
    setIngredient('');
  }

  const addIngredient = () => {
    const newIngredients = {id: ingredients.length + 1, name: ingredient, nutrition: nutritions};
    setIngredients([...ingredients, newIngredients]);
    setSelectedRecipeId(ingredients.length + 1);
  };
  // const editDishName = () => {
  //   db.collection('recipes').doc(toUpdateId).update({
  //     dishName: update
  //   });
  // }

  return(
    <Grid container spacing={0}direction="column" alignItems="center" justify="center" className={classes.content}>
      <Grid item xs={11}>
        <Paper elevation={5}>
          <TextField value={updateDishName} variant="outlined" style={{background: "white", margin:"40px 20px"}} size="large" onChange={event => setUpdatedDishName(event.target.value)}/>
          <Grid container spacing={12} justify="space-evenly" alignItems="center" className={classes.radioArea}>
            <RadioGroup row aria-label="position" name="position" defaultValue="Breakfast" >
              <Grid item xs={6} sm={3} md={3} lg={3}>
                <Container>
                  <img src={friedEgg} width={60} height={60} />
                </Container>
                <FormControlLabel value="breakfast" control={<Radio color="primary" />}label="Breakfast" labelPlacement="top" checked={updateMeal === 'breakfast'} onClick={() => setUpdatedMeal('breakfast')} />
              </Grid>
              <Grid item xs={6} sm={3} md={3} lg={3}>
                <Container>
                  <img src={sandwich} width={60} height={60} />
                </Container>
                <FormControlLabel value="lunch" control={<Radio color="primary" />}label="Lunch"labelPlacement="top" checked={updateMeal === 'lunch'} onClick={() => setUpdatedMeal('lunch')}/>
              </Grid>
              <Grid item xs={6} sm={3} md={3} lg={3}>
                <Container>
                  <img src={food} width={60} height={60} />
                </Container>
                <FormControlLabel value="snack" control={<Radio color="primary" />}label="Snack"labelPlacement="top" checked={updateMeal === 'snack'} onClick={() => setUpdatedMeal('snack')}/>
              </Grid>
              <Grid item xs={6} sm={3} md={3} lg={3}>
                <Container>
                  <img src={steak} width={60} height={60} />
                </Container>
                <FormControlLabel value="dinner" control={<Radio color="primary" />}label="Dinner"labelPlacement="top" checked={updateMeal === 'dinner'} onClick={() => setUpdatedMeal('dinner')}/>
              </Grid>
            </RadioGroup>
          </Grid>
          <form onSubmit={fetchAPI} noValidate autoComplete="off" style={{width: "100%", margin: "auto", textAlign: "center"}}>
            <Container>
              <TextField placeholder="1 tbsp soy sauce" variant="outlined" style={{background: "white", margin:"40px 20px"}} type="text" size="large" label="ingredients" value={ingredient} onChange={(e) => setIngredient(e.target.value)} />
            </Container>
            <Container>
              <Button type="submit" variant="contained" color="primary" style={{cursor: "pointer"}} disabled={!ingredient}>Click</Button>
            </Container>
          </form>
          <Container>
            <Typography align="center" style={{color: "brown", fontSize: "25px", fontWeight: "bold"}}>Ingredients</Typography>
            <Table size="small">
              <TableBody>
              { recipe.ingredients.map((res) => (
                <TableRow>
                  <TableCell>{res.name}</TableCell>
                  <TableCell>
                    <DeleteIcon fontSize="large"/>
                  </TableCell>
                  <TableCell><InfoOutlinedIcon/></TableCell>
              </TableRow>
              ))}
              </TableBody>
            </Table>
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default EditRecipe;