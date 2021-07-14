import { Button, Table, TableRow, TableCell, TableBody, Container, Typography, Dialog, DialogContent, DialogActions } from "@material-ui/core";
import { useEffect } from "react";

const NutritionFactModal = ({open, handleClose, selectedRecipeNutrition, selectedRecipeNutritionZero, selectedRecipeId}) => {

  useEffect(() => {
  }, [selectedRecipeId, selectedRecipeNutrition, selectedRecipeNutritionZero]);

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
                  <TableCell>{(selectedRecipeNutrition.hasOwnProperty("calories")  ? selectedRecipeNutrition["calories"] : selectedRecipeNutritionZero["calories"]) } g</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>% Daily Value*</TableCell>
                  </TableRow>
                <TableRow>
                  <TableCell>Total Fat {(selectedRecipeNutrition.hasOwnProperty("fat_total_g")  ? selectedRecipeNutrition["fat_total_g"] : selectedRecipeNutritionZero["fat_total_g"])}g</TableCell>
                  <TableCell>%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Saturated Fat  {(selectedRecipeNutrition.hasOwnProperty("fat_saturated_g")  ? selectedRecipeNutrition["fat_saturated_g"] : selectedRecipeNutritionZero["fat_saturated_g"])}g</TableCell>
                  <TableCell>%</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Cholesterol {(selectedRecipeNutrition.hasOwnProperty("cholesterol_mg")  ? selectedRecipeNutrition["cholesterol_mg"] : selectedRecipeNutritionZero["cholesterol_mg"])}mg</TableCell>
                <TableCell>%</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Sodium {(selectedRecipeNutrition.hasOwnProperty("sodium_mg")  ? selectedRecipeNutrition["sodium_mg"] : selectedRecipeNutritionZero["sodium_mg"])}mg</TableCell>
                <TableCell>%</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Total Carbonhydrate {(selectedRecipeNutrition.hasOwnProperty("carbohydrates_total_g")  ? selectedRecipeNutrition["carbohydrates_total_g"] : selectedRecipeNutritionZero["carbohydrates_total_g"])}g</TableCell>
                <TableCell>%</TableCell>
                </TableRow>
                <TableRow>
                <TableCell colSpan={2}>Total Sugars {(selectedRecipeNutrition.hasOwnProperty("sugar_g")  ? selectedRecipeNutrition["sugar_g"] : selectedRecipeNutritionZero["sugar_g"])}g</TableCell>
                </TableRow>
                <TableRow>
                <TableCell colSpan={2}>Fiber {(selectedRecipeNutrition.hasOwnProperty("fiber_g")  ? selectedRecipeNutrition["fiber_g"] : selectedRecipeNutritionZero["fiber_g"])}g</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Protein {(selectedRecipeNutrition.hasOwnProperty("protein_g")  ? selectedRecipeNutrition["protein_g"] : selectedRecipeNutritionZero["protein_g"])}g</TableCell>
                <TableCell>%</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Potassium {(selectedRecipeNutrition.hasOwnProperty("potassium_mg")  ? selectedRecipeNutrition["potassium_mg"] : selectedRecipeNutritionZero["potassium_mg"])}mg</TableCell>
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