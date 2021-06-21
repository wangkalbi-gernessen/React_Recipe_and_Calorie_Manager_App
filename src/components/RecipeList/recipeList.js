import { Typography, Container, makeStyles, TableBody, TableRow, TableCell } from"@material-ui/core";
// import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles({
  content: {
    background: "#f5f5dc",
    width: "100%",
    height: "100vh",
    margin: 0,
    padding: 0
  },
  table: {
    textAlign: "center",
    width: "50%"
  }
});

const meals = [
  {id: 1, meal: "Breakfast"},
  {id: 2, meal: "Lunch"},
  {id: 3, meal: "Snack"},
  {id: 4, meal: "Dinner"},
];

const RecipeList = () => {
  const classes = useStyles();
  return(
    <Container className={classes.content}>
      <Typography align="center" variant="h4" style={{color: "#008b8b"}}>Recipe List</Typography>
      <Container className={classes.table}>
        <TableBody>
          { meals.map((meal) => (
          <TableRow>
            <TableCell>{meal.meal}</TableCell>
            <TableCell>
            </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Container> 
    </Container>
  );
}

export default RecipeList;