import { Typography, Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  content: {
    background: "#FAF1A7",
    width: "100%",
    height: "100vh",
    margin: 0,
    padding: 0
  },
});

const Profile = () => {
  const classes = useStyles();
  return(
    <Container className={classes.content}>
      <Typography align="center" variant="h4" style={{color: "#008b8b", paddingTop: "50px"}}>Register Your Profile</Typography>
      <Container>
        
      </Container>
    </Container>
  );
}

export default Profile;