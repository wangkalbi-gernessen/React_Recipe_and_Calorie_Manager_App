/* eslint-disable jsx-a11y/alt-text */
import { Grid, Paper, Container, makeStyles, Button, Typography, Table, TableBody, TableRow, TableCell, Dialog, DialogContent, DialogActions, TextField, FormControl, FormControlLabel, RadioGroup, Radio} from "@material-ui/core";
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
  }, 
  dishNameTextField: {
    width: "100%",
    margin: "30px auto",
    padding: 0,
    textAlign: "center"
  },
  radioArea: {
    width: "100%"
  }, 
  editBtn: {
    width: "100%",
    margin: "0 auto",
    paddingBottom: "30px",
    textAlign: "center"  
  }
});

const EditRecipe = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const recipe = location.state.recipe;
  const [ ingredient, setIngredient ] = useState("");
  const [nutritions, setNutritions] = useState({});
  const [selectedRecipeId, setSelectedRecipeId] = useState('');
  const [updateDishName, setUpdatedDishName] = useState(recipe.dishName);
  const [updateMeal, setUpdatedMeal] = useState(recipe.mealType);
  const [updatedIngredients, setUpdatedIngredients] = useState(recipe.ingredients);
  // const [toUpdateId, setToUpdateId] = useState('');

  // combine multiple ingredients at a time
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
  // reload recipe's ingredients in table
  useEffect(() => {
  }, [updatedIngredients, selectedRecipeId]);

  // add a new ingredient
  const addIngredient = () => {
    const newIngredients = {id: updatedIngredients.length + 1, name: ingredient, nutrition: nutritions};
    setUpdatedIngredients([...updatedIngredients, newIngredients]);
    setSelectedRecipeId(updatedIngredients.length + 1);
  };

  const deleteIngredient = (ingredientId) => {
    const editedIngredients = updatedIngredients.filter(ingredient => ingredient.id !== ingredientId);
    console.log(editedIngredients);
    let idCount = 1;
    for(let i = 0; i < editedIngredients.length; i++) {
      if(editedIngredients[i].id !== idCount) {
        editedIngredients[i].id = idCount;
      }
      idCount++;
    }
    setUpdatedIngredients(editedIngredients);
    setSelectedRecipeId("");
  }

  const displayIngredientNutrition = (ingredientId) => {
    setSelectedRecipeId(ingredientId);
  }

  const editRecipe = () => {
    db.collection('recipes').doc(recipe.recipeId).update({
      dishName: updateDishName, 
      mealType: updateMeal,
      ingredients: updatedIngredients
    });
    history.push("/RecipeList/RecipeList");
  }

  return(
    <Grid container spacing={0}direction="column" alignItems="center" justify="center" className={classes.content}>
      <Grid item xs={11}>
        <Paper elevation={5}>
          <FormControl noValidate autoComplete="off">
            <Container className={classes.dishNameTextField}>
              <Typography align="center" variant="h4">Edit Recipe</Typography>
              <TextField label="Edit dishName"  type="text" autoFocus value={updateDishName} variant="outlined" style={{background: "white", margin:"40px 20px"}} size="large" onChange={(event) => setUpdatedDishName(event.target.value)}/>
            </Container>
            <Grid container spacing={12} justify="space-evenly" alignItems="center" className={classes.radioArea}>
              <RadioGroup row aria-label="position" name="position" defaultValue="Breakfast" >
                <Grid item xs={6} sm={3} md={3} lg={3} style={{textAlign: "center"}}>
                  <Container>
                    <img src={friedEgg} width={60} height={60} />
                  </Container>
                  <FormControlLabel value="breakfast" control={<Radio color="primary" />}label="Breakfast" labelPlacement="top" checked={updateMeal === 'breakfast'} onClick={() => setUpdatedMeal('breakfast')} />
                </Grid>
                <Grid item xs={6} sm={3} md={3} lg={3} style={{textAlign: "center"}}>
                  <Container>
                    <img src={sandwich} width={60} height={60} />
                  </Container>
                  <FormControlLabel value="lunch" control={<Radio color="primary" />}label="Lunch"labelPlacement="top" checked={updateMeal === 'lunch'} onClick={() => setUpdatedMeal('lunch')}/>
                </Grid>
                <Grid item xs={6} sm={3} md={3} lg={3} style={{textAlign: "center"}}>
                  <Container>
                    <img src={food} width={60} height={60} />
                  </Container>
                  <FormControlLabel value="snack" control={<Radio color="primary" />}label="Snack"labelPlacement="top" checked={updateMeal === 'snack'} onClick={() => setUpdatedMeal('snack')}/>
                </Grid>
                <Grid item xs={6} sm={3} md={3} lg={3} style={{textAlign: "center"}}>
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
                { updatedIngredients.map((res) => (
                  <TableRow>
                    <TableCell>{res.name},{res.id}</TableCell>
                    <TableCell>
                      <DeleteIcon fontSize="large" onClick={() => deleteIngredient(res.id)} />
                    </TableCell>
                    <TableCell><InfoOutlinedIcon onClick={() => displayIngredientNutrition(res.id)}/></TableCell>
                </TableRow>
                ))}
                </TableBody>
              </Table>
            </Container>
            <Container>
              <Typography align="center" style={{color: "brown", fontSize: "25px", fontWeight: "bold"}}>Nutrition Facts</Typography>
              {/* {recipe.ingredients.length > 0 && selectedRecipeId ? 
              <Container>
                <Table size="small">
                  <TableBody>
                    <TableRow >
                      <TableCell>Calories</TableCell>
                      <TableCell>{recipe.ingredients[selectedRecipeId - 1].nutrition.calories}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>% Daily Value*</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total Fat {recipe.ingredients[selectedRecipeId - 1].nutrition.fat_total_g}g</TableCell>
                      <TableCell>%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Saturated Fat {recipe.ingredients[selectedRecipeId - 1].nutrition.fat_saturated_g}g</TableCell>
                      <TableCell>%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cholesterol {recipe.ingredients[selectedRecipeId - 1].nutrition.cholesterol_mg}mg</TableCell>
                      <TableCell>%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Sodium {ingredients[selectedRecipeId - 1].nutrition.sodium_mg}mg</TableCell>
                      <TableCell>%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total Carbonhydrate {ingredients[selectedRecipeId - 1].nutrition.carbohydrates_total_g}g</TableCell>
                      <TableCell>%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>Total Sugars {ingredients[selectedRecipeId - 1].nutrition.sugar_g}g</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>Fiber {ingredients[selectedRecipeId - 1].nutrition.fiber_g}g</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Protein {ingredients[selectedRecipeId - 1].nutrition.protein_g}g</TableCell>
                      <TableCell>%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Potassium {ingredients[selectedRecipeId - 1].nutrition.potassium_mg}mg</TableCell>
                      <TableCell>%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>The % Daily Value(DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.(FDA.gov)</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Container>
              : 
              <Container>
                <Typography align="center" variant="h5">No Data</Typography>
              </Container>
              } */}
            </Container>
            <Container className={classes.editBtn}>
              <Button size="large" color="secondary" variant="outlined" style={{cursor: "pointer", marginTop: "50px"}} type="submit" onClick={editRecipe}>Edit Recipe</Button>
            </Container>
          </FormControl>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default EditRecipe;