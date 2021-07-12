import { Grid, Paper, Container, makeStyles, Button, Typography, Table, TableBody, TableRow, TableCell, Dialog, DialogContent, DialogActions, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { auth, db } from '../../firebase/initFirebase';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
  content: {
    background: "#f5f5dc",
    minWidth: "100%",
    minHeight: "100vh",
    margin: 0,
    padding: 0  
  }
});

const MenuTotalCalorieDetail = () => {
  const classes = useStyles();
  const userId = auth.currentUser.uid;
  const [recipes, setRecipes] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const selectedValue = location.state.value;

  // const openEditDialog = (recipe) => {
  //   setOpen(true);
  //   setToUpdateId(recipe.recipeId);
  //   setUpdate(recipe.dishName);
  // }

  // const handleClose = () => {
  //   setOpen(false);
  // }

  // const editDishName = () => {
  //   db.collection('recipes').doc(toUpdateId).update({
  //     dishName: update
  //   });
  //   setOpen(false);
  // }

  useEffect(() => {
    db.collection('recipes').where("userId", "==", userId).where("mealType", "==", selectedValue).onSnapshot(snapshot => {
      setRecipes(snapshot.docs.map(doc => {
        return {
          userId: doc.data().userId,
          recipeId: doc.data().recipeId,
          mealType: doc.data().mealType,
          ingredients: doc.data().ingredients,
          dishName: doc.data().dishName,
        }
      }))
    }) 
  }, []);

  const deleteRecipes = (id) => {
    db.collection('recipes').doc(id).delete();    
  }

  const goToEditRecipe = (res) => {
    history.push("/RecipeList/EditRecipe", {recipe: res});
  }

  return(
    <Grid container spacing={0}direction="column" alignItems="center" justify="center" className={classes.content}>
      <Typography align="center" variant="h4" style={{paddingBottom: "30px"}}>{selectedValue}</Typography>
      { recipes.length > 0 ? 
        <Grid item xs={11}>
          <Paper elevation={5}>
            <Table>
              <TableBody>
              { recipes.map((res) => (
                <TableRow key={res.recipeId}>
                  <TableCell>{res.dishName}</TableCell>
                  <TableCell onClick={() => deleteRecipes(res.recipeId)}>
                    <DeleteIcon fontSize="large"/>
                  </TableCell>
                  <TableCell>
                    <EditIcon fontSize="large" onClick={() => goToEditRecipe(res)}/>
                  </TableCell>
              </TableRow>
              ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        :
        <Typography variant="h5">No data</Typography>
      }
      {/* <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField autoFocus margin="normal" label="Edit dishName" type="text" name="editDishName" value={update} onChange={event => setUpdate(event.target.value)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={editDishName} color="primary">Save</Button>
        </DialogActions>
      </Dialog> */}
    </Grid>
  );
}

export default MenuTotalCalorieDetail;