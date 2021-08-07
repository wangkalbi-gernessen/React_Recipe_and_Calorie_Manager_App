import { Grid, Paper, makeStyles, Typography, Table, TableBody, TableRow, TableCell, TableFooter, TablePagination } from "@material-ui/core";
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteRecipes = (id) => {
    db.collection('recipes').doc(id).delete();    
  }

  const goToEditRecipe = (res) => {
    history.push("/RecipeList/EditRecipe", {recipe: res});
  }

  // Pagination for a page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  // Pagination for per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  return(
    <Grid container spacing={0}direction="column" alignItems="center" justify="center" className={classes.content}>
      <Typography align="center" variant="h4" style={{paddingBottom: "30px"}}>{selectedValue}</Typography>
      { recipes.length > 0 ? 
        <Grid item xs={11}>
          <Paper elevation={5}>
            <Table>
              <TableBody>
              { recipes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((res) => (
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
              <TableFooter>
                <TableRow>
                  <TablePagination rowsPerPageOptions={[5, 10]} colSpan={3} count={recipes.length} rowsPerPage={rowsPerPage} page={page} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} />
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>
        </Grid>
        :
        <Typography variant="h5">No data</Typography>
      }
    </Grid>
  );
}

export default MenuTotalCalorieDetail;