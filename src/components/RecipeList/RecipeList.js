import { Paper, Grid, makeStyles, Typography, TableBody, TableRow, TableCell, Table } from"@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  content: {
    background: "#f5f5dc",
    width: "100%",
    minHeight: "100vh",
    margin: 0,
    padding: 0
  },
  listArea: {
    background: "white",
    width: "100%",
    height: "100%",
    margin: 0,
    padding: "auto",
    opacity: "0.9",
  }
});

const meals = [
  {id: 1, meal: "Breakfast", value: "breakfast"},
  {id: 2, meal: "Lunch", value: "lunch"},
  {id: 3, meal: "Snack", value: "snack"},
  {id: 4, meal: "Dinner", value: "dinner"},
];

const RecipeList = () => {
  const classes = useStyles();
  const history = useHistory();
  return(
    <Grid container spacing={0}direction="column" alignItems="center" justify="center" className={classes.content}>
      <Typography align="center" variant="h4" style={{paddingBottom: "30px"}}>Registered Recipe List</Typography>
      <Grid item xs={11}>
        <Paper elevation={5}>
          <Table>
            <TableBody>
            { meals.map((meal) => (
              <TableRow key={meal.id}>
                <TableCell>{meal.meal}</TableCell>
                <TableCell onClick={() => {history.push("/RecipeList/MenuTotalCalorieDetail", {value: meal.value} )}}>
                  <NavigateNextIcon fontSize="large"/>
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

export default RecipeList;