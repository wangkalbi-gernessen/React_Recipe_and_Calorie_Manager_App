import Image from 'next/image';
import { Container, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import Footer from '../Footer';

const useStyles = makeStyles({
  content: {
    background: "#f5f5dc",
    width: "100%",
    height: "100vh",
    margin: 0,
    padding: 0
  },
  form: {
    width: "100%",
    height: "100%",
    margin: "50px auto",
    padding: 0,
    textAlign: "center"
  }
});

const buttonImages = [
  {id: 1, image: "/Main/fried-egg.png", type: "Breakfast"},
  {id: 2, image: "/Main/sandwich.png", type: "Lunch"},
  {id: 3, image: "/Main/food.png", type: "Snack"},
  {id: 4, image: "/Main/steak.png", type: "Dinner"}
];


const Main = () => {
  let classes = useStyles();
  return (
    <Container className={classes.content}>
      <Typography align="left" variant="h4" style={{color:"#008b8b"}}>Add New Recipe</Typography>
      <Container>
        <form noValidate autoComplete="off" className={classes.form}>
          <TextField  placeholder="Chicken Adobo" variant="outlined" style={{background: "white", margin: "0 30px"}} size="small" />
          <Grid container spacing={12} justify="space-evenly" alignItems="center" style={{margin: "30px 0"}}>
            { buttonImages.map ((buttonImage) => (
            <Grid item xs={6} sm={3} md={2} lg={2}>
              <Image src={buttonImage.image} width={60} height={60} />
              <Typography>{buttonImage.type}</Typography>
            </Grid>
            ))}
          </Grid>
        </form>
      </Container>
      <Footer />
     </Container>
  );
}

export default Main;