import { Container, Typography } from "@material-ui/core";
import React from "react";
import Appbar from "../Tabs/Appbar";

const AddIngredients = () => {
  return(
    <Container>
      <Appbar/>
      <Typography>Add Ingredients</Typography>
    </Container>
  )
}

export default AddIngredients;