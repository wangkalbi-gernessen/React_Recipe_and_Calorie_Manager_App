import { Button, Table, TableRow, TableCell, TableBody, Container, Typography, Dialog, DialogContent, DialogActions } from "@material-ui/core";
import { useEffect } from "react";

const NutritionFactModal = ({open, handleClose, selectedRecipeNutrition}) => {

  useEffect(() => {
  }, [selectedRecipeNutrition]);

  return(
    <Dialog open={open}>
      <DialogContent>
        <Container>
          <Typography align="center" style={{color: "brown", fontSize: "25px", fontWeight: "bold"}}>Nutrition Facts</Typography>
          <Container>
            <Table size="small">
              <TableBody>
                <TableRow >
                  <TableCell>Calories</TableCell>
                  <TableCell><Typography style={{fontWeight: "bold"}}>{selectedRecipeNutrition.calories}</Typography> g</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>% Daily Value*</TableCell>
                  </TableRow>
                <TableRow>
                  <TableCell>Total Fat {selectedRecipeNutrition.fat_total_g}g</TableCell>
                  <TableCell>%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Saturated Fat  {selectedRecipeNutrition.fat_saturated_g}g</TableCell>
                  <TableCell>%</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Cholesterol {selectedRecipeNutrition.cholesterol_mg}mg</TableCell>
                <TableCell>%</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Sodium {selectedRecipeNutrition.sodium_mg}mg</TableCell>
                <TableCell>%</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Total Carbonhydrate {selectedRecipeNutrition.carbohydrates_total_g}g</TableCell>
                <TableCell>%</TableCell>
                </TableRow>
                <TableRow>
                <TableCell colSpan={2}>Total Sugars {selectedRecipeNutrition.sugar_g}g</TableCell>
                </TableRow>
                <TableRow>
                <TableCell colSpan={2}>Fiber {selectedRecipeNutrition.fiber_g}g</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Protein {selectedRecipeNutrition.protein_g}g</TableCell>
                <TableCell>%</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Potassium {selectedRecipeNutrition.potassium_mg}mg</TableCell>
                <TableCell>%</TableCell>
                </TableRow>
                <TableRow>
                <TableCell colSpan={2}>The % Daily Value(DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.(FDA.gov)</TableCell>
                </TableRow> 
              </TableBody>
            </Table>
          </Container>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default NutritionFactModal;