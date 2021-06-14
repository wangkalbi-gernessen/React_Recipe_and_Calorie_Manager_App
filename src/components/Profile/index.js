const { Typography, Container, makeStyles } = require("@material-ui/core");
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../Footer/index'));

const useStyles = makeStyles({
  content: {
    background: "#FAF1A7",
    width: "100%",
    height: "100vh",
    margin: 0,
    padding: 0
  },
});

const registerProfile = () => {
  const classes = useStyles();
  return(
    <Container className={classes.content}>
      <Typography align="center" variant="h4" style={{color: "#008b8b", paddingTop: "50px"}}>Register Your Profile</Typography>
      <Container>
        
      </Container>
      <DynamicComponent/>
    </Container>
  );
}
export default registerProfile;