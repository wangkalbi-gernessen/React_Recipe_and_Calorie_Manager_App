import { Grid, Paper } from "@material-ui/core";
import { Container, makeStyles, Button, Typography, Table, TableBody, TableRow, TableCell } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { auth, db } from '../../firebase/initFirebase';
import DeleteIcon from '@material-ui/icons/Delete';

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
  const [recipe, setRecipe] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const selectedValue = location.state.value;

  useEffect(() => {
    
    const unsubscribe = db.collection('recipe').where("userId", "==", userId).where( "mealType", "==", selectedValue).get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        let data = doc.data();
        setRecipe(arr => [...arr, data]);
      });
    })
    return () => unsubscribe;
  }, []);

  const goToMain = () => {
    history.push("/RecipeList/RecipeList");
  }

  const deleteRecipe = (id) => {
    db.collection('recipe').doc(id).delete();    
  }

  return(
    <Grid container spacing={0}direction="column" alignItems="center" justify="center" className={classes.content}>
      <Grid item xs={11}>
        <Paper elevation={5}>
          <Table>
            <TableBody>
            { recipe.map((res) => (
              <TableRow key={res.recipeId}>
                <TableCell>{res.dishName}, {res.recipeId}</TableCell>
                <TableCell onClick={() => deleteRecipe(res.recipeId)}>
                  <DeleteIcon fontSize="large"/>
                </TableCell>
            </TableRow>
            ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default MenuTotalCalorieDetail;