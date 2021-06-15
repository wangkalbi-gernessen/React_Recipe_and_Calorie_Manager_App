import { Grid, Container, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  content: {
    width: "100%",
    padding: 0,
    margin: 0,
    bottom: 0,
    right: 0,
    position: "absolute"
  },
  root: {
    width: "100%",
    backgroundColor: "#f5f5dc",
    margin: 0,
    padding: 0,
  },
})

const buttonImages = [
  {id: 1, image: "/Footer/menu.png", to: "/RecipeList"},
  {id: 2, image: "/Footer/cooking.png", to: "/"},
  {id: 3, image: "/Footer/person.png", to: "/Profile"}
];

const Footer = () => {
  const classes = useStyles();
  return(
    <Container className={classes.content}>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <Typography align="center">&copy;2021 Recipe-and-Calorie-Manager</Typography>
        </Grid>
        { buttonImages.map((buttonImage) => (
        <Grid item xs={2}>
        </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Footer;