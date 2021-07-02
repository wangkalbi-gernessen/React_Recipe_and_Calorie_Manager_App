import { Button, Grid, TextField } from "@material-ui/core";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Container, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { auth } from '../../firebase/initFirebase';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  content: {
    background: "#f5f5dc",
    minWidth: "100%",
    minHeight: "100vh",
    margin: 0,
    padding: 0  
  },
  inputArea: {
    margin: "auto",
    background: "white",
    width: "50%"
  },
  formArea: {
    background: "white",
    width: "100%",
    height: "100%",
    margin: 0,
    padding: "auto",
    opacity: "0.6",
  }
});

const MenuTotalCalorieDetail = () => {
  const classes = useStyles();
  const location = useLocation();
  const myParam = location.state.params;
  const userId = auth.currentUser.uid;

  // fetch data from Calorie Ninjas API
  const [ ingredient, setIngredient ] = useState("");
  const [ ingredients, setIngredients ] = useState([]);
  const [nutritions, setNutritions] = useState({
    sugar_g: 0,
    fiber_g: 0,
    serving_size_g: 0,
    sodium_mg: 0,
    potassium_mg: 0,
    fat_saturated_g: 0,
    fat_total_g: 0,
    calories: 0,
    cholesterol_mg: 0,
    protein_g: 0,
    carbohydrates_total_g: 0
  });
  // const [nutritions, setNutritions] = useState([]);

  const mergeNutrition = (data) => {
    const res = {};

    data.forEach(basket => { 
      for (let [key, value] of Object.entries(basket)) { 
        if (res[key]) { 
          res[key] += value; 
        } else { 
          res[key] = value;
        }
      }
    });
    return res;
  }

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
      console.log(mergedNutritions);

      let arrs =  mergedNutritions.map((data) => setNutritions({...nutritions, data}));
      console.log(arrs);
      console.log(nutritions);

    }).catch((error) => {
      console.log("error");
    });
    addIngredient();
    setIngredient('');
  }

  const addIngredient = () => {
    setIngredients([
      ...ingredients, {
        id: ingredients.length + 1,
        name: ingredient,
        nutrition: nutritions
      }
    ]);
  };

  const deleteIngredient = (ingredientId) => {
    const updatedIngredients = ingredients.filter(ingredient => ingredient.id !== ingredientId);
    setIngredients(updatedIngredients);
  }

  return(
    <Grid container spacing={0} direction="column" alignItems="center" justify="center" className={classes.content}>
      <Grid item xs={16}>
        <Paper elevation={10}>
          <Typography variant="h4" align="center" gutterBottom="true" style={{fontFamily: "monospace", padding: "20px", color: "orange", fontWeight: "bold"}}>{myParam}</Typography>        
          <Container className={classes.formArea}>
            <Grid container direction="row" alignItems="center" justify="center">
              <form onSubmit={fetchAPI} noValidate autoComplete="off" style={{width: "100%", margin: "auto", padding: "20px", textAlign: "center"}}>
                <TextField placeholder="1 tbsp soy sauce" variant="outlined" style={{background: "white", margin:"40px 20px"}} type="text" size="large" label="ingredients" value={ingredient} onChange={(e) => setIngredient(e.target.value)} />
                <Button type="submit" variant="contained" color="primary" style={{cursor: "pointer"}} disabled={!ingredient}>Click</Button>
              </form>
            </Grid>
          </Container>
          <Container>
            <Table size="small">
              <TableHead>
                <TableRow component="th" scope="row">
                  <TableCell>Ingredient</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { ingredients.map(ingredient => (
                  <TableRow key={ingredient.id}>
                    <TableCell>{ingredient.name}, {ingredient.nutrition.calories}</TableCell>
                    <TableCell><DeleteIcon onClick={() => deleteIngredient(ingredient.id)} /></TableCell>
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

export default MenuTotalCalorieDetail;